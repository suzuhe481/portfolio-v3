import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const CardContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-2 mt-12",
        className
      )}
    >
      {children}
    </div>
  );
};
