"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import Image from "next/image";

import { Dispatch, SetStateAction, useEffect, useRef } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ISwiperMainProps {
  imagesData: string[];
  textData: string[];
  thumbsSwiper: SwiperClass | null;
  setFullscreen: Dispatch<SetStateAction<boolean>>;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setMainSwiper: (swiper: SwiperClass) => void;
}

const SwiperMain = ({
  imagesData,
  textData,
  thumbsSwiper,
  setFullscreen,
  activeIndex,
  setActiveIndex,
  setMainSwiper,
}: ISwiperMainProps) => {
  const swiperRef = useRef<SwiperClass | null>(null);

  // Syncs activeIndex between main Swiper and fullscreen Swiper when switching between normal and fullscreen.
  useEffect(() => {
    if (swiperRef.current && swiperRef.current.activeIndex !== activeIndex) {
      swiperRef.current.slideToLoop(activeIndex);
    }
  }, [activeIndex]);

  return (
    <Swiper
      onSwiper={(swiper) => {
        setMainSwiper(swiper);
        swiperRef.current = swiper;
      }}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      initialSlide={0}
      navigation={true}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      thumbs={{ swiper: thumbsSwiper }}
      modules={[FreeMode, Navigation, Thumbs]}
    >
      {imagesData.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col w-full justify-center items-center py-2">
            <div className="relative w-[90vw] md:w-[70vw] h-[40vh] md:h-[70vh]">
              <Image
                src={image}
                data-loaded="false"
                onLoad={(e) => {
                  e.currentTarget.dataset.loaded = "true";
                }}
                alt=""
                className="cursor-pointer object-contain data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-400/40"
                fill
                loading="lazy"
                onClick={() => setFullscreen(true)}
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              {textData[index]}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperMain;
