import { FixedBackground } from "../FixedBackground/FixedBackground";
import { Timeline } from "./Timeline/Timeline";

import { experience } from "@/data/experienceData";

export const Experience = () => {
  return (
    <div id="experience" className="relative py-12 min-h-screen">
      {/* Background SVG Image */}
      <FixedBackground svgPath="/background/layered-waves.svg" />

      <h1 className="flex flex-col items-center text-white text-6xl pt-12 underline font-plagiata">
        Experience
      </h1>
      <Timeline data={experience} />
    </div>
  );
};
