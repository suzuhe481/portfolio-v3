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
 * Containers the expanded project card when clicked by user.
 * Project card contains close icon in corner of screen and
 * displays project details.
 */
export const ExpandedProjectCard = ({
  ref,
  active,
  setActive,
  id,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
  active: IProjectCardProps;
  setActive: React.Dispatch<
    React.SetStateAction<boolean | IProjectCardProps | null>
  >;
  id: string;
}) => {
  return (
    <motion.div
      layoutId={`card-container-${active.title}-${id}`}
      className="fixed inset-0 grid place-items-center z-[100] min-w-0 min-h-0"
    >
      {/* Close Icon in the corner */}
      <motion.button
        key={`button-${active.title}-${id}`}
        layout
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
        className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
        onClick={() => setActive(null)}
      >
        <CloseIcon />
      </motion.button>

      {/* Expanded Project Card */}
      <motion.div
        ref={ref}
        className="w-[80vw] md:w-[80vw] min-h-[70vh] max-h-[80vh] md:h-[70vh] animate-all flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden p-4"
      >
        <div className="md:pr-4 flex flex-col">
          {/* Image */}
          <div className="w-full min-w-0 max-w-full h-[200px] aspect-video">
            <motion.a
              href={active.demo_link || "#"}
              target="_blank"
              className="group relative block w-full h-full border-2 border-black rounded-tr-lg rounded-tl-lg"
              rel="noopener noreferrer"
              layoutId={`image-${active.title}-${id}`}
              onClick={(e) => {
                // Prevents navigation if no demo_link
                if (!active.demo_link) {
                  e.preventDefault();
                }
              }}
            >
              {active.demo_link && (
                <LinkIcon className="absolute inset-0 m-auto h-10 w-10 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none z-10" />
              )}
              <Image
                width={1280}
                height={720}
                src={active.thumbnail_image}
                alt={active.title}
                objectFit="center center"
                className="block w-full h-full max-w-full max-h-full rounded-tr-lg rounded-tl-lg object-cover object-top hover:cursor-pointer hover:brightness-75"
              />
            </motion.a>
          </div>
          <div className="flex flex-col justify-between items-start">
            {/* Title */}
            <motion.h3
              layoutId={`title-${active.title}-${id}`}
              className="font-bold font-plagiata text-neutral-700 text-xl md:text-2xl py-1"
            >
              {active.title}
            </motion.h3>

            {/* Buttons */}
            <motion.div
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-row gap-2"
            >
              {active.demo_link && (
                <a
                  href={active.demo_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-xs md:text-base rounded-full font-bold bg-green-500 text-white flex flex-row justify-center items-center gap-2 hover:bg-green-800"
                >
                  {"Demo"}
                  <LinkIcon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              )}
              {active.github_link && (
                <a
                  href={active.github_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 text-xs md:text-base rounded-full font-bold bg-green-500 text-white flex flex-row justify-center items-center gap-2 hover:bg-green-800"
                >
                  {"GitHub"}
                  <GitHubIcon className="w-4 h-4 md:w-5 md:h-5" />
                </a>
              )}
            </motion.div>

            {/* Tech Stack Badges */}
            <div className="flex flex-col gap-2">
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-neutral-600 text-sm lg:text-base max-h-40 overflow-y-auto flex flex-row flex-wrap gap-1 py-2"
              >
                {active.tech_stack.map((tech, index) => {
                  const color = techToColorMap[tech] || "gray";
                  const className = badgeColorVariants[color];
                  return (
                    <span key={index} className={className}>
                      {tech}
                    </span>
                  );
                })}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="md:px-4 overflow-y-auto md:h-[60vh] md:border-l-2 md:border-neutral-400">
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-neutral-600 text-base lg:text-xl h-fit flex flex-col px-0 items-start font-sans"
          >
            <h1 className="font-bold font-plagiata text-xl md:text-2xl">
              Description
            </h1>
            <div className="markdown font-geist-mono">
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
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
