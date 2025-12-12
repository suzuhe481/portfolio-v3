"use client";

import { RefObject, ReactNode, useState, useEffect, useRef } from "react";
import { motion, Variants, useMotionValue } from "motion/react";
import { cn } from "@/lib/utils";

// Random floating animation paths.
const floatAnimations = [
  { y: [0, -4, 0, 4, 0], x: [0, 3, 0, -3, 0] },
  { y: [0, -6, 0, 6, 0], x: [0, 4, 0, -4, 0] },
  { y: [2, 0, -2, 0, 2], x: [0, 7, 0, -7, 0] },
  { y: [5, 0, -5, 0, 5], x: [3, -2, -3, 2, 3] },
  { y: [3, 5, 3, -3, -5, -3, 0], x: [3, 5, 3, -3, -5, -3, 0] },
  { y: [0, -2, -4, -2, 0, 2, 4, 2, 0], x: [0, 1, 2, 1, 0, -1, -2, -1, 0] },
  { y: [0, -1, 0, 1, 0], x: [0, 1, 0, -1, 0] },
  { y: [0, -8, 0, 8, 0], x: [0, 5, 0, -5, 0] },
  { y: [0, -3, 0, 3, 0], x: [0, 1.5, 0, -1.5, 0] },
];

interface IFloatingIconProps {
  children: ReactNode;
  className?: string;
  containerRef: RefObject<HTMLDivElement | null>;
  initialPosition: { x: number; y: number };
  description: string;
}

/**
 * FloatingIcon is a floating animation component that displays a child icon on
 * the screen and allows for interaction with it. It randomly selects an animation
 * path and applies it to the icon. The icon can be dragged around the screen and reappears when dragged off screen.
 * When hovering over the icon, it displays a tooltip modal with
 * a description of the icon.
 *
 * @param {ReactNode} children - The child element to be displayed as the icon.
 * @param {string} [className] - Optional CSS class name for styling the icon.
 * @param {RefObject<HTMLDivElement | null>} containerRef - Reference to the container element.
 * @param {{x: number; y: number}} initialPosition - Initial position of the icon.
 * @param {string} description - Description of the icon to be displayed in the tooltip modal.
 * @return {JSX.Element} The FloatingIcon component.
 */
const FloatingIcon = ({
  children,
  className,
  containerRef,
  initialPosition,
  description,
}: IFloatingIconProps) => {
  const [iconPosition, setIconPosition] = useState(initialPosition);
  const [mouseDown, setMouseDown] = useState(false); // Determines background color of icon on click.
  const [isHovered, setIsHovered] = useState(false); // Determines whether tooltip gets displayed
  const [isDragged, setIsDragged] = useState(false); // Prevents float animation from playing and resetting icon's position.
  const [tooltipPosition, setTooltipPosition] = useState<"above" | "below">(
    "above"
  );
  const iconRef = useRef<HTMLDivElement>(null);

  // Transient transform applied by drag (translateX/translateY)
  // Only gets updated on icon drag.
  const iconX = useMotionValue(0);
  const iconY = useMotionValue(0);

  const animation = getRandomAnimation();
  const delayValues = [0.4, 0.6, 0.8, 1];
  const appearanceDelay =
    delayValues[Math.floor(Math.random() * delayValues.length)];

  // Variants for animation.
  // hidden => visible variant does a pop in effect when first loaded.
  // float variant does a floating effect after loaded in.
  const variants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        scale: {
          type: "spring",
          duration: 0.4,
          bounce: 0.5,
          delay: appearanceDelay,
        },
      },
    },
    float: {
      x: animation.x,
      y: animation.y,
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Updates modal position based on icon's screen position.
  // Modal can be above or below the icon.
  const updateModalPosition = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      const isNearTop = rect.top < window.innerHeight / 2;
      setTooltipPosition(isNearTop ? "below" : "above");
    }
  };

  const dragTransitionEndHandler = () => {
    setIsDragged(false);
    updateModalPosition();

    // Get the icon's current translate values.
    const dx = iconX.get();
    const dy = iconY.get();

    // Updates the icon's left/right position after drag end
    setIconPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));

    // Reset motion values
    iconX.set(0);
    iconY.set(0);
  };

  // Set the modal position when icon's screen position changes.
  useEffect(() => {
    updateModalPosition();
  }, [iconX, iconY]);

  // Event listener to disable hover on touch devices and disable Tooltip.
  useEffect(() => {
    const handleOutsideClick = (e: TouchEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setIsHovered(false);
        setMouseDown(false);
      }
    };

    document.addEventListener("touchstart", handleOutsideClick);

    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, []);

  return (
    <motion.div
      ref={iconRef}
      className={cn(
        "absolute cursor-pointer border-2 border-slate-300 rounded-full p-2 bg-slate-100/50 w-full h-full backdrop-blur-[1px]",
        className,
        `${mouseDown ? "bg-slate-400/50" : ""}`
      )}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      animate={isDragged || isHovered ? "" : "float"}
      onMouseDown={() => setMouseDown(true)}
      onMouseUp={() => setMouseDown(false)}
      drag
      dragConstraints={containerRef}
      onDragStart={() => setIsDragged(true)}
      onDrag={() => updateModalPosition()}
      onDragTransitionEnd={dragTransitionEndHandler}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => {
        setMouseDown(true);
        setIsHovered(true);
      }}
      style={{
        left: iconPosition.x,
        top: iconPosition.y,
        x: iconX,
        y: iconY,
      }}
    >
      {children}

      {/* Tooltip Modal */}
      {isHovered && (
        <TooltipModal
          description={description}
          modalPosition={tooltipPosition}
        />
      )}
    </motion.div>
  );
};

export default FloatingIcon;

/**
 * TooltipModal is a component that renders a floating modal with a tooltip
 * description. It takes two props:
 * - description: a string that will be displayed in the modal.
 * - modalPosition: a string that determines the position of the modal relative
 *   to the icon. It can be either "above" or "below".
 *
 * @param {string} description - The description to be displayed in the modal.
 * @param {"above" | "below"} modalPosition - The position of the modal relative
 *   to the icon.
 * @return {JSX.Element} The rendered TooltipModal component.
 */
const TooltipModal = ({
  description,
  modalPosition,
}: {
  description: string;
  modalPosition: "above" | "below";
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: modalPosition === "above" ? 10 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: modalPosition === "above" ? 10 : -10 }}
      transition={{ duration: 0.2 }}
      className={`absolute px-3 py-1 text-md border-b left-1/2 -translate-x-1/2 font-bold border-slate-400 text-slate-600 bg-slate-100 rounded-lg shadow-md whitespace-nowrap z-10
            ${modalPosition === "above" ? "bottom-full mb-2" : "top-full mt-2"}
          `}
    >
      {description}
    </motion.div>
  );
};

/**
 * Returns a random animation from the floatAnimations array.
 *
 * @return {object} A random animation object with properties 'x' and 'y'.
 */
function getRandomAnimation() {
  return floatAnimations[Math.floor(Math.random() * floatAnimations.length)];
}
