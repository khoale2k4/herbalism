import BlogPage from "../components/Article";
import Image from 'next/image';

export default function ViewBlogPage() {
    return (
        <div className="bg-[#fdf8f7]">
            <BlogPage />
            <div className="w-screen">
                <Image
                    src="/img/footer-image.png"
                    alt="Footer Image"
                    width={1920}
                    height={400}
                    className="object-cover"
                    priority
                />
            </div>
        </div>
    )
}