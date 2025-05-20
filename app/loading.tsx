// CustomLoadingElement.tsx
'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";

export default function CustomLoadingElement() {
  const [progress, setProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const { t } = useLanguage();
  const translations = t.customLoadingTranslations;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 200);

    setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const getLoadingMessage = () => {
    if (progress < 30) return translations.loadingMessages.initializing;
    if (progress < 60) return translations.loadingMessages.loadingData;
    if (progress < 90) return translations.loadingMessages.almostDone;
    return translations.loadingMessages.redirecting;
  };

  return (
    <div className="w-full h-screen flex flex-col gap-4 justify-center items-center  bg-white  overflow-hidden">
      <div className={`flex flex-col items-center transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-500 "
            style={{ animationDuration: '2s' }}></div>
          <div className="relative">
            <img
              src="/img/logo-image.png"
              alt="Logo"
              width={80}
              height={80}
              className="animate-bounce"
              style={{ animationDuration: '2s' }}
            />
          </div>
        </div>

        <div className="w-64 h-1 bg-gray-200  rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="h-6 flex items-center justify-center">
          <p className="text-gray-600  text-sm font-medium">
            {progress < 100 ? (
              <>
                <span>{translations.statusText.loading}</span>
                <span className="inline-flex w-5 overflow-hidden">
                  <span className="animate-typing">{translations.animation.typingDots}</span>
                </span>
              </>
            ) : (
              <span className="text-[#6e7a34] ">{translations.statusText.ready}</span>
            )}
          </p>
        </div>

        <p className="text-gray-500  text-xs mt-2 max-w-xs text-center px-4">
          {getLoadingMessage()}
        </p>
      </div>

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