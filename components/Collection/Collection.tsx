"use client";

import React from "react";
import Image from "next/image";
import useOnScreen from "@/hooks/useOnScreen";
import { useLanguage } from "@/hooks/useLanguage";

const Collection = () => {
    const [ref, isVisible] = useOnScreen();
    const { t } = useLanguage();

    const collections = [
        { title: t.productCollections.categories.topSellers, image: "/img/best-seller.png" },
        { title: t.productCollections.categories.mushrooms, image: "/img/mushroom.png" },
        { title: t.productCollections.categories.herbalLattes, image: "/img/herbal-lattes.png" },
        { title: t.productCollections.categories.artisanTeas, image: "/img/artisan-teas.png" },
        { title: t.productCollections.categories.tinctureBlends, image: "/img/tinctuce.png" },
    ];

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[820px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 bg-[#fdf8f7]"
                }`}
        >
            {isVisible && (
                <div className="bg-[#fdf8f7] py-8">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-4xl  text-gray-800 mb-6 text-center">{t.productCollections.title}</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto">
                            <div className="relative rounded-lg overflow-hidden shadow-lg lg:col-span-1 lg:row-span-2 transition-transform duration-300 hover:scale-105">
                                <img
                                    src={collections[0].image}
                                    alt={collections[0].title}
                                    width={600}
                                    height={300}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-50 transition duration-300 flex items-end p-4">
                                    <h3 className="text-white text-2xl font-bold">{collections[0].title}</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 lg:col-span-2">
                                {collections.slice(1).map((item, index) => (
                                    <div key={index} className="relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            width={300}
                                            height={150}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-50 transition duration-300 flex items-end p-4">
                                            <h3 className="text-white text-lg font-semibold">{item.title}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Collection;
