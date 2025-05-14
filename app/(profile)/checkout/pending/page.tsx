"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";
import { OrderOperation } from "@/lib/main";
import { getTokenFromCookie } from "@/app/utils/token";
import { XCircle } from "lucide-react";
import { cleanCart, getLocalCart } from "@/app/utils/localCart";
import { addOrderToLocal } from "@/app/utils/localOrder";

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
    const orderOp = new OrderOperation();
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank' | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { t } = useLanguage();

    const createOrder = async (addressId: string, voucherId: string | null, paymentMet: 'cod' | 'bank' | null, address: any, note: string | null) => {
        try {
            const token = getTokenFromCookie();
            if (!token) {
                const items = getLocalCart();
                const products = items.map((item) => {
                    return {
                        productId: item.product.id,
                        size: item.size,
                        quantity: item.num,
                    }
                });
                const response = await orderOp.create(address, voucherId, paymentMet, products, note);
                if (response.success) {
                    addOrderToLocal(response.data.id);
                    cleanCart();
                    return response.data.trackingNumber;
                } else {
                    setError(t.orderProcessingTranslations.errorMessages.createFailed || 'Tạo đơn hàng thất bại. Vui lòng thử lại.');
                }
            } else {
                const response = await orderOp.createFromCart(token, addressId, voucherId, paymentMet, note);
                if (response.success) {
                    return response.data.trackingNumber;
                } else {
                    setError(t.orderProcessingTranslations.errorMessages.createFailed || 'Tạo đơn hàng thất bại. Vui lòng thử lại.');
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        let checkDataInterval: NodeJS.Timeout;
        let timeout: NodeJS.Timeout;

        const checkData = () => {
            const data = sessionStorage.getItem('paymentMethod');
            const addressId = sessionStorage.getItem('addressId');
            const address = sessionStorage.getItem('address');

            if (data && (addressId || address)) {
                clearInterval(checkDataInterval);
                clearTimeout(timeout);
                processOrder({ data, addressId: addressId as string | undefined, address });
            }
        };

        timeout = setTimeout(() => {
            clearInterval(checkDataInterval);
            setError(t.orderProcessingTranslations.errorMessages.timeout || 'Không nhận được dữ liệu thanh toán. Vui lòng thử lại.');
        }, 10000);

        checkDataInterval = setInterval(checkData, 500);

        const processOrder = (data: { data: string, addressId?: string, address: any }) => {
            const voucherId = sessionStorage.getItem('voucherId');
            const note = sessionStorage.getItem('note');
            const params = JSON.parse(data.data);
            const address = JSON.parse(data.address);
            console.log(data.address, address);
            setPaymentMethod(params.id);

            const orderProcessing = async () => {
                try {
                    setProgress(10);

                    let orderId;
                    if (data.addressId) {
                        console.log('cart');
                        orderId = await createOrder(data.addressId, voucherId, params.id, address, note);
                    } else if (address) {
                        console.log('no cart');
                        orderId = await createOrder('', voucherId, params.id, address, note);
                    }

                    if (!orderId) {
                        // throw new Error('Failed to create order');
                        setError(t.orderProcessingTranslations.errorMessages.createFailed || 'Tạo đơn hàng thất bại. Vui lòng thử lại.');
                    }

                    setOrderNumber(orderId);
                    setProgress(70);
                    setCurrentStep(1);

                    if (params.id === 'cod') {
                        setProgress(100);
                        setCurrentStep(2);
                        setIsComplete(true);
                        return;
                    }
                    const url = `/payment?orderId=${orderId}`;
                    window.open(url, '_blank');

                    const step2Timeout = setTimeout(() => {
                        setProgress(80);
                        setCurrentStep(1);

                        const completeTimeout = setTimeout(() => {
                            setProgress(100);
                            setCurrentStep(2);
                            setIsComplete(true);
                        }, 5000);

                        return () => clearTimeout(completeTimeout);
                    }, 10000);

                    return () => clearTimeout(step2Timeout);
                } catch (error) {
                    console.error('Order creation failed:', error);
                    setProgress(0);
                    setIsComplete(false);
                    setOrderNumber(null);
                    setError(t.orderProcessingTranslations.errorMessages.createFailed || 'Tạo đơn hàng thất bại. Vui lòng thử lại.');
                }
            };

            const progressInterval = setInterval(() => {
                setProgress((prev) => {
                    if (error) return prev;
                    if (prev < (params.id === 'cod' ? 70 : 80)) {
                        return prev + 1;
                    }
                    clearInterval(progressInterval);
                    return prev;
                });
            }, 60);

            orderProcessing();

            sessionStorage.removeItem('paymentMethod');
            sessionStorage.removeItem('addressId');
            sessionStorage.removeItem('address');

            return () => {
                clearInterval(progressInterval);
            };
        };

        return () => {
            clearInterval(checkDataInterval);
            clearTimeout(timeout);
        };
    }, []);

    const steps = t.orderProcessingTranslations.steps;

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden relative"
                >
                    <div className="p-8 md:p-10 relative z-10 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center mb-6"
                        >
                            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-red-100">
                                <XCircle className="h-10 w-10 text-red-500" />
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl md:text-3xl font-bold mb-4 text-red-600"
                        >
                            {t.orderProcessingTranslations.errorMessages.title || 'Đã xảy ra lỗi'}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-600 mb-6"
                        >
                            {error}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-3 justify-center"
                        >
                            <button
                                onClick={() => router.push('/checkout')}
                                className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                            >
                                {t.orderProcessingTranslations.tryAgain || 'Thử lại'}
                            </button>
                            {/* <button
                                onClick={() => router.push('/cart')}
                                className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300"
                            >
                                {t.orderProcessingTranslations.buttons.backToCart || 'Quay lại giỏ hàng'}
                            </button> */}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        );
    }

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
                        <button
                            onClick={() => { router.push('/shop') }}
                            disabled={!isComplete}
                            className={`px-4 py-2.5 rounded-lg text-white font-medium flex-[2] text-center transition-all duration-300
                            ${isComplete
                                    ? 'bg-gradient-to-r from-green-600 to-green-500 hover:shadow-lg'
                                    : 'bg-gray-300 cursor-not-allowed'}
                            `}
                        >
                            {t.orderProcessingTranslations.buttons.continueShopping}
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}