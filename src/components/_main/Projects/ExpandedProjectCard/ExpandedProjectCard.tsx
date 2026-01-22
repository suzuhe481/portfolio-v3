"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Markdown from "react-markdown";

import { LinkIcon } from "@/assets/icons/PageIcons";
import { GitHubIcon } from "@/assets/icons/TechStackIcons";

import { IProjectCardProps } from "@/types";
import { badgeColorVariants } from "@/lib/badgeColors";

// Maps badge colors to technologies
const techToColorMap: Record<string, keyof typeof badgeColorVariants> = {
  JavaScript: "yellow",
  TypeScript: "blue",
  React: "cyan",
  "Tailwind CSS": "indigo",
  Supabase: "green",
  PostgreSQL: "blue",
  Node: "green",
  Prisma: "purple",
  NextJS: "gray",
  MongoDB: "dark-green",
  Express: "black",
  "Three.js": "blue",
  Python: "yellow",
  SASS: "pink",
  "Hugging Face": "orange",
};

/** Expanded Project Card
 * Contains the expanded project card when clicked by user.
 * Project card contains close icon in corner of screen and
 * displays project details.
 * Uses shared layoutId with ProjectCard for smooth expand/collapse animation.
 * The card container, image, and title each share a layoutId with their ProjectCard counterparts.
 */
export const ExpandedProjectCard = ({
  expandedCardRef,
  active,
  setActive,
  id,
}: {
  expandedCardRef: React.RefObject<HTMLDivElement | null>;
  active: IProjectCardProps;
  setActive: React.Dispatch<
    React.SetStateAction<boolean | IProjectCardProps | null>
  >;
  id: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 grid place-items-center z-1000 p-4"
    >
      {/* Close Icon in the corner */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.2 } }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-slate-800 hover:bg-slate-700 rounded-full h-8 w-8 border border-slate-600 transition-colors cursor-pointer z-10"
        onClick={() => setActive(null)}
      >
        <CloseIcon />
      </motion.button>

      {/* Expanded Project Card - shares layoutId with ProjectCard for morphing animation */}
      {/* exit prop keeps element in DOM during AnimatePresence exit for layout animation */}
      <motion.div
        ref={expandedCardRef}
        layoutId={`card-${active.title}-${id}`}
        layout
        exit={{ opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="w-[92vw] md:w-[85vw] lg:w-[80vw] max-w-5xl min-h-[70vh] max-h-[85vh] md:max-h-[80vh] flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl shadow-black/50"
      >
        <div className="md:w-2/5 p-4 md:p-6 flex flex-col bg-white">
          {/* Image - shares layoutId with ProjectCard image */}
          <div className="w-full min-w-0 max-w-full h-[180px] md:h-[220px]">
            <motion.div
              layoutId={`image-${active.title}-${id}`}
              layout
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="relative w-full h-full rounded-xl overflow-hidden"
            >
              <a
                href={active.demo_link || "#"}
                target="_blank"
                className="group block w-full h-full"
                rel="noopener noreferrer"
                onClick={(e) => {
                  // Prevents navigation if no demo_link
                  if (!active.demo_link) {
                    e.preventDefault();
                  }
                }}
              >
                {active.demo_link && (
                  <LinkIcon className="absolute inset-0 m-auto h-10 w-10 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none z-10 drop-shadow-lg" />
                )}
                <Image
                  width={1280}
                  height={720}
                  src={active.thumbnail_image}
                  alt={active.title}
                  objectFit="center center"
                  className="block w-full h-full max-w-full max-h-full object-cover object-top hover:cursor-pointer hover:brightness-75 transition-all duration-300"
                />
              </a>
            </motion.div>
          </div>

          <div className="flex flex-col justify-between items-start mt-4 flex-1">
            {/* Title - shares layoutId with ProjectCard title */}
            <motion.h3
              layoutId={`title-${active.title}-${id}`}
              layout
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="font-bold font-plagiata text-slate-800 text-xl md:text-2xl"
            >
              {active.title}
            </motion.h3>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex flex-row gap-3 mt-4"
            >
              {active.demo_link && (
                <a
                  href={active.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm md:text-base rounded-lg font-medium bg-indigo-600 text-white flex flex-row justify-center items-center gap-2 hover:bg-indigo-700 transition-colors"
                >
                  {"Demo"}
                  <LinkIcon className="w-4 h-4" />
                </a>
              )}
              {active.github_link && (
                <a
                  href={active.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm md:text-base rounded-lg font-medium bg-slate-800 text-white flex flex-row justify-center items-center gap-2 hover:bg-slate-900 transition-colors"
                >
                  {"GitHub"}
                  <GitHubIcon className="w-4 h-4" />
                </a>
              )}
            </motion.div>

            {/* Tech Stack Badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              className="flex flex-row flex-wrap gap-1.5 mt-4"
            >
              {active.tech_stack.map((tech, index) => {
                const color = techToColorMap[tech] || "gray";
                const className = badgeColorVariants[color];
                return (
                  <span key={index} className={className + " text-xs"}>
                    {tech}
                  </span>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Description */}
        <div className="md:w-3/5 p-4 md:p-6 overflow-y-auto bg-slate-50 md:border-l border-slate-200">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            className="text-slate-600 text-base h-fit flex flex-col"
          >
            <h4 className="font-bold font-plagiata text-slate-700 text-lg md:text-xl mb-3">
              Description
            </h4>
            <div className="markdown font-geist-mono text-sm md:text-base leading-relaxed">
              <Markdown>{active.description}</Markdown>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Close (X) Icon
const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-slate-300"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
