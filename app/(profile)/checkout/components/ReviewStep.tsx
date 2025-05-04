'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { CardPayment, CheckoutFormData, MomoPayment, PaymentMethod, PaypalPayment } from '@/types/checkout';
import React from 'react';

type ReviewStepProps = {
    formData: CheckoutFormData;
    paymentMethods: PaymentMethod[];
    payment: CardPayment | MomoPayment | PaypalPayment;
    setStep: (step: number) => void;
};

const ReviewStep: React.FC<ReviewStepProps> = ({
    formData,
    paymentMethods,
    payment,
    setStep,
}) => {
    const { t } = useLanguage();
    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-6">{t.paymentPage.reviewStep.title}</h2>

            <div className="gap-6">
                {/* Thông tin giao hàng */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-medium text-lg mb-4 flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t.paymentPage.reviewStep.shippingTitle}
                        </h3>

                        <div className="space-y-3">
                            <div className="flex">
                                <span className="text-gray-600 w-32">{t.paymentPage.reviewStep.infoLabels.fullName}</span>
                                <span className="font-medium">{formData.firstName + ' ' + formData.lastName || t.paymentPage.reviewStep.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 w-32">{t.paymentPage.reviewStep.infoLabels.phone}</span>
                                <span className="font-medium">{formData.phone || t.paymentPage.reviewStep.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 w-32">{t.paymentPage.reviewStep.infoLabels.email}</span>
                                <span className="font-medium">{formData.email + (formData.apartment ? ", " + formData.apartment : "") || t.paymentPage.reviewStep.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 w-32">{t.paymentPage.reviewStep.infoLabels.address}</span>
                                <span className="font-medium">{formData.address || t.paymentPage.reviewStep.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 w-32">{t.paymentPage.reviewStep.infoLabels.province}</span>
                                <span className="font-medium">{formData.province || t.paymentPage.reviewStep.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 w-32">{t.paymentPage.reviewStep.infoLabels.zipCode}</span>
                                <span className="font-medium">{formData.zipCode || t.paymentPage.reviewStep.missingInfo}</span>
                            </div>
                            <div className="flex">
                                <span className="text-gray-600 w-32">{t.paymentPage.reviewStep.infoLabels.country}</span>
                                <span className="font-medium">{formData.country || t.paymentPage.reviewStep.missingInfo}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep(1)}
                            className="mt-4 text-sm text-[#8a974c] hover:text-[#6e7a34] flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            {t.paymentPage.common.editButton}
                        </button>
                    </div>

                    {/* Phương thức thanh toán */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-medium text-lg mb-4 flex items-center">
                            <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            {t.paymentPage.reviewStep.paymentTitle}

                        </h3>

                        <div className="flex items-center">
                            {formData.paymentMethod === 'credit-card' && (
                                <>
                                    <div className="w-10 h-6 bg-gray-200 rounded mr-3"></div>
                                    <span>{t.paymentPage.reviewStep.infoLabels.creditCard}•••• •••• •••• {(payment as CardPayment).number.slice(-4)}</span>
                                </>
                            )}
                            {formData.paymentMethod === 'paypal' && (
                                <>
                                    <div className="w-10 h-6 bg-blue-200 rounded mr-3 flex items-center justify-center text-blue-800">P</div>
                                    <span>PayPal ({formData.email})</span>
                                </>
                            )}
                            {formData.paymentMethod === 'momo' && (
                                <>
                                    <div className="w-10 h-6 bg-purple-200 rounded mr-3 flex items-center justify-center text-purple-800">M</div>
                                    <span>MoMo ({formData.phone})</span>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="mt-4 text-sm text-[#8a974c] hover:text-[#6e7a34] flex items-center"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            {t.paymentPage.common.changeButton}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ReviewStep;