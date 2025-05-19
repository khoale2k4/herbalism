"use client";

import React from "react";
import Image from "next/image";
import useOnScreen from "@/hooks/useOnScreen";

const ImpactReport = () => {
    const [ref, isVisible] = useOnScreen();

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[820px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            {isVisible && (
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-8 py-24">
                <div className="flex-shrink-0">
                    <img
                        src="/img/impact-report.png"
                        alt="2024 Impact Report"
                        width={400}
                        height={600}
                        className="rounded-lg"
                    />
                </div>

                <div className="ml-6 mt-4 lg:mt-0 flex items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-600">GOOD FOR YOU, GOOD FOR THE PLANET</h3>
                        <h2 className="text-4xl  text-gray-800 mt-2">Our 2024 Impact Report is Here!</h2>
                        <p className="mt-4 text-gray-700">
                            We are committed to nurturing the connection between people and planet through our values-led initiatives. Driven by this purpose, we strive to stay rooted in nature and continuously prioritize regenerative actions that help us put the earth first. Read our 2024 Impact Report to learn about the intentional steps we took towards a healthier planet last year.
                        </p>
                        <button className="mt-6 bg-[#3e4f3d] text-white px-4 py-2 rounded hover:bg-[#747c61] transition duration-300">
                            READ NOW
                        </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    );
};

export default ImpactReport;
