'use client';
import { useLanguage } from "@/hooks/useLanguage";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[calc(100vh-80px)] bg-white py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-2xl mx-auto text-center"> {/* Added mx-auto here */}
                {/* 404 Display */}
                <div className="relative mb-10 mx-auto w-fit"> {/* Added mx-auto and w-fit */}
                    <div className="absolute -inset-4 rounded-full bg-red-50/50 animate-pulse" aria-hidden="true" />
                    <h1
                        className="relative text-8xl sm:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600 mx-auto"
                        aria-label="404 Error"
                    >
                        404
                    </h1>
                </div>

                {/* Content */}
                <div className="space-y-4 mx-auto max-w-xs sm:max-w-md"> {/* Added mx-auto and max-width constraints */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        {t.blog.notFound || 'Page Not Found'}
                    </h2>

                    <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-full mx-auto" aria-hidden="true" />

                    <p className="text-gray-600 text-base sm:text-lg">
                        {t.blog.notFoundDescription || 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-6 mx-auto w-fit"> {/* Added mx-auto and w-fit */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                        aria-label="Return to blog home"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        {t.blog.backToHome || 'Back to Blog'}
                    </Link>
                </div>

                {/* Decorative background elements */}
                <div className="fixed inset-0 overflow-hidden -z-10 opacity-5 pointer-events-none">
                    <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-purple-300 blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-red-300 blur-3xl" />
                </div>
            </div>
        </div>
    );
}