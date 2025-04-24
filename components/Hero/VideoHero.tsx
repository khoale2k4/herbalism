"use client";

import useOnScreen from "@/hooks/useOnScreen";
import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

const VideoHeroSection = () => {
    const [ref, isVisible] = useOnScreen();
    const { t } = useLanguage();

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[700px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            {isVisible && (
                <div className="relative h-[700px] overflow-hidden">
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                    >
                        <source src="https://forest-herbalism.b-cdn.net/forest.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                        <h1 className="text-5xl font-bold">{t.featured.title}</h1>
                        <p className="mt-4 max-w-2xl">
                            {t.featured.subtitle}
                        </p>
                        <button className="mt-6 bg-[#5c652c] hover:bg-[#747c61] text-white px-6 py-2 rounded-full transition duration-300">
                            {t.featured.learnMore}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoHeroSection;
