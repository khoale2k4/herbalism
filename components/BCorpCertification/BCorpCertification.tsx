import React from 'react';

type Props = {
    img_url: string;
    bg_color: string;
    title: string;
    description: string;
    button_text: string;
    onClick: () => void;
};

const BCorpCertification = ({
    img_url,
    bg_color,
    title,
    description,
    button_text,
    onClick,
}: Props) => {
    return (
        <div 
            className="flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden"
            style={{ backgroundColor: bg_color }}
        >
            <div className="flex-1 flex items-center justify-center relative p-6 md:p-10">
                <div className="relative overflow-hidden rounded-xl">
                    <img
                        src={img_url}
                        alt={title}
                        className="max-w-xs md:max-w-md object-contain transition-all duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 pointer-events-none"></div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-center p-6 md:p-10 space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
                <div className="w-20 h-1 bg-blue-200 rounded-full"></div>
                <p className="text-base md:text-lg leading-relaxed text-gray-700">{description}</p>
                <div className="pt-4">
                    <button
                        className="bg-blue-600 text-white rounded-lg py-3 px-6 font-medium shadow-sm hover:bg-blue-700 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 focus:outline-none transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2"
                        onClick={onClick}
                    >
                        <span>{button_text}</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BCorpCertification;