'use client';

import useOnScreen from '@/hooks/useOnScreen';
import { useLanguage } from '@/hooks/useLanguage';
import React from 'react';

type Props = {
    icons: {
        id: number;
        img_url: string;
        alt_text: string;
        link?: string;
    }[];
};

const BusinessForGood = ({ icons }: Props) => {
    const [ref, isVisible] = useOnScreen();
    const { t } = useLanguage();

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[400px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 bg-[#fdf8f7]"
                }`}
        >
            {isVisible && (
                <section className="py-16 bg-[#fdf8f7] w-full">
                    <div className="container mx-auto">
                        <div className="max-w-4xl mx-auto text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-800 mb-6">
                                {t.businessForGood.title}
                            </h2>
                            <div className="w-20 h-1 bg-blue-300 rounded-full mx-auto mb-6"></div>
                            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                                {t.businessForGood.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                            {icons.map(icon => (
                                <div
                                    key={icon.id}
                                    className="flex items-center justify-center transform transition-all duration-300 hover:scale-110 opacity-80 hover:opacity-100 group"
                                >
                                    {icon.link ? (
                                        <a
                                            href={icon.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center"
                                        >
                                            <img
                                                src={icon.img_url}
                                                alt={icon.alt_text}
                                                className="h-16 md:h-20 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={icon.img_url}
                                            alt={icon.alt_text}
                                            className="h-16 md:h-20 w-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BusinessForGood;
