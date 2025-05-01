function convertCurrencyVND(amountVND: number, currency: string): string {
    if (amountVND <= 0) {
        throw new Error('Số tiền phải lớn hơn 0');
    }

    const rates: { [key: string]: number } = {
        USD: 24500,   // 1 USD = 24,500 VND
        EUR: 27000,   // 1 EUR = 27,000 VND
        JPY: 170,     // 1 JPY = 170 VND
        GBP: 31000,   // 1 GBP = 31,000 VND
        AUD: 16000,   // 1 AUD = 16,000 VND
        CAD: 18000,   // 1 CAD = 18,000 VND
    };

    const upperCurrency = currency.toUpperCase();
    const rate = rates[upperCurrency];

    if (!rate) {
        throw new Error(`Không hỗ trợ loại tiền tệ: ${currency}`);
    }

    const amountConverted = amountVND / rate;
    return Math.ceil(amountConverted).toString() + " " + currency;
}
