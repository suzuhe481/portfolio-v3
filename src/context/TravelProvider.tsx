"use client";

import { useState, FC, ReactNode } from "react";
import { TravelContext } from "./TravelContext";

import {
  COUNTRIES,
  LOCATIONS,
  ICountriesProps,
  ILocationsProps,
  IEarthSettingsProps,
} from "@/types";

interface ITravelProviderProps {
  children: ReactNode;
}

export const TravelProvider: FC<ITravelProviderProps> = ({ children }) => {
  const [country, setCountry] = useState<ICountriesProps>("");
  const [location, setLocation] = useState<ILocationsProps>("");

  const [earthSettings, setEarthSettings] = useState<IEarthSettingsProps>({
    switchToDropdown: false, // Renders the earth. When false, display dropdown. Saves resources.
    minimizeEarth: false, // Hides the earth, but still rendered
    hideMarkers: false,
    startRotation: false,
    showAtmosphere: false,
    showDayNight: false,
    showShootingStar: false,
    showSatellite: false,
    showHighQuality: false,
  });

  const updateEarthSettings = (name: string, checked: boolean) => {
    setEarthSettings({
      ...earthSettings,
      [name]: checked,
    });
  };

  const updateLocation = (location: string) => {
    if (LOCATIONS.includes(location as ILocationsProps)) {
      setLocation(location as ILocationsProps);
    } else {
      setLocation("");
    }
  };

  const updateCountry = (country: string) => {
    if (COUNTRIES.includes(country as ICountriesProps)) {
      setCountry(country as ICountriesProps);
    } else {
      setCountry("");
    }
  };

  return (
    <TravelContext.Provider
      value={{
        country,
        updateCountry,
        location,
        updateLocation,
        earthSettings,
        updateEarthSettings,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
};
