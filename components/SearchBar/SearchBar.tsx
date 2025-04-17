import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const { t } = useLanguage();

    return (
        <div className="relative w-96">
            <input
                type="text"
                placeholder={t.navbar.search}
                className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="absolute right-2 top-2 text-gray-500">
                <FaSearch />
            </button>
        </div>
    );
};

export default SearchBar;