"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import useOnScreen from '@/hooks/useOnScreen';

export type VideoBannerProps = {
    title: string;
    description: string;
    description2: string | null;
    videoUrl: string;
    button: string | null;
    videoPos: 'left' | 'right';
    onClick: () => void
}

const VideoBanner = ({ title, button = null, description, description2 = null, videoUrl, videoPos = 'left', onClick }: VideoBannerProps) => {
    const [ref, isVisible] = useOnScreen();
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[400px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 bg-[#fdf8f7]"
                }`}
        >
            {isVisible && (
                <div className="relative w-full h-[50vh] overflow-hidden">
                    {/* Video background */}
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                    >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    {/* Overlay content */}
                    <div className={`relative z-10 flex justify-${videoPos === 'left' ? 'start' : 'end'} items-center h-full w-full bg-black/30`}>
                        <motion.div
                            initial={{ scale: 1, opacity: 1, y: 500 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: 'easeOut' }}
                            className={`bg-white p-6 shadow-xl max-w-sm m${videoPos === 'left' ? 'l' : 'r'}-10`}
                        >
                            <h2 className="text-xl font-bold mb-2">{title}</h2>
                            <p className="mb-4 text-gray-700">{description}</p>
                            {description2 && <p className="mb-4 text-gray-700">{description2}</p>}
                            {button && <button
                                onClick={onClick}
                                className="px-5 py-2.5 border border-white rounded-none text-white relative overflow-hidden group bg-[#3e4f3d]"
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

                                <div className={`
        absolute top-0 left-0 w-full h-full bg-[#3e4f3d] transform transition-transform duration-300 ease-out
        ${isHovered ? 'translate-x-0' : '-translate-x-full'}
      `}></div>
                            </button>}
                        </motion.div>
                    </div>
                </div>)}
        </div>
    );
};

export default VideoBanner;
