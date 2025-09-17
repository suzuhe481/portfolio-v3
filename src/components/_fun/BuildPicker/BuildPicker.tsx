"use client";

import { useBuildContext } from "@/hooks/useBuildContext";
import { IBuildProps } from "@/types";

/**
 * A component that renders a dropdown menu of different builds.
 * Updates the current build in the buildContext when a build is selected.
 *
 * @returns A JSX Element representing the build picker.
 */
export const BuildPicker = () => {
  const { updateBuild } = useBuildContext();

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { selectedIndex, options } = e.target;
    const selectedOption = options[selectedIndex];
    const build = selectedOption.value as IBuildProps;

    updateBuild(build);
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative flex flex-row justify-center items-center gap-4">
        <div className="flex flex-row gap-2 justify-center items-center h-10">
          <label htmlFor="build" className="text-sm font-medium text-gray-900">
            Build:
          </label>
          <select
            name="build"
            id="build"
            onChange={handleOnChange}
            className="bg-gray-50 border px-4 py-2 cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
          >
            <option value="">Choose a build</option>
            <option value="Assassin's Tomahawk">
              Assassin&apos;s Creed III - Assassin&apos;s Tomahawk
            </option>
            <option value="Gambol Shroud">RWBY - Gambol Shroud</option>
            <option value="Leviathan Axe">
              God of War (2018) - Leviathan Axe
            </option>
            <option value="Stormbreaker Axe">
              Avengers: Infinity War - Stormbreaker Axe
            </option>
            <option value="Aku Aku Mask">Crash Bandicoot - Aku Aku Mask</option>
            <option value="PS5 DualSense Mod">
              PlayStation 5 DualSense Mod
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};
