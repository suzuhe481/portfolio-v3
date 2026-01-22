"use client";

import { GitHubIcon } from "@/assets/icons/TechStackIcons";
import { LinkedInIcon } from "@/assets/icons/PageIcons";

import { motion } from "motion/react";

export const Contact = () => {
  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#242424]">
      {/* Background gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-indigo-500/10 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl md:text-4xl text-center px-4 text-white mb-10 font-plagiata">
            Get In Touch
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-6 md:gap-8"
        >
          <motion.a
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/suzuhe481"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl bg-[rgba(26,26,36,0.6)] backdrop-blur-sm border border-[rgba(148,163,184,0.1)] hover:border-[rgba(99,102,241,0.3)]"
          >
            <GitHubIcon className="h-10 md:h-14 text-slate-300 group-hover:text-white transition-colors duration-300" />
            <span className="font-geist-mono text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
              GitHub
            </span>
          </motion.a>

          <motion.a
            whileHover={{ y: -4, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://www.linkedin.com/in/hector-suazo/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl bg-[rgba(26,26,36,0.6)] backdrop-blur-sm border border-[rgba(148,163,184,0.1)] hover:border-[rgba(99,102,241,0.3)]"
          >
            <LinkedInIcon className="h-10 md:h-14 text-slate-300 group-hover:text-[#0A66C2] transition-colors duration-300" />
            <span className="font-geist-mono text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
              LinkedIn
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
