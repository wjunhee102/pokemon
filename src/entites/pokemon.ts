import { LanguageContent } from "./language";

export interface EvolutionInfo {
  originName: string;
}

export interface EvolutionChain {
  evolutionChain?: EvolutionInfo[];
}

export interface Pokemon extends EvolutionChain {
  id: number;
  imgUrl: string;
  originName: string;
  height: number;
  weight: number;
  color: string;
  types: string[];
  name: LanguageContent;
  genus: LanguageContent;
  flavorText: LanguageContent;
  evolutionChainId: number | null;
}

export interface PokemonTypeName {
  [type: string]: LanguageContent;
}
