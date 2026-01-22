"use client";
import { motion } from "motion/react";
import React from "react";

import Markdown from "react-markdown";

import { IExperienceDataProps } from "@/types";

export const Timeline = ({ data }: { data: IExperienceDataProps[] }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-8">
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-violet-500/30 to-transparent" />

        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: -2 }} // -2 because the line is not centered at x=0
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-12 md:pl-20 pb-10 md:pb-14 last:pb-0"
          >
            {/* Timeline dot */}
            <div className="absolute left-2 md:left-6 top-1 w-5 h-5 rounded-full bg-[#0a0a0f] border-2 border-indigo-500 shadow-lg shadow-indigo-500/30">
              <div className="absolute inset-1 rounded-full bg-indigo-400" />
            </div>

            {/* Content card */}
            <div className="bg-[rgba(26,26,36,0.6)] backdrop-blur-sm border border-[rgba(148,163,184,0.1)] rounded-xl p-5 md:p-6 hover:border-[rgba(99,102,241,0.25)] transition-colors duration-300">
              {/* Year/Period badge */}
              <span className="inline-block px-3 py-1 mb-3 text-xs md:text-sm font-geist-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                {item.title}
              </span>

              {/* Content */}
              <div className="markdown font-geist-mono text-sm md:text-base text-slate-300 leading-relaxed [&>h2]:text-lg [&>h2]:md:text-xl [&>h2]:font-plagiata [&>h2]:text-slate-100 [&>h2]:mb-1 [&>h3]:text-sm [&>h3]:md:text-base [&>h3]:text-slate-400 [&>h3]:font-normal [&>h3]:mb-3 [&>ul]:mt-2 [&>ul]:space-y-1 [&>ul>li]:text-slate-400 [&>p]:text-slate-400">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
