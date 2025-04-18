"use client";

import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-gray-800">404</h1>
            <p className="text-xl mt-4">Sorry, the page you are looking for could not be found.</p>
            <Link href="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
                Return Home
            </Link>
        </div>
    );
};

export default NotFoundPage;
