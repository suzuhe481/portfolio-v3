"use client";
import {
  //   useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

import Markdown from "react-markdown";

import { IExperienceDataProps } from "@/types";

export const Timeline = ({ data }: { data: IExperienceDataProps[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const lastCircleRef = useRef<HTMLDivElement>(null);

  // Recalculate height on resize or DOM changes
  useEffect(() => {
    // Recalculates height of scrolling line
    const updateHeight = () => {
      if (lastCircleRef.current && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const lastCircleRect = lastCircleRef.current.getBoundingClientRect();

        // Calculate the total height needed so the line reaches the last bullet point.
        // lastCircleRect.bottom = distance from top of viewport to bottom of last bullet
        // containerRect.top = distance from top of viewport to top of container
        // The subtraction gives the height inside the container
        // "+ 10" adds a small buffer so the line slightly overshoots instead of stopping short
        // "- 200" removes the distance added from motion.div's translate Y animation.
        setHeight(lastCircleRect.bottom - containerRect.top + 10 - 200);
      }
    };

    updateHeight();

    // Create a ResizeObserver to watch for size changes in either the container or the last bullet point.
    // This is more precise than relying only on the global "resize" event, because it also detects font/layout changes.
    const resizeObserver = new ResizeObserver(updateHeight);

    // Attach ResizeObserver to both the container and last bullet point.
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (lastCircleRef.current) resizeObserver.observe(lastCircleRef.current);

    // Also listen to window resize events to catch changes in viewport size.
    window.addEventListener("resize", updateHeight);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full font-sans px-4 md:px-36 pt-8" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ y: 200 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="flex justify-start py-2 md:py-4 md:gap-8 bg-white/50 rounded-2xl my-2 md:my-4"
          >
            <div className="md:sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-2/3">
              {/* Bullet point */}
              <div
                ref={index === data.length - 1 ? lastCircleRef : null}
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white  flex items-center justify-center"
              >
                <div className="h-4 w-4 rounded-full bg-neutral-200 border border-neutral-300 p-2" />
              </div>

              {/* Desktop Title */}
              <h3 className="hidden md:block text-2xl lg:text-4xl md:pl-20 font-bold text-black">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-16 pr-4 md:pl-4 w-full">
              {/* Mobile Title */}
              <h3 className="md:hidden block text-2xl mb-2 text-left font-bold text-black underline">
                {item.title}
              </h3>
              {/* Negative top margin to align markdown with bullet point */}
              <div className="markdown flex flex-col justify-start mt-[-8px] font-geist-mono text-base md:text-lg">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Scrolling line that goes through bullet points */}
        <div
          style={{ height: `${height}px`, left: "calc(2rem - 2px)" }} // The left calculation centers the line to be in the center of the bullet points
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
