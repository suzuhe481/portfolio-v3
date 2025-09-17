import type { Metadata } from "next";

import { Navbar } from "@/components/_fun/Navbar/Navbar";
import { BuildPicker } from "@/components/_fun/BuildPicker/BuildPicker";
import BuildImageCarousel from "@/components/_fun/BuildImageCarousel/ImageCarousel";

import { BuildProvider } from "@/context/BuildContext/BuildProvider";

export const metadata: Metadata = {
  title: "Builds | Hector Suazo",
  description: "Showcasing build pictures.",
};

export default function Builds() {
  return (
    <BuildProvider>
      <div className="flex flex-col min-h-screen bg-[#f4f4f0]">
        <Navbar />
        <BuildPicker />
        <BuildImageCarousel />
      </div>
    </BuildProvider>
  );
}
