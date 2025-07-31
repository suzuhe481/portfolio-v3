"use client";

import { motion } from "framer-motion";

import { ITechStackDataProps } from "@/types";

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

export const Card = ({ name, icon }: ITechStackDataProps) => {
  const Icon = icon;

  const shadowClass = shadowClasses[name as keyof typeof shadowClasses];

  return (
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
        className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 flex flex-col items-center justify-center shadow-lg ${shadowClass} group`}
      >
        <div className="relative mb-3">
          <Icon className="w-12 md:w-24" />
        </div>
        <span className="text-gray-200 font-medium text-center group-hover:text-cyan-400 transition-colors">
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
};
