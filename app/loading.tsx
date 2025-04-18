'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CustomLoadingElement() {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    // Show content with a slight delay for smooth animation
    setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Clear interval when progress reaches 100%
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center dark:text-white bg-white dark:bg-[#3a3b3c] overflow-hidden">
      <div className={`flex flex-col items-center transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Logo with pulse animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-500 dark:bg-blue-400"
            style={{ animationDuration: '2s' }}></div>
          <div className="relative">
            <Image
              src="/Logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="animate-bounce"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading text with typing effect */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
            {progress < 100 ? (
              <>
                <span>Đang tải</span>
                <span className="inline-flex w-5 overflow-hidden">
                  <span className="animate-typing">...</span>
                </span>
              </>
            ) : (
              <span className="text-green-600 dark:text-green-400">Đã sẵn sàng!</span>
            )}
          </p>
        </div>

        {/* Loading message */}
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 max-w-xs text-center px-4">
          {progress < 30 ? "Đang khởi tạo..." :
            progress < 60 ? "Đang tải dữ liệu..." :
              progress < 90 ? "Chuẩn bị hoàn tất..." :
                "Đang chuyển hướng..."}
        </p>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes typing {
          0% { content: ''; }
          25% { content: '.'; }
          50% { content: '..'; }
          75% { content: '...'; }
          100% { content: ''; }
        }
        .animate-typing::after {
          content: '';
          animation: typing 1.5s infinite;
        }
      `}</style>
    </div>
  );
}