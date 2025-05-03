"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { formatPrice } from "@/app/utils/format-currency";

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
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className={classes.productCard}
                    >
                        <div className={classes.imageContainer}>
                            <div className="relative w-full h-full">
                                {product.images.length > 0 && <Image
                                    src={product.images[0].url ?? ""}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover rounded"
                                />}
                            </div>
                        </div>

                        <div className="p-2">
                            <h4 className={classes.productName}>{product.name}</h4>

                            <div className={classes.priceContainer}>
                                <span className="font-medium text-gray-900">
                                    {formatPrice(product.price)}
                                </span>
                            </div>
                        </div>
                    </Link>
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