import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, X, Search } from 'lucide-react';

export interface DropdownOption {
    value: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
    disabled?: boolean;
}

export interface DropdownProps {
    // Core props
    options: DropdownOption[];
    selectedValue?: string;
    onSelect: (value: string) => void;
    placeholder?: string;

    // Styling
    className?: string;
    buttonClassName?: string;
    menuClassName?: string;
    optionClassName?: string;
    selectedClassName?: string;

    // Behavior
    align?: 'left' | 'right';
    disabled?: boolean;
    closeOnSelect?: boolean;

    // Features
    showSearch?: boolean;
    searchPlaceholder?: string;
    clearable?: boolean;
    multiple?: boolean;
    selectedValues?: string[];
    onSelectMultiple?: (values: string[]) => void;

    // Customization
    renderOption?: (option: DropdownOption, isSelected: boolean) => React.ReactNode;
    renderSelectedValue?: (selectedOptions: DropdownOption[]) => React.ReactNode;

    // Misc
    maxHeight?: number;
    minWidth?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'outline' | 'filled' | 'underline';
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    selectedValue,
    onSelect,
    placeholder = 'Chọn một tùy chọn',

    className = '',
    buttonClassName = '',
    menuClassName = '',
    optionClassName = '',
    selectedClassName = '',

    align = 'left',
    disabled = false,
    closeOnSelect = true,

    showSearch = false,
    searchPlaceholder = 'Tìm kiếm...',
    clearable = false,
    multiple = false,
    selectedValues = [],
    onSelectMultiple,

    renderOption,
    renderSelectedValue,

    maxHeight = 250,
    minWidth,
    size = 'md',
    variant = 'outline',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Find selected option(s)
    const selectedOption = options.find(opt => opt.value === selectedValue);
    const selectedOptions = multiple
        ? options.filter(opt => selectedValues.includes(opt.value))
        : selectedOption ? [selectedOption] : [];

