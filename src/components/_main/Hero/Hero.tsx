"use client";

import Link from "next/link";

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
    interval: 2500,
    animationDuration: 700,
    className:
      "bg-gradient-to-b from-[#1a1a2e] to-[#16162a] flex justify-center items-center border border-[rgba(99,102,241,0.2)]",
    textClassName:
      "py-4 font-plagiata italic px-3 text-white drop-shadow-[0_0_8px_rgba(129,140,248,0.6)] drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]",
  };

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center bg-[#242424] min-h-[calc(100vh-4rem)] md:min-h-screen scroll-mt-20 overflow-hidden"
    >
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-500/5 to-indigo-500/10 pointer-events-none" />

      <div className="relative z-10 px-6 md:px-8 py-16 md:py-20 max-w-5xl mx-auto">
        {/* Main heading */}
        <h1 className="relative mx-auto text-center font-plagiata font-bold text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.1] tracking-tight">
          {"Hi! My name is".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="mr-[0.25em] inline-block text-slate-300"
            >
              {word}
            </motion.span>
          ))}
          <br />
          <motion.span
            initial={{ opacity: 0, filter: "blur(4px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.35,
              ease: "easeOut",
            }}
            className="inline-block bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent"
          >
            Hector Suazo
          </motion.span>
        </h1>

        {/* Text flip container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="relative mt-8 md:mt-12 flex justify-center items-center h-[90px] md:h-[160px]"
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="group relative text-center w-64 px-8 py-3.5 font-geist-mono font-medium text-sm tracking-wide rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30"
          >
            <span className="relative z-10">Explore My Projects</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          <Link
            href="/fun"
            className="group text-center w-64 px-8 py-3.5 font-geist-mono font-medium text-sm tracking-wide rounded-xl border border-slate-600 text-white transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-indigo-500/10 cursor-pointer"
          >
            Explore My Hobbies
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
