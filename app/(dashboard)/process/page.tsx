import { FC, useEffect, useRef, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import OurPeople from "./components/OurPeople";
import Image from 'next/image';
import VideoHeroSection from "./components/VideoHero";
import OurProcess from "./OurProcess";
type Props = {};

export const metadata = {
  title: 'Our process | Herbalism',
  description: 'Bạn có câu hỏi hoặc cần hỗ trợ? Liên hệ với Herbalism ngay để được tư vấn nhanh chóng và tận tâm.',
};

const ProcessPage: FC<Props> = () => {
  return (
    <OurProcess/>
  );
};

export default ProcessPage;
