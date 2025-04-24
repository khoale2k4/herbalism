import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#5c652c] text-white py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Left section */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                                Join Our Community
                            </h2>
                            <p className="text-green-100 mb-6">
                                Stay connected with herbal education, wellness insights, and exclusive offers.
                            </p>
                        </div>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-grow px-4 py-3 text-gray-800 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#9bb53d]"
                            />
                            <button className="px-6 py-3 bg-[#9bb53d] hover:bg-[#b1c859] transition-colors rounded-r-lg flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Right section */}
                    <div className="grid grid-cols-3 gap-6">
                        {[
                            {
                                title: 'COMPANY',
                                links: [
                                    'About Us',
                                    'Our Impact',
                                    'Our Mushrooms',
                                    'Work With Us',
                                    'Contact',
                                    'Help Center',
                                    'FAQs',
                                ],
                            },
                            {
                                title: 'INFO',
                                links: [
                                    'Retail Locations',
                                    'Wholesale',
                                    'Rewards Program',
                                    'Refund Policy',
                                    'Shipping Policy',
                                    'Privacy Policy',
                                    'Terms of Service',
                                ],
                            },
                            {
                                title: 'LEARN',
                                links: ['Mushrooms 101', 'Webinars', 'Recipes', 'Blog'],
                            },
                        ].map((section) => (
                            <div key={section.title}>
                                <h3 className="text-lg font-semibold mb-4 text-[#cce2a3]">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
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
                        ))}
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-[#8ba655] pt-8 text-center">
                    <div className="mb-4">
                        <p className="text-[#cce2a3] text-sm">
                            © 2025 Harmonic Arts. Providing plant medicine with purpose since 2009.
                        </p>
                    </div>
                    <div>
                        <p className="text-[#d9efb1] text-xs">
                            On{' '}
                            <a href="https://www.shopify.com" className="underline hover:text-white">
                                Shopify
                            </a>{' '}
                            by{' '}
                            <a href="https://www.voltage.com" className="underline hover:text-white">
                                Voltage
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
