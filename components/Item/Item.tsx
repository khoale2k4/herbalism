"use client";

import React from "react";
import Image from "next/image";
import { formatPrice } from "@/app/utils/format-currency";

type Props = {
    title: string;
    images: string[];
    price: number;
}

const ImageHoverComponent = ({ title, images, price }: Props) => {
    return (
        <div className="relative w-[250px] sm:w-[280px] md:w-[300px] mx-auto overflow-hidden rounded-lg border shadow-lg group">
            <div className="relative">
                {images && images.length >= 1 && <img
                    src={images[0]}
                    alt="First Image"
                    width={300}
                    height={400}
                    className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                />}

                {images && images.length >= 2 && <div className="absolute inset-0 bg-white transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100 flex items-center justify-center">
                    <img
                        src={images[1]}
                        alt="Second Image"
                        width={300}
                        height={400}
                        className="w-full h-full object-cover"
                    />
                </div>}
            </div>

            <div className="p-4 text-center bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <div className="flex justify-center">
                    <span>⭐⭐⭐⭐⭐</span>
                    <span className="ml-2 text-gray-600">(3)</span>
                </div>
                <p className="mt-2 text-[#3e4f3d]  font-semibold">From {formatPrice(price)}</p>
            </div>
        </div>
    );
};

export default ImageHoverComponent;
