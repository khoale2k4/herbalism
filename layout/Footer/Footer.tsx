'use client';

import React, { useState } from 'react';
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '@/hooks/useLanguage';
import { MailOperation } from '@/lib/main';

const Footer = () => {
    const { t } = useLanguage();
    const [mail, setMail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const mailOp = new MailOperation();

    const handleAddmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const response = await mailOp.addMail(mail);
        if (response.success) {
            setIsSuccess(true);
            setMail('');
            setTimeout(() => setIsSuccess(false), 3000); // Hide success after 3 seconds
        }
        setIsSubmitting(false);
    }

    return (
        <footer className="bg-[#3e4f3d] text-white py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Left section */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                                {t.footer.join}
                            </h2>
                            <p className="text-green-100 mb-6">
                                {t.footer.stayConnect}
                            </p>
                        </div>
                        <form onSubmit={handleAddmail} className="relative">
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder={t.footer.enterEmail}
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                    required
                                    className="flex-grow px-4 py-3 text-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#9bb53d]"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`px-6 py-3 ${isSuccess ? 'bg-[#4caf50]' : 'bg-[#9bb53d] hover:bg-[#b1c859]'} transition-all rounded-r-lg flex items-center`}
                                >
                                    {isSubmitting ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : isSuccess ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {isSuccess && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#4caf50] animate-fade-in-out"></div>
                            )}
                        </form>
                        {isSuccess && (
                            <p className="text-[#cce2a3] text-sm animate-fade-in">
                                {t.footer.subscribeSuccess}
                            </p>
                        )}
                    </div>

                    {/* Right section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Legal Links */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-[#cce2a3]">{t.footer.legal}</h3>
                            <ul className="space-y-2">
                                {[t.footer.info.privacyPolicy, t.footer.info.shippingPolicy, t.footer.info.termsOfService].map((link) => (
                                    <li key={link}>
                                        <a
                                            href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="text-[#e8f3d2] hover:text-white transition-colors text-sm"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-[#cce2a3]">{t.footer.contact}</h3>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.facebook.com/herbalismvietnam"
                                    className="text-[#e8f3d2] hover:text-white transition-colors"
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF />
                                </a>
                                <a
                                    href="https://www.instagram.com/herbalism.vietnam/"
                                    className="text-[#e8f3d2] hover:text-white transition-colors"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="mailto:herbalismspagyric@gmail.com"
                                    className="text-[#e8f3d2] hover:text-white transition-colors"
                                    aria-label="Email"
                                >
                                    <FaEnvelope />
                                </a>
                            </div>
                            <div className="flex items-center h-[32px] w-[120px] relative mt-10">
                                <img
                                    src="/img/logo-with-word.png"
                                    alt="Logo"
                                    className="object-contain h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Disclaimer Section */}
                <div className="mb-8 text-sm text-[#cce2a3] leading-relaxed">
                    {t.footer.description}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#8ba655] pt-8 text-center">
                    <div className="mb-4">
                        <p className="text-[#cce2a3] text-sm">
                            {t.footer.copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
