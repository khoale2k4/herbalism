"use client";

import { useEffect, useState, useRef } from "react";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../SearchBar/SearchBar";
import Dropdown from "../Dropdown/Dropdown";
import CartSidebar, { ItemInCart } from "../Cart/cart";
import MarqueeText from "../MarqueeText/MarqueeText";
import { useLanguage } from "@/hooks/useLanguage";
import Image from "next/image";
import { CartOperation, OrderOperation } from "@/lib/main";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);
  const { t, currentLang, changeLanguage } = useLanguage();
  const cartOp = new CartOperation();
  const orderOp = new OrderOperation();
  const languageOptions = [
    { value: "en", label: t.common.language.english },
    { value: "fr", label: "French" },
    { value: "vi", label: t.common.language.vietnamese },
  ];
  const defaultLang = languageOptions.find(l => l.value === currentLang)?.label || "English";
  const [language, setLanguage] = useState<string>(defaultLang);
  const [currency, setCurrency] = useState<string>('cad');
  const messages = [
    t.navbar.message1,
    t.navbar.message2,
    t.navbar.message2,
    t.navbar.message2,
  ];

  const currencyOptions = [
    { value: "cad", label: t.common.currency.cad },
    { value: "usd", label: t.common.currency.usd },
    { value: "eur", label: t.common.currency.eur },
    { value: "gbp", label: t.common.currency.gbp },
  ];

  const [cartItems, setCartItems] = useState<ItemInCart[]>([]);
  const [fee, setFee] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  const fetchItems = async() => {
    const response = await cartOp.getMyCartItems();
    if(response.success) {
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
    if(feeResponse.success) {
      setFee(feeResponse.data);
    }
  }

  useEffect(() => {
    if(activeMenu === 'cart') {
      fetchItems();
    }
  }, [activeMenu])

  const handleSelect = (setter: (val: string) => void, options: any[]) => (value: string) => {
    const selected = options.find((opt) => opt.value === value);
    if (selected) setter(selected.label);
    if (value === "en") {
      changeLanguage("en");
    } else if (value === 'vi') {
      changeLanguage("vi");
    }
  };

  const wordsList = [
    t.navbar.marquee.message1,
    t.navbar.marquee.message2,
    t.navbar.marquee.message3,
    t.navbar.marquee.message4,
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-800 text-sm py-2 px-6 flex justify-between z-60 relative">
        <div className="relative w-[400px] text-white h-5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute w-full"
            >
              {messages[messageIndex]} <a href="#" className="underline ml-2">Learn more &gt;</a>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex space-x-4 items-center text-white">
          <div className="w-32">
            <Dropdown
              options={languageOptions}
              selectedValue={languageOptions.find(l => l.label === language)?.value || "en"}
              onSelect={handleSelect(setLanguage, languageOptions)}
              placeholder={t.common.chooseLanguage}
              buttonClassName="!bg-transparent !text-white border-none hover:bg-green-700 !px-2 !py-1"
              variant="filled" size="sm"
            />
          </div>
          <span>|</span>
          <div className="w-52">
            <Dropdown
              options={currencyOptions}
              selectedValue={currencyOptions.find(c => c.label === currency)?.value || "cad"}
              onSelect={handleSelect(setCurrency, currencyOptions)}
              placeholder={t.common.chooseCurrency}
              buttonClassName="!bg-transparent !text-white border-none hover:bg-green-700 !px-2 !py-1"
              variant="filled" size="sm"
            />
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <a href="/">
            <div className="relative w-[120px] h-[60px]">
              <Image
                src="/img/logo-image.png"
                alt="Logo"
                fill
                className="object-contain"
                sizes="120px"
              />
            </div>
          </a>

          {/* Shop Dropdown */}
          <div className="relative group">
            <span className="cursor-pointer flex items-center gap-1 py-2 border-b-2 border-transparent group-hover:border-green-600 transition-all duration-300">
              <a
                href="/shop"
              >
                {t.navbar.shop}
              </a>
              <svg className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <div className="absolute top-full left-0 overflow-hidden max-h-0 group-hover:max-h-60 transition-all duration-300 w-48 bg-white shadow-lg rounded-b-lg">
              <div className="p-1">
                {["Herbs", "Teas", "Supplements"].map(label => (
                  <a
                    key={label}
                    href="#"
                    className="block p-3 hover:bg-gray-50 transition-colors rounded my-1 border-l-2 border-transparent hover:border-green-600"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a
            href="/blog"
            className="cursor-pointer py-2 border-b-2 border-transparent hover:border-green-600 transition-all duration-300"
          >
            {t.navbar.learn}
          </a>
          <a
            href="/about"
            className="cursor-pointer py-2 border-b-2 border-transparent hover:border-green-600 transition-all duration-300"
          >
            {t.navbar.about}
          </a>
        </div>

        <SearchBar />

        <div className="flex items-center space-x-6">
          {/* User Menu */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
              onClick={() => setActiveMenu(activeMenu === "user" ? null : "user")}
            >
              <FaUser />
            </button>
            <div
              className={`absolute right-0 bg-white shadow-lg w-40 mt-2 p-1 z-40 rounded-lg transform transition-all duration-200 origin-top-right ${activeMenu === "user"
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
                }`}
            >
              {["Orders", "Profile", "Settings"].map(link => (
                <a
                  key={link}
                  href="#"
                  className="block hover:bg-gray-50 p-3 rounded transition-colors border-l-2 border-transparent hover:border-green-600"
                >
                  {link}
                </a>
              ))}
              <hr className="my-1" />
              <a
                href="#"
                className="block hover:bg-red-50 p-3 rounded text-red-500 transition-colors border-l-2 border-transparent hover:border-red-500"
              >
                Logout
              </a>
            </div>
          </div>

          {/* Cart Menu */}
          <div className="relative">
            <button
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 focus:outline-none"
              onClick={() => setActiveMenu(activeMenu === "cart" ? null : "cart")}
            >
              <FaShoppingCart />
            </button>
            <CartSidebar
              activeMenu={activeMenu}
              setActiveMenu={setActiveMenu}
              cartItems={cartItems}
              fetchData={fetchItems}
              fee={fee}
            />
          </div>
        </div>
      </nav>

      <MarqueeText words={wordsList} speed={50} />
    </>
  );
};

export default Navbar;
