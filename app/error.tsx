"use client";

import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-[#fdf8f7]">
            <h1 className="text-7xl font-bold text-red-500 mb-4 animate-bounce">
                404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Oops! Something went wrong
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
                We encountered an unexpected error. Don't worry, it's not your fault!
                Please try again or contact our support team for assistance.
            </p>
            <Link href="/" className="mt-6 px-4 py-2 bg-[#7d8b40] hover:bg-[#6e7a34] transition-colors text-white rounded-md shadow">
                Return Home
            </Link>
        </div>
    );
};

export default ErrorPage;