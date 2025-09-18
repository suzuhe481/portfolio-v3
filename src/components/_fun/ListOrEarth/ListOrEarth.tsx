"use client";

import Earth from "../Earth/Earth";
import { LocationPicker } from "../LocationPicker/LocationPicker";

import { useTravelContext } from "@/hooks/useTravelContext";

/**
 * Returns either the LocationPicker or the Earth component, based on the
 * switchToDropdown setting in the travelContext.
 *
 * @returns {JSX.Element} LocationPicker or Earth component.
 */
export const ListOrEarth = () => {
  const { earthSettings } = useTravelContext();

  const { switchToDropdown } = earthSettings;

  return <>{switchToDropdown ? <LocationPicker /> : <Earth />}</>;
};
