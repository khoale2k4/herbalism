"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { UserCircle, ShoppingBag, Menu, Package, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../../components/SearchBar/SearchBar";
import Dropdown from "../../components/Dropdown/Dropdown";
import CartSidebar, { ItemInCart } from "../Cart/cart";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { CartOperation, CustomerOperation } from "@/lib/main";
import { getTokenFromCookie, removeTokenFromCookie } from "@/app/utils/token";
import { User } from "@/types/user";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useCartStore } from "@/lib/stores/cartStore";
import { debounce } from "lodash";
import MenuSidebar from "./MenuForMobile";
import { getLocalCart } from "@/app/utils/localCart";

type Message = {
  message: string;
  link: {
    title: string;
    link: string;
  }
}

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const { t, currentLang, changeLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const cartOp = useRef(new CartOperation());
  const cusOp = useRef(new CustomerOperation());
  const userMenuRef = useRef<HTMLDivElement>(null);
  const animateCart = useCartStore((state) => state.animateCart);
  const [cartItems, setCartItems] = useState<ItemInCart[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [searchBoxOpen, setSearchBoxOpen] = useState(true);

  // Sử dụng useRef để tránh re-render không cần thiết
  const languageOptions = useRef([
    { value: "en", label: t.common.language.english },
    { value: "vi", label: t.common.language.vietnamese },
  ]).current;

  const messages = useRef<Message[]>([
    {
      message: t.navbar.message3,
      link: {
        link: '/process',
        title: t.navbar.learnMore
      }
    },
    {
      message: t.navbar.message4,
      link: {
        link: '/shop',
        title: t.navbar.shopNow
      }
    },
  ]).current;

  // Debounce resize handler
  const handleResize = useCallback(debounce(() => {
    const isMobileScreen = window.innerWidth <= 768;
    setIsMobile(isMobileScreen);
    setSearchBoxOpen(!isMobileScreen);
  }, 200), []);

  useEffect(() => {
    // Kiểm tra kích thước màn hình ban đầu
    handleResize();

    // Thêm event listener với hàm debounce
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [handleResize]);

  // Fetch cart items với caching
  const fetchItems = useCallback(async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) {
        const items = getLocalCart();
        setCartItems(items.map((item) => ({
          id: item.product.id,
          slug: item.product.slug,
          name: item.product.name,
          image: (item.product.images?.[0]?.url || '/img/placeholder.png'),
          price: item.product.price,
          size: item.size,
          num: item.num,
        })));
      } else {
        const response = await cartOp.current.getMyCartItems(token);
        if (response.success) {
          setCartItems(response.data.map((item: any) => ({
            id: item.product.id,
            name: item.product.name,
            image: (item.product.images?.[0]?.url || '/img/placeholder.png'),
            price: item.product.price,
            size: item.size,
            num: item.num,
          })));
        }
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  }, []);

  // Fetch user info với caching
  const fetchUser = useCallback(async () => {
    try {
      const token = getTokenFromCookie();
      if (!token) return;

      const userInfo = await cusOp.current.getInfo(token);
      if (userInfo.success) {
        const user = localStorage.getItem('user');
        if (user) {
          setUser(JSON.parse(user));
        }
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  // Chỉ fetch dữ liệu khi sidebar mở và có sự thay đổi
  useEffect(() => {
    if (activeMenu === 'cart') {
      fetchItems();
    } else if (activeMenu === 'user') {
      fetchUser();
    }
  }, [activeMenu, fetchItems, fetchUser]);

  // Message rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages.length]);

  // Xử lý click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLangSelect = (value: string) => {
    changeLanguage(value);
  };

  const handleOnCartClick = () => {
    setMobileMenuOpen(false);
    setActiveMenu('cart');
  };

  // Render functions
  const renderUserMenu = () => (
    <div className={`absolute right-0 bg-white  shadow-lg w-48 mt-2 py-2 z-40 rounded-lg transform transition-all duration-200 origin-top-right border border-gray-100  ${activeMenu === "user" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
      {user ? (
        <div onClick={() => router.push('/info')} className="px-4 py-2 border-b border-gray-100  cursor-pointer">
          <p className="text-sm font-medium text-gray-900 ">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.mail}</p>
        </div>
      ) : (
        <div className="py-1 border-b border-gray-100 ">
          <Link href="/login" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700  hover:bg-gray-50  group">
            <UserCircle size={18} className="text-gray-500 group-hover:text-[#6e7a34] " />
            <span>{t.common.guest}</span>
          </Link>
        </div>
      )}

      <div className="py-1">
        <Link href="/orders" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700  hover:bg-gray-50  group">
          <Package size={18} className="text-gray-500 group-hover:text-[#6e7a34] " />
          <span>{t.common.orders}</span>
        </Link>
      </div>

      {user && (
        <div className="border-t border-gray-100  py-1">
          <Link href="/login" onClick={() => removeTokenFromCookie()} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600  hover:bg-red-50  group">
            <LogOut size={18} className="text-red-500" />
            <span>{t.common.logout}</span>
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#f2f2f2] text-sm py-2 px-6 hidden md:flex justify-between z-60 relative">
        <div className="relative w-[400px] text-white h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute w-full text-[#3e4f3d]"
            >
              {messages[messageIndex].message}
              <Link href={messages[messageIndex].link.link} className="underline ml-2 text-[#3e4f3d]">
                {messages[messageIndex].link.title} &gt;
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex space-x-4 items-center text-white">
          <div className="w-32">
            <Dropdown
              options={languageOptions}
              selectedValue={currentLang ?? 'en'}
              onSelect={handleLangSelect}
              placeholder={t.common.chooseLanguage}
              buttonClassName="!bg-[#e6e3dc] !text-[#3e4f3d] hover:!bg-[#d9cfc1] border-none px-2 py-1"
              variant="filled"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#3e4f3d] shadow-sm py-4 px-6 text-[#c7b299]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              className="md:hidden relative text-[#c7b299]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
            {!searchBoxOpen && (
              <Link href="/">
                <div className="md:hidden relative w-[150px]">
                  <img
                    src="/img/logo-with-word.png"
                    alt="Logo"
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              </Link>
            )}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/">
                <div className="flex items-center h-[32px] w-[120px] relative">
                  <img
                    src="/img/logo-with-word.png"
                    alt="Logo"
                    className="object-contain h-full"
                  />
                </div>
              </Link>

              <Link href="/shop" className="cursor-pointer py-2 border-b-2 border-transparent hover:border-[#6e7a34] transition-all duration-300">
                {t.navbar.shop}
              </Link>
              <Link href="/blog" className="cursor-pointer py-2 border-b-2 border-transparent hover:border-[#6e7a34] transition-all duration-300">
                {t.navbar.learn}
              </Link>
              <Link href="/process" className="cursor-pointer py-2 border-b-2 border-transparent hover:border-[#6e7a34] transition-all duration-300">
                {t.navbar.about}
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            {searchBoxOpen && (
              <div className="md:w-[400px]">
                <SearchBar
                  backgroundColor="#5f735d"
                  textColor="#f4e3b2"
                />
              </div>
            )}
          </div>

          <div ref={userMenuRef} className="flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex">
                <button
                  className="group p-2 rounded-full hover:bg-gray-100  transition-all duration-300 focus:outline-none"
                  onClick={() => setActiveMenu(activeMenu === "user" ? null : "user")}
                  aria-expanded={activeMenu === "user"}
                  aria-label="User menu"
                >
                  <UserCircle size={24} className="text-[#c7b299]  group-hover:text-[#6e7a34]  transition-colors" />
                </button>
                {renderUserMenu()}
              </div>

              <div className="relative">
                <button
                  className="group p-2 rounded-full hover:bg-gray-100  transition-all duration-300 focus:outline-none"
                  onClick={() => setActiveMenu(activeMenu === "cart" ? null : "cart")}
                  aria-label="Shopping cart"
                >
                  <div className="relative">
                    <ShoppingBag
                      size={24}
                      className={`relative z-10 text-[#c7b299]  group-hover:text-[#6e7a34]  transition-colors
                        ${animateCart ? "scale-[1.2] animate-cart-pop shadow-[0_0_8px_2px_rgba(174,234,0,0.7)] " : ""}
                      `}
                    />
                    {animateCart && (
                      <span className="absolute top-0 left-0 w-6 h-6 rounded-full bg-[#a4ff00] opacity-60 animate-ping-fast pointer-events-none"></span>
                    )}
                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] text-xs font-medium text-white bg-[#6e7a34] rounded-full px-1">
                        {cartItems.length > 9 ? '9+' : cartItems.length}
                      </span>
                    )}
                  </div>
                </button>
                <CartSidebar
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  cartItems={cartItems}
                  fetchData={fetchItems}
                />
                <MenuSidebar
                  openMenu={mobileMenuOpen}
                  setOpenMenu={setMobileMenuOpen}
                  onCartClick={handleOnCartClick}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;