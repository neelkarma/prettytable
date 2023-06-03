import { config, type Config } from "./stores";

export function styleTimetable(node: HTMLElement) {
  const unsubscribe = config.subscribe((config: Config) => {
    // Colors
    for (const [element, color] of Object.entries(config.colors)) {
      node.style.setProperty(`--${element}-color`, color);
    }

    // Fonts
    for (const [element, font] of Object.entries(config.fonts)) {
      node.style.setProperty(`--${element}-font-family`, font.family);
      node.style.setProperty(`--${element}-font-size`, `${font.size}pt`);
      node.style.setProperty(`--${element}-font-color`, font.color);
      node.style.setProperty(
        `--${element}-font-weight`,
        font.bold ? "bold" : "normal"
      );
      node.style.setProperty(
        `--${element}-font-style`,
        font.italic ? "italic" : "normal"
      );
      node.style.setProperty(
        `--${element}-text-decoration`,
        font.underline ? "underline" : "none"
      );
    }

    // Gaps
    for (const [element, gap] of Object.entries(config.gaps)) {
      node.style.setProperty(`--${element}-gap`, `${gap}px`);
    }
  });

  return {
    destroy: unsubscribe,
  };
}
