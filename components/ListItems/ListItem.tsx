"use client";

import React from "react";
import NewProductComponent from "./Product";
import ImageHoverComponent from "../Item/Item";
import useOnScreen from "@/hooks/useOnScreen";

const ListItems = () => {
    const [ref, isVisible] = useOnScreen();

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[700px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 bg-[#fdf8f7]"
                }`}
        >
            {isVisible && (
                <div className="max-w-6xl mx-auto flex flex-col min-h-[700px] lg:flex-row items-center justify-center gap-6 p-4">
                    <div className="w-full lg:w-1/3">
                        <NewProductComponent />
                    </div>

                    <div className="overflow-x-auto scroll-smooth p-2">
                        <div className="flex space-x-4">
                            <ImageHoverComponent />
                            <ImageHoverComponent />
                            <ImageHoverComponent />
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default ListItems;
