"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import Dropdown from "../Dropdown/Dropdown";
import CartSidebar, { ItemInCart } from "../Cart/cart";
import MarqueeText from "../MarqueeText/MarqueeText";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { CartOperation, CustomerOperation, OrderOperation } from "@/lib/main";
import { ChevronDown, LogOut, Menu, Package, Settings, ShoppingBag, UserCircle } from "lucide-react";
import { getTokenFromCookie } from "@/app/utils/token";
import { User } from "@/types/user";
import Link from "next/link";
import { useCurrency } from "@/hooks/useCurrency";
import MenuSidebar from "./MenuForMobile";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const { t, currentLang, changeLanguage } = useLanguage();
  const { changeCurrency, currentCurrency } = useCurrency();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartOp = new CartOperation();
  const orderOp = new OrderOperation();
  const cusOp = new CustomerOperation();
  const languageOptions = [
    { value: "en", label: t.common.language.english },
    // { value: "fr", label: "French" },
    { value: "vi", label: t.common.language.vietnamese },
  ];
  const currencyOptions = [
    { value: "VND", label: t.common.currency.vnd },
    { value: "USD", label: t.common.currency.usd },
  ];
  const defaultLang = languageOptions.find(l => l.value === currentLang)?.label || "English";
  const [language, setLanguage] = useState<string>(defaultLang);
  const defaultCurrency = currencyOptions.find(c => c.value === currentCurrency)?.value || 'USD';
  console.log('currencyOptions.find(c => c.value === currentCurrency)?.value', currencyOptions.find(c => c.value === currentCurrency)?.value)
  const [currency, setCurrency] = useState<string>(defaultCurrency);
  console.log(currency, defaultCurrency, currentCurrency);
  const [user, setUser] = useState<User | null>(null);
  const [searchBoxOpen, setSearchBoxOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const messages = [
    t.navbar.message1,
    t.navbar.message2,
    t.navbar.message2,
    t.navbar.message2,
  ];

  const [cartItems, setCartItems] = useState<ItemInCart[]>([]);
  const [fee, setFee] = useState<number>(0);

  useEffect(() => {
    const newCurrency = currencyOptions.find(c => c.value === currentCurrency)?.value || 'USD';
    setCurrency(newCurrency);
  }, [currentCurrency]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  const fetchItems = async () => {
    const token = getTokenFromCookie();
    if (!token) return;
    const response = await cartOp.getMyCartItems(token);
    if (response.success) {
      const data = response.data.map((item: any) => ({
        id: item.product.id,
        name: item.product.name,
        image: item.product.images[0].url,
        price: item.product.price,
        size: item.size,
        num: item.num,
      }));
      setCartItems(data);
    }
    const feeResponse = await orderOp.getFee();
    if (feeResponse.success) {
      setFee(feeResponse.data);
    }
  }
  const fetchUser = useCallback(async () => {
    const token = getTokenFromCookie();
    if (!token) return;
    const userInfo = await cusOp.getInfo(token);
    if (userInfo.success) {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setUser(parsedUser);
      }
    } else {
      localStorage.removeItem('user');
      setUser(null);
    }
  }, []);

  useEffect(() => {
    if (activeMenu === 'cart') {
      fetchItems();
    }
  }, [activeMenu]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileScreen = window.innerWidth <= 768; // hoặc Tailwind md breakpoint
      setIsMobile(isMobileScreen);
      if (isMobileScreen) {
        setSearchBoxOpen(false); // ẩn searchbar ở mobile
      } else {
        setSearchBoxOpen(true); // hiện searchbar ở desktop
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLangSelect = (setter: (val: string) => void, options: any[]) => (value: string) => {
    const selected = options.find((opt) => opt.value === value);
    if (selected) setter(selected.label);
    if (value === "en") {
      changeLanguage("en");
    } else if (value === 'vi') {
      changeLanguage("vi");
    }
  };

  const handleOnCartClick = () => {
    setMobileMenuOpen(false);
    setActiveMenu('cart');
  }

  const handleCurrencySelect = (setter: (val: string) => void, options: any[]) => (value: string) => {
    const selected = options.find((opt) => opt.value === value);
    if (selected) setter(selected.value);
    if (value === "USD") {
      changeCurrency("USD");
    } else if (value === 'VND') {
      changeCurrency("VND");
    }
    console.log(value);
  };

  const wordsList = [
    t.navbar.marquee.message1,
    t.navbar.marquee.message2,
    t.navbar.marquee.message3,
    // t.navbar.marquee.message4,
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        // Nếu click ra ngoài, đóng dropdown
        if (activeMenu === "user") {
          setActiveMenu(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

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
              {messages[messageIndex]} <a href="/blog" className="underline ml-2 text-[#3e4f3d]">Learn more &gt;</a>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex space-x-4 items-center text-white">
          <div className="w-32">
            <Dropdown
              options={languageOptions}
              selectedValue={languageOptions.find(l => l.label === language)?.value || "en"}
              onSelect={handleLangSelect(setLanguage, languageOptions)}
              placeholder={t.common.chooseLanguage}
              buttonClassName="!bg-[#e6e3dc] !text-[#3e4f3d] hover:!bg-[#d9cfc1] border-none px-2 py-1"
              variant="filled" size="sm"
            />
          </div>
          {/* <span>|</span>
          <div className="w-52">
            <Dropdown
              options={currencyOptions}
              selectedValue={currencyOptions.find(c => c.value === currency)?.value || "usd"}
              onSelect={handleCurrencySelect(setCurrency, currencyOptions)}
              placeholder={t.common.chooseCurrency}
              buttonClassName="!bg-[#3e4f3d] !text-white hover:!bg-green-700 border-none py-1"
              variant="filled" size="sm"
            />
          </div> */}
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#3e4f3d] shadow-sm py-4 px-6 text-[#c7b299]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-shrink-0">
            <button
              className="md:hidden relative text-[#c7b299]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            {!searchBoxOpen && <a href="/">
              <div className="md:hidden relative w-[150px] h-[30px]">
                <Image
                  src="/img/logo-with-word.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            </a>}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/">
                <div className="relative w-[150px] h-[30px]">
                  <Image
                    src="/img/logo-with-word.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              </a>

              {/* Shop Dropdown */}
              <div className="relative group">
                <span className="cursor-pointer flex items-center gap-1 py-2 border-b-2 border-transparent group-hover:border-[#6e7a34] transition-all duration-300">
                  <a
                    href="/shop"
                  >
                    {t.navbar.shop}
                  </a>
                  {/* <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg> */}
                </span>
                {/* <div className="absolute top-full left-0 overflow-hidden max-h-0 group-hover:max-h-60 transition-all duration-300 w-48 bg-white shadow-lg rounded-b-lg">
                  <div className="p-1">
                    {["Herbs", "Teas", "Supplements"].map(label => (
                      <a
                        key={label}
                        href="#"
                        className="block p-3 hover:bg-gray-50 transition-colors rounded my-1 border-l-2 border-transparent hover:border-[#6e7a34]"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div> */}
              </div>
              <a
                href="/blog"
                className="cursor-pointer py-2 border-b-2 border-transparent hover:border-[#6e7a34] transition-all duration-300"
              >
                {t.navbar.learn}
              </a>
              <a
                href="/process"
                className="cursor-pointer py-2 border-b-2 border-transparent hover:border-[#6e7a34] transition-all duration-300"
              >
                {t.navbar.about}
              </a>
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
              {/* User Menu */}
              {
                user && <div className="hidden md:flex ">
                  <button
                    className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none flex items-center gap-2"
                    onClick={() => setActiveMenu(activeMenu === "user" ? null : "user")}
                    aria-expanded={activeMenu === "user"}
                    aria-haspopup="true"
                  >
                    <div className="relative">
                      <UserCircle size={24} className="text-[#c7b299] dark:text-gray-300 group-hover:text-[#6e7a34] dark:group-hover:text-[#6e7a34] transition-colors" />
                      {/* <span className="ab÷solute -bottom-1 -right-1 w-3 h-3 bg-[#6e7a34] rounded-full border-2 border-white dark:border-gray-900"></span> */}
                    </div>
                    {/* <span className="hidden sm:inline text-sm font-medium text-[#c7b299] dark:text-gray-300 group-hover:text-[#6e7a34] dark:group-hover:text-[#6e7a34] transition-colors">{t.common.account}</span>
                    <ChevronDown size={16} className={`hidden sm:block text-gray-500 transition-transform duration-300 ${activeMenu === "user" ? "rotate-180" : ""}`} /> */}
                  </button>

                  <div
                    className={`absolute right-0 bg-white dark:bg-gray-900 shadow-lg w-48 mt-2 py-2 z-40 rounded-lg transform transition-all duration-200 origin-top-right border border-gray-100 dark:border-gray-800 ${activeMenu === "user" ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}>
                  
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.mail}</p>
                    </div>

                    <div className="py-1">
                      <a
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                      >
                        <Package size={18} className="text-gray-500 group-hover:text-[#6e7a34] dark:group-hover:text-green-500" />
                        <span>{t.common.orders}</span>
                      </a>

                      <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                      >
                        <UserCircle size={18} className="text-gray-500 group-hover:text-[#6e7a34] dark:group-hover:text-green-500" />
                        <span>{t.common.info}</span>
                      </a>

                      <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                      >
                        <Settings size={18} className="text-gray-500 group-hover:text-[#6e7a34] dark:group-hover:text-green-500" />
                        <span>{t.common.setting}</span>
                      </a>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-800 py-1">
                      <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 group"
                      >
                        <LogOut size={18} className="text-red-500" />
                        <span>{t.common.logout}</span>
                      </a>
                    </div>
                  </div>
                </div>
              }
              {
                !user &&
                <Link
                  className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none hidden md:flex items-center gap-2"
                  href={"/login"} >
                  <div className="relative">
                    <UserCircle size={24} className="text-[#c7b299] dark:text-gray-300 group-hover:text-[#6e7a34] dark:group-hover:text-green-500 transition-colors" />
                    {/* <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span> */}
                  </div>
                  {/* <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#6e7a34] dark:group-hover:text-green-500 transition-colors">{t.common.login}</span> */}
                </Link>
              }

              <div className="relative">
                <button
                  className="group p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none flex items-center gap-2"
                  onClick={() => setActiveMenu(activeMenu === "cart" ? null : "cart")}
                  aria-label="Shopping cart"
                >
                  <div className="relative">
                    <ShoppingBag size={24} className="text-[#c7b299] dark:text-gray-300 group-hover:text-[#6e7a34] dark:group-hover:text-green-500 transition-colors" />

                    {cartItems.length > 0 && (
                      <span className="absolute -top-2 -right-2 flex items-center justify-center min-w-[18px] h-[18px] text-xs font-medium text-white bg-[#6e7a34] rounded-full px-1">
                        {cartItems.length > 9 ? '9+' : cartItems.length}
                      </span>
                    )}
                  </div>
                  {/* <span className="hidden sm:inline text-sm font-medium text-[#c7b299] dark:text-gray-300 group-hover:text-[#6e7a34] dark:group-hover:text-green-500 transition-colors">{t.common.cart}</span> */}
                </button>
                <CartSidebar
                  activeMenu={activeMenu}
                  setActiveMenu={setActiveMenu}
                  cartItems={cartItems}
                  fetchData={fetchItems}
                  fee={fee}
                />
                <MenuSidebar openMenu={mobileMenuOpen} setOpenMenu={(open: boolean) => setMobileMenuOpen(open)} onCartClick={handleOnCartClick} />
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* <MarqueeText words={wordsList} speed={50} /> */}
    </>
  );
};

export default Navbar;
