"use client";

import { FC, useId, useState, useCallback } from "react";
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
import { FixedBackground } from "../FixedBackground/FixedBackground";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";

import {
  arrayMove,
  sortableKeyboardCoordinates,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

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

const DefaultIcon: FC = () => {
  return <span>Icon not found</span>;
};

export const TechStack = () => {
  const [techStack, setTechStack] = useState(techStackData);
  const [draggedTech, setDraggedTech] = useState<string | null>(null); // Stores the name of the dragged tech card.

  // Sensors for dndkit
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const dndId = useId(); // Fixes hydration issues when assigned to DndContext

  // Find tech icon by name.
  // If not found, return default icon.
  const findTechIconByName = useCallback((name: string) => {
    const tech = techStackData.find((tech) => tech.name === name);
    const icon = tech?.icon;

    if (icon) {
      return icon;
    }

    return DefaultIcon;
  }, []);

  // Dndkit handler
  // Sets the dragged tech card.
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event;

    const { id } = active;

    setDraggedTech(id as string);
  }, []);

  // Dndkit handler
  // Reorders the tech stack when drag ends.
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTechStack((items) => {
        const oldIndex = items.findIndex((item) => item.name === active.id);
        const newIndex = items.findIndex((item) => item.name === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });

      setDraggedTech(null);
    }
  }, []);

  return (
    <div id="tech" className="relative py-12 min-h-screen">
      {/* Background SVG Image */}
      <FixedBackground svgPath="/background/waves-background.svg" />

      <h1 className="flex flex-col items-center text-white text-6xl pt-12 underline font-plagiata">
        Tech Stack
      </h1>
      <p className="flex flex-col items-center text-white text-mde font-plagiata">
        Hover/Tap/Drag The Cards!
      </p>
      <div className="flex justify-center items-center">
        <CardContainer className="font-plagiata font-bold">
          <DndContext
            id={dndId}
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={techStack.map((tech) => tech.name)}
              strategy={rectSortingStrategy}
            >
              {/* Tech Icons*/}
              {techStack.map((tech) => (
                <Card key={tech.name} name={tech.name} icon={tech.icon} />
              ))}
            </SortableContext>

            {/* The cloned placeholder of the dragged card that remains in the grid. */}
            <DragOverlay>
              {draggedTech ? (
                <Card
                  key={draggedTech}
                  name={draggedTech}
                  icon={findTechIconByName(draggedTech)}
                  overlay={true}
                />
              ) : null}
            </DragOverlay>
          </DndContext>
        </CardContainer>
      </div>

      {/* Bottom buffer. Padding is already set in main container to prevent rendering artifact */}
      <div className="pb-24" />
    </div>
  );
};
