export type Language = "ko" | "en";

export type LanguageContent = {
  [Key in Language]: string;
};
