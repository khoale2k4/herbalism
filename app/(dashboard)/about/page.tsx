import { FC, useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import OurPeople from "./components/OurPeople";
import Image from 'next/image';
import VideoHeroSection from "./components/VideoHero";
type Props = {};

export const metadata = {
  title: 'About | Herbalism',
  description: 'Bạn có câu hỏi hoặc cần hỗ trợ? Liên hệ với Herbalism ngay để được tư vấn nhanh chóng và tận tâm.',
};

const AboutPage: FC<Props> = () => {
  return (
    <div>
      <VideoHeroSection />
      <OurPeople />
      <OurPeople description="Nestled in beautiful Cumberland, BC, Harmonic Arts is a family-owned plant medicine company devoted to supporting the health of people and the planet. In 2009, clinical herbalists Yarrow and Angela Willard identified a gap in the availability of high-quality, herbalist-formulated plant medicines. Guided by their belief in accessible herbalism, they began crafting potent, effective, and easy-to-use herbal products.
Inspired by the natural abundance of Vancouver Island, the Willards' passion for plant medicine leads us in developing innovative herbal formulas to nurture you on your path to wellness." title="Our Story" imagePosition="left" />
      <OurPeople description="We're proud to be Certified Green through the Vancouver Island Business Collective. Sustainable action starts in-house, and we’ve implemented processes that are good for the planet and for our team.
We’ve cultivated a working environment that is safe, fair, and centered on growth and support. Our skilled operations team intentionally handmakes and packages many of your favourite products within our facility." title="Our Process" imagePosition="right" imageUrl="/img/our-process.png" />
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

export default AboutPage;
