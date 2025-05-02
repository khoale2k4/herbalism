import { useLanguage } from "@/hooks/useLanguage";
import { X, ChevronDown, ChevronRight, User, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

type Props = {
    openMenu: boolean;
    setOpenMenu: (open: boolean) => void;
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

export default function MenuSidebar({ openMenu, setOpenMenu }: Props) {
    const { t } = useLanguage();

    // Sample cart count
    const cartCount = 3;

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
                className={`fixed top-0 left-0 w-full max-w-xs h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${openMenu ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="p-5 border-b border-gray-100">
                        {/* Header with logo and close button */}
                        <div className="flex justify-between items-center">
                            <Link href="/" onClick={() => setOpenMenu(false)}>
                                <div className="relative w-[150px] h-[30px]">
                                    <Image
                                        src="/img/logo-with-word.png"
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                        sizes="150px"
                                        priority
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
                        <SearchBar />
                        <nav className="flex flex-col text-gray-800">
                            {/* <SubMenu
                                title={t.navbar.shop || "Shop"}
                                defaultOpen={true}
                                items={[
                                    { label: "Herbs", href: "/shop/herbs" },
                                    { label: "Teas", href: "/shop/teas" },
                                    { label: "Supplements", href: "/shop/supplements" },
                                    // { label: "New Arrivals", href: "/shop/new" },
                                    // { label: "Best Sellers", href: "/shop/best-sellers" }
                                ]}
                            />

                            <SubMenu
                                title={t.navbar.learn || "Learn"}
                                items={[
                                    { label: "Blog", href: "/blog" },
                                    { label: "Recipes", href: "/recipes" },
                                    { label: "Guides", href: "/guides" }
                                ]}
                            /> */}

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
                                    href="/about"
                                    className="block py-2 hover:text-emerald-600 transition-colors duration-200 font-medium"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    {t.navbar.about || "About"}
                                </Link>
                            </div>

                            {/* <div className="border-b border-gray-100 py-2">
                                <Link
                                    href="/contact"
                                    className="block py-2 hover:text-emerald-600 transition-colors duration-200 font-medium"
                                    onClick={() => setOpenMenu(false)}
                                >
                                    {t.navbar.contact || "Contact"}
                                </Link>
                            </div> */}
                        </nav>
                    </div>

                    {/* Footer with account and cart */}
                    <div className="border-t border-gray-100 p-5">
                        <div className="flex justify-between">
                            <Link
                                href="/account"
                                className="flex items-center space-x-2 py-2 px-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors duration-200"
                                onClick={() => setOpenMenu(false)}
                            >
                                <User size={18} />
                                <span>{t.common.account || "Account"}</span>
                            </Link>

                            <Link
                                href="/cart"
                                className="flex items-center space-x-2 py-2 px-4 bg-emerald-50 rounded-md hover:bg-emerald-100 transition-colors duration-200 relative"
                                onClick={() => setOpenMenu(false)}
                            >
                                <ShoppingBag size={18} className="text-emerald-600" />
                                <span className="text-emerald-600">{t.common.cart || "Cart"}</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}