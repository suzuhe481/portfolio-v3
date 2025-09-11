"use client";

import { createContext } from "react";

import { ICountriesProps, ILocationsProps, IEarthSettingsProps } from "@/types";

interface ITravelContextProps {
  country: ICountriesProps;
  updateCountry: (country: string) => void;

  location: ILocationsProps;
  updateLocation: (location: string) => void;

  earthSettings: IEarthSettingsProps;
  updateEarthSettings: (name: string, checked: boolean) => void;
}

export const TravelContext = createContext<ITravelContextProps | undefined>(
  undefined
);
