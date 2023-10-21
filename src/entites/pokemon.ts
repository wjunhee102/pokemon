import { LanguageContent } from "./language";

export type PokemonType = "grass" | "poison";

export interface Pokemon<T extends string> {
  id: number;
  imgUrl: string;
  originName: string;
  height: number;
  weight: number;
  color: string;
  name: LanguageContent<T>;
  types: LanguageContent<T, string>[];
  genus: LanguageContent<T>;
}

export interface PokemonDetail<T extends string> {
  gender: "male" | "female";
  characteristic: LanguageContent<T>;
  ability: LanguageContent<T>;
  nature: LanguageContent<T>;
  stat: LanguageContent<T>;
}
