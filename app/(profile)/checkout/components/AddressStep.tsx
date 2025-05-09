'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { Address, CheckoutFormData } from '@/types/checkout';
import React, { useEffect } from 'react';

type AddressStepProps = {
    formData: CheckoutFormData;
    savedAddresses: Address[];
    newAddress: boolean;
    isChecked: boolean;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddressChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCheckboxChange: () => void;
    setNewAddress: (value: boolean) => void;
    formatFullAddress: (addr: Address) => string;
};

const AddressStep: React.FC<AddressStepProps> = ({
    formData,
    savedAddresses,
    newAddress,
    isChecked,
    handleInputChange,
    handleAddressChange,
    handleCheckboxChange,
    setNewAddress,
    formatFullAddress,
}) => {
    const { t } = useLanguage();

    useEffect(() => {
        if (savedAddresses.length === 0) {
            setNewAddress(true);
        }
    }, [savedAddresses])
    return (
        <div className="animate-fadeIn">
            <h2 className="text-xl font-semibold mb-6">{t.paymentPage.addressStep.title}</h2>

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
                        {t.paymentPage.addressStep.newsletterCheckbox}
                    </label>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.paymentPage.addressStep.phoneLabel}</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.paymentPage.addressStep.addressLabel}</label>

                    <div className="space-y-4">
                        {savedAddresses.length > 0 && <div className="space-y-3 mb-4">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="new-address"
                                    name="address-type"
                                    checked={newAddress}
                                    onChange={() => setNewAddress(true)}
                                    className="mr-2 h-4 w-4 text-[#b3c27b] focus:ring-[#b3c27b] border-gray-300"
                                />
                                <label htmlFor="new-address" className="font-medium">{t.paymentPage.addressStep.newAddressOption}</label>
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
                                <label htmlFor="saved-address" className="font-medium">{t.paymentPage.addressStep.savedAddressOption}</label>
                            </div>

                        </div>}

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
                                    <option value="">{t.paymentPage.addressStep.selectAddressPlaceholder}</option>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.countryLabel}</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">{t.paymentPage.addressStep.countryPlaceholder}</option>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.firstNameLabel}</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.lastNameLabel}</label>
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.addressLabel}</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    placeholder={t.paymentPage.addressStep.addressPlaceholder}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.apartmentLabel}</label>
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
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.cityLabel}</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        placeholder={t.paymentPage.addressStep.cityPlaceholder}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.provinceLabel}</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="province"
                                        value={formData.province}
                                        onChange={handleInputChange}
                                    >
                                        <option>{t.paymentPage.addressStep.provinceLabel}</option>
                                        {
                                            t.paymentPage.provinces.map((province: string) => {
                                                return (<option key={province}>{province}</option>);
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.paymentPage.addressStep.zipCodeLabel}</label>
                                    <input
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        placeholder={t.paymentPage.addressStep.zipCodePlaceholder}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressStep;