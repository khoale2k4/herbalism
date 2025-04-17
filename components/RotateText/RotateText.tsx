"use client";

import { motion } from "framer-motion";
import React from "react";

const RotatingText = ({ text = "This is a rotating text effect!", radius = 30 }) => {
    const textArray = text.split("");

    return (
        <div className="relative flex items-center justify-center">
            <motion.svg
                viewBox="0 0 200 200"
                className="w-[200px] h-[200px]"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
                <path
                    id="circlePath"
                    d={`M 100,100 m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                    fill="none"
                />
                <text fill="black" fontSize="14">
                    <textPath href="#circlePath" startOffset="2%">
                        {textArray}
                    </textPath>
                </text>
            </motion.svg>
        </div>
    );
};

export default RotatingText;
