import { useState } from "react";
import { PhoneCall, Mail, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";

const ContactSection = () => {
    const [showSocial, setShowSocial] = useState(false);

    const toggleSocial = () => {
        setShowSocial(!showSocial);
    };

    return (
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
                    <button
                        onClick={toggleSocial}
                        className="bg-[#3e4f3d] hover:bg-[#4d5f4c] text-white py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                        Contact Support
                    </button>

                    {/* Social Media Section - Appears only when button is clicked */}
                    {showSocial && (
                        <div className="mt-6 pt-4 border-t border-gray-200 animate-fade-in">
                            <p className="text-sm text-gray-500 mb-3">Connect with us on social media:</p>
                            <div className="flex justify-center space-x-4">
                                <a
                                    href="https://www.facebook.com/herbalismvietnam"
                                    className="text-[#3e4f3d] hover:text-[#d4b642] transition-colors"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook />
                                </a>
                                <a
                                    href="https://www.instagram.com/herbalism.vietnam/"
                                    className="text-[#3e4f3d] hover:text-[#d4b642] transition-colors"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram />
                                </a>
                                <a
                                    href="mailto:herbalismspagyric@gmail.com"
                                    className="text-[#3e4f3d] hover:text-[#d4b642] transition-colors"
                                    aria-label="Email"
                                >
                                    <FaEnvelope />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactSection;