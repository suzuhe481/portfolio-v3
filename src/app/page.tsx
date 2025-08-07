import { Navbar } from "@/components/_main/Navbar/Navbar";
import { Hero } from "@/components/_main/Hero/Hero";
import { TechStack } from "@/components/_main/TechStack/TechStack";
import { Projects } from "@/components/_main/Projects/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TechStack />
      <Projects />
    </>
  );
}
