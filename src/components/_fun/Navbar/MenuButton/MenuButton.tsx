import { motion } from "motion/react";
import { SetStateAction, Dispatch } from "react";

export const MenuButton = ({
  menuOpen,
  onClick,
}: {
  menuOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) => {
  const animationState = menuOpen ? "toX" : "toMenu";

  /**
   * Variants store the animation keyframes of how to transition from a menu to X and vice versa.
   * 3 variants for the 3 lines of the menu icon.
   */

  // Top line animation
  const topLineVariants = {
    menu: { y: 0, rotate: 0 },
    toX: {
      y: [0, -2, 6, 6, 6],
      rotate: [0, 0, 0, 60, 45],
      transition: { duration: 0.5 },
    },
    toMenu: {
      y: [6, 6, 6, -2, 0],
      rotate: [45, 60, 0, 0, 0],
      transition: { duration: 0.5 },
    },
  };

  // Middle line animation
  const middleLineVariants = {
    menu: { y: 0, rotate: 0 },
    toX: {
      opacity: [1, 1, 0, 0],
      transition: { duration: 0.5 },
    },
    toMenu: {
      opacity: [0, 0, 1, 1],
      transition: { duration: 0.5 },
    },
  };

  // Bottom line animation
  const bottomLineVariants = {
    menu: { y: 0, rotate: 0 },
    toX: {
      y: [0, 2, -6, -6, -6],
      rotate: [0, 0, 0, -60, -45],
      transition: { duration: 0.5 },
    },
    toMenu: {
      y: [-6, -6, -6, 2, 0],
      rotate: [-45, -60, 0, 0, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <button
      onClick={() => onClick(!menuOpen)}
      className="md:hidden cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Top line */}
        <motion.path
          d="M4 6h16"
          variants={topLineVariants}
          initial={false}
          animate={animationState}
        />
        {/* Middle line */}
        <motion.path
          d="M4 12h16"
          variants={middleLineVariants}
          initial={false}
          animate={animationState}
        />
        {/* Bottom line */}
        <motion.path
          d="M4 18h16"
          variants={bottomLineVariants}
          initial={false}
          animate={animationState}
        />
      </svg>
    </button>
  );
};
