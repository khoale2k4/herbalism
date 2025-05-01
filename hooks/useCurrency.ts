'use client';

import { useState, useEffect } from 'react';

export const useCurrency = () => {
    const [currentCurrency, setCurrentCurrency] = useState('USD');

    const tcurrency = (amountVND: number) => {
        return convertCurrencyVND(amountVND, currentCurrency);
    };

    const changeCurrency = (newCurr: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currency', newCurr.toUpperCase());
            setCurrentCurrency(newCurr.toUpperCase());
            window.location.reload();
        }
    };

    const convertCurrencyVND = (amountVND: number, currency: string): string => {
        if (amountVND <= 0) {
            return '0 ' + currency;
        }

        const rates: { [key: string]: number } = {
            USD: 24500,
            EUR: 27000,
            JPY: 170,
            GBP: 31000,
            AUD: 16000,
            CAD: 18000,
            VND: 1
        };

        const upperCurrency = currency.toUpperCase();
        const rate = rates[upperCurrency];

        if (!rate) {
            throw new Error(`Không hỗ trợ loại tiền tệ: ${currency}`);
        }

        const amountConverted = amountVND / rate;
        return Math.ceil(amountConverted).toString() + " " + upperCurrency;
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const lang = localStorage.getItem('currency') || 'USD';
            setCurrentCurrency(lang.toUpperCase());
        }
    }, []);

    return {
        tcurrency,        // hàm để chuyển đổi từ VND
        changeCurrency,  // hàm để đổi loại tiền
        currentCurrency  // giá trị tiền hiện tại
    };
};
