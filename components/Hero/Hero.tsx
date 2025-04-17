import useOnScreen from "@/hooks/useOnScreen";

type Props = {
    img_url: string;
    h1_content: string;
    p_content: string;
    button_text: string;
    onClick: () => void;
    loadOnScroll?: boolean;
}

const Hero = ({ img_url, h1_content, p_content, button_text, onClick, loadOnScroll = true }: Props) => {
    const [ref, isVisible] = useOnScreen();

    return (
        <section
            className="relative w-full h-[75vh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${img_url})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            <div
                ref={ref}
                className={`relative flex items-center justify-center overflow-hidden transition-opacity duration-700 min-h-[700px] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                {(loadOnScroll || isVisible) && (
                    <div className="relative text-center text-white p-8 rounded-lg max-w-lg">
                        <h1 className="text-6xl font-bold mb-4">{h1_content}</h1>
                        <p className="text-xl mb-6">{p_content}</p>
                        <button
                            className="px-6 py-3 bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 transition"
                            onClick={onClick}
                        >
                            {button_text}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
