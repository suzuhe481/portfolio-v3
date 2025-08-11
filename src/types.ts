import { FC } from "react";

interface FCProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface ITechStackDataProps {
  name: string;
  icon: FC<FCProps>;
}

export interface IProjectCardProps {
  title: string;
  thumbnail_image: string;
  demo_link: string;
  github_link: string;
  tech_stack: string[];
  description: string;
}

export interface IProjectCardsDataProps {
  card: IProjectCardProps;
  setActive: React.Dispatch<
    React.SetStateAction<boolean | IProjectCardProps | null>
  >;
  id: string;
}

export interface IExperienceDataProps {
  title: string;
  content: string;
}
