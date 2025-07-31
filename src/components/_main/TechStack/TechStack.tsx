"use client";

import {
  TypeScriptIcon,
  ReactIcon,
  HTMLIcon,
  JavaScriptIcon,
  TailwindIcon,
  ExpressIcon,
  NodeIcon,
  MongoDBIcon,
  PostgresIcon,
  LinuxIcon,
  GitIcon,
  GitHubIcon,
  FramerMotionIcon,
  GodotIcon,
} from "@/assets/icons/TechStackIcons";
import { Card } from "./Card/Card";
import { CardContainer } from "./CardContainer/CardContainer";

import { ITechStackDataProps } from "@/types";

const techStackData: ITechStackDataProps[] = [
  {
    name: "TypeScript",
    icon: TypeScriptIcon,
  },
  {
    name: "React",
    icon: ReactIcon,
  },
  {
    name: "HTML",
    icon: HTMLIcon,
  },
  {
    name: "JavaScript",
    icon: JavaScriptIcon,
  },
  {
    name: "Tailwind",
    icon: TailwindIcon,
  },
  {
    name: "Express",
    icon: ExpressIcon,
  },
  {
    name: "Node",
    icon: NodeIcon,
  },
  {
    name: "MongoDB",
    icon: MongoDBIcon,
  },
  {
    name: "Postgres",
    icon: PostgresIcon,
  },
  {
    name: "Linux",
    icon: LinuxIcon,
  },
  {
    name: "Git",
    icon: GitIcon,
  },
  {
    name: "GitHub",
    icon: GitHubIcon,
  },
  {
    name: "Framer Motion",
    icon: FramerMotionIcon,
  },
  {
    name: "Godot",
    icon: GodotIcon,
  },
];

export const TechStack = () => {
  return (
    <div
      id="tech"
      className="py-12 min-h-screen scroll-mt-12"
      style={{
        backgroundImage: 'url("/background/waves-background.svg")',
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        paddingLeft: "1px", // Padding and negative margin removes rendering artifact along border of svg.
        paddingTop: "1px",
        marginLeft: "-1px",
        marginTop: "-1px",
      }}
    >
      <div className="flex flex-col items-center text-white text-6xl pt-12 underline font-plagiata">
        Tech Stack
      </div>
      <div className="flex justify-center items-center">
        {/* Tech Icons*/}
        <CardContainer className="font-plagiata font-bold">
          {techStackData.map((tech) => (
            <Card key={tech.name} name={tech.name} icon={tech.icon} />
          ))}
        </CardContainer>
      </div>

      {/* Bottom buffer. Padding is already set in main container to prevent rendering artifact */}
      <div className="pb-36" />
    </div>
  );
};
