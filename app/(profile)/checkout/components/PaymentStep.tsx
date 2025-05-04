'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { CardPayment, MomoPayment, PaymentMethod, PaypalPayment } from '@/types/checkout';
import React from 'react';

type PaymentStepProps = {
    paymentMethods: PaymentMethod[];
    selectedMethod: string;
    payment: CardPayment | MomoPayment | PaypalPayment;
    handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const PaymentStep: React.FC<PaymentStepProps> = ({
    paymentMethods,
    selectedMethod,
    payment,
    handlePaymentChange,
    setFormData,
}) => {
    const { t } = useLanguage();
    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-6">{t.paymentPage.paymentStep.title}</h2>

            <div className="flex border-b border-gray-200">
                {paymentMethods.map((method) => (
                    <button
                        key={method.id}
                        className={`px-4 py-2 font-medium text-sm focus:outline-none ${selectedMethod === method.id
                            ? 'text-[#6e7a34] border-b-2 border-[#6e7a34]'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                        onClick={() => {
                            setFormData((prev: any) => ({ ...prev, paymentMethod: method.id }));
                        }}
                    >
                        {method.name}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {selectedMethod === 'credit-card' && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.paymentStep.creditCard.cardNumberLabel}</label>
                            <input
                                type="text"
                                name="number"
                                value={(payment as CardPayment).number}
                                onChange={handlePaymentChange}
                                placeholder="1234 5678 9012 3456"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.paymentStep.creditCard.expiryDateLabel}</label>
                                <input
                                    type="text"
                                    name="date"
                                    value={(payment as CardPayment).date}
                                    onChange={handlePaymentChange}
                                    placeholder="MM/YY"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.paymentStep.creditCard.cvcLabel}</label>
                                <input
                                    type="text"
                                    name="cvc"
                                    value={(payment as CardPayment).cvc}
                                    onChange={handlePaymentChange}
                                    placeholder="CVC"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.paymentStep.creditCard.nameLabel}</label>
                            <input
                                type="text"
                                name="name"
                                value={(payment as CardPayment).name}
                                onChange={handlePaymentChange}
                                placeholder={t.paymentPage.paymentStep.creditCard.namePlaceholder}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                )}

                {selectedMethod === 'paypal' && (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 text-blue-500 mr-3 mt-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-blue-800">{t.paymentPage.paymentStep.paypal.title}</h3>
                                <p className="text-sm text-blue-700 mt-1">
                                    {t.paymentPage.paymentStep.paypal.noticeDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {selectedMethod === 'momo' && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 text-purple-500 mr-3 mt-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-purple-800">{t.paymentPage.paymentStep.momo.title}</h3>
                                <p className="text-sm text-purple-700 mt-1">
                                    {t.paymentPage.paymentStep.momo.noticeDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {selectedMethod === 'pay-later' && (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 text-yellow-500 mr-3 mt-1">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-medium text-yellow-800">{t.paymentPage.paymentStep.cod.title}</h3>
                                <p className="text-sm text-yellow-700 mt-1">
                                    {t.paymentPage.paymentStep.cod.noticeDescription}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentStep;