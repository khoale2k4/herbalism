import React, { useEffect, useState, useRef } from "react";
import MadeInCanadaIcon from "../Icons/MadeinCanada";

interface MarqueeTextProps {
    words: string[];
    speed?: number; // Thời gian chạy hết một vòng (giây)
    separatorImage?: string; // Đường dẫn ảnh để ngăn cách các từ
    className?: string;
}

const MarqueeText: React.FC<MarqueeTextProps> = ({
    words,
    speed = 10,
    separatorImage = "/img/seperator.png",
    className = ""
}) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [offset, setOffset] = useState(0);
    const animationRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const contentWidthRef = useRef<number>(0);

    // Nhân đôi nội dung để tạo hiệu ứng lặp liên tục
    const duplicatedWords = [...words, ...words];

    useEffect(() => {
        if (!marqueeRef.current) return;
        const element = marqueeRef.current;
        contentWidthRef.current = element.scrollWidth / 2; // Chiều rộng của 1 lần lặp

        const step = (timestamp: number) => {
            if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;
            const elapsed = timestamp - lastTimestampRef.current;

            // Tính khoảng cách di chuyển dựa trên tốc độ
            const distance = (elapsed / (speed * 1000)) * contentWidthRef.current;

            setOffset((prevOffset) => {
                const newOffset = prevOffset - distance;
                if (newOffset < -contentWidthRef.current) return 0; // Reset khi hết vòng
                return newOffset;
            });

            lastTimestampRef.current = timestamp;
            if (!isHovered) animationRef.current = requestAnimationFrame(step);
        };

        if (!isHovered) {
            animationRef.current = requestAnimationFrame(step);
        }

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, [isHovered, speed]);

    return (
        <div
            className={`relative overflow-hidden h-16 bg-gray-50 flex items-center px-4 ${className} bg-[#f2f2f2]`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                lastTimestampRef.current = null;
            }}
        >
            <div
                ref={marqueeRef}
                className="whitespace-nowrap flex items-center gap-4"
                style={{ transform: `translateX(${offset}px)`, willChange: "transform" }}
            >
                {duplicatedWords.map((word, index) => (
                    <React.Fragment key={index}>
                        <span className="text-black-100 text-2xl  uppercase">
                            {word}
                        </span>
                        {index < duplicatedWords.length - 1 && (
                            <img
                                src={separatorImage}
                                alt="separator"
                                className="h-12 w-auto object-contain"
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default MarqueeText;