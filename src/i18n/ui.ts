import type { I18n } from "./types";

export type UiTitles = "index.title";

type _UI = {
  [Key in UiTitles]: string;
};

export const ui: I18n<_UI> = {
  en: { "index.title": "Daniel Armenta's blog" },
  es: { "index.title": "Blog de Daniel Armenta" },
};
