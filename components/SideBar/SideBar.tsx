import { IconType } from "react-icons/lib";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { TabName } from "@/Views/main";

export default function SideBar({
    selected,
    setSelected,
    menuItems,
    isOpen,
    toggleSidebar,
}: {
    selected: TabName;
    setSelected: (tab: TabName) => void;
    menuItems: { name: TabName; icon: IconType }[];
    isOpen: boolean;
    toggleSidebar: () => void;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.aside
                    key="sidebar"
                    initial={{ x: -260, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -260, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-64 bg-gray-800 text-white flex flex-col"
                >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
                        <span className="text-2xl font-bold">Admin Panel</span>
                        <button
                            className="text-white hover:text-gray-300"
                            onClick={toggleSidebar}
                        >
                            <FiMenu className="text-2xl" />
                        </button>
                    </div>

                    <nav className="flex-1 px-2 py-4 space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => setSelected(item.name)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 text-left w-full transition-colors duration-200 ${selected === item.name && "bg-gray-700"
                                    }`}
                            >
                                <item.icon className="text-xl" />
                                {item.name}
                            </button>
                        ))}
                    </nav>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
