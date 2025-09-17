"use client";

import { useContext } from "react";
import { BuildContext } from "@/context/BuildContext/BuildContext";

export const useBuildContext = () => {
  const context = useContext(BuildContext);

  if (!context) {
    throw new Error("useBuildContext must be used within a BuildProvider");
  }

  return context;
};
