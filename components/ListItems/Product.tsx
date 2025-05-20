"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";

const NewProductComponent = ({ imageUrl, name }: { imageUrl: string, name: string }) => {
    const { t } = useLanguage();
    const router = useRouter();

    return (
        <div className="flex-shrink-0 w-full">
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                    src={imageUrl === "" ? "/img/placeholder.png" : imageUrl}
                    alt="New Product"
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover sm:h-48"
                />

                <div className="p-4 text-left">
                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                    <p className="mt-2 text-gray-600">
                        {t.newProduct.description}
                    </p>
                    <button
                        className="mt-4 w-full bg-[#3e4f3d] hover:bg-[#747c61] text-white px-4 py-2 rounded-full transition-all duration-300 ease-in-out"
                        onClick={() => { router.push('/shop') }}
                    >
                        {t.newProduct.button}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProductComponent;
