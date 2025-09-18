"use client";

import { useState, useEffect, useRef } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { useScrollLock } from "@/hooks/useScrollLock";

// import Image from "next/image";
import SwiperMain from "./SwiperMain/SwiperMain";
import SwiperThumbs from "./SwiperThumbs/SwiperThumbs";
import SwiperFullscreen from "./SwiperFullscreen/SwiperFullscreen";

import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

import { useTravelContext } from "@/hooks/useTravelContext";
import fetchImages from "@/lib/fetchImages";
import { IImageRow } from "@/types";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const ImageCarousel = () => {
  // Stores data fetched from backend.
  const [largeImagesData, setLargeImagesData] = useState<string[]>([]);
  const [thumbnailImagesData, setThumbnailImagesData] = useState<string[]>([]);
  const [descriptionData, setDescriptionData] = useState<string[]>([]);

  // Image and gallery states.
  const [isLoading, setIsLoading] = useState(false);
  const [imagesReady, setImagesReady] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  // Instances of main Swiper and thumbs Swiper
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  // Refs
  const abortControllerRef = useRef<AbortController | null>(null);
  const imageCarouselRef = useRef<HTMLDivElement>(null);

  // Context
  const { location, country } = useTravelContext();

  // Page scrolling is lock when fullscreen.
  useScrollLock(fullscreen);

  // Fetching new data on location change.
  useEffect(() => {
    const fetchData = async () => {
      if (location === "") {
        setIsLoading(false);
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      // Reset states
      setIsLoading(true);
      setLargeImagesData([]);
      setThumbnailImagesData([]);
      setDescriptionData([]);

      setImagesReady(false);
      setImageError(false);
      setThumbsSwiper(null); // Prevents swiper error from using an old thumbsSwiper when location changes
      mainSwiper?.slideToLoop(0); // Resets the mainSwiper's index to 0
      setActiveIndex(0);

      // Scroll to image carousel
      imageCarouselRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      try {
        const { data, error } = await fetchImages<IImageRow[]>(
          location,
          controller.signal
        );

        if (error) {
          setIsLoading(false);
          setImagesReady(false);
          setImageError(true);
        } else {
          if (data) {
            const largeUrlsData = data.map((item) => item.largeImage);
            const thumbnailUrlsData = data.map((item) => item.thumbnailImage);
            const descriptionsData = data.map((item) => item.description);

            // Setting data
            setLargeImagesData(largeUrlsData);
            setThumbnailImagesData(thumbnailUrlsData);
            setDescriptionData(descriptionsData);

            // Setting states
            setIsLoading(false);
            setImagesReady(true);
            setImageError(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setImagesReady(false);
        setImageError(true);
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // mainSwiper is not included in the dependency array because it's unstable and will cause React to rerender infinitely.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Prevents swiper error from using an old thumbsSwiper when fullscreen changes
  useEffect(() => {
    setThumbsSwiper(null);
  }, [fullscreen]);

  return (
    <div
      id="image-carousel"
      className="relative flex flex-col items-center justify-start py-8 min-h-[75vh]"
    >
      {location && country && (
        <h1
          ref={imageCarouselRef}
          className="flex flex-col items-center text-black text-center text-4xl underline font-plagiata py-4"
        >
          {location}, {country}
        </h1>
      )}
      {imagesReady && (
        <div className="w-[90vw]">
          {/* Main Swiper showing large images */}
          <SwiperMain
            imagesData={largeImagesData}
            textData={descriptionData}
            thumbsSwiper={thumbsSwiper}
            setFullscreen={setFullscreen}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setMainSwiper={setMainSwiper}
          />
          {/* Thumbnails shown below the main Swiper */}
          <SwiperThumbs
            imagesData={thumbnailImagesData}
            setThumbsSwiper={setThumbsSwiper}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            mainSwiper={mainSwiper}
          />
          {/* Fullscreen Swiper shown on image click */}
          {fullscreen && (
            <SwiperFullscreen
              imagesData={largeImagesData}
              activeIndex={activeIndex}
              setFullscreen={setFullscreen}
              setActiveIndex={setActiveIndex}
            />
          )}
        </div>
      )}
      {isLoading && <LoadingSpinner />}
      {location === "" && <SelectLocationText />}
      {imageError && <NotFoundText />}
    </div>
  );
};

export default ImageCarousel;

// Loading spinner
const LoadingSpinner = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sky-500">
      <TailChase size="40" speed="1.75" color="black" />
    </div>
  );
};

// Text shown when images are not found
const NotFoundText = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p>Images not found 😭</p>
    </div>
  );
};

// Default Text shown when no location is selected
const SelectLocationText = () => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p>Select a location ✈️</p>
    </div>
  );
};
