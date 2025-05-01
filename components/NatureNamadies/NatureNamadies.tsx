"use client";

import useOnScreen from "@/hooks/useOnScreen";
import React from "react";

const videos = [
    {
        id: 1,
        src: "https://www.youtube.com/embed/your-video-id-1?autoplay=1&mute=1", // Thay bằng ID video thật
        title: "Mushroom Champion",
    },
    {
        id: 2,
        src: "https://www.youtube.com/embed/your-video-id-2?autoplay=1&mute=1", // Thay bằng ID video thật
        title: "This means all",
    },
    {
        id: 3,
        src: "https://www.youtube.com/embed/your-video-id-3?autoplay=1&mute=1", // Thay bằng ID video thật
        title: "Matcha mind and spirit",
    },
    {
        id: 4,
        src: "https://www.youtube.com/embed/your-video-id-4?autoplay=1&mute=1", // Thay bằng ID video thật
        title: "Mushroom powder boost",
    },
    {
        id: 5,
        src: "https://www.youtube.com/embed/your-video-id-4?autoplay=1&mute=1", // Thay bằng ID video thật
        title: "Mushroom powder boost",
    },
    {
        id: 6,
        src: "https://www.youtube.com/embed/your-video-id-4?autoplay=1&mute=1", // Thay bằng ID video thật
        title: "Mushroom powder boost",
    },
    // Thêm video khác nếu cần
];

const NatureRemedies = () => {
    const [ref, isVisible] = useOnScreen();

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[700px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            {isVisible && (
                <div className="bg-[#3e4f3d] py-16 px-8">
                    <h2 className="text-left text-3xl  text-white mb-2">
                        YOUR REVIEWS AND CREATIONS:
                    </h2>
                    <h3 className="text-left text-2xl font-semibold text-green-100 mb-6">
                        Nature's Remedies
                    </h3>
                    <div className="overflow-x-auto">
                        <div className="flex space-x-6">
                            {videos.map(video => (
                                <div key={video.id} className="min-w-[320px] flex-shrink-0">
                                    <iframe
                                        width="320"
                                        height="480"
                                        src={video.src}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="autoplay; encrypted-media"
                                        allowFullScreen
                                        className="rounded-xl shadow-xl"
                                    ></iframe>
                                    <h4 className="mt-3 text-left text-white font-medium">
                                        {video.title}
                                    </h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default NatureRemedies;
