import type { Metadata } from "next";

import { Navbar } from "@/components/_fun/Navbar/Navbar";
import { ActionBar } from "@/components/_fun/ActionBar/ActionBar";
import { ListOrEarth } from "@/components/_fun/ListOrEarth/ListOrEarth";
import ImageCarousel from "@/components/_fun/ImageCarousel/ImageCarousel";

import { TravelProvider } from "@/context/TravelProvider";

export const metadata: Metadata = {
  title: "Travel | Hector Suazo",
  description: "Showcasing travel pictures.",
};

export default function Travel() {
  return (
    <TravelProvider>
      <div className="flex flex-col min-h-screen bg-[#f4f4f0]">
        <Navbar />
        <ActionBar />
        <ListOrEarth />
        <ImageCarousel />
      </div>
    </TravelProvider>
  );
}
