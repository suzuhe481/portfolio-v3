import { FC } from "react";

interface FCProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ITechStackDataProps {
  name: string;
  icon: FC<FCProps>;
}
