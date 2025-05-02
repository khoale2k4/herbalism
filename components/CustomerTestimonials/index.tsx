"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { QuoteIcon, Star, User } from "lucide-react";
import useOnScreen from "@/hooks/useOnScreen";

type Testimonial = {
    name: string;
    title: string;
    comment: string;
    rating?: number;
    avatar?: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Anna Nguyễn",
        title: "CEO, Green Co.",
        comment: "Sản phẩm tuyệt vời, đáp ứng mọi nhu cầu của doanh nghiệp chúng tôi. Chắc chắn tôi sẽ quay lại và giới thiệu cho đối tác!",
        rating: 5
    },
    {
        name: "Bình Trần",
        title: "Marketing Manager",
        comment: "Dịch vụ khách hàng rất tốt! Nhân viên luôn sẵn sàng hỗ trợ và giải quyết mọi vấn đề một cách nhanh chóng.",
        rating: 5
    },
    {
        name: "Chloe Lê",
        title: "Content Creator",
        comment: "Tôi yêu trải nghiệm mua sắm ở đây. Giao diện dễ sử dụng và sản phẩm chất lượng cao.",
        rating: 4
    },
    {
        name: "David Phạm",
        title: "Freelancer",
        comment: "Nhanh chóng và đáng tin cậy. Đã sử dụng dịch vụ nhiều lần và chưa bao giờ thất vọng.",
        rating: 5
    },
    {
        name: "Emma Võ",
        title: "UI/UX Designer",
        comment: "Thiết kế đẹp và dễ dùng. Tôi đặc biệt ấn tượng với sự chú ý đến từng chi tiết nhỏ.",
        rating: 4
    },
];

const CustomerTestimonials: React.FC = () => {
    const renderStars = (rating: number = 5) => {
        return (
            <div className="flex justify-center mt-2 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={16}
                        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                ))}
            </div>
        );
    };
    const [ref, isVisible] = useOnScreen();
    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[650px] !bg-[#fdf8f7] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            {isVisible && (
                <div className="w-full py-4 lg:py-24">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            {/* <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-3">
                        Phản hồi khách hàng
                    </span> */}
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                                Khách hàng nói gì về chúng tôi
                            </h2>
                            <p className="text-gray-600">
                                Chúng tôi tự hào về dịch vụ mà mình cung cấp và hạnh phúc khi nhận được những phản hồi tích cực từ khách hàng.
                            </p>
                        </div>

                        <div className="relative max-w-6xl mx-auto pb-4">
                            {/* Decorative elements */}
                            <div className="hidden md:block absolute -left-6 top-1/4 w-12 h-12 bg-blue-100 rounded-full opacity-60"></div>
                            <div className="hidden md:block absolute -right-6 bottom-1/4 w-20 h-20 bg-blue-100 rounded-full opacity-60"></div>
                            <div className="hidden md:block absolute left-1/4 bottom-0 w-8 h-8 bg-yellow-100 rounded-full opacity-60"></div>

                            <Swiper
                                modules={[Autoplay, Pagination, EffectCoverflow]}
                                effect="coverflow"
                                coverflowEffect={{
                                    rotate: 0,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 2.5,
                                    slideShadows: false,
                                }}
                                slidesPerView={1}
                                spaceBetween={30}
                                centeredSlides={true}
                                loop={true}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                speed={800}
                                pagination={{
                                    clickable: true,
                                    bulletClass: 'swiper-pagination-bullet !bg-green-900 !opacity-100 !mx-1',
                                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-green-900 !w-3 !h-3'
                                }}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 1.5,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                }}
                                className="pb-12"
                            >
                                {testimonials.map((testimonial, index) => (
                                    <SwiperSlide key={index}>
                                        {({ isActive }) => (
                                            <div
                                                className={`transition-all duration-500 p-8 rounded-2xl shadow-lg bg-white text-center border-2 group hover:cursor-pointer
                      ${isActive
                                                        ? "scale-90 shadow-2xl border-[#3e4f3d] z-20 -translate-y-4"
                                                        : "scale-90 opacity-70 border-transparent z-10"
                                                    }`}
                                            >
                                                <div className="relative mb-6">
                                                    <QuoteIcon
                                                        size={32}
                                                        className="mx-auto text-[#3e4f3d] mb-4 mt-4"
                                                    />
                                                </div>

                                                <p className="text-gray-700 mb-6 min-h-[80px]">"{testimonial.comment}"</p>

                                                <div className="pt-4 border-t border-gray-100">
                                                    <p className="text-lg font-semibold text-[#3e4f3d]">{testimonial.name}</p>
                                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                                </div>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default CustomerTestimonials;