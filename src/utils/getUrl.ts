import { Language } from "../entites";

export function getPokemonUrl(language?: Language) {
  if (!language || language === "ko") {
    return "/pokemon";
  }

  return `/${language}/pokemon`;
}
