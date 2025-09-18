"use client";

import { Dispatch, SetStateAction } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ISwiperThumbsProps {
  imagesData: string[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setThumbsSwiper: (swiper: SwiperClass) => void;
  mainSwiper: SwiperClass | null;
}

const SwiperThumbs = ({
  imagesData,
  setThumbsSwiper,
  activeIndex,
  mainSwiper,
}: ISwiperThumbsProps) => {
  return (
    <Swiper
      onSwiper={setThumbsSwiper}
      spaceBetween={10}
      slidesPerView={4}
      freeMode={true}
      watchSlidesProgress={true}
      modules={[FreeMode, Navigation, Thumbs]}
      className="mySwiper"
    >
      {imagesData.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex w-full justify-center">
            <div
              onClick={() => mainSwiper?.slideToLoop(index)}
              className={`relative w-full h-[100px] ${
                activeIndex === index ? "" : "brightness-50"
              }`}
            >
              <Image
                src={image}
                data-loaded="false"
                onLoad={(e) => {
                  e.currentTarget.dataset.loaded = "true";
                }}
                alt=""
                className="cursor-pointer data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-400/40"
                fill
                loading="lazy"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperThumbs;
