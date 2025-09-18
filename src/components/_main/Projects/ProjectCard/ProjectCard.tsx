"use client";

import Image from "next/image";
import { motion } from "motion/react";

import { IProjectCardsDataProps } from "@/types";

/**
 * Unexpanded project card.
 * Only displays image and title.
 */
export const ProjectCard = ({
  card,
  setActive,
  id,
}: IProjectCardsDataProps) => {
  return (
    <motion.div
      layoutId={`card-container-${card.title}-${id}`}
      onClick={() => setActive(card)}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="shrink-0 w-46 sm:w-66 p-4 lg:p-2 rounded-xl hover:bg-neutral-50 cursor-pointer transition-colors group"
    >
      <div className="flex gap-4 flex-col w-full">
        {/* Image */}
        <motion.a
          layoutId={`image-${card.title}-${id}`}
          layout
          className="w-full max-w-full max-h-full aspect-video"
        >
          <Image
            width={1280}
            height={720}
            src={card.thumbnail_image}
            alt={card.title}
            className="block w-full h-full max-w-full max-h-full rounded-lg object-cover object-top"
          />
        </motion.a>

        {/* Title */}
        <div className="flex justify-center items-center flex-col">
          <motion.h3
            layoutId={`title-${card.title}-${id}`}
            className="font-medium text-slate-300 dark:text-neutral-200 text-center font-plagiata text-xl md:text-2xl group-hover:text-slate-800"
          >
            {card.title}
          </motion.h3>
        </div>
      </div>
    </motion.div>
  );
};
