"use client";

import { useLanguage } from "@/hooks/useLanguage";
import React from "react";

const VideoHeroSection = () => {
    const {t} = useLanguage();
    return (
        <div className="relative h-[50vh] overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
            >
                <source src="/vid/forest.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Content on top of the video */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-5xl font-bold">{t.about.title}</h1>
                <p className="mt-4 max-w-2xl">
                {t.about.description}
                </p>
            </div>
        </div>
    );
};

export default VideoHeroSection;