    // Filter options based on search term
    const filteredOptions = searchTerm
        ? options.filter(opt =>
            opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (opt.description && opt.description.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        : options;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && showSearch && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [isOpen, showSearch]);

    // Handle selection
    const handleSelect = (value: string) => {
        if (multiple) {
            const newSelectedValues = selectedValues.includes(value)
                ? selectedValues.filter(v => v !== value)
                : [...selectedValues, value];

            onSelectMultiple?.(newSelectedValues);

            if (!closeOnSelect) {
                // Focus back on search input after selection in multiple mode
                setTimeout(() => {
                    searchInputRef.current?.focus();
                }, 10);
            }
        } else {
            onSelect(value);
        }

        if (closeOnSelect && !multiple) {
            setIsOpen(false);
        }
    };

    // Handle clearing selection
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
            onSelectMultiple?.([]);
        } else {
            onSelect('');
        }
    };

    // Toggle dropdown
    const toggleDropdown = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setSearchTerm('');
            }
        }
    };

    // Size classes
    const sizeClasses = {
        button: {
            sm: 'px-2.5 py-1 text-xs',
            md: 'px-3 py-2 text-sm',
            lg: 'px-4 py-2.5 text-base',
        },
        option: {
            sm: 'px-2.5 py-1 text-xs',
            md: 'px-3 py-2 text-sm',
            lg: 'px-4 py-2.5 text-base',
        }
    };

    // Variant classes
    const variantClasses = {
        outline: 'border border-gray-200 rounded-lg hover:border-gray-300',
        filled: 'bg-gray-100 border border-gray-100 rounded-lg hover:bg-gray-200',
        underline: 'border-b-2 border-gray-200 rounded-none hover:border-gray-300',
    };

    return (
        <div
            ref={dropdownRef}
            className={`relative ${className}`}
            style={{ width: '100%' }}
        >
            {/* Dropdown trigger button */}
            <button
                type="button"
                className={`flex items-center justify-between w-full ${sizeClasses.button[size]} bg-green-800 transition-all duration-200
          ${variantClasses[variant]}
          ${isOpen ? 'ring-2 ring-green-500 border-green-500' : ''}
          ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-70' : 'cursor-pointer'}
          ${buttonClassName}`}
                onClick={toggleDropdown}
                disabled={disabled}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <div className="flex items-center truncate">
                    {renderSelectedValue ? (
                        renderSelectedValue(selectedOptions)
                    ) : (
                        <>
                            {multiple ? (
                                selectedOptions.length > 0 ? (
                                    <div className="flex flex-wrap gap-1 max-w-full">
                                        {selectedOptions.length <= 2 ? (
                                            selectedOptions.map(option => (
                                                <div
                                                    key={option.value}
                                                    className="flex items-center bg-green-100 text-green-800 rounded px-2 py-0.5 text-xs"
                                                >
                                                    {option.icon && <span className="mr-1">{option.icon}</span>}
                                                    <span className="truncate max-w-[100px]">{option.label}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-gray-700">{selectedOptions.length} tùy chọn đã chọn</div>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-gray-500">{placeholder}</span>
                                )
                            ) : (
                                <>
                                    {selectedOption?.icon && (
                                        <span className="mr-2 flex-shrink-0">{selectedOption.icon}</span>
                                    )}
                                    <span className={`truncate ${!selectedOption ? 'text-gray-500' : ''}`}>
                                        {selectedOption?.label || placeholder}
                                    </span>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center ml-1">
                    {(clearable && (selectedValue || (multiple && selectedValues.length > 0))) && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex-shrink-0 mr-1"
                            aria-label="Clear selection"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    )}

                    {!disabled && (
                        isOpen ? (
                            <ChevronUp className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        ) : (
                            <ChevronDown className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        )
                    )}
                </div>
            </button>

            {/* Dropdown menu with transition */}
            <div
                className={`absolute z-[100] w-full ${align === 'right' ? 'right-0' : 'left-0'} mt-1
          transition-all duration-200 origin-top
          ${isOpen ? 'transform scale-y-100 opacity-100' : 'transform scale-y-95 opacity-0 pointer-events-none'}
          ${menuClassName}`}
                style={{
                    minWidth: minWidth ? `${minWidth}px` : 'max-content',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                }}
                role="listbox"
            >
                <div className="bg-white border border-gray-100 rounded-md overflow-hidden">
                    {/* Search input */}
                    {showSearch && (
                        <div className="px-3 py-2 border-b border-gray-100">
                            <div className="relative">
                                <Search className="h-4 w-4 text-gray-400 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                />
                                {searchTerm && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Options list */}
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: `${maxHeight}px` }}
                    >
                        {filteredOptions.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-500 text-center">
                                Không tìm thấy kết quả
                            </div>
                        ) : (
                            <ul className="py-1">
                                {filteredOptions.map((option) => {
                                    const isSelected = multiple
                                        ? selectedValues.includes(option.value)
                                        : selectedValue === option.value;

                                    return (
                                        <li
                                            key={option.value}
                                            className={`
                        ${sizeClasses.option[size]} cursor-pointer transition-colors duration-150 flex items-center
                        ${option.disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
                        ${isSelected ? `bg-green-50 text-green-700 ${selectedClassName}` : 'hover:bg-gray-50 text-gray-700'}
                        ${optionClassName}
                      `}
                                            onClick={() => !option.disabled && handleSelect(option.value)}
                                            role="option"
                                            aria-selected={isSelected}
                                        >
                                            {renderOption ? (
                                                renderOption(option, isSelected)
                                            ) : (
                                                <>
                                                    {multiple && (
                                                        <div className={`flex-shrink-0 w-4 h-4 mr-2 rounded border ${isSelected ? 'bg-green-500 border-green-500' : 'border-gray-300'} flex items-center justify-center`}>
                                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                                        </div>
                                                    )}

                                                    {option.icon && (
                                                        <span className="mr-2 flex-shrink-0">{option.icon}</span>
                                                    )}

                                                    <div className="flex flex-col flex-grow truncate">
                                                        <span className="truncate">{option.label}</span>
                                                        {option.description && (
                                                            <span className="text-xs text-gray-500 truncate mt-0.5">{option.description}</span>
                                                        )}
                                                    </div>

                                                    {!multiple && isSelected && (
                                                        <Check className="h-4 w-4 text-green-500 ml-2 flex-shrink-0" />
                                                    )}
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dropdown;