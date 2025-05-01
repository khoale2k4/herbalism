"use client";

import { useLanguage } from "@/hooks/useLanguage";
import React from "react";

type Props = {
    title: string;
    title2: string | null;
    descriptions: string[];
    videoUrl: string;
    button: string | null;
}

const VideoHeroSection = ({ title, title2 = null, button = null, descriptions, videoUrl }: Props) => {
    return (
        <div className="relative h-[75vh] overflow-hidden">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
            >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Content on top of the video */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-5xl font-bold text-white">{title}</h1>
                {title2 && <h1 className="text-5xl font-bold text-white">{title2}</h1>}
                {descriptions.map((des: string) => (
                    <p key={des} className="mt-4 max-w-2xl text-white">
                        {des}
                    </p>
                ))}
                {button && (
                    <button className="px-4 py-2 border border-white rounded-none transition duration-300 text-white hover:bg-[#c7b299] hover:text-black group flex items-center gap-2">
                        <span className="transition duration-300 group-hover:text-black">{button}</span>
                        <span className="opacity-0 translate-x-0 group-hover:opacity-100 group-hover:translate-x-1 transition duration-300 text-black">
                            →
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoHeroSection;