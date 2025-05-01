import { useLanguage } from '@/hooks/useLanguage';
import { ProductOperation } from '@/lib/main';
import React, { use, useEffect, useState } from 'react';
import { FiFilter, FiChevronDown, FiChevronUp, FiDollarSign } from 'react-icons/fi';

const Sidebar = () => {
    const { t } = useLanguage();
    const [filters, setFilters] = useState({
        productType: [] as string[],
        wellnessNeed: [] as string[],
        productForm: [] as string[],
        priceRange: [10, 90] as [number, number]
    });
    const productOp = new ProductOperation();

    const [expandedSections, setExpandedSections] = useState({
        productType: true,
        wellnessNeed: true,
        productForm: true,
        priceRange: true
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const handleCheckboxChange = (section: keyof typeof filters, item: string) => {
        setFilters(prev => {
            return {
                ...prev,
                [section]: [item] 
            };
        });
    };
    
    const handlePriceChange = (index: 0 | 1, value: number) => {
        setFilters(prev => {
            const newRange = [...prev.priceRange] as [number, number];
            newRange[index] = value;

            if (index === 0 && value > prev.priceRange[1]) {
                newRange[1] = value;
            } else if (index === 1 && value < prev.priceRange[0]) {
                newRange[0] = value;
            }

            return {
                ...prev,
                priceRange: newRange
            };
        });
    };

    const [filterOptions, setFilterOptions] = useState<{
        productType: string[],
        wellnessNeed: string[],
        productForm: string[]
    }>({ productType: [], wellnessNeed: [], productForm: [] });

    const fetchOptions = async () => {
        const resposne = await productOp.getCategories();
        if (resposne.success) {
            const data = resposne.data;
            setFilterOptions({
                productType: data.types.map((data: any) => { return data.name }),
                wellnessNeed: data.needs.map((data: any) => { return data.name }),
                productForm: data.forms.map((data: any) => { return data.name })
            });
        }
    }

    useEffect(() => {
        fetchOptions();
    }, []);

    return (
        <aside className="w-72 bg-white p-6 shadow-sm rounded-lg border border-gray-100">
            <div className="flex items-center mb-6">
                <FiFilter className="text-green-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">{t.shop.filterProducts}</h2>
            </div>

            {/* Product Type Filter */}
            <div className="mb-6 border-b border-gray-100 pb-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection('productType')}
                >
                    <h3 className="font-semibold text-gray-700">{t.shop.productType}</h3>
                    {expandedSections.productType ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.productType && (
                    <div className="mt-3 space-y-2">
                        {filterOptions.productType.map((type) => (
                            <label key={type} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-green-500 rounded focus:ring-green-500"
                                    checked={filters.productType.includes(type)}
                                    onChange={() => handleCheckboxChange('productType', type)}
                                />
                                <span className="text-gray-600">
                                    {/* {t.shop.productTypes[type.toLowerCase() as keyof typeof t.shop.productTypes]} */}
                                    {type}
                                </span>
                            </label>
                        ))}

                    </div>
                )}
            </div>

            {/* Wellness Need Filter */}
            <div className="mb-6 border-b border-gray-100 pb-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection('wellnessNeed')}
                >
                    <h3 className="font-semibold text-gray-700">{t.shop.wellnessNeed}</h3>
                    {expandedSections.wellnessNeed ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.wellnessNeed && (
                    <div className="mt-3 space-y-2">
                        {filterOptions.wellnessNeed.map((need) => (
                            <label key={need} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-green-500 rounded focus:ring-green-500"
                                    checked={filters.wellnessNeed.includes(need)}
                                    onChange={() => handleCheckboxChange('wellnessNeed', need)}
                                />
                                <span className="text-gray-600">
                                    {/* {t.shop.wellnessNeeds[need.toLowerCase() as keyof typeof t.shop.wellnessNeeds]} */}
                                    {need}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Form Filter */}
            <div className="mb-6 border-b border-gray-100 pb-4">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection('productForm')}
                >
                    <h3 className="font-semibold text-gray-700">{t.shop.productForm}</h3>
                    {expandedSections.productForm ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.productForm && (
                    <div className="mt-3 space-y-2">
                        {filterOptions.productForm.map((form) => (
                            <label key={form} className="flex items-center space-x-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-green-500 rounded focus:ring-green-500"
                                    checked={filters.productForm.includes(form)}
                                    onChange={() => handleCheckboxChange('productForm', form)}
                                />
                                <span className="text-gray-600">
                                    {/* {t.shop.productForms[form.toLowerCase() as keyof typeof t.shop.productForms]}*/}
                                    {form}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
                <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection('priceRange')}
                >
                    <h3 className="font-semibold text-gray-700">{t.shop.priceRange}</h3>
                    {expandedSections.priceRange ? <FiChevronUp /> : <FiChevronDown />}
                </div>

                {expandedSections.priceRange && (
                    <div className="mt-4">
                        <div className="flex items-center mb-2">
                            <FiDollarSign className="text-gray-400 mr-1" />
                            <span className="text-gray-600">
                                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                            </span>
                        </div>

                        <div className="relative h-8">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={filters.priceRange[0]}
                                onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
                                className="absolute w-full appearance-none h-1 bg-gray-300 rounded-full pointer-events-none"
                                style={{ zIndex: 3 }}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                step="5"
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                                className="absolute w-full appearance-none h-1 bg-gray-300 rounded-full pointer-events-none"
                                style={{ zIndex: 4 }}
                            />

                            <div className="relative h-1">
                                <div
                                    className="absolute h-1 bg-green-500 rounded-full"
                                    style={{
                                        left: `${filters.priceRange[0]}%`,
                                        right: `${100 - filters.priceRange[1]}%`
                                    }}
                                ></div>
                            </div>
                        </div>

                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>$0</span>
                            <span>$100</span>
                        </div>
                    </div>
                )}
            </div>

            <button
                className="w-full py-2 bg-[#3e4f3d] hover:bg-[#747c61] text-white rounded-md transition-colors"
                onClick={() => console.log('Applied filters:', filters)}
            >
                {t.shop.applyFilters}
            </button>
        </aside>
    );
};

export default Sidebar;