'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import PaymentStatus from './components/ProgressSteps';
import { ItemInCart } from '@/components/Cart/cart';
import { CartOperation, CustomerOperation, OrderOperation, VoucherOperation } from '@/lib/main';
import { getTokenFromCookie } from '@/app/utils/token';
import { CreditCard, SaveIcon } from 'lucide-react';

export type Address = {
    id: string;
    address: string;
    apartment?: string;
    province: string;
    firstName: string;
    lastName: string;
    city: string;
    country: string;
    zipCode: string;
}

export type Voucher = {
    id: string;
    discount: number;
    type: string;
}

export type CardPayment = {
    number: string;
    cvc: string;
    date: string;
    name: string;
}

export type MomoPayment = {

}

export type PaypalPayment = {

}

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const success = searchParams.get('success');
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        addressId: '',
        address: '',
        apartment: '',
        province: '',
        city: '',
        country: 'VN',
        zipCode: '',
        paymentMethod: 'credit-card',
    })
    const [payment, setPayment] = useState<CardPayment | MomoPayment | PaypalPayment>({
        number: '',
        date: '',
        cvc: '',
        name: ''
    } as CardPayment);
    const [newAddress, setNewAddress] = useState(false);
    const orderOp = new OrderOperation();
    const cartOp = new CartOperation();
    const customerOp = new CustomerOperation();
    const voucherOp = new VoucherOperation();
    const [isChecked, setIsChecked] = useState(false);
    const [cartItems, setCartItems] = useState<ItemInCart[]>([]);
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
    const [showVoucher, setShowVoucher] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const formatFullAddress = (addr: any) => {
        const parts = [
            addr.apartment,
            addr.address,
            addr.city,
            addr.province,
            addr.zipCode,
            addr.country,
        ].filter(Boolean);
        return parts.join(', ');
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (formData.paymentMethod === 'credit-card') {
            const id = e.target.name;
            const value = e.target.value;

            setPayment(
                prev => ({
                    ...prev,
                    [id]: value,
                } as CardPayment));
        } else if (formData.paymentMethod === 'momo') {
            setPayment({} as MomoPayment);
        } else if (formData.paymentMethod === 'paypal') {
            setPayment({} as PaypalPayment);
        }
    }

    const handleAddressChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = e.target.value;
        const selected = savedAddresses.find(addr => addr.id === selectedId);

        if (selected) {
            setFormData(prev => ({
                ...prev,
                addressId: selected.id,
                address: selected.address,
                apartment: selected.apartment || '',
                city: selected.city,
                province: selected.province,
                zipCode: selected.zipCode,
                country: selected.country,
                lastName: selected.lastName,
                firstName: selected.firstName
            }));
        }
    };

    const handleGetVoucher = async (id: string) => {
        const response = await voucherOp.getVoucher(id);

        if (response.success) {
            setSelectedVoucher(response.data);
        }
    }

    const paymentMethods = [
        {
            id: 'credit-card',
            name: 'Thẻ tín dụng',
            icon: '💳'
        },
        {
            id: 'paypal',
            name: 'PayPal',
            icon: '🔵'
        },
        {
            id: 'momo',
            name: 'Ví MoMo',
            icon: '💜'
        },
        {
            id: 'pay-later',
            name: 'Thanh toán khi nhận',
            icon: ''
        }
    ];

    const [subtotal, setSubtotal] = useState(0);
    const [shippingFee, setShippingFee] = useState<number>(0);
    const [total, setTotal] = useState(0);
    const calculateFee = async () => {
        const newSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.num), 0);
        setSubtotal(newSubtotal);
    
        // const feeResponse = await orderOp.getFee();
        // if (feeResponse.success) {
        //     setShippingFee(feeResponse.data);
        // } else {
        //     setShippingFee(0);
        // }
    };    

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        console.log('formData', formData)
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleNextStep = () => {
        if (step < 3) setStep(step + 1)
    }

    const handlePrevStep = () => {
        if (step === 1) router.back()
        if (step > 1) setStep(step - 1)
    }

    const saveAddress = async () => {
        const token = getTokenFromCookie();
        if (!token) return;

        const response = await customerOp.addAddress(token, {
            address: formData.address,
            // city: formData.city,
            country: formData.country,
            firstName: formData.firstName,
            lastName: formData.lastName,
            province: formData.province,
            zipCode: formData.zipCode,
            apartment: formData.apartment
        });

        if (response.success) {
            // implement notify later
            console.log("Success", response.data);
        }
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
            .format(amount)
            .replace(/\s₫/, '₫')
    }

    const checkValid = () => {
        if (step === 1) {
            if (newAddress) {
                return (
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.country ||
                    !formData.address ||
                    !formData.city ||
                    !formData.province ||
                    !formData.zipCode
                );
            } else {
                return (
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.addressId
                );
            }
        }


        if (step === 2) {
            if (formData.paymentMethod === 'credit-card') {
                const card = payment as CardPayment;
                return (
                    card.number.replace(/\s+/g, '').length !== 16 ||
                    card.cvc.length !== 3 ||
                    !/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.date)
                );
            }

            if (formData.paymentMethod === 'paypal' || formData.paymentMethod === 'momo' || formData.paymentMethod === 'pay-later') {
                return false;
            }

            return true;
        }

        return false;
    }

    const handleSubmit = async () => {
        const token = getTokenFromCookie();
        if (!token) return;
        let passValue: {
            id: string;
            number?: string;
            cvc?: string;
            date?: string;
            name?: string;
        } = {
            id: formData.paymentMethod,
        }
        if (formData.paymentMethod === 'credit-card') {
            passValue = {
                ...passValue,
                number: (payment as CardPayment).number,
                cvc: (payment as CardPayment).cvc,
                date: (payment as CardPayment).date,
                name: (payment as CardPayment).name
            };
        }
        sessionStorage.setItem('paymentMethod', JSON.stringify(passValue));
        router.push('/checkout/pending');

        // const response = await orderOp.createFromCart(token);
    }

    const fetchProcessingOrder = async () => {
        const token = getTokenFromCookie();
        if (!token) return;
        const response = await cartOp.getMyCartItems(token);
        if (response.success) {
            setCartItems(response.data.map((product: any) => {
                return {
                    id: product.id,
                    image: product.product.images[0]?.url,
                    name: product.product.name,
                    num: product.num,
                    price: product.product.price,
                    size: product.size
                } as ItemInCart;
            }))
        }
    }

    const fetchAddress = async () => {
        const token = getTokenFromCookie();
        if (!token) return;

        const response = await customerOp.getAddress(token);
        if (response.success) {
            setSavedAddresses(response.data.map((address: any) => {
                return {
                    address: address.address,
                    city: address.city,
                    country: address.country,
                    id: address.id,
                    province: address.province,
                    zipCode: address.zipCode,
                    apartment: address.apartment,
                    firstName: address.firstName,
                    lastName: address.lastName
                } as Address;
            }));
        }
    }

    useEffect(() => {
        if (cartItems.length > 0) {
            calculateFee();
        }
    }, [cartItems]);    

    useEffect(() => {
        let discountAmount = 0;
        if (selectedVoucher) {
            if (selectedVoucher.type === 'amount') {
                discountAmount = selectedVoucher.discount;
            } else if (selectedVoucher.type === 'percent') {
                discountAmount = subtotal * (selectedVoucher.discount / 100);
            }
        }
    
        const newTotal = subtotal + shippingFee - discountAmount;
        setTotal(newTotal > 0 ? newTotal : 0);
    }, [subtotal, shippingFee, selectedVoucher]);    

    useEffect(() => {
        fetchProcessingOrder();
        fetchAddress();
    }, [])

    return (
        <div className="min-h-screen bg-[#fdf8f7] font-sans text-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold mb-8 text-center md:text-left">Thanh toán</h1>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-3/5 bg-[#fdf8f7] p-8">
                        <div className="relative flex justify-between mb-12">
                            <div className="absolute top-4 left-0 h-1 bg-gray-400 w-full -z-10"></div>
                            <div
                                className="absolute top-4 left-0 h-1 bg-black -z-10 transition-all duration-500"
                                style={{ width: `${((step - 1) / 2) * 100}%` }}
                            ></div>

                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex flex-col items-center relative">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all duration-300
                                        ${step > i ? 'bg-[#6e7a34] text-white' :
                                            step === i ? 'bg-[#6e7a34] text-white ring-4 ring-blue-100' :
                                                'bg-white text-gray-400 border border-gray-200'}`}>
                                        {step > i ? '✓' : i}
                                    </div>
                                    <span className={`text-xs font-medium mt-2 ${step >= i ? 'text-[#6e7a34]' : 'text-gray-500'}`}>
                                        {i === 1 ? 'Thông tin' : i === 2 ? 'Thanh toán' : 'Xác nhận'}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {step === 1 && (
                            <div className="animate-fadeIn">
                                <h2 className="text-xl font-semibold mb-6">Thông tin giao hàng</h2>

                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="email@example.com"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center mb-4">
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            id="newsletter-checkbox"
                                            onChange={handleCheckboxChange}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                        />
                                        <label htmlFor="newsletter-checkbox" className="ml-2 text-sm font-medium text-gray-900">
                                            Nhận mail xác nhận
                                        </label>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Số điện thoại</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="0901 234 567"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Địa chỉ giao hàng</label>

                                        <div className="space-y-4">
                                            <div className="space-y-3 mb-4">
                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="new-address"
                                                        name="address-type"
                                                        checked={newAddress}
                                                        onChange={() => setNewAddress(true)}
                                                        className="mr-2 h-4 w-4 text-[#b3c27b] focus:ring-[#b3c27b] border-gray-300"
                                                    />
                                                    <label htmlFor="new-address" className="font-medium">Use a new address</label>
                                                </div>

                                                <div className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id="saved-address"
                                                        name="address-type"
                                                        checked={!newAddress}
                                                        onChange={() => setNewAddress(false)}
                                                        className="mr-2 h-4 w-4 text-[#b3c27b] focus:ring-[#b3c27b] border-gray-300"
                                                    />
                                                    <label htmlFor="saved-address" className="font-medium">Use saved address</label>
                                                </div>

                                            </div>

                                            {!newAddress && <div>
                                                <div className="relative">
                                                    <select
                                                        name="address"
                                                        value={
                                                            savedAddresses.find(addr =>
                                                                addr.address === formData.address &&
                                                                addr.apartment === formData.apartment &&
                                                                addr.city === formData.city &&
                                                                addr.province === formData.province &&
                                                                addr.zipCode === formData.zipCode &&
                                                                addr.country === formData.country
                                                            )?.id || ''
                                                        }
                                                        onChange={handleAddressChange}
                                                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all"
                                                    >
                                                        <option value="">Chọn địa chỉ</option>
                                                        {savedAddresses.map(addr => (
                                                            <option key={addr.id} value={addr.id}>
                                                                {formatFullAddress(addr)}
                                                            </option>
                                                        ))}
                                                    </select>

                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>}

                                            {newAddress && (<><div className="grid grid-cols-2 gap-4">
                                                <div className="mb-4">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Country/Region</label>
                                                    <select
                                                        name="country"
                                                        value={formData.country}
                                                        onChange={handleInputChange}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        required
                                                    >
                                                        <option value="">Select a country</option>
                                                        <option value="US">United States</option>
                                                        <option value="VN">Vietnam</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="UK">United Kingdom</option>
                                                        <option value="JP">Japan</option>
                                                        <option value="KR">South Korea</option>
                                                        <option value="OTHER">Other countries</option>
                                                    </select>
                                                </div>
                                            </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
                                                        <input
                                                            type="text"
                                                            name="firstName"
                                                            value={formData.firstName}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
                                                        <input
                                                            type="text"
                                                            name="lastName"
                                                            value={formData.lastName}
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                                                    <input
                                                        type="text"
                                                        name="address"
                                                        value={formData.address}
                                                        placeholder="Enter an address"
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, suite, etc. (optional)</label>
                                                    <input
                                                        type="text"
                                                        name="apartment"
                                                        value={formData.apartment}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        onChange={handleInputChange}
                                                    />
                                                </div>

                                                <div className="grid grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                                        <input
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            placeholder="Enter a city"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
                                                        <select
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            name="province"
                                                            value={formData.province}
                                                            onChange={handleInputChange}
                                                        >
                                                            <option>State / province</option>
                                                            <option>Hồ Chí Minh</option>
                                                            <option>Hà Nội</option>
                                                            <option>Đà Nẵng</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal code</label>
                                                        <input
                                                            type="text"
                                                            name="zipCode"
                                                            value={formData.zipCode}
                                                            placeholder="Enter a ZIP / postal code"
                                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>
                                                </div>

                                                {/* <div className="grid grid-cols-2 gap-4">
                                                </div> */}
                                            </>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="animate-fadeIn">
                                <h2 className="text-xl font-semibold mb-6">Phương thức thanh toán</h2>

                                <div className="flex border-b border-gray-200">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            className={`px-4 py-2 font-medium text-sm focus:outline-none ${formData.paymentMethod === method.id
                                                ? 'text-[#6e7a34] border-b-2 border-[#6e7a34]'
                                                : 'text-gray-500 hover:text-gray-700'
                                                }`}
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, paymentMethod: method.id }));
                                                console.log(formData);
                                            }}
                                        >
                                            {method.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="mt-6">
                                    {formData.paymentMethod === 'credit-card' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
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
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
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
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
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
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={(payment as CardPayment).name}
                                                    onChange={handlePaymentChange}
                                                    placeholder="NGUYEN VAN A"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {formData.paymentMethod === 'paypal' && (
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 text-blue-500 mr-3 mt-1">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-blue-800">Bạn sẽ được chuyển đến PayPal</h3>
                                                    <p className="text-sm text-blue-700 mt-1">
                                                        Sau khi nhấn "Hoàn tất thanh toán", bạn sẽ được chuyển đến trang PayPal để hoàn tất giao dịch.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.paymentMethod === 'momo' && (
                                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 text-purple-500 mr-3 mt-1">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-purple-800">Bạn sẽ được chuyển đến MoMo</h3>
                                                    <p className="text-sm text-purple-700 mt-1">
                                                        Sau khi nhấn "Hoàn tất thanh toán", ứng dụng MoMo sẽ mở để bạn xác nhận thanh toán.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {formData.paymentMethod === 'pay-later' && (
                                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 text-yellow-500 mr-3 mt-1">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-yellow-800">Thanh toán khi nhận hàng</h3>
                                                    <p className="text-sm text-yellow-700 mt-1">
                                                        Tiến hành thanh toán khi đã nhận được hàng.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}


                        {step === 3 && (
                            <div className="animate-fadeIn">
                                <h2 className="text-xl font-semibold mb-6">Xác nhận đơn hàng</h2>

                                <div className="gap-6">
                                    {/* Thông tin giao hàng */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                            <h3 className="font-medium text-lg mb-4 flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                Thông tin giao hàng
                                            </h3>

                                            <div className="space-y-3">
                                                <div className="flex">
                                                    <span className="text-gray-600 w-32">Họ tên:</span>
                                                    <span className="font-medium">{formData.firstName + ' ' + formData.lastName || 'Chưa có thông tin'}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-32">Điện thoại:</span>
                                                    <span className="font-medium">{formData.phone || 'Chưa có thông tin'}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-32">Email:</span>
                                                    <span className="font-medium">{formData.email + (formData.apartment ? ", " + formData.apartment : "") || 'Chưa có thông tin'}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-32">Địa chỉ:</span>
                                                    <span className="font-medium">{formData.address || 'Chưa có thông tin'}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-32">Tỉnh thành:</span>
                                                    <span className="font-medium">{formData.province || 'Chưa có thông tin'}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-32">Zip code:</span>
                                                    <span className="font-medium">{formData.zipCode || 'Chưa có thông tin'}</span>
                                                </div>
                                                <div className="flex">
                                                    <span className="text-gray-600 w-32">Quốc gia:</span>
                                                    <span className="font-medium">{formData.country || 'Chưa có thông tin'}</span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setStep(1)}
                                                className="mt-4 text-sm text-[#8a974c] hover:text-[#6e7a34] flex items-center"
                                            >
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Chỉnh sửa
                                            </button>
                                        </div>

                                        {/* Phương thức thanh toán */}
                                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                            <h3 className="font-medium text-lg mb-4 flex items-center">
                                                <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                                Phương thức thanh toán
                                            </h3>

                                            <div className="flex items-center">
                                                {formData.paymentMethod === 'credit-card' && (
                                                    <>
                                                        <div className="w-10 h-6 bg-gray-200 rounded mr-3"></div>
                                                        <span>Thẻ tín dụng •••• •••• •••• {(payment as CardPayment).number.slice(-4)}</span>
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
                                                        <span>Ví MoMo ({formData.phone})</span>
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
                                                Thay đổi
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}


                        <div className="mt-10 flex justify-between">
                            <button
                                onClick={() => { handlePrevStep() }}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Quay lại
                            </button>

                            {step < 3 ? (
                                <button
                                    onClick={() => {
                                        if (step === 1 && newAddress) {
                                            saveAddress();
                                        }
                                        handleNextStep();
                                    }}
                                    disabled={checkValid()}
                                    className={`px-5 py-2.5 rounded-lg text-white font-medium transition-all flex items-center shadow-sm
                                            ${checkValid()
                                            ? 'bg-gray-400 cursor-not-allowed opacity-70'
                                            : 'bg-[#8a974c] hover:bg-[#6e7a34]'}`}
                                >
                                    Tiếp tục
                                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        console.log(formData);
                                        // alert('Đơn hàng đã được xác nhận!');
                                        handleSubmit();
                                    }}
                                    disabled={false && success !== "success"}
                                    className="px-5 py-2.5 rounded-lg text-white bg-[#8a974c] hover:bg-[#6e7a34] font-medium transition-colors shadow-sm"
                                >
                                    Hoàn tất đơn hàng
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="md:w-2/5 bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
                        <h2 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-100">Đơn hàng của bạn</h2>

                        <div className="border-b border-gray-100 pb-4 mb-4">
                            {cartItems.map((item, index) => (
                                <div key={item.id} className={`flex justify-between py-3 ${index !== 0 ? 'border-t border-gray-50' : ''}`}>
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
                                            <span className="text-gray-500 text-sm">Kích thước: {item.size}</span>
                                            <span className="text-gray-500 text-sm">SL: {item.num}</span>
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
                                <span className="text-gray-600">Tạm tính:</span>
                                <span>{formatCurrency(subtotal)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phí vận chuyển:</span>
                                <span>{formatCurrency(shippingFee)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Mã giảm giá:</span>
                            </div>

                            <div className="flex justify-between">
                                {selectedVoucher && <span><strong>{selectedVoucher.id}</strong> - Giảm {selectedVoucher.discount} {selectedVoucher.type === 'amount'? "VNĐ": "%"}</span>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <input
                                        id="voucherInput"
                                        type="text"
                                        value={voucherCode}
                                        onChange={(e) => setVoucherCode(e.target.value)}
                                        placeholder="Nhập mã voucher..."
                                        className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#8a974c]"
                                    />
                                    <button
                                        onClick={() => { handleGetVoucher(voucherCode) }}
                                        className="bg-[#8a974c] hover:bg-[#6e7a34] text-white px-2 py-2 rounded min-w-[100px]"
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>


                            <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-100">
                                <span>Tổng cộng:</span>
                                <span className="text-[#6e7a34]">{formatCurrency(total)}</span>
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
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    )
}