import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [typingEffect, setTypingEffect] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const { t } = useLanguage();

    const inputRef = useRef(null);

    // Danh sách các placeholder sẽ được hiển thị lần lượt
    const searchPlaceholders = t.navbar.searchPlaceholders;

    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Hiệu ứng typing
    useEffect(() => {
        if (isInputFocused) return;

        const currentPlaceholder = searchPlaceholders[currentPlaceholderIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setTypingEffect(currentPlaceholder.substring(0, typingEffect.length + 1));

                // Nếu đã gõ xong placeholder hiện tại
                if (typingEffect.length === currentPlaceholder.length) {
                    setIsDeleting(false);
                    // Dừng một khoảng thời gian trước khi xóa
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setTypingEffect(currentPlaceholder.substring(0, typingEffect.length - 1));

                // Nếu đã xóa hết placeholder hiện tại
                if (typingEffect.length === 0) {
                    setIsDeleting(false);
                    setCurrentPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
                }
            }
        }, isDeleting ? typingSpeed / 1.5 : typingSpeed);

        return () => clearTimeout(timeout);
    }, [typingEffect, isDeleting, currentPlaceholderIndex, isInputFocused]);

    return (
        <div className="relative w-96 rounded-full overflow-hidden bg-[#5f735d] transition-all duration-300 shadow-md hover:shadow-lg">
            <div className="flex items-center h-full">
                <div className="flex items-center justify-center pl-4">
                    <FaSearch className="text-[#f4e3b2] opacity-80" />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder={isInputFocused ? t.navbar.search : typingEffect}
                    className="w-full p-3 pl-3 bg-[#5f735d] text-[#f4e3b2] outline-none border-none focus:ring-0 placeholder-[#f4e3b2] placeholder-opacity-80"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                />

                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="pr-4 text-[#f4e3b2] opacity-70 hover:opacity-100 transition-opacity"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Hiệu ứng đường viền khi focus vào input */}
            <div className={`absolute bottom-0 left-0 h-0.5 bg-[#f4e3b2] transition-all duration-300 ${isInputFocused ? 'w-full' : 'w-0'}`}></div>
        </div>
    );
};

export default SearchBar;