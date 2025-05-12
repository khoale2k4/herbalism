'use client';

import React from 'react';
import {
    Truck,
    Clock,
    CreditCard,
    MapPin,
    DollarSign,
    CheckSquare,
    PhoneCall
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ContactSection from '../components/Contact';

export default function DeliveryPolicy() {
    const router = useRouter();

    return (
        <main className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#3e4f3d] to-[#2f3c2f] text-white px-8 py-10">
                    <div className="flex items-center justify-center mb-6">
                        <Truck size={48} className="mr-4" />
                        <h1 className="text-4xl font-bold">DELIVERY POLICY</h1>
                    </div>
                    <p className="text-center text-green-100">Last updated: April 26, 2017</p>
                </div>

                {/* Introduction */}
                <div className="px-8 py-8 border-b border-gray-200 bg-[#f5f7f5]">
                    <p className="text-lg text-gray-700 text-center italic">
                        Herbalism is committed to providing reliable and efficient delivery services for all your herbal product needs.
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="px-8 py-6">
                    <div className="space-y-10">
                        {/* Delivery Area Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4">
                                    <MapPin size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Delivery Area</h2>
                                    <p className="text-gray-600">
                                        We currently offer delivery services <span className="font-semibold">within Vietnam</span> only.
                                        We do not provide international shipping at this time.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Delivery Timeframe Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <Clock size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Delivery Timeframe</h2>
                                    <p className="text-gray-600">
                                        Once your order is confirmed, the delivery will typically take <span className="font-semibold">2-7 business days</span>.
                                        Delivery times may vary based on the delivery location, as well as other factors such as weather conditions,
                                        public holidays, or peak periods. We strive to ensure your order arrives as quickly as possible.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Shipping Fee Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <DollarSign size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Shipping Fee</h2>
                                    <p className="text-gray-600">
                                        A standard <span className="font-semibold">shipping fee of 30,000 VND</span> will be applied to all orders within Vietnam.
                                        This fee will be calculated and added to your total during the checkout process.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Payment Methods Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <CreditCard size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Payment Methods</h2>
                                    <p className="text-gray-600 mb-4">
                                        We offer multiple payment options for your convenience:
                                    </p>

                                    <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">1</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Cash on Delivery (COD):</span> You can choose to pay in cash upon receiving the delivery.
                                                    Please ensure you have the exact amount ready, as the delivery driver may not have change.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">2</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Bank Transfer:</span> You can transfer the payment directly to our bank account.
                                                    The details will be provided during the checkout process.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">3</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Momo:</span> You can also pay via the Momo app.
                                                    The details will be available at checkout for your convenience.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Order Confirmation Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <CheckSquare size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">Order Confirmation</h2>
                                    <p className="text-gray-600">
                                        After you place your order, you will receive a confirmation email or SMS with the details of your purchase and delivery information.
                                        If there are any delays or issues with your order, we will notify you promptly.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <ContactSection />

                {/* Footer */}
                <div className="bg-[#f5f7f5] px-8 py-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} Herbalism. All rights reserved.
                        </p>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => router.push('/')}
                                className="text-[#3e4f3d] hover:text-[#2d3a2c] transition-colors duration-200"
                            >
                                Continue Shopping
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => router.push('/privacy-policy')}
                                className="text-[#3e4f3d] hover:text-[#2d3a2c] transition-colors duration-200"
                            >
                                Privacy Policy
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => router.push('/terms-of-service')}
                                className="text-[#3e4f3d] hover:text-[#2d3a2c] transition-colors duration-200"
                            >
                                Terms and Conditions
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}