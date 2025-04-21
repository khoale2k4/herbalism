import { useSearchParams } from 'next/navigation';

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment: string;
    province: string;
    city: string;
    country: string;
    zipCode: string;
    paymentMethod: string;
};

type PaymentStatusProps = {
    formData: FormData;
    success: string | null;
};

const PaymentStatus = ({ formData, success }: PaymentStatusProps) => {

    if (success === 'true') {
        return (
            <div className="inline-block p-6 bg-white border border-green-200 rounded-lg shadow-sm">
                <div className="flex flex-col items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-green-700">Thanh toán thành công</h3>
                </div>
                <p className="text-gray-600 text-center">Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đã được xác nhận.</p>
                <p className="text-sm text-gray-500 mt-2 text-center">Thông tin chi tiết đã được gửi qua email của bạn.</p>
            </div>
        );
    } else if (success === 'error') {
        return (
            <div className="inline-block p-6 bg-white border border-red-200 rounded-lg shadow-sm">
                <div className="flex flex-col items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-medium text-red-700">Thanh toán thất bại</h3>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-center">Vui lòng kiểm tra lại thông tin hoặc liên hệ: "abcde@gmail.com" để được hỗ trợ.</p>
                <div className="mt-4 flex justify-center">
                    <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors">
                        Thử lại
                    </button>
                </div>
            </div>
        );
    } else {
        return (

            <div className="flex flex-col items-center p-8 bg-white border border-blue-100 rounded-lg shadow-sm max-w-md w-full mx-auto">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <div className="w-10 h-10 border-4 border-blue-400 border-t-blue-100 rounded-full animate-spin"></div>
                </div>

                <h3 className="text-xl font-medium text-blue-700 mb-4">Đang xử lý thanh toán</h3>

                <div className="space-y-3 w-full text-center">
                    <p className="text-gray-600">Hệ thống đang xác nhận giao dịch của bạn.</p>
                    <p className="text-gray-500 text-sm">Vui lòng không đóng trang này cho đến khi hoàn tất.</p>
                </div>

                <div className="mt-8 w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-blue-500 h-1.5 rounded-full animate-pulse"></div>
                </div>

                <div className="mt-6 text-xs text-gray-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Thời gian xử lý có thể mất khoảng 30 giây</span>
                </div>
            </div>
        );
    }
};

export default PaymentStatus;