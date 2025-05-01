import { useState, useEffect, useRef } from 'react';
import useOnScreen from "@/hooks/useOnScreen";

export type HeroImageProps = {
    images: string[];  // Mảng các URL hình ảnh
    h1_content: string;
    p_content: string[];
    button_text: string;
    onClick: () => void;
    autoplaySpeed?: number; // Tốc độ chuyển ảnh (ms)
    loadOnScroll?: boolean;
}

const HeroImage = ({
    images,
    h1_content,
    p_content,
    button_text,
    onClick,
    autoplaySpeed = 5000,
    loadOnScroll = true
}: HeroImageProps) => {
    const [ref, isVisible] = useOnScreen();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Xử lý carousel tự động
    useEffect(() => {
        if (isVisible && images.length > 1) {
            autoplayTimerRef.current = setInterval(() => {
                setIsTransitioning(true);
                setTimeout(() => {
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                    setIsTransitioning(false);
                }, 500); // Thời gian fade
            }, autoplaySpeed);
        }

        return () => {
            if (autoplayTimerRef.current) {
                clearInterval(autoplayTimerRef.current);
            }
        };
    }, [isVisible, images.length, autoplaySpeed]);

    // Chỉ render nếu có ít nhất 1 hình
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <section ref={ref} className="relative w-full h-[75vh] overflow-hidden">
            {/* Hình ảnh nền với hiệu ứng chuyển tiếp */}
            {(loadOnScroll || isVisible) && images.map((img, index) => (
                <div
                    key={img}
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex && !isTransitioning ? 'opacity-100' : 'opacity-0'
                        }`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}

            {/* Lớp overlay */}
            {/* <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div> */}

            {/* Nội dung */}
            <div className={`relative h-full flex flex-col items-center justify-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}>
                {(loadOnScroll || isVisible) && (
                    <>
                        <div className="text-center text-white px-6 max-w-2xl mx-auto">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{h1_content}</h1>
                            {p_content.map((content: string) => { return <p key={content} className="text-lg md:text-xl mb-8 opacity-90">{content}</p> })}

                        </div>
                        <button
                            className="px-5 py-2.5 border border-white rounded-none text-white relative overflow-hidden group"
                            onClick={onClick}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="relative z-10 flex items-center justify-between w-full">
                                <span className={`font-medium transition-all duration-300 ${isHovered ? 'text-black' : 'text-white'}`}>
                                    {button_text}
                                </span>

                                <span
                                    className={`
            inline-flex items-center justify-center overflow-hidden transition-all duration-500
            ${isHovered ? 'max-w-[32px] opacity-100 translate-x-0 text-black ml-2' : 'max-w-0 opacity-0 -translate-x-2'}
        `}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 ml-2 transition-transform duration-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </span>
                            </div>

                            {/* Background slide effect */}
                            <div className={`
        absolute top-0 left-0 w-full h-full bg-[#c7b299] transform transition-transform duration-300 ease-out
        ${isHovered ? 'translate-x-0' : '-translate-x-full'}
      `}></div>
                        </button>
                    </>
                )}
            </div>

            {/* Chỉ số carousel */}
            {images.length > 1 && (
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white scale-110' : 'bg-white bg-opacity-50'
                                }`}
                            onClick={() => {
                                setIsTransitioning(true);
                                setTimeout(() => {
                                    setCurrentImageIndex(index);
                                    setIsTransitioning(false);
                                }, 500);
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default HeroImage;