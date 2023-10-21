export type Language = "ko" | "en";

export type LanguageContent<T extends string, P = string> = {
  [Key in T]: P;
};
