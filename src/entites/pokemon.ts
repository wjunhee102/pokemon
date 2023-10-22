import { LanguageContent } from "./language";

export type PokemonType = "grass" | "poison";

export interface EvolutionInfo {
  originName: string;
}

export interface Pokemon<T extends string> {
  id: number;
  imgUrl: string;
  originName: string;
  height: number;
  weight: number;
  color: string;
  name: LanguageContent;
  types: LanguageContent[];
  genus: LanguageContent;
  flavorText: LanguageContent;
  evolutionChain?: EvolutionInfo[];
}
