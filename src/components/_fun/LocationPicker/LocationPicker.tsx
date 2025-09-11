"use client";

import { useTravelContext } from "@/hooks/useTravelContext";
import { ICountriesProps, ILocationsProps } from "@/types";

/**
 * A component that renders a dropdown menu of locations from different countries.
 * Updates the current location and country in the travelContext when a location is selected.
 * An alternative view to the Earth component.
 *
 * @returns A JSX Element representing the location picker.
 */
export const LocationPicker = () => {
  const { updateCountry, updateLocation } = useTravelContext();

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { selectedIndex, options } = e.target;

    const selectedOption = options[selectedIndex];
    const location = selectedOption.value as ILocationsProps;
    const country = selectedOption.closest("optgroup")
      ?.label as ICountriesProps;

    updateLocation(location);
    updateCountry(country);
  }

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative flex flex-row justify-center items-center gap-4">
        <div className="flex flex-row gap-2 justify-center items-center h-10">
          <label
            htmlFor="location"
            className="text-sm font-medium text-gray-900"
          >
            Location:
          </label>
          <select
            name="location"
            id="location"
            onChange={handleOnChange}
            className="bg-gray-50 border px-4 py-2 cursor-pointer border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full"
          >
            <option value="">Choose a country</option>
            <optgroup label="Dominican Republic">
              <option value="Santo Domingo">Santo Domingo</option>
            </optgroup>
            <optgroup label="Japan">
              <option value="Osaka">Osaka</option>
              <option value="Kyoto">Kyoto</option>
              <option value="Tokyo">Tokyo</option>
            </optgroup>
            <optgroup label="Italy">
              <option value="Rome">Rome</option>
              <option value="Sperlonga">Sperlonga</option>
              <option value="Florence">Florence</option>
              <option value="Cinque Terre">Cinque Terre</option>
              <option value="Ortisei">Ortisei</option>
              <option value="Venice">Venice</option>
            </optgroup>
            <optgroup label="Hawaii">
              <option value="O‘ahu">O&apos;ahu</option>
              <option value="Honolulu">Honolulu</option>
            </optgroup>
            <optgroup label="Netherlands">
              <option value="Amsterdam">Amsterdam</option>
            </optgroup>
            <optgroup label="Norway">
              <option value="Oslo">Oslo</option>
              <option value="Tromsø">Tromsø</option>
            </optgroup>
            <optgroup label="England">
              <option value="London">London</option>
              <option value="Cotswolds">Cotswolds</option>
              <option value="Oxford">Oxford</option>
              <option value="Dover">Dover</option>
            </optgroup>
          </select>
        </div>
      </div>
    </div>
  );
};
