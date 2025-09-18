"use client";

import { GitHubIcon } from "@/assets/icons/TechStackIcons";
import { LinkedInIcon } from "@/assets/icons/PageIcons";

import { motion } from "motion/react";

export const Contact = () => {
  return (
    <div
      id="contact"
      className="flex flex-col gap-4 items-center justify-center bg-[#0043a8] h-full md:h-[50vh] py-12"
    >
      <p className="text-xl md:text-4xl text-center px-4 text-white font-plagiata">
        Feel free to reach out to me here!
      </p>
      <div className="flex justify-center gap-12">
        <motion.a
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ y: 5, scale: 1.03 }}
          href="https://github.com/suzuhe481"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="h-12 md:h-24 cursor-pointer" />
        </motion.a>
        <motion.a
          whileHover={{ y: -5, scale: 1.03 }}
          whileTap={{ y: 5, scale: 1.03 }}
          href="https://www.linkedin.com/in/hector-suazo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon className="h-12 md:h-24 text-white cursor-pointer" />
        </motion.a>
      </div>
    </div>
  );
};
