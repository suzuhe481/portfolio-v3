"use client";

import { motion } from "motion/react";
import { ContainerTextFlip } from "@/components/animated/ContainerTextFlip/ContainerTextFlip";
import { IContainerTextFlipProps } from "@/components/animated/ContainerTextFlip/ContainerTextFlip";

export function Hero() {
  const ContainerTextFlipData: IContainerTextFlipProps = {
    words: [
      "Software Engineer",
      "Computer Science BS",
      "Web Developer",
      "Hobbyist Game Dev",
    ],
    interval: 2500, // ms
    animationDuration: 700, // ms
    className:
      "bg-[linear-gradient(to_bottom,#1f2937,#111827)] flex justify-center items-center",
    textClassName:
      "py-4 font-plagiata italic px-2 text-white drop-shadow-[0_0_2px_#fff] drop-shadow-[0_0_4px_#fff] drop-shadow-[0_0_6px_#0ff]",
  };

  return (
    <div
      id="home"
      className="relative mx-auto flex flex-col items-center justify-center bg-[#242424] min-h-[calc(100vh-8rem)] scroll-mt-20"
    >
      <div className="px-4 py-10 md:py-10">
        <h1 className="relative z-10 mx-auto max-w-4xl py-2 text-center font-plagiata font-bold text-slate-200 text-6xl md:text-8xl dark:text-slate-300 animate-all">
          {"Hi! My name is Hector Suazo".split(" ").map((word, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.div>
          ))}
        </h1>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 animate-all mx-auto max-w-[90vw] py-4 my-4 text-center text-lg font-normal text-neutral-200 dark:text-neutral-400 flex justify-center items-center h-[100px] md:h-[190px]"
        >
          <ContainerTextFlip
            words={ContainerTextFlipData.words}
            interval={ContainerTextFlipData.interval}
            animationDuration={ContainerTextFlipData.animationDuration}
            textClassName={ContainerTextFlipData.textClassName}
            className={ContainerTextFlipData.className}
          />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 1,
          }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button className="w-60 transform rounded-lg border border-gray-300 bg-white px-6 py-2 font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-400 hover:text-white dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900 cursor-pointer">
            Explore My Projects
          </button>
          <button className="w-60 transform rounded-lg bg-sky-700 px-6 py-2 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 cursor-pointer">
            Explore My Hobbies
          </button>
        </motion.div>
      </div>
    </div>
  );
}
