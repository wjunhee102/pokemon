import { Language, LanguageContent } from "../entites/language";

export const LANGUAGE_LIST: Language[] = ["en", "ko"];

export const LANGUAGE_CONTENT = LANGUAGE_LIST.reduce((acc, cur) => {
  if (!acc[cur]) {
    acc[cur] = "";
  }

  return acc;
}, {} as LanguageContent);
