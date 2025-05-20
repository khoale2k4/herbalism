import { useLanguage } from "@/hooks/useLanguage";
import { X, ChevronDown, ChevronRight, User, ShoppingBag, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { removeTokenFromCookie } from "@/app/utils/token";

type Props = {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
    onCartClick: () => void;
};

type SubMenuProps = {
    title: string;
    items: { label: string; href: string }[];
    defaultOpen?: boolean;
};

const SubMenu = ({ title, items, defaultOpen = false }: SubMenuProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-100 py-2">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-2 hover:text-emerald-600 transition-colors duration-200 font-medium"
            >
                <span>{title}</span>
                {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>

            <div className={`ml-4 flex flex-col space-y-2 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 pt-2 pb-1' : 'max-h-0'}`}>
                {items.map((item, idx) => (
                    <Link
                        key={idx}
                        href={item.href}
                        className="text-gray-600 hover:text-emerald-600 transition-colors duration-200"
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default function MenuSidebar({ openMenu, setOpenMenu, onCartClick }: Props) {
    const { t } = useLanguage();

    return (
        <>
            {/* Dark overlay */}
            {openMenu && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setOpenMenu(false)}
                />
            )}

            <div
                className={`fixed top-0 left-0 w-full max-w-xs h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out bg-[#f2f2f2] ${openMenu ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100">
                        {/* Header with logo and close button */}
                        <div className="flex justify-between items-center">
                            <Link href="/" onClick={() => setOpenMenu(false)}>
                                <div className="relative w-[150px] h-[30px]">
                                    <img
                                        src="/img/logo-with-word.png"
                                        alt="Logo"
                                                                                className="object-contain"
                                        sizes="150px"
                                                                            />
                                </div>
                            </Link>
                            <button
                                onClick={() => setOpenMenu(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Menu items */}
                    <div className="flex-grow overflow-y-auto py-2 px-5">
                        <div className="w-full px-4 mb-3 mt-3">
                            <SearchBar backgroundColor="#f4f4f5" textColor="#9ca3af" />
                        </div>

                        <nav className="flex flex-col text-gray-800">
                            <div className="border-b border-gray-100 py-2">
                                <Link
                                    href="/shop"
                                    className="block py-2 hover:text-emerald-600 transition-colors duration-200 font-medium"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    {t.navbar.shop || "Shop"}
                                </Link>
                            </div>

                            <div className="border-b border-gray-100 py-2">
                                <Link
                                    href="/blog"
                                    className="block py-2 hover:text-emerald-600 transition-colors duration-200 font-medium"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    {t.navbar.blog || "Learn"}
                                </Link>
                            </div>

                            <div className="border-b border-gray-100 py-2">
                                <Link
                                    href="/process"
                                    className="block py-2 hover:text-emerald-600 transition-colors duration-200 font-medium"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    {t.navbar.about || "About"}
                                </Link>
                            </div>
                            <SubMenu
                                title={t.common.account || "Account"}
                                defaultOpen={false}
                                items={[
                                    { label: t.common.orders, href: "/orders" },
                                    // { label: t.common.info, href: "/shop/teas" },
                                    // { label: t.common.setting, href: "/" },
                                ]}
                            />
                        </nav>
                    </div>

                    <div className="border-t border-gray-100 p-5">
                        <div className="flex justify-between">
                            <button
                                className="flex items-center space-x-2 py-2 px-4 bg-emerald-50 rounded-md hover:bg-emerald-100 transition-colors duration-200 relative"
                                onClick={onCartClick}
                            >
                                <ShoppingBag size={18} className="text-emerald-600" />
                                <span className="text-emerald-600">{t.common.cart || "Cart"}</span>
                            </button>
                            <div className=" py-1">
                                <a
                                    href="/login"
                                    onClick={() => removeTokenFromCookie()}
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-red-600  hover:bg-red-50  group"
                                >
                                    <LogOut size={18} className="text-red-500" />
                                    <span>{t.common.logout}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}