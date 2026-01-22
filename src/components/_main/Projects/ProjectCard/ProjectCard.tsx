"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { IProjectCardsDataProps } from "@/types";

/**
 * Unexpanded project card.
 * Only displays image and title.
 * Uses shared layoutId with ExpandedProjectCard for smooth expand/collapse animation.
 * The card container, image, and title each have their own layoutId that corresponds
 * to elements in ExpandedProjectCard, enabling them to smoothly morph between states.
 */
export const ProjectCard = ({
  card,
  setActive,
  isActive,
  id,
}: IProjectCardsDataProps & { id: string }) => {
  return (
    <motion.div
      layoutId={`card-${card.title}-${id}`}
      layout
      initial={false}
      animate={{ opacity: isActive ? 0 : 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      onClick={() => setActive(card)}
      className="shrink-0 w-44 sm:w-56 md:w-64 p-3 md:p-4 rounded-2xl bg-[rgba(26,26,36,0.6)] backdrop-blur-sm border border-[rgba(148,163,184,0.08)] hover:border-[rgba(99,102,241,0.3)] hover:bg-[rgba(26,26,36,0.8)] cursor-pointer group"
      style={{
        pointerEvents: isActive ? "none" : "auto",
      }}
    >
      <div className="flex gap-3 md:gap-4 flex-col w-full">
        {/* Image */}
        <motion.div
          layoutId={`image-${card.title}-${id}`}
          layout
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="w-full max-w-full max-h-full aspect-video overflow-hidden rounded-xl"
        >
          <Image
            width={1280}
            height={720}
            src={card.thumbnail_image}
            alt={card.title}
            className="block w-full h-full max-w-full max-h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </motion.div>

        {/* Title */}
        <div className="flex justify-center items-center flex-col px-1">
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            layout
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="font-medium text-slate-300 text-center font-plagiata text-lg md:text-xl group-hover:text-indigo-300 transition-colors duration-300"
          >
            {card.title}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
};
