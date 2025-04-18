import useOnScreen from '@/hooks/useOnScreen';
import React, { useState } from 'react';

type Article = {
    id: number;
    title: string;
    description: string;
    date: string;
    img_url: string;
};

type Props = {
    articles: Article[];
};

const ArticleCarousel = ({ articles }: Props) => {
    const [ref, isVisible] = useOnScreen();
    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[600px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 bg-[#fdf8f7]"
                }`}
        >
            {isVisible && (
        <section className="px-4 md:px-8 py-12 bg-[#fdf8f7]">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-gray-800">
                        Nourish With Nature
                    </h2>
                    <a
                        href="/all-articles"
                        className="text-sm md:text-base text-blue-600 hover:text-blue-800 font-medium flex items-center group"
                    >
                        VIEW ALL
                        <svg
                            className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>

                <div className="relative group">
                    <div
                        id="article-container"
                        className="flex overflow-x-scroll scrollbar-hide space-x-6 pb-6 scroll-smooth"
                        style={{ scrollSnapType: 'x mandatory' }}
                    >
                        {articles.map((article, index) => (
                            <div
                                key={article.id}
                                className="flex-shrink-0 w-72 md:w-80 lg:w-96 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                            >
                                <div className="relative">
                                    <img
                                        src={article.img_url}
                                        alt={article.title}
                                        className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
                                </div>
                                <div className="p-5 space-y-3">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2">{article.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs text-gray-500">{article.date}</span>
                                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                            Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>)}
        </div>
    );
};

export default ArticleCarousel;