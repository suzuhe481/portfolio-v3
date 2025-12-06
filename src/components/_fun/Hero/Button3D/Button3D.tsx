import { motion, useAnimation } from "motion/react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Button3D {
  children: ReactNode;
  topColor?: string;
  middleColor?: string;
  bottomColor?: string;
}

/**
 * A 3D button component with customizable colors.
 *
 * @param {ReactNode} children - The content of the button.
 * @param {string} [topColor] - The color of the top layer.
 * @param {string} [middleColor] - The color of the middle layer.
 * @param {string} [bottomColor] - The color of the bottom layer.
 * @returns {JSX.Element} The 3D button component.
 */
export const Button3D = ({
  children,
  topColor,
  middleColor,
  bottomColor,
}: Button3D) => {
  const controlsA = useAnimation();
  const controlsB = useAnimation();
  const controlsC = useAnimation();

  return (
    <motion.div
      className="inline-flex justify-center items-center cursor-pointer w-[100px] h-[50px]"
      onHoverStart={() => {
        controlsA.start({ x: -5, y: -5 });
        controlsB.start({ x: 0, y: 0 });
        controlsC.start({ x: 5, y: 5 });
      }}
      onHoverEnd={() => {
        controlsA.start({ x: 0, y: 0 });
        controlsB.start({ x: 0, y: 0 });
        controlsC.start({ x: 0, y: 0 });
      }}
      onTapStart={() => {
        controlsA.start({ x: -5, y: -5 });
        controlsB.start({ x: 0, y: 0 });
        controlsC.start({ x: 5, y: 5 });
      }}
      onTapCancel={() => {
        controlsA.start({ x: 0, y: 0 });
        controlsB.start({ x: 0, y: 0 });
        controlsC.start({ x: 0, y: 0 });
      }}
    >
      {/* TOP */}
      <motion.div
        className={cn(
          "absolute rounded-lg z-30 px-4 py-2",
          `${topColor ? topColor : "bg-red-500"}`
        )}
        animate={controlsA}
      >
        {children}
      </motion.div>
      {/* MIDDLE */}
      <motion.div
        className={cn(
          "absolute rounded-lg z-20 px-4 py-2 text-transparent",
          `${middleColor ? middleColor : "bg-green-500"}`
        )}
        animate={controlsB}
      >
        {children}
      </motion.div>
      {/* BOTTOM */}
      <motion.div
        className={cn(
          "absolute rounded-lg z-10 px-4 py-2 text-transparent",
          `${bottomColor ? bottomColor : "bg-blue-500"}`
        )}
        animate={controlsC}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
