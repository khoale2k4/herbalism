"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { QuoteIcon, Star, User } from "lucide-react";
import useOnScreen from "@/hooks/useOnScreen";
import { useLanguage } from "@/hooks/useLanguage";

type Testimonial = {
    name: string;
    title: string;
    comment: string;
    rating?: number;
    avatar?: string;
};

const testimonials: Testimonial[] = [
    {
        name: "Christine",
        title: "Connect has been a game-changer!",
        comment:
            "Connect has been a game-changer for my meditation practice. On those days when I just can’t switch off the mental chatter after a hectic day, it helps me find my calm. It has also been a lifesaver on restless nights when my mind is racing with a million thoughts. I absolutely love this product!",
        rating: 5
    },
    {
        name: "Amanda",
        title: "The difference is incredible",
        comment:
            "I’ve been using the Lion’s Mane tincture daily for about 2-3 weeks, and the difference is incredible. The brain fog I struggled with is completely gone, my daily headaches have disappeared, and my mind feels clearer and calmer, a true blessing for someone with OCD. I feel more motivated, focused, and confident in my decisions. This has been a game-changer!",
        rating: 5
    },
    {
        name: "Daniel",
        title: "Calm energy every day",
        comment:
            "I've been using this Spagyric Ashwagandha for a few weeks and truly feel a difference. It helps me stay calm and focused throughout the day without feeling drowsy. The natural extraction method gives it a clean, earthy taste, and I appreciate the balance it brings to my mood and energy. Highly recommend for anyone seeking a natural stress reliever.",
        rating: 5
    },
    {
        name: "Christine",
        title: "Connect has been a game-changer!",
        comment:
            "Connect has been a game-changer for my meditation practice. On those days when I just can’t switch off the mental chatter after a hectic day, it helps me find my calm. It has also been a lifesaver on restless nights when my mind is racing with a million thoughts. I absolutely love this product!",
        rating: 5
    },
    {
        name: "Amanda",
        title: "The difference is incredible",
        comment:
            "I’ve been using the Lion’s Mane tincture daily for about 2-3 weeks, and the difference is incredible. The brain fog I struggled with is completely gone, my daily headaches have disappeared, and my mind feels clearer and calmer, a true blessing for someone with OCD. I feel more motivated, focused, and confident in my decisions. This has been a game-changer!",
        rating: 5
    },
    {
        name: "Daniel",
        title: "Calm energy every day",
        comment:
            "I've been using this Spagyric Ashwagandha for a few weeks and truly feel a difference. It helps me stay calm and focused throughout the day without feeling drowsy. The natural extraction method gives it a clean, earthy taste, and I appreciate the balance it brings to my mood and energy. Highly recommend for anyone seeking a natural stress reliever.",
        rating: 5
    },
    // {
    //     name: "David Phạm",
    //     title: "Freelancer",
    //     comment:
    //         "Fast and reliable. I’ve used the service many times and have never been disappointed.",
    //     rating: 5
    // },
    // {
    //     name: "Emma Võ",
    //     title: "UI/UX Designer",
    //     comment:
    //         "Thiết kế đẹp và dễ dùng. Tôi đặc biệt ấn tượng với sự chú ý đến từng chi tiết nhỏ.",
    //     rating: 4
    // }
];

const CustomerTestimonials: React.FC = () => {
    const { t } = useLanguage();
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
                                {t.customer.title}
                            </h2>
                            <p className="text-gray-600">
                                {t.customer.description}
                            </p>
                        </div>

                        <div className="relative max-w-6xl mx-auto pb-4">
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