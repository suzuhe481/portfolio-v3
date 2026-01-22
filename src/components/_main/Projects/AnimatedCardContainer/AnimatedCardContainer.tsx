"use client";

import { ReactNode, useRef, useEffect } from "react";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ExpandedProjectCard } from "../ExpandedProjectCard/ExpandedProjectCard";

import { IProjectCardProps } from "@/types";

export const AnimatedCardContainer = ({
  children,
  active,
  setActive,
  expandedCardRef,
  id,
}: {
  children: ReactNode;
  active: IProjectCardProps | boolean | null;
  setActive: React.Dispatch<
    React.SetStateAction<boolean | IProjectCardProps | null>
  >;
  expandedCardRef: React.RefObject<HTMLDivElement | null>;
  id: string;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Track if card is active
  const isExpanded = active && typeof active === "object";

  // Disable horizontal scrolling on the scroll container when a card is expanded
  // This keeps the scrollbar visible but prevents user from scrolling
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (isExpanded) {
      // Prevent scrolling by handling wheel and touch events
      const preventScroll = (e: Event) => {
        e.preventDefault();
      };

      scrollContainer.addEventListener("wheel", preventScroll, {
        passive: false,
      });
      scrollContainer.addEventListener("touchmove", preventScroll, {
        passive: false,
      });

      return () => {
        scrollContainer.removeEventListener("wheel", preventScroll);
        scrollContainer.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [isExpanded]);

  return (
    <LayoutGroup>
      {/* Darkened Background when project card is expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-10"
          />
        )}
      </AnimatePresence>

      {/* Expanded Project Card */}
      {/* mode="popLayout" handles shared layout animation during exit */}
      <AnimatePresence mode="popLayout">
        {isExpanded ? (
          <ExpandedProjectCard
            expandedCardRef={expandedCardRef}
            active={active}
            setActive={setActive}
            id={id}
          />
        ) : null}
      </AnimatePresence>

      {/* Project Card Container - overflow always auto to maintain scroll position and scrollbar */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto snap-x snap-mandatory scroll-smooth w-full custom-scrollbar pb-6 px-2"
      >
        <ul className="flex gap-6 md:gap-8">{children}</ul>
      </div>
    </LayoutGroup>
  );
};
