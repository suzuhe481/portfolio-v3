"use client";

import { ReactNode } from "react";

import { AnimatePresence, motion } from "motion/react";
import { ExpandedProjectCard } from "../ExpandedProjectCard/ExpandedProjectCard";

import { IProjectCardProps } from "@/types";

export const AnimatedCardContainer = ({
  children,
  active,
  setActive,
  ref,
  id,
}: {
  children: ReactNode;
  active: IProjectCardProps | boolean | null;
  setActive: React.Dispatch<
    React.SetStateAction<boolean | IProjectCardProps | null>
  >;
  ref: React.RefObject<HTMLDivElement | null>;
  id: string;
}) => {
  return (
    <>
      {/* Darkened Background when project card is expanded */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Project Card */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <ExpandedProjectCard
            ref={ref}
            active={active}
            setActive={setActive}
            id={id}
          />
        ) : null}
      </AnimatePresence>

      {/* Project Card Container */}
      <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth w-full custom-scrollbar py-8">
        <ul className="flex gap-4">{children}</ul>
      </div>
    </>
  );
};
