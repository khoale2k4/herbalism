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
                        className="px-8 py-2.5 bg-[#3e4f3d] hover:bg-[#747c61] text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg"
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