"use client";

import { useRef, RefObject, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import { Button3D } from "./Button3D/Button3D";
import FloatingIcon from "./FloatingIcon/FloatingIcon";
import {
  GameControllerIcon,
  PSControllerIcon,
  LegoIcon,
  PuzzleIcon,
  BookIcon,
  SnorkelIcon,
  ArcheryIcon,
  NarutoIcon,
  RaftingIcon,
  SnowboardingIcon,
  ParasailingIcon,
  ComputerIcon,
  WoodworkingIcon,
  HikingIcon,
  VrIcon,
  CookingIcon,
} from "@/assets/icons/HobbyIcons";

import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";

const iconData = [
  { id: 1, Icon: GameControllerIcon, description: "Gaming" },
  { id: 2, Icon: PSControllerIcon, description: "PlayStation" },
  { id: 3, Icon: LegoIcon, description: "Lego" },
  { id: 4, Icon: PuzzleIcon, description: "Puzzles" },
  { id: 5, Icon: BookIcon, description: "Reading" },
  { id: 6, Icon: SnorkelIcon, description: "Snorkeling" },
  { id: 7, Icon: ArcheryIcon, description: "Archery" },
  { id: 8, Icon: NarutoIcon, description: "Anime" },
  { id: 9, Icon: RaftingIcon, description: "Rafting" },
  { id: 10, Icon: SnowboardingIcon, description: "Snowboarding" },
  { id: 11, Icon: ParasailingIcon, description: "Parasailing" },
  { id: 12, Icon: ComputerIcon, description: "Tech" },
  { id: 13, Icon: WoodworkingIcon, description: "Woodworking" },
  { id: 14, Icon: HikingIcon, description: "Hiking" },
  { id: 15, Icon: VrIcon, description: "VR" },
  { id: 16, Icon: CookingIcon, description: "Cooking" },
];

export const Hero = () => {
  const [iconPositions, setIconPositions] =
    useState<{ x: number; y: number }[]>();

  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const isSmallScreen = useIsSmallScreen();

  // Icon size. Determined by screen size.
  const iconSize = isSmallScreen ? 64 : 96; // In pixels

  useEffect(() => {
    if (containerRef.current && textRef.current) {
      const containerPadding = 10;
      const textPadding = 20;
      setIconPositions(
        getRandomNonOverlappingPositions(
          iconData.length,
          iconSize,
          containerRef,
          textRef,
          containerPadding,
          textPadding
        )
      );
    }
  }, [isSmallScreen, containerRef, textRef, iconSize]);

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center min-h-[calc(100vh-5rem)] py-8 overflow-x-hidden bg-[#f4f4f0]"
    >
      <motion.div
        ref={textRef}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
          delay: 0.1,
        }}
        className="text-center font-geist-mono w-1/2 text-sm md:text-2xl"
      >
        <p>
          These bubbles represent my hobbies and interests! Though some of these
          are things I&apos;ve only done once. Check out some galleries below of
          pictures I&apos;ve taken during my travels and props/projects
          I&apos;ve done.
        </p>

        {/* Button Container */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.2,
          }}
          className="relative flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex flex-col gap-0 w-full">
            <div className="flex flex-row gap-2 md:gap-12 justify-center items-center w-full h-[100px]">
              <Button3D
                topColor="bg-sky-500"
                middleColor="bg-slate-500"
                bottomColor="bg-orange-500"
              >
                <a href="/fun/travel">Travel</a>
              </Button3D>
              <Button3D>
                <a href="/fun/projects">Projects</a>
              </Button3D>
            </div>
            <div className="flex flex-row justify-center items-center w-full">
              <Link
                href="/"
                className="flex flex-row gap-6 items-center justify-center text-center w-full md:w-1/2 transform rounded-lg bg-slate-900 px-6 py-2 font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-200 hover:text-black cursor-pointer"
              >
                Back to Projects
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Icons */}
      {iconPositions &&
        iconPositions.map((pos, index) => {
          const { Icon } = iconData[index];
          return (
            <FloatingIcon
              key={iconData[index].id}
              containerRef={containerRef}
              initialPosition={pos}
              description={iconData[index].description}
              className={isSmallScreen ? "size-14" : "size-20"}
            >
              <Icon />
            </FloatingIcon>
          );
        })}
    </div>
  );
};

/**
 * Generates an array of random non-overlapping positions for icons within a container.
 * Ensures icons do not overlap with each other or with a specified text area.
 * If there are too many icons, it will eventually overflow the text container.
 *
 * @param iconCount - The number of icons to position.
 * @param iconSize - The size of each icon in pixels.
 * @param containerRef - Reference to the container element where icons will be placed.
 * @param textRef - Reference to the text element to avoid overlap with.
 * @param containerPadding - Padding from the container's edges to maintain.
 * @param textPadding - Additional padding around the text to prevent overlap.
 * @returns An array of positions, each with x and y coordinates, for the icons.
 */
function getRandomNonOverlappingPositions(
  iconCount: number,
  iconSize: number,
  containerRef: RefObject<HTMLDivElement | null>,
  textRef: RefObject<HTMLDivElement | null>,
  containerPadding: number,
  textPadding: number
) {
  const positions: { x: number; y: number }[] = [];

  if (!containerRef.current || !textRef.current) {
    return [];
  }

  const containerBounds = containerRef.current.getBoundingClientRect();
  const textBounds = textRef.current.getBoundingClientRect();

  // Expand text bounds with extra space so it doesn't overlap the text.
  const expandedTextBounds = {
    left: textBounds.left - textPadding,
    right: textBounds.right + textPadding,
    top: textBounds.top - textPadding,
    bottom: textBounds.bottom + textPadding,
  };

  // Finds a random position for each icon that doesn't overlap with
  // other icons, the text, or too close to the container boundaries.
  const maxAttempts = 1000;
  for (let i = 0; i < iconCount; i++) {
    let attempts = 0;
    let pos: { x: number; y: number };
    let overlaps: boolean;
    let inTextArea: boolean;

    do {
      // Generate a random x/y
      pos = {
        x:
          Math.floor(
            Math.random() *
              (containerBounds.width - containerPadding * 2 - iconSize)
          ) + containerPadding,
        y:
          Math.floor(
            Math.random() *
              (containerBounds.height - containerPadding * 2 - iconSize)
          ) + containerPadding,
      };

      // Check if the new position overlaps with any existing positions
      overlaps = positions.some(
        (p) =>
          Math.abs(p.x - pos.x) < iconSize && Math.abs(p.y - pos.y) < iconSize
      );

      const viewportX = pos.x + containerBounds.left;
      const viewportY = pos.y + containerBounds.top;

      // Check if the new position is in text area.
      inTextArea =
        viewportX + iconSize > expandedTextBounds.left &&
        viewportX < expandedTextBounds.right &&
        viewportY + iconSize > expandedTextBounds.top &&
        viewportY < expandedTextBounds.bottom;

      attempts++;
    } while (overlaps || (inTextArea && attempts < maxAttempts));

    positions.push(pos);
  }

  return positions;
}
