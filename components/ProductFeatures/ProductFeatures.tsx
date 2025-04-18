import React from 'react';

type Props = {
    img_url: string;
    bg_color: string;
    title: string;
    description: string;
    button_text: string;
    onClick: () => void;
};

const ProductFeatures = ({
    img_url,
    bg_color,
    title,
    description,
    button_text,
    onClick,
}: Props) => {
    return (
        <section
            className="flex flex-col md:flex-row rounded-xl shadow-lg overflow-hidden"
            style={{ backgroundColor: bg_color }}
        >
            <div className="flex-1 flex items-center justify-center p-6 md:p-8">
                <img 
                    src={img_url} 
                    alt={title} 
                    className="w-full h-auto max-w-md object-contain transition-transform hover:scale-105 duration-300" 
                />
            </div>
            <div className="flex-1 flex flex-col justify-center p-6 md:p-10 space-y-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">{title}</h2>
                <div className="w-16 h-1 bg-gray-300 rounded-full my-2"></div>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">{description}</p>
                <div className="pt-4">
                    <button
                        className="bg-green-600 text-white rounded-lg py-2.5 px-6 text-sm md:text-base font-medium shadow-sm hover:bg-green-700 hover:shadow-md focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none transition-all duration-200 transform hover:-translate-y-0.5"
                        onClick={onClick}
                    >
                        {button_text}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductFeatures;