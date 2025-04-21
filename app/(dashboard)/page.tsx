"use client";

import Collection from "@/components/Collection/Collection";
import DifferenceSection from "@/components/Difference/Difference";
import Hero from "@/components/Hero/Hero";
import VideoHeroSection from "@/components/Hero/VideoHero";
import ImpactReport from "@/components/ImpactReport/ImpactReport";
import ListItems from "@/components/ListItems/ListItem";
import NatureRemedies from "@/components/NatureNamadies/NatureNamadies";
import WellnessCollections from "@/components/WellnessCollection/WellnessCollection";
import { FC, useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import ArticleCarousel from "@/components/ArticleCarousel/ArticleCarousel";
import BusinessForGood from "@/components/Business/Business";
import ServiceInfo from "@/components/ServiceInfoItem/ServiceInfoItem";
import TextWithImage from "@/components/TextWithImage/TextWithImage";
import RotatingText from "@/components/RotateText/RotateText";
import MarqueeText from "@/components/MarqueeText/MarqueeText";
import { useLanguage } from "@/hooks/useLanguage";
import Image from 'next/image';
type Props = {};

const HomePage: FC<Props> = () => {
  const { t } = useLanguage();

  const headingHeroProps = {
    img_url: '/img/hero-bg.png',
    h1_content: t.hero.title,
    p_content: t.hero.subtitle,
    button_text: t.hero.button,
    onClick: () => { }
  }

  const customerRewardProps = {
    img_url: '/img/cus-reward.png',
    h1_content: t.rewards.title,
    p_content: t.rewards.description,
    button_text: t.rewards.button,
    onClick: () => { }
  }

  const blogProps_1 = {
    imageUrl: "/img/mushroom-blog.png",
    title: "Anatomy of a Mushroom",
    description: "Our mushroom products contain 100% fruiting body as research shows it contains the highest levels of active compounds.",
    onClick: () => { }
  }

  const BCorp = {
    imageUrl: "/img/b-corp.png",
    title: "B Corp Certified",
    description: "As a company that is devoted to sharing the healing power of plant medicine, sustainable action is at the heart of what we do. Embarking on this B Corp journey has kept us accountable to our community, who values our commitment to ethical and sustainable sourcing, earth-friendly initiatives, and transparency. By cultivating a balance between people, planet, and profit, we're thrilled to announce that we are officially a certified B Corporation.",
    imagePosition: "left",
    onClick: () => { }
  }
  const articles = [
    {
      id: 1,
      title: "How to Use Herbs in Alignment with the Seasons",
      description: "Reconnect with nature by learning about the energetic properties of each season, and how to mirror this natural flow with the help of herbal medicine.",
      date: "December 31, 2024",
      img_url: "https://example.com/image1.jpg" // Thay bằng đường dẫn ảnh thật
    },
    {
      id: 2,
      title: "Get Back to Routine with Tincture Blends",
      description: "The busy fall season is right around the corner! Get back to routine with ease using the potent support of our therapeutic herbal Tincture Blends.",
      date: "August 1, 2024",
      img_url: "https://example.com/image2.jpg" // Thay bằng đường dẫn ảnh thật
    },
    {
      id: 3,
      title: "Herbs & Mushrooms for Travel Wellness",
      description: "Going on a trip this year? Explore herbal allies that work to fortify immunity, support digestive wellness, and soothe anxiety for comfortable travels.",
      date: "January 30, 2024",
      img_url: "https://example.com/image3.jpg" // Thay bằng đường dẫn ảnh thật
    },
    {
      id: 4,
      title: "Products to Support Your New Year’s Intentions",
      description: "What are your goals for 2024? Whether you want to learn a new skill or travel the globe, discover products that can support your new year’s intentions.",
      date: "December 15, 2023",
      img_url: "https://example.com/image4.jpg" // Thay bằng đường dẫn ảnh thật
    }
  ];

  const icons = [
    {
      id: 1,
      img_url: "/img/b-cer.png", // Thay bằng đường dẫn ảnh thật
      alt_text: "Certified B Corporation"
    },
    {
      id: 2,
      img_url: "/img/r-climate.png", // Thay bằng đường dẫn ảnh thật
      alt_text: "Climate Smart"
    },
    {
      id: 3,
      img_url: "/img/green-leader.png", // Thay bằng đường dẫn ảnh thật
      alt_text: "Green Leader"
    },
    {
      id: 4,
      img_url: "/img/one-percent.png", // Thay bằng đường dẫn ảnh thật
      alt_text: "1% For The Planet"
    }
  ];
  const services = [
    {
      id: 1,
      icon_url: "https://example.com/free-shipping-icon.png",
      title: t.shipping.title,
      description: t.shipping.description
    },
    {
      id: 2,
      icon_url: "https://example.com/customer-service-icon.png",
      title: t.customerService.title,
      description: t.customerService.description
    },
    {
      id: 3,
      icon_url: "https://example.com/refer-friend-icon.png",
      title: t.referFriend.title,
      description: t.referFriend.description
    },
    {
      id: 4,
      icon_url: "https://example.com/find-store-icon.png",
      title: t.findUs.title,
      description: t.findUs.description
    }
  ];


  return (
    <div className="flex flex-col w-full">
      <Hero {...headingHeroProps} />
      <WellnessCollections />
      <VideoHeroSection />
      <ListItems />
      <DifferenceSection />
      <Collection />
      <ImpactReport />
      <NatureRemedies />
      <Hero {...customerRewardProps} />
      <TextWithImage {...blogProps_1} />
      <TextWithImage {...BCorp} />
      <ArticleCarousel articles={articles} />
      <BusinessForGood
        icons={icons}
      />
      {/* <RotatingText/> */}
      {/* <ServiceInfo items={services} /> */}
      <div className="w-screen">
        <Image
          src="/img/footer-image.png"
          alt="Footer Image"
          width={1920} 
          height={400}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default HomePage;
