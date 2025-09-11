"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Pagination, Zoom, Keyboard } from "swiper/modules";

import { Dispatch, SetStateAction } from "react";

import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/zoom";

interface ISwiperFullscreenProps {
  imagesData: string[];
  setFullscreen: Dispatch<SetStateAction<boolean>>;
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

const SwiperFullscreen = ({
  imagesData,
  setFullscreen,
  activeIndex,
  setActiveIndex,
}: ISwiperFullscreenProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex flex-col">
      <button
        onClick={() => setFullscreen(false)}
        className="absolute top-4 right-4 text-white text-xl z-50 cursor-pointer"
      >
        ✕
      </button>
      <Swiper
        initialSlide={activeIndex}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={20}
        keyboard
        loop
        zoom
        modules={[Pagination, Navigation, Thumbs, Keyboard, Zoom]}
        className="flex-1 w-[90vw]"
      >
        {imagesData.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full flex justify-center items-center">
              <div className="swiper-zoom-container">
                <Image src={image} alt="" className="object-contain" fill />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperFullscreen;
