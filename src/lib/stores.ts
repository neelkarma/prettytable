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

export const validateConfig = (config: any): config is Config => {
  // Colors
  for (const key of ["bg", "separator"]) {
    console.log(typeof config.colors[key]);
    if (typeof config.colors[key] !== "string") return false;
  }

  // Fonts
  for (const key of ["day", "period", "class", "room"]) {
    if (
      typeof config.fonts[key].family !== "string" ||
      typeof config.fonts[key].color !== "string" ||
      typeof config.fonts[key].size !== "number" ||
      typeof config.fonts[key].bold !== "boolean" ||
      typeof config.fonts[key].italic !== "boolean" ||
      typeof config.fonts[key].underline !== "boolean"
    )
      return false;
  }

  // Gaps
  for (const key of ["outer", "week", "day", "period"]) {
    if (typeof config.gaps[key] !== "number") return false;
  }

  // Other
  if (typeof config.includePeriodZero !== "boolean") return false;

  return true;
};
