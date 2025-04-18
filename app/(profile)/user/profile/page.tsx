'use client';

import { useState } from 'react';
import { countries } from '@/lib/countries';
import { Check, Edit, MapPin, Plus, X } from 'lucide-react';

interface Address {
    id: string;
    country: string;
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    apartment?: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
    isDefault?: boolean;
}

const UserProfile = () => {
    const [name, setName] = useState("");
    const [email] = useState("levodangkhoatg2@gmail.com");
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isEditingName, setIsEditingName] = useState(false);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [newAddress, setNewAddress] = useState<Omit<Address, 'id'>>({
        country: '',
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
        isDefault: false,
    });
    const isFormValid = newAddress.country && newAddress.address && newAddress.firstName && newAddress.lastName;  

    const handleSaveName = () => {
        setIsEditingName(false);
        // Gọi API lưu tên ở đây nếu cần
    };

    const handleAddAddress = () => {
        const newId = Date.now().toString();
        setAddresses([...addresses, { ...newAddress, id: newId }]);
        setShowAddressModal(false);
        setNewAddress({
            country: '',
            firstName: '',
            lastName: '',
            company: '',
            address: '',
            apartment: '',
            city: '',
            province: '',
            postalCode: '',
            phone: '',
            isDefault: false,
        });
        // Gọi API lưu địa chỉ ở đây nếu cần
    };

    const handleSetDefault = (id: string) => {
        setAddresses(
            addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
        // Gọi API cập nhật địa chỉ mặc định ở đây nếu cần
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6 transition-all hover:shadow-md">
                <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-3">Thông tin cá nhân</h2>
                <div className="space-y-5">
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm text-gray-500">Họ tên</span>
                        {isEditingName ? (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="border border-gray-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent"
                                />
                                <button
                                    onClick={handleSaveName}
                                    className="bg-[#60641c] text-white p-2 rounded-lg hover:bg-opacity-90 transition-colors"
                                >
                                    <Check size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center group">
                                <p className="text-lg font-medium text-gray-800">{name}</p>
                                <button
                                    onClick={() => setIsEditingName(true)}
                                    className="text-gray-400 hover:text-[#60641c] ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Edit size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-sm text-gray-500">Email</span>
                        <p className="text-gray-800">{email}</p>
                    </div>
                </div>
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
                <div className="flex justify-between items-center mb-6 border-b pb-3">
                    <h2 className="text-xl font-semibold text-gray-800">Địa chỉ của bạn</h2>
                    <button
                        onClick={() => setShowAddressModal(true)}
                        className="bg-[#60641c] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} /> Thêm địa chỉ
                    </button>
                </div>

                {addresses.length === 0 ? (
                    <div className="text-center py-8">
                        <MapPin size={40} className="mx-auto text-gray-300 mb-3" />
                        <p className="text-gray-500">Bạn chưa có địa chỉ nào</p>
                        <button
                            onClick={() => setShowAddressModal(true)}
                            className="mt-4 text-[#60641c] hover:text-opacity-80 font-medium"
                        >
                            Thêm địa chỉ mới
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {addresses.map((address) => (
                            <div
                                key={address.id}
                                className={`border rounded-xl p-5 relative transition-all ${address.isDefault
                                    ? 'border-[#60641c] bg-[#f8f9ed] hover:shadow-md'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                    }`}
                            >
                                {address.isDefault && (
                                    <span className="absolute top-3 right-3 bg-[#60641c] text-white text-xs px-2 py-1 rounded-full font-medium">
                                        Mặc định
                                    </span>
                                )}
                                <div className="mb-4 pt-2">
                                    <p className="font-medium text-gray-800 text-lg">
                                        {address.firstName} {address.lastName}
                                    </p>
                                    {address.company && <p className="text-gray-600 text-sm mt-1">{address.company}</p>}
                                </div>
                                <div className="space-y-1 text-gray-600">
                                    <p>{address.address}</p>
                                    {address.apartment && <p>{address.apartment}</p>}
                                    <p>
                                        {address.city}, {address.province}, {address.postalCode}
                                    </p>
                                    <p>{countries.find((c) => c.code === address.country)?.name}</p>
                                    <p className="pt-1 font-medium">{address.phone}</p>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-100 flex space-x-4">
                                    {!address.isDefault && (
                                        <button
                                            onClick={() => handleSetDefault(address.id)}
                                            className="text-[#60641c] hover:text-opacity-80 text-sm font-medium"
                                        >
                                            Đặt làm mặc định
                                        </button>
                                    )}
                                    <button className="text-[#60641c] hover:text-opacity-80 text-sm font-medium flex items-center gap-1">
                                        <Edit size={14} /> Chỉnh sửa
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Popup thêm địa chỉ */}

            {showAddressModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
                    <div
                        className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-fadeIn"
                        style={{ animation: 'fadeIn 0.3s ease-out' }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Thêm địa chỉ mới</h3>
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="text-gray-400 hover:text-gray-600 rounded-full p-1 hover:bg-gray-100 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1.5">Quốc gia</label>
                                <select
                                    value={newAddress.country}
                                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                >
                                    <option value="">Chọn quốc gia</option>
                                    {countries.map((country) => (
                                        <option key={country.code} value={country.code}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Họ</label>
                                    <input
                                        type="text"
                                        value={newAddress.lastName}
                                        onChange={(e) => setNewAddress({ ...newAddress, lastName: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                        placeholder="Nguyễn"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Tên</label>
                                    <input
                                        type="text"
                                        value={newAddress.firstName}
                                        onChange={(e) => setNewAddress({ ...newAddress, firstName: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                        placeholder="Văn A"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                    Công ty <span className="text-gray-400 font-normal">(tùy chọn)</span>
                                </label>
                                <input
                                    type="text"
                                    value={newAddress.company}
                                    onChange={(e) => setNewAddress({ ...newAddress, company: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                    placeholder="Tên công ty"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1.5">Địa chỉ</label>
                                <input
                                    type="text"
                                    value={newAddress.address}
                                    onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                    placeholder="Số nhà, tên đường"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1.5">
                                    Căn hộ, số phòng <span className="text-gray-400 font-normal">(tùy chọn)</span>
                                </label>
                                <input
                                    type="text"
                                    value={newAddress.apartment}
                                    onChange={(e) => setNewAddress({ ...newAddress, apartment: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                    placeholder="Căn hộ, tầng, tòa nhà"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Thành phố</label>
                                    <input
                                        type="text"
                                        value={newAddress.city}
                                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                        placeholder="Thành phố"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Tỉnh/Thành phố</label>
                                    <input
                                        type="text"
                                        value={newAddress.province}
                                        onChange={(e) => setNewAddress({ ...newAddress, province: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                        placeholder="Tỉnh"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Mã bưu điện</label>
                                    <input
                                        type="text"
                                        value={newAddress.postalCode}
                                        onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                        placeholder="Mã bưu điện"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-1.5">Số điện thoại</label>
                                    <input
                                        type="text"
                                        value={newAddress.phone}
                                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#60641c] focus:border-transparent text-gray-700"
                                        placeholder="Số điện thoại"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center mt-4">
                                <input
                                    type="checkbox"
                                    id="defaultAddress"
                                    checked={newAddress.isDefault}
                                    onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                                    className="h-4 w-4 accent-[#60641c] rounded"
                                />
                                <label htmlFor="defaultAddress" className="ml-2 text-sm text-gray-700">
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowAddressModal(false)}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleAddAddress}
                                disabled={!isFormValid}
                                className={`px-5 py-2.5 rounded-lg text-white font-medium text-sm transition-colors ${isFormValid ? 'bg-[#60641c] hover:bg-opacity-90' : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                Lưu địa chỉ
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;