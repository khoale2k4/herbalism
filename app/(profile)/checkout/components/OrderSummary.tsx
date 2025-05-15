'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { ItemInCart, Voucher } from '@/types/checkout';
import React from 'react';

type OrderSummaryProps = {
    cartItems: ItemInCart[];
    subtotal: number;
    shippingFee: number;
    total: number;
    selectedVoucher: Voucher | null;
    voucherCode: string;
    setVoucherCode: (code: string) => void;
    handleGetVoucher: (code: string) => void;
    formData: any;
    paymentMethods: any;
    step: number;
    formatCurrency: (amount: number) => string;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({
    cartItems,
    subtotal,
    shippingFee,
    total,
    selectedVoucher,
    voucherCode,
    setVoucherCode,
    handleGetVoucher,
    formData,
    paymentMethods,
    step,
    formatCurrency,
}) => {
    const { t } = useLanguage();
    return (
        <div className="md:w-2/5 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
            <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">{t.paymentPage.orderSummary.title}</h2>

            <div className="border-b border-gray-100 pb-4 mb-4">
                {cartItems.map((item, index) => (
                    <div key={item.id + item.size} className={`flex justify-between py-3 ${index !== 0 ? 'border-t border-gray-50' : ''}`}>
                        <div className="flex items-start">
                            <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center text-gray-500 mr-3 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt="image"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <span className="font-medium block">{item.name}</span>
                                <span className="text-gray-500 text-sm">{t.paymentPage.orderSummary.infoLabels.size} {item.size}</span>
                                <span className="text-gray-500 text-sm">{t.paymentPage.orderSummary.infoLabels.amount} {item.num}</span>
                            </div>
                        </div>
                        <div className="font-medium text-right">
                            {formatCurrency(item.price * item.num)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">{t.paymentPage.orderSummary.subtotalLabel}</span>
                    <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">{t.paymentPage.orderSummary.shippingLabel}</span>
                    <span>{formatCurrency(shippingFee)}</span>
                </div>
                {selectedVoucher && (
                    <>
                        <div className="flex justify-between">
                            <span className="text-gray-600">{t.paymentPage.orderSummary.discount}:</span>
                            <span className="text-green-600 font-medium">
                                {selectedVoucher.type === 'amount'
                                    ? `-${formatCurrency(selectedVoucher.discount)}`
                                    : `-${selectedVoucher.discount}% (-${formatCurrency(subtotal * selectedVoucher.discount)})`}
                            </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{t.paymentPage.orderSummary.discountLabel}</span>
                            <span>{selectedVoucher.id}</span>
                        </div>
                    </>
                )}

                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <input
                            id="voucherInput"
                            type="text"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            placeholder={t.paymentPage.common.voucherPlaceholder}
                            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8a974c]"
                        />
                        <button
                            onClick={() => { handleGetVoucher(voucherCode) }}
                            className="bg-[#8a974c] hover:bg-[#6e7a34] text-white px-2 py-2 rounded min-w-[100px]"
                        >
                            {t.paymentPage.common.applyButton}
                        </button>
                    </div>
                </div>


                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-100">
                    <span>{t.paymentPage.orderSummary.totalLabel}</span>
                    <span className="text-[#6e7a34]">{formatCurrency(total)}</span>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {t.paymentPage.orderSummary.orderInfoTitle}
                </h3>
                <div className="space-y-2 text-sm">
                    {step >= 1 && (
                        <>
                            <div className="flex">
                                <span className="text-gray-500 w-24">{t.paymentPage.orderSummary.infoLabels.email}</span>
                                <span>{formData.email || t.paymentPage.orderSummary.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-500 w-24">{t.paymentPage.orderSummary.infoLabels.phone}</span>
                                <span>{formData.phone || t.paymentPage.orderSummary.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-500 w-24">{t.paymentPage.orderSummary.infoLabels.address}</span>
                                <span className="truncate max-w-xs">{formData.address || t.paymentPage.orderSummary.missingInfo}</span>
                            </div>
                        </>
                    )}
                    {step >= 2 && (
                        <div className="flex pt-2 border-t border-gray-100 mt-2">
                            <span className="text-gray-500 w-24">{t.paymentPage.reviewStep.infoLabels.paymentMethod}</span>
                            <span className="flex items-center">
                                {formData.paymentMethod ? (
                                    <>
                                        <span className="mr-1">{paymentMethods.find((m: any) => m.id === formData.paymentMethod)?.icon}</span>
                                        {paymentMethods.find((m: any) => m.id === formData.paymentMethod)?.name}
                                    </>
                                ) : t.paymentPage.orderSummary.notSelected}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
                <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t.paymentPage.common.securePayment}
            </div>
        </div>
    );
};

export default OrderSummary;