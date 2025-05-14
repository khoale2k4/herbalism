'use client';

import React from 'react';
import { Shield, User, Share2, Edit3, Lock, AlertTriangle, PhoneCall } from 'lucide-react';
import { useRouter } from 'next/navigation';
import ContactSection from '../components/Contact';

export default function PrivacyPolicy() {
    const router = useRouter();
    return (
        <main className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#3e4f3d] to-[#5a6d59] text-white px-8 py-10">
                    <div className="flex items-center justify-center mb-6">
                        <Shield size={48} className="mr-4" />
                        <h1 className="text-4xl font-bold">PRIVACY POLICY</h1>
                    </div>
                    <p className="text-center text-green-100">Last updated: April 26, 2017</p>
                </div>

                {/* Introduction */}
                <div className="px-8 py-8 border-b border-gray-200 bg-[#f5f7f5]">
                    <p className="text-lg text-gray-700">
                        We are committed to respecting and protecting the privacy of our customers when they access
                        and use the services provided on Herbalism's website.
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="px-8 py-6">
                    <div className="space-y-10">
                        {/* Section 1 */}
                        <section>
                            <div className="flex items-center mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4">
                                    <User size={24} className="text-[#3e4f3d]" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">1. Purpose of Collecting Personal Information</h2>
                            </div>
                            <p className="text-gray-600 pl-12">
                                To provide the best support, service, and customer care, we may ask you to provide certain personal
                                information such as your full name, phone number, email address, etc. Providing this information is
                                completely voluntary; however, you must ensure that all provided information is accurate, complete,
                                and lawful. We are not responsible for any issues arising from the submission of false or misleading
                                information.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <div className="flex items-center mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4">
                                    <Lock size={24} className="text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">2. Scope of Use of Personal Information</h2>
                            </div>
                            <div className="text-gray-600 pl-12">
                                <p className="mb-4">
                                    Collected personal information will be used strictly for internal purposes, including but not limited to:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mb-4">
                                    <li>Contacting you for support or consultation;</li>
                                    <li>Sending product updates and promotional offers;</li>
                                    <li>Improving service quality and user experience;</li>
                                    <li>Processing payments, deliveries, and after-sales support.</li>
                                </ul>
                                <p>
                                    We are committed to using your personal information only for appropriate purposes and in compliance
                                    with applicable laws.
                                </p>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <div className="flex items-center mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4">
                                    <Share2 size={24} className="text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">3. Sharing of Personal Information</h2>
                            </div>
                            <div className="text-gray-600 pl-12">
                                <p className="mb-4">
                                    We do not disclose your personal information to any third parties except in the following cases:
                                </p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>With your explicit consent;</li>
                                    <li>At the request of competent legal authorities in accordance with the law;</li>
                                    <li>When necessary to protect Herbalism's legitimate rights under the law;</li>
                                    <li>When working with partners to conduct market research – these third parties are bound by confidentiality
                                        agreements and may only use the information within the agreed scope of work.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <div className="flex items-center mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4">
                                    <Edit3 size={24} className="text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">4. Access and Modification of Personal Information</h2>
                            </div>
                            <p className="text-gray-600 pl-12">
                                You have the right to access, update, or request changes to your personal information at any time
                                through the contact methods provided on our website.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <div className="flex items-center mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4">
                                    <Shield size={24} className="text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">5. Protection of Personal Information</h2>
                            </div>
                            <p className="text-gray-600 pl-12">
                                We implement various technical and security measures to ensure your personal information is not accessed,
                                used, or disclosed without authorization. You are also advised to safeguard your account information
                                (if applicable), avoid sharing passwords, and log out after use, especially when accessing the website
                                from public or shared devices.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <div className="flex items-center mb-4">
                                <div className="bg-[#e4ebe3] p-2 rounded-full mr-4">
                                    <AlertTriangle size={24} className="text-emerald-600" />
                                </div>
                                <h2 className="text-2xl font-semibold text-gray-800">6. Changes to This Policy</h2>
                            </div>
                            <p className="text-gray-600 pl-12">
                                This Privacy Policy may be updated from time to time to reflect operational needs or legal requirements.
                                When changes occur, we will update the "Last updated" date at the top of this document. This policy
                                applies only to the official Herbalism website and does not cover any third-party websites or
                                advertisements linked from our site.
                            </p>
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
                                className="text-[#3e4f3d] hover:text-[#d4b642] transition-colors duration-200"
                            >
                                Continue Shopping
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => router.push('/delivery-policy')}
                                className="text-[#3e4f3d] hover:text-[#d4b642] transition-colors duration-200"
                            >
                                Delivery Policy
                            </button>
                            <span className="text-gray-300">|</span>
                            <button
                                onClick={() => router.push('/terms-of-service')}
                                className="text-[#3e4f3d] hover:text-[#d4b642] transition-colors duration-200"
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