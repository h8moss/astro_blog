import type { Locale } from "./types";
import { ui, type UiTitles } from "./ui";

const withLocale = (locale: Locale, name: UiTitles): string => {
  return ui[locale][name];
};

export { withLocale };
