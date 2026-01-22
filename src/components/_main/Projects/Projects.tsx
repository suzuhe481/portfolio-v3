"use client";

import React, { useEffect, useRef, useState, useCallback, useId } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AnimatedCardContainer } from "./AnimatedCardContainer/AnimatedCardContainer";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { projects } from "../../../data/projectsData";

import { IProjectCardProps } from "@/types";

export function Projects() {
  // Stores the currently expanded card
  const [active, setActive] = useState<
    (typeof projects)[number] | boolean | null
  >(null);

  // Stores the groups of cards to be separated into pages
  const [cardGroups, setCardGroups] = useState<(typeof projects)[number][][]>(
    () => chunkArray(projects, 8),
  );

  const expandedCardRef = useRef<HTMLDivElement>(null);
  const id = useId();

  // Handler to set active card
  const handleSetActive = useCallback((card: IProjectCardProps | null) => {
    setActive(card);
  }, []);

  // Prevents scrolling when project card is expanded.
  // Allows closing the card by pressing escape.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Dynamically sets the cardGroups on screen resize.
  useEffect(() => {
    const handleResize = () => {
      // Groups of 8 on large screens
      if (window.innerWidth >= 1024) {
        const cardGroups = chunkArray(projects, 8);
        setCardGroups(cardGroups);
      }
      // Groups of 6 on smaller screens
      else {
        const cardGroups = chunkArray(projects, 6);
        setCardGroups(cardGroups);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useOutsideClick(expandedCardRef, () => setActive(null));

  return (
    <section id="projects" className="relative py-16 md:py-24 bg-[#242424]">
      {/* Section header */}
      <div className="text-center mb-4 md:mb-8 px-4">
        <h2 className="flex flex-col items-center text-white text-6xl underline font-plagiata">
          Projects
        </h2>
        <p className="mt-4 text-slate-400 font-geist-mono text-sm md:text-base max-w-md mx-auto">
          Scroll left or right to see more
        </p>
      </div>

      <AnimatedCardContainer
        active={active}
        setActive={setActive}
        expandedCardRef={expandedCardRef}
        id={id}
      >
        {/* Card Group Page */}
        {cardGroups.map((group, groupIdx) => (
          <li
            key={groupIdx}
            className="snap-start shrink-0 w-full flex justify-center items-center px-4 xl:px-24"
          >
            <ul className="grid grid-cols-2 grid-rows-3 md:grid-cols-3 lg:grid-cols-4 md:grid-rows-2 justify-items-center gap-8 w-full">
              {/* Project Cards in a single page */}
              {group.map((card) => (
                <ProjectCard
                  key={card.title}
                  card={card}
                  setActive={handleSetActive}
                  isActive={
                    typeof active === "object" && active?.title === card.title
                  }
                  id={id}
                />
              ))}
            </ul>
          </li>
        ))}
      </AnimatedCardContainer>
    </section>
  );
}

/**
 * Function to chunk an array into smaller arrays.
 * Used to split project cards into pages depending on how many per page.
 */
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
