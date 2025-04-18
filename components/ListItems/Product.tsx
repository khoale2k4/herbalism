"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";

const NewProductComponent = () => {
    const { t } = useLanguage();

    return (
        <div className="flex-shrink-0 w-full">
            <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 ease-in-out hover:scale-105">
                <Image
                    src="/img/tinture_2.png"
                    alt="New Product"
                    width={300}
                    height={150}
                    className="w-full h-40 object-cover"
                />

                <div className="p-4 text-left">
                    <h3 className="text-xl font-semibold text-gray-800">{t.newProduct.title}</h3>
                    <p className="mt-2 text-gray-600">
                        {t.newProduct.description}
                    </p>
                    <button className="mt-4 w-full bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800 transition-all duration-300 ease-in-out">
                        {t.newProduct.button}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewProductComponent;
