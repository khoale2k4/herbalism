'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressSteps from './components/ProgressSteps';
import AddressStep from './components/AddressStep';
import PaymentStep from './components/PaymentStep';
import ReviewStep from './components/ReviewStep';
import OrderSummary from './components/OrderSummary';
import { CartOperation, CustomerOperation, OrderOperation, VoucherOperation } from '@/lib/main';
import { getTokenFromCookie } from '@/app/utils/token';
import { Address, CardPayment, ItemInCart, MomoPayment, PaypalPayment, Voucher } from '@/types/checkout';
import { useLanguage } from '@/hooks/useLanguage';

const CheckoutPage: React.FC = () => {
    const { t } = useLanguage();
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

    const paymentMethods = t.paymentPage.paymentMethods;

    const [subtotal, setSubtotal] = useState(0);
    const [shippingFee, setShippingFee] = useState<number>(0);
    const [total, setTotal] = useState(0);
    const calculateFee = async () => {
        const newSubtotal = cartItems.reduce((sum, item) => sum + (item.price * item.num), 0);
        setSubtotal(newSubtotal);

        const feeResponse = await orderOp.getFee();
        if (feeResponse.success) {
            setShippingFee(feeResponse.data);
        } else {
            setShippingFee(0);
        }
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
            city: formData.city,
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
                <h1 className="text-3xl font-bold mb-8 text-center md:text-left">
                    {t.paymentPage.pageTitle}
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-3/5 bg-[#fdf8f7] p-8">
                        <ProgressSteps step={step} steps={[t.paymentPage.progressSteps.step1, t.paymentPage.progressSteps.step2, t.paymentPage.progressSteps.step3]} />

                        {step === 1 && (
                            <AddressStep
                                formData={formData}
                                savedAddresses={savedAddresses}
                                newAddress={newAddress}
                                isChecked={isChecked}
                                handleInputChange={handleInputChange}
                                handleAddressChange={handleAddressChange}
                                handleCheckboxChange={handleCheckboxChange}
                                setNewAddress={setNewAddress}
                                formatFullAddress={formatFullAddress}
                            />
                        )}

                        {step === 2 && (
                            <PaymentStep
                                paymentMethods={paymentMethods}
                                selectedMethod={formData.paymentMethod}
                                payment={payment}
                                handlePaymentChange={handlePaymentChange}
                                setFormData={setFormData}
                            />
                        )}

                        {step === 3 && (
                            <ReviewStep
                                formData={formData}
                                paymentMethods={paymentMethods}
                                payment={payment}
                                setStep={setStep}
                            />
                        )}

                        {/* Navigation buttons */}
                        <div className="mt-10 flex justify-between">
                            <button
                                onClick={() => { handlePrevStep() }}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                {t.paymentPage.common.backButton}
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
                                    {t.paymentPage.common.continueButton}
                                    <svg className="w-4 h-4 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        console.log(formData);
                                        handleSubmit();
                                    }}
                                    disabled={false && success !== "success"}
                                    className="px-5 py-2.5 rounded-lg text-white bg-[#8a974c] hover:bg-[#6e7a34] font-medium transition-colors shadow-sm"
                                >
                                    {t.paymentPage.common.completeOrderButton}
                                </button>
                            )}
                        </div>
                    </div>

                    <OrderSummary
                        cartItems={cartItems}
                        subtotal={subtotal}
                        shippingFee={shippingFee}
                        total={total}
                        selectedVoucher={selectedVoucher}
                        voucherCode={voucherCode}
                        setVoucherCode={setVoucherCode}
                        handleGetVoucher={handleGetVoucher}
                        formData={formData}
                        paymentMethods={paymentMethods}
                        step={step}
                        formatCurrency={formatCurrency}
                    />
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;