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
  setActive: (card: IProjectCardProps | null) => void;
  isActive?: boolean;
  id?: string;
}

export interface IExperienceDataProps {
  title: string;
  content: string;
}

export const COUNTRIES = [
  "Dominican Republic",
  "Japan",
  "Italy",
  "Hawaii",
  "Netherlands",
  "Norway",
  "England",
];

export type ICountriesProps = (typeof COUNTRIES)[number];

export const LOCATIONS = [
  "Santo Domingo",
  "Osaka",
  "Kyoto",
  "Tokyo",
  "Rome",
  "Sperlonga",
  "Florence",
  "Cinque Terre",
  "Ortisei",
  "Venice",
  "O‘ahu",
  "Honolulu",
  "Amsterdam",
  "Oslo",
  "Tromsø",
  "London",
  "Cotswolds",
  "Oxford",
  "Dover",
];

export type ILocationsProps = (typeof LOCATIONS)[number];

export interface IEarthSettingsProps {
  switchToDropdown: boolean;
  minimizeEarth: boolean;
  hideMarkers: boolean;
  startRotation: boolean;
  showAtmosphere: boolean;
  showDayNight: boolean;
  showShootingStar: boolean;
  showSatellite: boolean;
  showHighQuality: boolean;
}

export type IEarthMarker = {
  name: string;
  lat: number;
  lng: number;
  type: "city" | "group";
  parent?: string;
};

export interface IImageRow {
  order_index: number;
  largeImage: string;
  thumbnailImage: string;
  description: string;
}

export interface IBuildImagesData {
  main_description: string;
  imagesData: IImageRow[];
}

export const BUILDS = [
  "Assassin's Tomahawk",
  "Gambol Shroud",
  "Leviathan Axe",
  "Stormbreaker Axe",
  "Aku Aku Mask",
  "PS5 DualSense Mod",
];

export type IBuildProps = (typeof BUILDS)[number];
