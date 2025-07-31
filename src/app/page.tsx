"use client";

import { Navbar } from "@/components/_main/Navbar/Navbar";
import { Hero } from "@/components/_main/Hero/Hero";
import { TechStack } from "@/components/_main/TechStack/TechStack";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TechStack />
    </>
  );
}
