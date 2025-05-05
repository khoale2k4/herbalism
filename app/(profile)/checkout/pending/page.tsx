"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";

const orderData = {
    orderNumber: "ORD-2025042501",
    orderDate: "25/04/2025",
    paymentMethod: "Thẻ tín dụng",
};

export default function OrderProcessingPage() {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [orderNumber, setOrderNumber] = useState<string | null>(null);
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'creditCard' | 'paypal' | 'momo' | 'cod' | 'bank' | null>(null);
    const { t } = useLanguage();

    const createOrder = async (addressId: string) => {
        return addressId;
    }

    useEffect(() => {
        const data = sessionStorage.getItem('paymentMethod');
        const addressId = sessionStorage.getItem('addressId');
        
        if (data && addressId) {
            const params = JSON.parse(data);
            setPaymentMethod(params.id);
            
            const processOrder = async () => {
                setProgress(10);
    
                const orderId = await createOrder(addressId);
                setOrderNumber(orderId);
                setProgress(70);
                setCurrentStep(1);
    
                if (params.id === 'cod') {
                    setProgress(100);
                    setCurrentStep(2);
                    setIsComplete(true);
                    return;
                }
    
                const step2Timeout = setTimeout(() => {
                    setProgress(80);
                    setCurrentStep(1);
    
                    const completeTimeout = setTimeout(() => {
                        setProgress(100);
                        setCurrentStep(2);
                        setIsComplete(true);
                    }, 5000);
    
                    return () => clearTimeout(completeTimeout);
                }, 2000);
    
                return () => clearTimeout(step2Timeout);
            };
    
            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (prev < (params.id === 'cod' ? 70 : 80)) {
                        return prev + 1;
                    }
                    clearInterval(progressInterval);
                    return prev;
                });
            }, 60);
    
            processOrder();
    
            sessionStorage.removeItem('paymentMethod');
            sessionStorage.removeItem('addressId');
            
            return () => {
                clearInterval(progressInterval);
            };
        }
    }, []);

    const steps = t.orderProcessingTranslations.steps;

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden relative"
            >
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#4CAF50_2px,transparent_2px)] bg-[size:30px_30px]" />

                <div className="p-6 md:p-10 relative z-10">
                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col items-center mb-8"
                    >
                        <div className="relative mb-6">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white shadow-md">
                                <span className="text-4xl">
                                    {isComplete ? "✅" : "📦"}
                                </span>
                            </div>
                            <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" />
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                            {isComplete ? t.orderProcessingTranslations.pageTitle.complete : t.orderProcessingTranslations.pageTitle.processing}
                        </h1>

                        <p className="text-gray-600 text-center max-w-md">
                            {isComplete
                                ? t.orderProcessingTranslations.statusMessages.complete
                                : t.orderProcessingTranslations.statusMessages.processing}
                        </p>
                    </motion.div>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        className="mb-8"
                    >
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                                className="h-full bg-gradient-to-r from-green-500 to-green-600 absolute left-0 top-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>

                        {!isComplete && (
                            <div className="flex justify-center mt-4 space-x-2">
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                    className="w-2 h-2 bg-green-500 rounded-full"
                                />
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                    className="w-2 h-2 bg-green-500 rounded-full"
                                />
                                <motion.div
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                    className="w-2 h-2 bg-green-500 rounded-full"
                                />
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.3 }}
                        className="bg-green-50 rounded-xl p-4 flex items-center justify-center mb-8"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-green-500 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="text-gray-700">
                            {isComplete
                                ? t.orderProcessingTranslations.timeEstimation.complete
                                : t.orderProcessingTranslations.timeEstimation.processing}
                            {!isComplete && <span className="font-medium">{t.orderProcessingTranslations.loadingIndicator}</span>}
                        </span>
                    </motion.div>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <div className="flex justify-between relative">
                            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />

                            {steps.map((step, index) => (
                                <div key={index} className="flex flex-col items-center z-10 w-full">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${index <= currentStep
                                            ? "bg-green-500 text-white"
                                            : "bg-white border-2 border-gray-200 text-gray-400"
                                            }`}
                                    >
                                        <span className="text-sm">{step.icon}</span>
                                    </div>
                                    <p
                                        className={`mt-2 text-xs font-medium text-center max-w-[80px] mx-auto transition-colors duration-300 ${index <= currentStep ? "text-green-600" : "text-gray-500"
                                            }`}
                                    >
                                        {step.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 pt-4 border-t border-gray-100"
                    >
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                {t.orderProcessingTranslations.orderInfo.orderNumber}
                            </p>
                            <p className="font-semibold">{orderNumber ?? ". . . "}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                {t.orderProcessingTranslations.orderInfo.orderDate}
                            </p>
                            <p className="font-semibold">{new Date().toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                                {t.orderProcessingTranslations.orderInfo.paymentMethod}
                            </p>
                            <p className="font-semibold">{paymentMethod !== null ? t.paymentPage.paymentStep[paymentMethod].title : ". . . "}</p>
                        </div>
                    </motion.div>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        {/* <button className="px-4 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors duration-300 flex-1 text-center">
                            Hủy đơn hàng
                        </button> */}
                        <button
                            onClick={() => { router.push('/shop') }}
                            className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white hover:shadow-lg transition-all duration-300 flex-[2] text-center font-medium"
                        >
                            {t.orderProcessingTranslations.buttons.continueShopping}
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}