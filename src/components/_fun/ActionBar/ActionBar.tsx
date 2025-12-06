"use client";

import {
  SettingsCogIcon,
  DropdownIcon,
  GlobeIcon,
} from "@/assets/icons/PageIcons";
import { motion, Variants } from "motion/react";
import { useState, useRef, useEffect, CSSProperties } from "react";
import { useTravelContext } from "@/hooks/useTravelContext";

// Variants for Settings Cog SVG animation.
const variants: Variants = {
  closed: { borderRadius: "50%" },
  hovered: {
    scale: 1.1,
    transition: {
      type: "spring",
      duration: 0.4,
      bounce: 0.5,
    },
    borderRadius: "50%",
    backgroundColor: "#cad5e2",
  },
  open: {
    scale: 2.5,
    rotate: 180,
    y: 35,
    x: -82,
    transition: {
      type: "spring",
      duration: 0.6,
      bounce: 0.5,
    },
    borderRadius: "50%",
    backgroundColor: "#90a1b9",
  },
};

export const ActionBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { earthSettings, updateEarthSettings } = useTravelContext();

  const { switchToDropdown } = earthSettings;

  // Determine which animation state to use
  const animateState =
    !isHovered && !isOpen
      ? "closed"
      : isHovered && !isOpen
      ? "hovered"
      : isHovered && isOpen
      ? "open"
      : "open";

  return (
    <div className="relative flex flex-row justify-center items-center font-geist-mono text-base md:text-2xl font-bold max-w-full h-20">
      {/* Left Side Buttons - Minimize and Globe */}
      <div className="absolute left-4 md:left-8 transform top-1/2 -translate-y-1/2 z-10 flex flex-row gap-4 justify-center items-center">
        <MinimizeIcon className="w-6 md:w-8 hover:text-slate-500" />
        {switchToDropdown ? (
          <motion.div whileHover={{ scale: 1.2 }}>
            <GlobeIcon
              className="w-6 md:w-8 cursor-pointer"
              onClick={() =>
                updateEarthSettings("switchToDropdown", !switchToDropdown)
              }
            />
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.2 }}>
            <DropdownIcon
              className="w-8 md:w-10 cursor-pointer"
              onClick={() =>
                updateEarthSettings("switchToDropdown", !switchToDropdown)
              }
            />
          </motion.div>
        )}
      </div>

      {/* Centered Text */}
      <div className="w-1/2 text-center">
        <p className="text-sm sm:text-base md:text-lg">
          Pick a location to see some of my pictures!
        </p>
        <p className="text-xs sm:text-sm md:text-base">
          Double click markers to zoom in.
        </p>
      </div>

      {/* Right Side Icon - Settings Cog Icon */}
      <motion.div
        className="absolute right-4 md:right-8 transform top-1/2 -translate-y-1/2 z-10"
        variants={variants}
        initial="unhovered"
        animate={animateState}
        onMouseDown={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <SettingsCogIcon className="w-8 md:w-10 cursor-pointer rounded-full" />
      </motion.div>
      {isOpen && <SettingsModal modalOpen={isOpen} setModalOpen={setIsOpen} />}
    </div>
  );
};

/**
 * A modal component that displays a list of toggle buttons for various settings for the 3D globe.
 * The modal is displayed when the user clicks on the settings icon in the top right corner of the globe.
 * The modal can be closed when the user clicks outside of the modal.
 *
 * @param {boolean} modalOpen - Whether the modal is open or not.
 * @param {(isOpen: boolean) => void} setModalOpen - A function to set whether the modal is open or not.
 * @returns {JSX.Element} The rendered SettingsModal component.
 */
