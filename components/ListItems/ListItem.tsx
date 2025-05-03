"use client";

import React from "react";
import NewProductComponent from "./Product";
import ImageHoverComponent from "../Item/Item";
import useOnScreen from "@/hooks/useOnScreen";

const ListItems = () => {
    const [ref, isVisible] = useOnScreen();

    return (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 pb-4 px-4">
            <div className="w-full lg:w-1/3">
                <NewProductComponent />
            </div>

            <div className="w-full lg:w-2/3 overflow-x-auto scroll-smooth p-2">
                <div className="flex space-x-4 min-w-max">
                    <div className="min-w-[250px]">
                        <ImageHoverComponent />
                    </div>
                    <div className="min-w-[250px]">
                        <ImageHoverComponent />
                    </div>
                    <div className="min-w-[250px]">
                        <ImageHoverComponent />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ListItems;
