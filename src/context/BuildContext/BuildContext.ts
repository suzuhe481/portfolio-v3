"use client";

import { createContext } from "react";

import { IBuildProps } from "@/types";

interface IBuildContextProps {
  build: IBuildProps;
  updateBuild: (build: string) => void;
}

export const BuildContext = createContext<IBuildContextProps | undefined>(
  undefined
);
