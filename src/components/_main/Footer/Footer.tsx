"use client";

import { GitHubIcon } from "@/assets/icons/TechStackIcons";
import { LinkedInIcon } from "@/assets/icons/PageIcons";

import { motion } from "motion/react";

export const Footer = () => {
  return (
    <div className="flex items-center justify-center bg-[#0043a8] h-16 md:h-20">
      <div className="flex gap-4 h-2/3">
        <motion.a
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ y: 5, scale: 1.03 }}
          href="https://github.com/suzuhe481"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="h-full cursor-pointer" />
        </motion.a>
        <motion.a
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ y: 5, scale: 1.03 }}
          href="https://www.linkedin.com/in/hector-suazo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon className="h-full text-white cursor-pointer" />
        </motion.a>
      </div>
    </div>
  );
};
