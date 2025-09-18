import { useContext } from "react";
import { TravelContext } from "../context/TravelContext";

export const useTravelContext = () => {
  const context = useContext(TravelContext);

  if (!context) {
    throw new Error("useTravelContext must be used within a TravelProvider");
  }

  return context;
};
