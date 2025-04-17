import { FiFilter, FiGrid, FiList, FiSearch, FiX } from "react-icons/fi";
import { useLanguage } from "@/hooks/useLanguage";

type SortOption = {
    value: string;
    label: string;
};

type Props = {
    toggleSidebar: () => void;
    showSidebar: boolean;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortOption: string;
    setSortOption: (option: string) => void;
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
    sortOptions: SortOption[];
};

const TopBar = ({
    toggleSidebar,
    showSidebar,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    viewMode,
    setViewMode,
    sortOptions
}: Props) => {
    const { t } = useLanguage();

    return (
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors"
                    >
                        <FiFilter />
                        <span>
                            {showSidebar
                                ? t.shop.hideFilters
                                : t.shop.filterProducts}
                        </span>
                    </button>

                    <div className="relative flex-grow md:flex-grow-0 md:w-64">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t.shop.searchPlaceholder}
                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <FiX />
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <label htmlFor="sort" className="mr-2 text-sm text-gray-600">
                            {t.shop.sortBy}
                        </label>
                        <select
                            id="sort"
                            className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            {sortOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-3 py-1 ${viewMode === "grid" ? "bg-green-100 text-green-700" : "bg-white text-gray-600"}`}
                            aria-label="Grid view"
                        >
                            <FiGrid />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-3 py-1 ${viewMode === "list" ? "bg-green-100 text-green-700" : "bg-white text-gray-600"}`}
                            aria-label="List view"
                        >
                            <FiList />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
