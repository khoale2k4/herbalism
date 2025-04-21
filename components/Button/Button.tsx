import Link from "next/link";
import React from "react";

type Props = {
    fromColor?: string;     // Màu bắt đầu của gradient
    toColor?: string;       // Màu kết thúc của gradient
    text?: string;          // Văn bản hiển thị
    icon?: React.ReactNode; // Icon (JSX)
    href?: string;          // Đường dẫn nếu là Link
    onClick?: () => void;   // Sự kiện click nếu không phải Link
};

export default function CustomButton({
    fromColor = "from-blue-600",
    toColor = "to-blue-700",
    text = "Đăng nhập",
    icon,
    href = "/login",
    onClick,
}: Props) {
    const className = `group relative inline-flex items-center justify-center px-5 py-2.5 font-medium text-white transition-all duration-300 ease-in-out overflow-hidden rounded-lg shadow-md hover:shadow-lg`;

    const inner = (
        <>
            <span className={`absolute inset-0 w-full h-full bg-gradient-to-br ${fromColor} ${toColor}`}></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition-all duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-blue-500 opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative flex items-center gap-2">
                {icon ?? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                    </svg>
                )}
                {text}
            </span>
        </>
    );

    return href ? (
        <Link href={href} className={className}>
            {inner}
        </Link>
    ) : (
        <button onClick={onClick} className={className}>
            {inner}
        </button>
    );
}
