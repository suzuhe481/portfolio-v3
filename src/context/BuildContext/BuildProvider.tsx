"use client";

import { useState, FC, ReactNode } from "react";
import { BuildContext } from "./BuildContext";

import { BUILDS, IBuildProps } from "@/types";

interface IBuildProviderProps {
  children: ReactNode;
}

export const BuildProvider: FC<IBuildProviderProps> = ({ children }) => {
  const [build, setBuild] = useState<IBuildProps>("");

  const updateBuild = (build: string) => {
    if (BUILDS.includes(build as IBuildProps)) {
      setBuild(build as IBuildProps);
    } else {
      setBuild("");
    }
  };

  return (
    <BuildContext.Provider value={{ build, updateBuild }}>
      {children}
    </BuildContext.Provider>
  );
};
