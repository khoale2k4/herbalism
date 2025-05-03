import { formatPrice } from "@/app/utils/format-currency";
import { ItemInCart } from "@/components/Cart/cart";

type PaymentMethod = {
    id: string,
    name: string,
    icon: string
};

type DetailFormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    addressId: string;
    apartment: string;
    province: string;
    city: string;
    country: string;
    zipCode: string;
    paymentMethod: string;
};

type OrderDetailProps = {
    formData: DetailFormData,
    cartItems: ItemInCart[],
    subtotal: number,
    shippingFee: number,
    total: number,
    step: number,
    paymentMethods: PaymentMethod[];
}

const OrderDetail = ({ formData, cartItems, shippingFee, subtotal, total, step, paymentMethods }: OrderDetailProps) => {
    return (<div className="md:w-2/5 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Đơn hàng của bạn</h2>

        <div className="border-b border-gray-100 pb-4 mb-4">
            {cartItems.map((item, index) => (
                <div key={item.id} className={`flex justify-between py-3 ${index !== 0 ? 'border-t border-gray-50' : ''}`}>
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-gray-500 mr-3 overflow-hidden">
                            <img
                                src={item.image}
                                alt="image"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div>
                            <span className="font-medium block">{item.name}</span>
                            <span className="text-gray-500 text-sm">SL: {item.num}</span>
                        </div>
                    </div>
                    <div className="font-medium text-right">
                        {formatPrice(item.price * item.num)}
                    </div>
                </div>
            ))}
        </div>

        <div className="space-y-3 mb-6 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-600">Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-600">Phí vận chuyển:</span>
                <span>{formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-100">
                <span>Tổng cộng:</span>
                <span className="text-blue-700">{formatPrice(total)}</span>
            </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1.5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Thông tin đơn hàng
            </h3>
            <div className="space-y-2 text-sm">
                {step >= 1 && (
                    <>
                        <div className="flex">
                            <span className="text-gray-500 w-24">Email:</span>
                            <span>{formData.email || 'Chưa nhập'}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-500 w-24">Điện thoại:</span>
                            <span>{formData.phone || 'Chưa nhập'}</span>
                        </div>
                        <div className="flex">
                            <span className="text-gray-500 w-24">Địa chỉ:</span>
                            <span className="truncate max-w-xs">{formData.address || 'Chưa nhập'}</span>
                        </div>
                    </>
                )}
                {step >= 2 && (
                    <div className="flex pt-2 border-t border-gray-100 mt-2">
                        <span className="text-gray-500 w-24">Phương thức:</span>
                        <span className="flex items-center">
                            {formData.paymentMethod ? (
                                <>
                                    <span className="mr-1">{paymentMethods.find(m => m.id === formData.paymentMethod)?.icon}</span>
                                    {paymentMethods.find(m => m.id === formData.paymentMethod)?.name}
                                </>
                            ) : 'Chưa chọn'}
                        </span>
                    </div>
                )}
            </div>
        </div>

        <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-1.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Thanh toán an toàn & bảo mật
        </div>
    </div>);
}