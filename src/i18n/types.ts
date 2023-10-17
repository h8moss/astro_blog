import type locales from "./locales";

export type Locale = (typeof locales)[number];

export type I18n<T> = {
  [key in Locale]: T;
};

export type i18nString = I18n<string>;
