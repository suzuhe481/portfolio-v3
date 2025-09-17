"use client";

import { useMemo, createElement } from "react";
import { motion } from "framer-motion";

import { ITechStackDataProps } from "@/types";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Mapping name to their shadow css class in globals.css
const shadowClasses = {
  TypeScript: "typescript-shadow",
  React: "react-shadow",
  HTML: "html-shadow",
  JavaScript: "javascript-shadow",
  Tailwind: "tailwind-shadow",
  Express: "express-shadow",
  Node: "node-shadow",
  MongoDB: "mongodb-shadow",
  Postgres: "postgres-shadow",
  Linux: "linux-shadow",
  Git: "git-shadow",
  GitHub: "github-shadow",
  ["Framer Motion"]: "framer-motion-shadow",
  Godot: "godot-shadow",
};

// Adds the overlay prop.
interface ICardProps extends ITechStackDataProps {
  overlay?: boolean;
}

export const Card = ({ name, icon, overlay }: ICardProps) => {
  const Icon = icon;

  // Icon is memorized to prevent re-rendering and delay when dragging cards with dndkit.
  const MemoizedIcon = useMemo(
    () => <div className="w-12 md:w-24">{createElement(Icon)}</div>,
    [Icon]
  );

  const shadowClass = shadowClasses[name as keyof typeof shadowClasses];

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Base card styles + overlay style when dragged
  // isDragging affects the style of the copied underneath card, not the actual dragged card..
  const cardStyles = `${
    isDragging ? "opacity-70" : ""
  } bg-gray-800/50 backdrop-blur-sm border border-gray-700 cursor-grab rounded-xl p-4 flex flex-col items-center justify-center shadow-lg ${shadowClass} touch-none group`;

  // Dragged card
  const draggedCardStyles = `rotate-6 animate-pulse cursor-grabbing ${cardStyles}`;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.4,
          scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
        }}
      >
        <motion.div
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ y: 5, scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300 }}
          className={overlay ? draggedCardStyles : cardStyles}
        >
          <div className="relative mb-3">
            {/* <MemoizedIcon className="w-12 md:w-24" /> */}
            {MemoizedIcon}
          </div>
          <span className="text-gray-200 font-medium text-center group-hover:text-cyan-400 transition-colors">
            {name}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};
