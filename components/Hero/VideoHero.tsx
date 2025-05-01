"use client";

import React from "react";

export type VideoHeroProps = {
    title: string;
    title2: string | null;
    descriptions: string[];
    videoUrl: string;
    button: string | null;
    onClick: () => void;
}

const VideoHeroSection = ({ title, title2 = null, button = null, descriptions, videoUrl, onClick }: VideoHeroProps) => {
    const [isHovered, setIsHovered] = React.useState(false);
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
                <button
                    className="px-5 py-2.5 border border-white rounded-none text-white relative overflow-hidden group"
                    onClick={onClick}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative z-10 flex items-center justify-between w-full">
                        <span className={`font-medium transition-all duration-300 ${isHovered ? 'text-black' : 'text-white'}`}>
                            {button}
                        </span>

                        <span
                            className={`
            inline-flex items-center justify-center overflow-hidden transition-all duration-500
            ${isHovered ? 'max-w-[32px] opacity-100 translate-x-0 text-black ml-2' : 'max-w-0 opacity-0 -translate-x-2'}
        `}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-2 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                            </svg>
                        </span>
                    </div>

                    {/* Background slide effect */}
                    <div className={`
        absolute top-0 left-0 w-full h-full bg-[#c7b299] transform transition-transform duration-300 ease-out
        ${isHovered ? 'translate-x-0' : '-translate-x-full'}
      `}></div>
                </button>
            </div>
        </div>
    );
};

export default VideoHeroSection;