"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/app/utils/format-currency";
import { useLanguage } from "@/hooks/useLanguage";

interface RelatedProductsProps {
    products: Product[];
    currentProductId?: string; // Sản phẩm hiện tại (để loại trừ khỏi danh sách)
    limit?: number; // Giới hạn số lượng sản phẩm hiển thị
    showRating?: boolean; // Hiển thị đánh giá sao
    autoScroll?: boolean; // Tự động cuộn carousel
    variant?: "product" | "cart"; // Các biến thể hiển thị
}

export default function RelatedProducts({
    products,
    currentProductId,
    limit = 8,
    showRating = true,
    autoScroll = false,
    variant = "product",
}: RelatedProductsProps) {
    const filteredProducts = currentProductId
        ? products.filter(product => product.id !== currentProductId).slice(0, limit)
        : products.slice(0, limit);

    const [currentSlide, setCurrentSlide] = useState(0);
    const maxSlides = Math.ceil(filteredProducts.length / (variant === "product" ? 2 : 4)) - 1;
    const slideRef = useRef<HTMLDivElement>(null);

    const scrollToSlide = (slideIndex: number) => {
        if (slideRef.current) {
            setCurrentSlide(slideIndex);
            const slideWidth = slideRef.current.clientWidth;
            slideRef.current.scrollTo({
                left: slideWidth * slideIndex,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        if (!autoScroll || maxSlides <= 0) return;

        const interval = setInterval(() => {
            const nextSlide = currentSlide >= maxSlides ? 0 : currentSlide + 1;
            scrollToSlide(nextSlide);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoScroll, currentSlide, maxSlides]);

    useEffect(() => {
        const current = slideRef.current;
        if (!current) return;

        const handleScroll = () => {
            if (current) {
                const slideWidth = current.clientWidth;
                const scrollPosition = current.scrollLeft;
                const newSlide = Math.round(scrollPosition / slideWidth);
                if (newSlide !== currentSlide) {
                    setCurrentSlide(newSlide);
                }
            }
        };

        current.addEventListener("scroll", handleScroll);
        return () => current.removeEventListener("scroll", handleScroll);
    }, [currentSlide]);

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating)
                            ? "text-yellow-400"
                            : i < rating
                                ? "text-yellow-300"
                                : "text-gray-300"
                            }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                        />
                    </svg>
                ))}
                <span className="ml-1 text-xs text-gray-500">
                    ({rating.toFixed(1)})
                </span>
            </div>
        );
    };

    if (filteredProducts.length === 0) {
        return null;
    }

    const getVariantClasses = () => {
        switch (variant) {
            case "cart":
                return {
                    container: "p-4 rounded-lg",
                    heading: "text-lg font-medium mb-3",
                    productGrid: "grid grid-cols-2 md:grid-cols-4 gap-3",
                    productCard: "bg-gray-50 rounded-md hover:shadow-md p-2",
                    imageContainer: "aspect-square mb-2",
                    productName: "text-sm line-clamp-1",
                    priceContainer: "flex items-baseline gap-1",
                };
            default:
                return {
                    container: "",
                    heading: "text-xl font-semibold mb-4",
                    productGrid: "relative flex snap-x overflow-x-auto scrollbar-hide gap-4 pb-2",
                    productCard: "min-w-[240px] flex-shrink-0 snap-start rounded-lg hover:shadow-md transition-shadow bg-white",
                    imageContainer: "aspect-[4/3] mb-3 overflow-hidden rounded-t-lg",
                    productName: "font-medium text-gray-800 line-clamp-1 hover:text-green-900",
                    priceContainer: "flex items-baseline gap-2 mt-1",
                };
        }
    };

    const classes = getVariantClasses();

    return (
        <div className={classes.container}>
            <div
                ref={slideRef}
                className={classes.productGrid}
                style={
                    variant === "product"
                        ? { scrollbarWidth: "none", msOverflowStyle: "none" }
                        : undefined
                }
            >
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {variant === "product" && maxSlides > 0 && (
                <div className="flex justify-center mt-4">
                    <div className="flex space-x-2">
                        {[...Array(maxSlides + 1)].map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${currentSlide === index
                                    ? "bg-green-900 w-6"
                                    : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                onClick={() => scrollToSlide(index)}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    const { t } = useLanguage();
    const mainImage = product.images && product.images.length > 0 ? product.images[0]?.url : '/img/placeholder.png';

    return (
        <Link
            href={`/shop/${product.slug}`}
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full group"
        >
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={mainImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center mb-2">
                    <div className="flex items-center text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <svg
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(product.rate) ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="ml-1 text-xs font-medium text-gray-600">
                            ({product.rate.toFixed(1)})
                        </span>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#3e4f3d] transition-colors">
                    {product.name}
                </h3>
                <div className="mt-auto pt-3 flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-900">
                        {formatPrice(product.price)}
                    </span>
                </div>
            </div>
        </Link>
    );
}