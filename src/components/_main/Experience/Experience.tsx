import { Timeline } from "./Timeline/Timeline";

import { experience } from "@/data/experienceData";

export const Experience = () => {
  return (
    <section id="experience" className="relative py-16 md:py-24 bg-[#242424]">
      {/* Section header */}
      <div className="text-center mb-4 md:mb-8 px-4">
        <h2 className="flex flex-col items-center text-white text-6xl underline font-plagiata">
          Experience
        </h2>
      </div>

      <Timeline data={experience} />
    </section>
  );
};
