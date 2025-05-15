'use client';

import { CheckCircle, Package, Calendar, Mail, ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [orderDate, setOrderDate] = useState('');
  const [orderNumber, setOrderNumber] = useState('#1747323607119');

  useEffect(() => {
    // Format date nicely
    const today = new Date();
    setOrderDate(today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

    // You could use query params for real order details
    const code = searchParams.get('code');
    const id = searchParams.get('id');
    const orderCode = searchParams.get('orderCode');

    if (orderCode) {
      setOrderNumber('#' + orderCode);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-10 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white bg-opacity-20 rounded-full mb-6 backdrop-blur-sm">
              <CheckCircle className="text-white" size={56} strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl font-serif font-bold text-white mb-3">Thanh toán thành công!</h1>
            <p className="text-xl text-green-50">Cảm ơn bạn đã mua hàng</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Order Summary */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-100">
              <h2 className="text-2xl font-serif font-semibold text-green-800 mb-6">Chi tiết đơn hàng</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Calendar className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ngày đặt hàng</p>
                    <p className="font-medium text-lg">{orderDate}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Package className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Mã đơn hàng</p>
                    <p className="font-medium text-lg">{orderNumber}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <svg className="text-green-600 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
                    <p className="font-medium text-xl text-green-700">$49.99</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <svg className="text-green-600 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phương thức thanh toán</p>
                    <p className="font-medium text-lg">Thẻ tín dụng</p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="mt-8 pt-6 border-t border-green-200">
                <h3 className="text-lg font-medium text-green-800 mb-4">Trạng thái đơn hàng</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200"></div>

                  <div className="relative flex items-start mb-6 pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="text-white" size={16} />
                    </div>
                    <div>
                      <p className="font-medium">Đơn hàng đã xác nhận</p>
                      <p className="text-sm text-gray-500">Chúng tôi đã nhận được đơn hàng của bạn</p>
                    </div>
                  </div>

                  <div className="relative flex items-start mb-6 pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                      <Mail size={16} />
                    </div>
                    <div>
                      <p className="font-medium">Email xác nhận đã gửi</p>
                      <p className="text-sm text-gray-500">Vui lòng kiểm tra hộp thư của bạn</p>
                    </div>
                  </div>

                  <div className="relative flex items-start pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                      <Package size={16} />
                    </div>
                    <div>
                      <p className="font-medium">Đơn hàng đang được xử lý</p>
                      <p className="text-sm text-gray-500">Đơn hàng của bạn sẽ được xử lý trong vòng 24 giờ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps Card */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
              <h2 className="text-2xl font-serif font-semibold text-amber-800 mb-4">Các bước tiếp theo</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-amber-100 text-amber-700 rounded-full p-2 mr-4 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium">Email xác nhận đơn hàng</p>
                    <p className="text-gray-600">Bạn sẽ nhận được email xác nhận đơn hàng trong ít phút</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-amber-100 text-amber-700 rounded-full p-2 mr-4 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium">Xử lý đơn hàng</p>
                    <p className="text-gray-600">Đơn hàng của bạn sẽ được xử lý trong vòng 24 giờ</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-amber-100 text-amber-700 rounded-full p-2 mr-4 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-medium">Thông tin vận chuyển</p>
                    <p className="text-gray-600">Thông tin vận chuyển sẽ được gửi đến email của bạn khi đơn hàng được gửi đi</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Customer Support Card */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="text-xl font-serif font-semibold text-gray-800 mb-4">Bạn cần trợ giúp?</h2>
              <p className="text-gray-600 mb-4">Nếu bạn có bất kỳ câu hỏi nào về đơn hàng của mình, vui lòng liên hệ với đội ngũ hỗ trợ khách hàng của chúng tôi.</p>
              <div className="flex items-center space-x-4">
                <Link href="/contact" className="text-green-700 hover:text-green-800 flex items-center font-medium">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Liên hệ hỗ trợ
                </Link>
                <Link href="/faq" className="text-green-700 hover:text-green-800 flex items-center font-medium">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Câu hỏi thường gặp
                </Link>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/orders" className="flex-1 bg-green-700 hover:bg-green-800 text-white font-medium py-4 px-6 rounded-xl text-center transition duration-200 shadow-sm flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Xem chi tiết đơn hàng
              </Link>
              <Link href="/shop" className="flex-1 bg-white border-2 border-green-700 text-green-700 hover:bg-green-50 font-medium py-4 px-6 rounded-xl text-center transition duration-200 flex items-center justify-center">
                <ArrowLeftCircle className="mr-2" size={20} />
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} - Mọi thắc mắc vui lòng liên hệ <a href="mailto:support@example.com" className="text-green-600 hover:underline">support@example.com</a></p>
        </div>
      </div>
    </div>
  );
}