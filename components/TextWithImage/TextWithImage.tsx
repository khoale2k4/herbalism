import useOnScreen from "@/hooks/useOnScreen";

const TextWithImage = ({
    title = "Our People",
    description = "At Harmonic Arts, our people are our strength and the embodiment of our collective mission. Each team member plays a vital role in maintaining the purity and integrity of our products and upholding our core values.",
    imageUrl = "/img/out-people.png",
    imageAlt = "Harmonic Arts Team",
    imagePosition = "right",
    backgroundOffset = "green-100"
}) => {
    const [ref, isVisible] = useOnScreen();

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden transition-opacity duration-700 min-h-[700px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
        >
            {isVisible && (
                <section className="relative py-16 px-4 md:px-8 lg:px-16 flex items-center">
                    <div className="absolute inset-0 pointer-events-none">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 500 500"
                            className="absolute top-0 left-0 w-full h-full opacity-10"
                        >
                            <path
                                d="M250 50 Q350 150, 250 250 Q150 350, 250 450"
                                fill="none"
                                stroke="#E0E0E0"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M50 250 Q150 350, 250 250 Q350 150, 450 250"
                                fill="none"
                                stroke="#E0E0E0"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div className={`container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${imagePosition === 'left' ? 'md:grid-cols-[1fr_auto]' : ''}`}>
                        <div className={`order-2 ${imagePosition === 'left' ? 'md:order-1 md:pr-12' : 'md:order-2 md:pl-12'}`}>
                            <h2 className="text-4xl  text-gray-800 mb-6">{title}</h2>
                            <p className="text-gray-600 leading-relaxed">{description}</p>
                        </div>

                        <div className={`relative order-1 ${imagePosition === 'left' ? 'md:order-2' : 'md:order-1'}`}>
                            <div className="relative z-10">
                                <img
                                    src={imageUrl}
                                    alt={imageAlt}
                                    className="rounded-xl shadow-lg object-cover w-full h-[500px] relative z-20"
                                />
                                <div
                                    className={`absolute -bottom-4 ${imagePosition === 'right' ? '-right-4' : '-left-4'} w-full h-full bg-${backgroundOffset} rounded-xl z-10`}
                                ></div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default TextWithImage;