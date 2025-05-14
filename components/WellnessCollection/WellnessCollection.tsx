"use client";

import { useLanguage } from "@/hooks/useLanguage";
import useOnScreen from "@/hooks/useOnScreen";
import Image from "next/image";
import { useRef } from "react";
import ListItems from "../ListItems/ListItem";
import { useRouter } from "next/navigation";

const WellnessCollections = ({ ids }: { ids: string[] }) => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useOnScreen();
  const router = useRouter();

  const collections = [
    {
      title: t.collections.items.immunity.label,
      image: "/img/mind-mood.png",
      icon: "\u2696\ufe0f",
    },
    {
      title: t.collections.items.stressSupport.label,
      image: "/img/stress-support.png",
      icon: "\u2728",
    },
    {
      title: t.collections.items.relaxSleep.label,
      image: "/img/relax-sleep.png",
      icon: "\ud83d\udecc",
    },
    {
      title: t.collections.items.mindMood.label,
      image: "/img/mind-mood.png",
      icon: "\ud83c\udf1f",
    },
    {
      title: t.collections.items.energyBoost.label,
      image: "/img/energy-push.png",
      icon: "\u26a1",
    },
    {
      title: t.collections.items.gutHealth.label,
      image: "/img/gut-health.png",
      icon: "\ud83c\udf31",
    },
  ];

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!scrollRef.current) return;
    const startX = "touches" in e ? e.touches[0].pageX : e.pageX;
    scrollRef.current.dataset.dragging = "true";
    scrollRef.current.dataset.startX = startX.toString();
    scrollRef.current.dataset.scrollLeft = scrollRef.current.scrollLeft.toString();
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!scrollRef.current || scrollRef.current.dataset.dragging !== "true") return;
    e.preventDefault();
    const x = "touches" in e ? e.touches[0].pageX : e.pageX;
    const startX = Number(scrollRef.current.dataset.startX);
    const scrollLeft = Number(scrollRef.current.dataset.scrollLeft);
    const walk = (x - startX) * -1;
    scrollRef.current.scrollLeft = scrollLeft + walk;
  };

  const handleDragEnd = () => {
    if (scrollRef.current) delete scrollRef.current.dataset.dragging;
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden transition-opacity duration-700 min-h-[600px] sm:min-h-[785px] bg-[#fdf8f7] ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
    >
      {isVisible && (
        <div className="bg-[#fdf8f7] pt-12 pb-8">
          <div className="text-center mb-12 px-4 sm:px-6">
            <h1 className="text-2xl sm:text-4xl text-gray-800">{t.collections.title}</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mt-4 text-sm sm:text-base">
              {t.collections.description}
            </p>
            <button
              className="mt-6 bg-[#3e4f3d] hover:bg-[#747c61] text-white px-6 py-2 text-sm sm:text-base rounded-full transition duration-300"
              onClick={() => { router.push('/blog') }}>
              {t.collections.button}
            </button>
          </div>
          <ListItems ids={ids}/>
          {/* <div className="relative max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-semibold  text-gray-800 mb-6">{t.collections.subtitle}</h2>

            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {collections.map((item, index) => (
                <div key={index} className="w-64 flex-shrink-0 bg-white p-4 rounded-lg shadow-md">
                  <Image src={item.image} alt={item.title} width={256} height={256} className="rounded-lg" />
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="text-xl">{item.icon}</span>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>)}
    </div>
  );
};

export default WellnessCollections;
