import React from 'react';

const WellnessCategoryCard = ({ item } : {item: Wellness}) => {
    return (
        <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <div className="relative overflow-hidden">
                <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="text-xl font-bold mb-2 transform translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {item.title}
                </h3>
                <a
                    href={item.link}
                    className="text-sm font-medium opacity-0 transform translate-y-4 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 inline-flex items-center"
                >
                    View Collection
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

const WellnessNeed = ({ShopByCategory}: {ShopByCategory: Wellness[]}) => {
    return (
        <section className="py-12 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <h2 className="text-3xl font-bold text-gray-800">Shop By Wellness Need</h2>
                <a
                    href="/all-categories"
                    className="text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-md transition-colors"
                >
                    View All Categories
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ShopByCategory.map(item => (
                    <WellnessCategoryCard key={item.id} item={item} />
                ))}
            </div>
        </section>
    );
};

export default WellnessNeed;