const SettingsModal = ({
  modalOpen,
  setModalOpen,
}: {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { earthSettings, updateEarthSettings } = useTravelContext();

  const {
    switchToDropdown,
    hideMarkers,
    startRotation,
    showAtmosphere,
    showDayNight,
    showShootingStar,
    showSatellite,
    showHighQuality,
  } = earthSettings;

  // Handler function to close modal on outside click.
  function handleClickOutsideMenu(event: MouseEvent) {
    const target = event.target as Node;

    // If icon is clicked while modal is open,
    // Modal remains open.
    // Reason: Without this, modal will flash when clicking the icon.
    if (modalOpen && modalRef.current && modalRef.current.contains(target)) {
      // Does nothing
    }
    // If anywhere else on the page is clicked that isn't inside the menu, close the menu.
    else if (
      modalOpen &&
      modalRef.current &&
      !modalRef.current.contains(target)
    ) {
      setModalOpen(false);
    }
  }

  // Adds/removes event listener for closing the FilterModal on outside button click.
  useEffect(() => {
    const controller = new AbortController();

    document.addEventListener("mousedown", handleClickOutsideMenu, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  });

  return (
    <div
      ref={modalRef}
      className="animate-fadeInSlideDown absolute flex flex-col w-[200px] md:w-[250px] font-bold text-slate-600 z-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-400 right-4 top-full mt-1 shadow-lg"
    >
      <ToggleButton
        text="Switch to List View"
        action={updateEarthSettings}
        name="switchToDropdown"
        value={switchToDropdown}
      />
      <ToggleButton
        text="Start Rotation"
        action={updateEarthSettings}
        name="startRotation"
        value={startRotation}
      />
      <ToggleButton
        text="Hide Markers"
        action={updateEarthSettings}
        name="hideMarkers"
        value={hideMarkers}
      />
      <ToggleButton
        text="Show Atmosphere"
        action={updateEarthSettings}
        name="showAtmosphere"
        value={showAtmosphere}
      />
      <ToggleButton
        text="Show Advanced Darkness"
        action={updateEarthSettings}
        name="showDayNight"
        value={showDayNight}
      />
      <ToggleButton
        text="Shooting Stars"
        action={updateEarthSettings}
        name="showShootingStar"
        value={showShootingStar}
      />
      <ToggleButton
        text="Satellites"
        action={updateEarthSettings}
        name="showSatellite"
        value={showSatellite}
      />
      <ToggleButton
        text="High Quality Textures"
        action={updateEarthSettings}
        name="showHighQuality"
        value={showHighQuality}
      />
    </div>
  );
};

/**
 * A toggle button component used in SettingsModal, which wraps a native HTML checkbox element in a
 * label element. The label element is used to style the checkbox as a toggle
 * button.
 *
 * The component takes in a text prop, which is the text to display next to the
 * toggle button. The action prop is a function that is called when the toggle
 * button is clicked. The name prop is the name of the checkbox, and the value
 * prop is a boolean that determines whether the checkbox is checked or not.
 *
 * @param text The text to display next to the toggle button.
 * @param action A function that is called when the toggle button is clicked.
 * @param name The name of the checkbox.
 * @param value A boolean that determines whether the checkbox is checked or not.
 */
const ToggleButton = ({
  text,
  action,
  name,
  value,
}: {
  text: string;
  action: (name: string, checked: boolean) => void;
  name: string;
  value: boolean;
}) => {
  const onChangeHandler = () => {
    action(name, !value);
  };

  return (
    <div
      onPointerDown={onChangeHandler}
      className={`font-bold cursor-pointer border-b border-slate-400 text-slate-600 bg-slate-100 hover:bg-blue-200`}
    >
      <label className="inline-flex justify-between items-center p-4 cursor-pointer w-full">
        <input
          type="checkbox"
          checked={value}
          name={name}
          className="sr-only peer"
          readOnly
        />
        <div className="shrink-0 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
        <span className="flex-1 text-sm md:text-base text-right select-none">
          {text}
        </span>
      </label>
    </div>
  );
};

interface IMinimizeIconProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * This component renders the minimize icon button.
 * The button toggles the minimizeEarth state of the TravelContext.
 * The icon's initial state is 2 arrows pointing towards each other.
 * On click, the arrows are animated to spin and point away from each other.
 * This icon updates the minimizeEarth state of the TravelContext, to minimize the earth.
 */
const MinimizeIcon = ({ className, style }: IMinimizeIconProps) => {
  const { earthSettings, updateEarthSettings } = useTravelContext();

  const { minimizeEarth } = earthSettings;

  // Variants for animation.
  // Direction indicates the direction of the arrow.
  const variants: Variants = {
    initial: {
      rotate: 0,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.1,
      },
    },
    clockWise: {
      rotate: 180,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.1,
      },
    },
    counterClockWise: {
      rotate: -180,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.1,
      },
    },
    hovered: {
      scale: 1.1,
      transition: {
        type: "spring",
        duration: 0.4,
        bounce: 0.5,
      },
    },
  };

  const onClickHandler = () => {
    updateEarthSettings("minimizeEarth", !minimizeEarth);
  };

  return (
    <div className="cursor-pointer rounded-full">
      <motion.svg
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
        whileHover={{ scale: 1.1 }}
        onClick={onClickHandler}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <motion.path
            variants={variants}
            initial={minimizeEarth ? "clockWise" : "initial"}
            animate={minimizeEarth ? "clockWise" : "initial"}
            d="M15.7071 1.70712L12.7071 4.70712L15 7.00001L14 8.00001H7.99995V2.00001L8.99995 1.00001L11.2928 3.29291L14.2928 0.292908L15.7071 1.70712Z"
            fill="currentColor"
          ></motion.path>
          <motion.path
            variants={variants}
            initial={minimizeEarth ? "counterClockWise" : "initial"}
            animate={minimizeEarth ? "counterClockWise" : "initial"}
            d="M4.70706 12.7071L6.99995 15L7.99995 14V8.00001L1.99995 8.00001L0.999953 9.00002L3.29285 11.2929L0.292847 14.2929L1.70706 15.7071L4.70706 12.7071Z"
            fill="currentColor"
          ></motion.path>
        </g>
      </motion.svg>
    </div>
  );
};
