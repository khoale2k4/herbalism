import React from 'react';
import {
    BookOpen,
    ShoppingBag,
    Truck,
    RefreshCw,
    Shield,
    FileLock,
    Scale,
    AlertTriangle,
    PhoneCall
} from 'lucide-react';

export default function TermsAndConditions() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#3e4f3d] to-[#5a6d59] text-white px-8 py-10">
                    <div className="flex items-center justify-center mb-6">
                        <BookOpen size={48} className="mr-4" />
                        <h1 className="text-4xl font-bold">GENERAL TERMS AND CONDITIONS</h1>
                    </div>
                    <p className="text-center text-[#d1d9d0]">Last updated: April 26, 2017</p>
                </div>

                {/* Introduction */}
                <div className="px-8 py-8 border-b border-gray-200 bg-[#f5f7f5]">
                    <p className="text-lg text-gray-700 text-center italic">
                        These General Terms and Conditions ("Terms") apply to all users of the Herbalism website, including any individuals who browse or make a purchase through our platform.
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="px-8 py-6">
                    <div className="space-y-10">
                        {/* Product Information Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <ShoppingBag size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Product Information</h2>
                                    <p className="text-gray-600 mb-4">
                                        All products on this website are handcrafted by Herbalism and are intended for general food use only. Our products are not classified as pharmaceutical or dietary supplements. The information provided about our products, including descriptions, ingredients, and usage, is for informational purposes only.
                                    </p>
                                    <div className="bg-[#f8f5e8] border-l-4 border-[#e8d78f] p-4 rounded">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <AlertTriangle className="h-5 w-5 text-[#d4b642]" />
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-[#6e5f2a]">
                                                    These products are not intended to diagnose, treat, cure, or prevent any disease. Always consult a healthcare professional before using any of our products, especially if you have any allergies or health conditions.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Ordering and Payment Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <ShoppingBag size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Ordering and Payment</h2>

                                    <div className="bg-[#f5f7f5] rounded-xl p-6 space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">A</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Order Confirmation:</span> Once an order is placed, you will receive an order confirmation email. If any issues arise, we will notify you via email or phone.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">B</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Payment Methods:</span> We accept payments through several methods, including bank transfer, Momo, and cash on delivery (COD). You may select your preferred payment method during the checkout process.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">C</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Price and Payment:</span> All prices listed on the website are in Vietnamese Dong (VND) and are inclusive of applicable taxes. Payment must be made in full before shipment of the products unless using the COD option.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Shipping and Delivery Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <Truck size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Shipping and Delivery</h2>

                                    <div className="bg-[#f5f7f5] rounded-xl p-6 space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">A</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Shipping Area:</span> We only deliver to addresses within Vietnam.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">B</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Shipping Fees:</span> The delivery fee is 30,000 VND for all orders. Additional fees may apply for large or bulky items.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">C</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Delivery Timeframe:</span> Delivery takes between 2 to 7 business days depending on your location. While we aim to deliver within this timeframe, external factors such as weather or courier issues may cause delays.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">D</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Order Tracking:</span> Once your order is shipped, you will receive tracking details via email or SMS.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Return and Refund Policy Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <RefreshCw size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Return and Refund Policy</h2>

                                    <div className="bg-[#f5f7f5] rounded-xl p-6 space-y-4">
                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">A</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Returns:</span> Due to the nature of our handcrafted products, we do not accept returns unless the product is damaged upon arrival. In such cases, please contact us within 48 hours of receiving your order. We will arrange for a refund or replacement after verifying the issue.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center">
                                            <div className="w-8 h-8 bg-[#d8dfd8] rounded-full flex items-center justify-center mr-3">
                                                <span className="font-bold text-[#3e4f3d]">B</span>
                                            </div>
                                            <div>
                                                <p className="text-gray-700">
                                                    <span className="font-semibold">Refunds:</span> Refunds will be processed to the original payment method. In case of payment via COD, a bank transfer will be issued for refunds. If we are unable to fulfill an order due to stock unavailability, we will notify you and issue a full refund.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Privacy and Data Protection Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <Shield size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Privacy and Data Protection</h2>
                                    <p className="text-gray-600 mb-4">
                                        We take your privacy seriously. Personal information collected during your purchase or inquiries will only be used for processing orders and providing customer service. We will not share your personal information with third parties except in cases where it is necessary to fulfill your order or as required by law.
                                    </p>
                                    <div className="bg-[#e8ece8] p-4 rounded-lg">
                                        <p className="text-[#3e4f3d] font-medium">
                                            Please review our <span className="underline cursor-pointer">Privacy Policy</span> for more information on how we handle and protect your data.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Limitation of Liability Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <FileLock size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Limitation of Liability</h2>
                                    <p className="text-gray-600">
                                        Herbalism is not liable for any indirect, special, or consequential damages arising from the use or inability to use our products, including any allergic reactions or health concerns that may arise. It is the responsibility of the customer to ensure that the products are suitable for their needs and free of allergens.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Changes to Terms and Conditions Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <RefreshCw size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Changes to Terms and Conditions</h2>
                                    <p className="text-gray-600">
                                        We reserve the right to modify these Terms and Conditions at any time. Any changes will be posted on this page with an updated "Last updated" date. By continuing to use the website, you agree to be bound by the revised Terms.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Governing Law Section */}
                        <section>
                            <div className="flex items-start mb-4">
                                <div className="bg-[#e8ece8] p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                                    <Scale size={24} className="text-[#3e4f3d]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Governing Law</h2>
                                    <p className="text-gray-600">
                                        These Terms and Conditions shall be governed by and construed in accordance with the laws of Vietnam. Any disputes arising under or in connection with these Terms will be resolved in the courts of Vietnam.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-[#f5f7f5] px-8 py-6 border-t border-gray-200">
                    <div className="flex items-center justify-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm max-w-lg text-center">
                            <div className="flex justify-center mb-4">
                                <div className="bg-[#e8ece8] p-3 rounded-full">
                                    <PhoneCall size={24} className="text-[#3e4f3d]" />
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Have questions about our Terms?</h3>
                            <p className="text-gray-600 mb-4">
                                Our customer service team is here to help you with any questions about our Terms and Conditions.
                            </p>
                            <button className="bg-[#3e4f3d] hover:bg-[#4d5f4c] text-white py-2 px-6 rounded-lg transition-colors duration-200">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-[#f5f7f5] px-8 py-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <p className="text-gray-500 text-sm mb-4 md:mb-0">
                            © {new Date().getFullYear()} Herbalism. All rights reserved.
                        </p>
                        <div className="flex space-x-4">
                            <button className="text-[#3e4f3d] hover:text-[#2d3a2c] transition-colors duration-200">
                                Contact Us
                            </button>
                            <span className="text-gray-300">|</span>
                            <button className="text-[#3e4f3d] hover:text-[#2d3a2c] transition-colors duration-200">
                                Privacy Policy
                            </button>
                            <span className="text-gray-300">|</span>
                            <button className="text-[#3e4f3d] hover:text-[#2d3a2c] transition-colors duration-200">
                                Delivery Policy
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}