'use client';

import Image from "next/image";
import ImageBanner, { ImageBannerProps } from "@/components/Banner/imageBanner";
import VideoBanner, { VideoBannerProps } from "@/components/Banner/videoBanner";
import { FC } from "react";
import VideoHeroSection, { VideoHeroProps } from "../../components/Hero/VideoHero";
import CustomerTestimonials from "@/components/CustomerTestimonials";
import DifferenceSection from "@/components/Difference/Difference";
import WellnessCollections from "@/components/WellnessCollection/WellnessCollection";
import ListItems from "@/components/ListItems/ListItem";
import { useLanguage } from "@/hooks/useLanguage";
import HeroImage, { HeroImageProps } from "@/components/Hero/Hero";
import { useRouter } from "next/navigation";
type Props = {};

const HomePage: FC<Props> = () => {
    const { t } = useLanguage();
    const router = useRouter();

    const vbProps: VideoBannerProps = {
        title: t.homeVideoBanner1.title,
        description: t.homeVideoBanner1.description1,
        videoUrl: "https://cdn.shopify.com/videos/c/o/v/8614b0aa6c06456bb99fe8f44dbd4943.mp4",
        button: null,
        description2: t.homeVideoBanner1.description2,
        videoPos: 'left',
        onClick: () => {}
    }

    const ibProps1: ImageBannerProps = {
        title: t.homeVideoBanner1.title,
        description: t.homeVideoBanner1.description1,
        imageUrl: "/img/herbalism-01.jpg",
        button: t.homeVideoBanner1.button,
        description2: t.homeVideoBanner1.description2,
        imagePos: "right",
        onClick: () => {
            router.push(`/blog`);
        }
    }

    const ibProps2: ImageBannerProps = {
        title: t.homeImageBanner1.title,
        description: t.homeImageBanner1.description1,
        imageUrl: "/img/enki-lab2.png",
        button: null,
        description2: null,
        imagePos: "left",
        onClick: () => {
            router.push(`/shop`);
        }
    }

    const videoHeroProps: VideoHeroProps = {
        button: t.banner.button,
        descriptions: [t.banner.description1],
        onClick: () => {
            router.push(`/shop`);
        },
        title: t.banner.welcome1,
        title2: null,
        videoUrl: "/vid/herbalism-spagyric-vietnam.mp4"
    }
    // HeroImageProps = {
    //     h1_content: t.banner.welcome1,
    //     p_content: [t.banner.description1],
    //     images: [
    //         '/img/herbalism-08.jpg',
    //         '/img/herbalism-09.jpg',
    //         '/img/herbalism-11.jpg',
    //         '/img/herbalism-12.jpg',
    //     ],
    //     button_text: "Shop now",
    //     onClick: () => { 
    //         router.push(`/shop`);
    //     }

    // }

    return <div className="relative w-full">
        <VideoHeroSection {...videoHeroProps} />
        <WellnessCollections />
        {/* <ListItems /> */}
        <ImageBanner {...ibProps1} />
        {/* <VideoBanner {...vbProps} /> */}
        <DifferenceSection />
        <ImageBanner {...ibProps2} />
        <CustomerTestimonials />
        <Image
            src="/img/footer-image.png"
            alt="Footer Image"
            width={1920}
            height={400}
            className="w-full h-auto object-cover"
        />
    </div>;
}

export default HomePage;