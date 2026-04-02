"use client";

import { motion } from "motion/react";
import Markdown from "react-markdown";
import remarkBreaks from "remark-breaks";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { aiWorkflow } from "@/data/aiWorkflow";

export const AiWorkflow = () => {
  return (
    <section id="ai-workflow" className="relative py-16 md:py-24 bg-[#242424]">
      {/* Section header */}
      <div className="text-center mb-10 md:mb-14 px-4">
        <h2 className="flex flex-col items-center text-white text-6xl underline font-plagiata">
          AI Workflow
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-12">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-[rgba(26,26,36,0.6)] backdrop-blur-sm border border-[rgba(148,163,184,0.1)] rounded-xl p-5 md:p-6 hover:border-[rgba(99,102,241,0.25)] transition-colors duration-300"
        >
          <div className="font-geist-mono text-slate-300 text-sm md:text-base leading-relaxed [&>p]:text-slate-300">
            <Markdown>{aiWorkflow.intro}</Markdown>
          </div>
        </motion.div>

        {/* Phases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-plagiata text-2xl md:text-3xl text-white">
            Phases
          </h3>

          <div className="bg-[rgba(26,26,36,0.6)] backdrop-blur-sm border border-[rgba(148,163,184,0.1)] rounded-xl px-5 md:px-6 hover:border-[rgba(99,102,241,0.25)] transition-colors duration-300 mt-6">
            <Accordion multiple={false}>
              {aiWorkflow.phases.map((phase) => (
                <AccordionItem
                  key={phase.number}
                  value={`phase-${phase.number}`}
                  className="border-b border-[rgba(148,163,184,0.1)] last:border-b-0"
                >
                  <AccordionTrigger className="font-geist-mono text-slate-200 text-sm md:text-base font-medium py-4 hover:no-underline no-underline cursor-pointer hover:text-indigo-400 aria-expanded:text-indigo-400 aria-expanded:underline transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 inline-block text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-3 py-1 text-xs font-geist-mono">
                        {String(phase.number).padStart(2, "0")}
                      </span>
                      <span className="font-plagiata text-lg font-bold">
                        {phase.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="font-geist-mono text-slate-300 text-sm md:text-base leading-relaxed pb-5">
                    <div className="[&>p]:text-slate-400 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:text-slate-400 [&_li]:mt-1">
                      <Markdown>{phase.description}</Markdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>

        {/* Prompt Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-plagiata text-2xl md:text-3xl text-white">
            Prompt Examples
          </h3>
          <p className="text-slate-500 text-xs font-geist-mono mt-1 mb-6">
            These are example templates of how I create my prompts for Claude
            Code.
          </p>

          {/* Prompts Accordion */}
          <div className="bg-[rgba(26,26,36,0.6)] backdrop-blur-sm border border-[rgba(148,163,184,0.1)] rounded-xl px-5 md:px-6 hover:border-[rgba(99,102,241,0.25)] transition-colors duration-300">
            <Accordion multiple={false}>
              {aiWorkflow.promptExamples.map((example, index) => (
                <AccordionItem
                  key={index}
                  value={`prompt-${index}`}
                  className="border-b border-[rgba(148,163,184,0.1)] last:border-b-0"
                >
                  <AccordionTrigger className="font-geist-mono text-slate-200 text-sm md:text-base font-medium py-4 hover:no-underline no-underline cursor-pointer hover:text-indigo-400 aria-expanded:text-indigo-400 aria-expanded:underline transition-colors duration-200">
                    {example.title}
                  </AccordionTrigger>
                  <AccordionContent className="font-geist-mono text-slate-300 text-sm md:text-base leading-relaxed pb-5">
                    <div className="[&>p]:text-slate-400 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:text-slate-400 [&_li]:mt-1">
                      <Markdown remarkPlugins={[remarkBreaks]}>
                        {example.content}
                      </Markdown>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
