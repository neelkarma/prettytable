import { writable } from "svelte/store";

export interface ConfigFont {
  family: string;
  color: string;
  size: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
}
export interface Config {
  colors: {
    bg: string;
    separator: string;
  };
  fonts: {
    day: ConfigFont;
    period: ConfigFont;
    class: ConfigFont;
    room: ConfigFont;
  };
  gaps: {
    outer: number;
    week: number;
    day: number;
    period: number;
  };
  includePeriodZero: boolean;
}

export const config = writable<Config>({
  colors: {
    bg: "#fafafa",
    separator: "#c0c0c0",
  },
  fonts: {
    day: {
      family: "Inter",
      color: "#000000",
      size: 12,
      bold: true,
      italic: false,
      underline: false,
    },
    period: {
      family: "Inter",
      color: "#505050",
      size: 12,
      bold: false,
      italic: false,
      underline: false,
    },
    class: {
      family: "Inter",
      color: "#303030",
      size: 12,
      bold: false,
      italic: false,
      underline: false,
    },
    room: {
      family: "Inter",
      color: "#303030",
      size: 12,
      bold: false,
      italic: false,
      underline: false,
    },
  },
  gaps: {
    outer: 12,
    week: 6,
    day: 0,
    period: 4,
  },
  includePeriodZero: true,
});
