import { motion, Variants } from "motion/react";
import { SetStateAction, Dispatch, useState } from "react";

export const BurgerButton = ({
  menuOpen,
  onClick,
}: {
  menuOpen: boolean;
  onClick: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determine animation state based on hover and menuOpen
  const animationState = menuOpen ? "open" : isHovered ? "hovered" : "closed";

  /**
   * Variants for animating the burger into an X shape and back.
   * Each part of the burger (top bun, patty, 2nd patty, bottom bun) animates differently.
   */

  // Top bun animation
  const topBunVariants: Variants = {
    closed: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hovered: {
      y: [0, 20, -30, -20],
      opacity: 1,
      scale: [1, 1.15, 1.05, 1.1],
      transition: { duration: 0.4, ease: "easeOut" },
    },
    open: {
      y: [0, 160],
      scale: 1,
      opacity: [1, 0],
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  // Burger patty  animation (middle)
  const pattyVariants: Variants = {
    closed: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hovered: {
      scale: [1, 1.15, 1.05, 1.1],
      rotate: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    open: {
      scale: 1,
      rotate: [0, 0, 0, 60, 45],
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  // 2nd Burger patty animation (middle) (overlays the first patty)
  const secondPattyVariants: Variants = {
    closed: {
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hovered: {
      scale: [1, 1.15, 1.05, 1.1],
      rotate: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    open: {
      scale: 1,
      rotate: [0, 0, 0, -60, -45],
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  // Bottom bun animation
  const bottomBunVariants: Variants = {
    closed: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    hovered: {
      y: [0, -20, 30, 20],
      opacity: 1,
      scale: [1, 1.15, 1.05, 1.1],
      transition: { duration: 0.4, ease: "easeOut" },
    },
    open: {
      y: [0, -80],
      opacity: [1, 0],
      scale: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  return (
    <button
      onClick={() => onClick(!menuOpen)}
      className="md:hidden cursor-pointer"
      style={{ overflow: "visible" }}
    >
      <motion.svg
        width="30"
        height="30"
        viewBox="0 0 421 421"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Top bun with sesame seeds*/}
        <motion.g
          variants={topBunVariants}
          animate={animationState}
          style={{ originX: 0.5, originY: 0.15 }}
        >
          <path
            d="M236.813 0H184.188C90.7847 0 12.3866 69.5834 0.371674 159.7C1.34853 173.343 12.4228 184.188 26.3125 184.188H394.688C408.577 184.188 419.652 173.343 420.628 159.7C408.613 69.5834 330.215 0 236.813 0Z"
            fill="#DCA06C"
          />
          {/* Sesame seeds */}
          <g>
            <circle cx="175.5" cy="81.5" r="10.5" fill="#C38F54" />
            <circle cx="317.5" cy="81.5" r="10.5" fill="#C38F54" />
            <circle cx="246.5" cy="81.5" r="10.5" fill="#C38F54" />
            <circle cx="104.5" cy="81.5" r="10.5" fill="#C38F54" />
            <circle cx="210.5" cy="34.5" r="10.5" fill="#C38F54" />
            <circle cx="281.5" cy="34.5" r="10.5" fill="#C38F54" />
            <circle cx="139.5" cy="34.5" r="10.5" fill="#C38F54" />
          </g>
        </motion.g>

        {/* Burger patty (middle) */}
        <motion.path
          d="M381.531 210.5H39.4688C17.6656 210.5 0 228.179 0 249.969C0 271.759 17.6656 289.438 39.4688 289.438H381.531C403.334 289.438 421 271.759 421 249.969C421 228.179 403.334 210.5 381.531 210.5Z"
          fill="#987854"
          variants={pattyVariants}
          animate={animationState}
        />

        {/* Second Burger patty (middle) */}
        <motion.path
          d="M381.531 210.5H39.4688C17.6656 210.5 0 228.179 0 249.969C0 271.759 17.6656 289.438 39.4688 289.438H381.531C403.334 289.438 421 271.759 421 249.969C421 228.179 403.334 210.5 381.531 210.5Z"
          fill="#987854"
          variants={secondPattyVariants}
          animate={animationState}
          style={{ originX: 0.5, originY: 0.6 }}
        />

        {/* Bottom bun */}
        <motion.g
          id="topBun"
          variants={bottomBunVariants}
          animate={animationState}
        >
          <path
            d="M394.688 315.75H26.3125C11.7814 315.75 0 327.518 0 342.062C11.742 387.363 56.2726 421 105.25 421H315.75C364.727 421 409.258 387.363 421 342.062C421 327.518 409.219 315.75 394.688 315.75Z"
            fill="#DCA06C"
          />
        </motion.g>
      </motion.svg>
    </button>
  );
};
