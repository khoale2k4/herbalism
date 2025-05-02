import { useLanguage } from "@/hooks/useLanguage";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
    backgroundColor?: string; // ví dụ: "#5f735d" hoặc "bg-green-700"
    textColor?: string;       // ví dụ: "#f4e3b2" hoặc "text-white"
};

const SearchBar = ({
    backgroundColor = "#5f735d",
    textColor = "#f4e3b2",
}: Props) => {
    const [query, setQuery] = useState("");
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [typingEffect, setTypingEffect] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const { t } = useLanguage();

    const inputRef = useRef(null);

    const searchPlaceholders = t.navbar.searchPlaceholders;
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        if (isInputFocused) return;

        const currentPlaceholder = searchPlaceholders[currentPlaceholderIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setTypingEffect(currentPlaceholder.substring(0, typingEffect.length + 1));
                if (typingEffect.length === currentPlaceholder.length) {
                    setIsDeleting(false);
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setTypingEffect(currentPlaceholder.substring(0, typingEffect.length - 1));
                if (typingEffect.length === 0) {
                    setIsDeleting(false);
                    setCurrentPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
                }
            }
        }, isDeleting ? typingSpeed / 1.5 : typingSpeed);

        return () => clearTimeout(timeout);
    }, [typingEffect, isDeleting, currentPlaceholderIndex, isInputFocused]);

    return (
        <div
            className="relative w-96 rounded-full overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg"
            style={{ backgroundColor }}
        >
            <div className="flex items-center h-full">
                <div className="flex items-center justify-center pl-4">
                    <FaSearch style={{ color: textColor, opacity: 0.8 }} />
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder={isInputFocused ? t.navbar.search : typingEffect}
                    className="w-full p-3 pl-3 outline-none border-none focus:ring-0 placeholder-[#f4e3b2] placeholder-opacity-80"
                    style={{
                        backgroundColor,
                        color: textColor,
                        caretColor: textColor,
                        // ::placeholder: {color: textColor },
                    }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
                />

                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="pr-4 transition-opacity"
                        style={{ color: textColor, opacity: 0.7 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Focus underline effect */}
            <div
                className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                style={{
                    backgroundColor: textColor,
                    width: isInputFocused ? "100%" : "0",
                }}
            />
        </div>
    );
};

export default SearchBar;
