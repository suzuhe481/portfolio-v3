"use client";

import { Navbar } from "@/components/_main/Navbar/Navbar";
import { Hero } from "@/components/_main/Hero/Hero";
import { TechStack } from "@/components/_main/TechStack/TechStack";
import { AiWorkflow } from "@/components/_main/AiWorkflow/AiWorkflow";
import { Projects } from "@/components/_main/Projects/Projects";
import { Experience } from "@/components/_main/Experience/Experience";
import { Contact } from "@/components/_main/Contact/Contact";
import { Footer } from "@/components/_main/Footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TechStack />
      <AiWorkflow />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </>
  );
}
