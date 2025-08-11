"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { AnimatedCardContainer } from "./AnimatedCardContainer/AnimatedCardContainer";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { FixedBackground } from "../FixedBackground/FixedBackground";
import { projects } from "../../../data/projectsData";

export function Projects() {
  // Stores the currently expanded card
  const [active, setActive] = useState<
    (typeof projects)[number] | boolean | null
  >(null);

  // Stores the groups of cards to be separated into pages
  const [cardGroups, setCardGroups] = useState<(typeof projects)[number][][]>(
    () => chunkArray(projects, 8)
  );

  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

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

  useOutsideClick(ref, () => setActive(null));

  return (
    <div id="projects" className="relative min-h-screen">
      {/* Background SVG Image */}
      <FixedBackground svgPath="/background/layered-steps-background.svg" />

      <h1 className="flex flex-col items-center text-white text-6xl pt-12 underline font-plagiata">
        Projects
      </h1>
      <p className="flex flex-col items-center text-white text-mde font-plagiata">
        Scroll left/right to see more
      </p>
      <AnimatedCardContainer
        active={active}
        setActive={setActive}
        ref={ref}
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
              {group.map((card, index) => (
                <ProjectCard
                  key={index}
                  card={card}
                  setActive={setActive}
                  id={id}
                />
              ))}
            </ul>
          </li>
        ))}
      </AnimatedCardContainer>
    </div>
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
