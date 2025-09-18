import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hobbies | Hector Suazo",
  description: "Showcasing hobbies.",
};

import { Navbar } from "@/components/_fun/Navbar/Navbar";
import { Hero } from "@/components/_fun/Hero/Hero";

export default function Hobbies() {
  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
}
