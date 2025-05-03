"use client";

import React from "react";
import Image from "next/image";

const ImageHoverComponent = () => {
    return (
        <div className="relative w-[250px] sm:w-[280px] md:w-[300px] mx-auto overflow-hidden rounded-lg border shadow-lg group">
            <div className="relative">
                <Image
                    src="/img/tinture_1.png"
                    alt="First Image"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                />

                <div className="absolute inset-0 bg-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <Image
                        src="/img/tinture_2.png"
                        alt="Second Image"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="p-4 text-center bg-white">
                <h3 className="text-lg font-semibold text-gray-800">Klear Kidney Tincture</h3>
                <p className="text-gray-600">Support Your Internal Waterways</p>
                <div className="flex justify-center">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="ml-2 text-gray-600">(3)</span>
                </div>
                <p className="mt-2 text-[#3e4f3d]  font-semibold">From $22.49 CAD</p>
            </div>
        </div>
    );
};

export default ImageHoverComponent;
