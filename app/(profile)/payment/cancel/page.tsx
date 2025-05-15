'use client';

import { XCircle, ShoppingCart, AlertCircle, ArrowLeft, HelpCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PaymentCancel() {
    const searchParams = useSearchParams();
    const [orderInfo, setOrderInfo] = useState({
        orderCode: 'N/A',
        status: 'cancelled',
        id: 'N/A',
        code: 'N/A'
    });

    useEffect(() => {
        // Lấy thông tin từ query parameters
        const code = searchParams.get('code');
        const id = searchParams.get('id');
        const status = searchParams.get('status');
        const orderCode = searchParams.get('orderCode');

        // Cập nhật state với thông tin từ query parameters
        setOrderInfo({
            orderCode: orderCode || 'N/A',
            status: status?.toLowerCase() || 'cancelled',
            id: id || 'N/A',
            code: code || 'N/A'
        });
    }, [searchParams]);

    // Xác định nội dung hiển thị dựa trên mã lỗi
    const getErrorMessage = (code: string) => {
        switch (code) {
            case 'payment_failed':
                return 'Thanh toán không thành công do lỗi từ cổng thanh toán';
            case 'insufficient_funds':
                return 'Số dư không đủ để hoàn tất thanh toán';
            case 'card_declined':
                return 'Thẻ của bạn đã bị từ chối';
            case 'expired_card':
                return 'Thẻ của bạn đã hết hạn';
            default:
                return 'Giao dịch đã bị hủy hoặc gián đoạn';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Card chính */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-10 text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
                            <XCircle className="text-white" size={56} strokeWidth={2.5} />
                        </div>
                        <h1 className="text-4xl font-serif font-bold text-white mb-3">Thanh toán bị hủy</h1>
                        <p className="text-xl text-amber-50">Đơn hàng của bạn chưa được hoàn tất</p>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                        {/* Thông tin trạng thái đơn hàng */}
                        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                            <h2 className="text-2xl font-serif font-semibold text-amber-800 mb-6">Trạng thái đơn hàng</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Mã đơn hàng</p>
                                        <p className="font-medium text-lg">#{orderInfo.orderCode}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                        <AlertCircle className="w-6 h-6 text-amber-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Trạng thái</p>
                                        <p className="font-medium text-lg capitalize">{orderInfo.status}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Mã giao dịch</p>
                                        <p className="font-medium text-lg">{orderInfo.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="bg-white p-3 rounded-lg shadow-sm">
                                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Mã lỗi</p>
                                        <p className="font-medium text-lg">{orderInfo.code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lý do và giải thích */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center mb-5">
                                <div className="bg-amber-100 p-2 rounded-lg mr-4">
                                    <HelpCircle className="text-amber-600" size={24} />
                                </div>
                                <h2 className="text-2xl font-serif font-semibold text-gray-800">Điều gì đã xảy ra?</h2>
                            </div>

                            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 mb-6">
                                <div className="flex items-center">
                                    <AlertCircle className="text-amber-600 mr-3 flex-shrink-0" size={20} />
                                    <p className="text-amber-800 font-medium">{getErrorMessage(orderInfo.code)}</p>
                                </div>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center bg-gray-100 text-gray-700 rounded-full p-2 mr-4 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="font-medium">Quá trình thanh toán đã bị gián đoạn hoặc hủy bỏ</p>
                                        <p className="text-gray-600">Giao dịch của bạn không được xử lý hoàn tất</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center bg-green-100 text-green-700 rounded-full p-2 mr-4 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="font-medium">Thẻ của bạn chưa bị trừ tiền</p>
                                        <p className="text-gray-600">Không có khoản phí nào được áp dụng cho giao dịch này</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-700 rounded-full p-2 mr-4 mt-0.5">
                                        <ShoppingCart className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-medium">Sản phẩm vẫn còn trong giỏ hàng</p>
                                        <p className="text-gray-600">Các mặt hàng vẫn được giữ lại trong giỏ hàng để bạn tiện sử dụng</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Gợi ý tiếp theo */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h2 className="text-xl font-serif font-semibold text-gray-800 mb-4">Bạn có thể làm gì tiếp theo?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center bg-amber-100 text-amber-700 rounded-full p-2 mr-4 mt-0.5">
                                        <RefreshCw className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-medium">Thử lại thanh toán</p>
                                        <p className="text-gray-600">Kiểm tra thông tin thẻ và thử lại</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center bg-amber-100 text-amber-700 rounded-full p-2 mr-4 mt-0.5">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <div>
                                        <p className="font-medium">Chọn phương thức thanh toán khác</p>
                                        <p className="text-gray-600">Thử sử dụng thẻ khác hoặc các phương thức thanh toán thay thế</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <span className="inline-flex items-center justify-center bg-amber-100 text-amber-700 rounded-full p-2 mr-4 mt-0.5">
                                        <HelpCircle className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <p className="font-medium">Liên hệ hỗ trợ</p>
                                        <p className="text-gray-600">Nếu bạn vẫn gặp vấn đề, hãy liên hệ với đội ngũ hỗ trợ của chúng tôi</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Các nút hành động */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href="/cart" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-4 px-6 rounded-xl text-center transition duration-200 shadow-sm flex items-center justify-center">
                                <ShoppingCart className="mr-2" size={20} />
                                Quay lại giỏ hàng
                            </Link>
                            <Link href="/products" className="flex-1 bg-white border-2 border-amber-600 text-amber-600 hover:bg-amber-50 font-medium py-4 px-6 rounded-xl text-center transition duration-200 flex items-center justify-center">
                                <ArrowLeft className="mr-2" size={20} />
                                Tiếp tục mua sắm
                            </Link>
                        </div>

                        {/* Hỗ trợ */}
                        <div className="pt-6 border-t border-gray-200">
                            <div className="flex items-center justify-center space-x-2 text-gray-600">
                                <HelpCircle className="text-amber-600" size={18} />
                                <p>Cần trợ giúp?</p>
                                <Link href="/contact" className="text-amber-700 hover:underline font-medium">Liên hệ đội ngũ hỗ trợ của chúng tôi</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} - Mọi thắc mắc vui lòng liên hệ <a href="mailto:support@example.com" className="text-amber-600 hover:underline">support@example.com</a></p>
                </div>
            </div>
        </div>
    );
}