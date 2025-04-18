import React from 'react';

type ServiceInfoItem = {
    id: number;
    icon_url: string;
    title: string;
    description: string;
};

type Props = {
    items: ServiceInfoItem[];
};

const ServiceInfo = ({ items }: Props) => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-6">
                {/* Thay đổi từ grid sang flex để cho phép cuộn ngang */}
                <div className="flex overflow-x-auto space-x-6">
                    {items.map(item => (
                        <div
                            key={item.id}
                            className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative min-w-[200px] flex-shrink-0" // Đảm bảo mỗi item có chiều rộng tối thiểu
                        >
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>

                            <div className="flex items-start mb-4">
                                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-300">
                                    <img
                                        src={item.icon_url}
                                        alt={item.title}
                                        className="h-8 w-8 object-contain transition-all duration-300 group-hover:scale-110"
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <div className="w-8 h-1 bg-blue-500 mt-2 mb-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceInfo;