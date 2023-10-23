import { useCallback } from "react";
import { EvolutionInfo, Language, LanguageContent, Pokemon, PokemonType } from "../entites";
import { setPokemon, setEvolutionChain, useAppDispatch, useAppSelector, setPokemonType } from "../store";

function getContent(languageContent: LanguageContent, language: Language) {
  if (!Object.prototype.hasOwnProperty.call(languageContent, language)) {
    return Object.values(languageContent)[0] ?? "";
  }

  return languageContent[language];
}

export function useGetPokemon(originName: string) {
  const {
    language: { currentLanguage },
    pokemon: { pokedex },
  } = useAppSelector((state) => state);

  if (!Object.prototype.hasOwnProperty.call(pokedex, originName)) {
    return null;
  }

  const pokemon = pokedex[originName];

  const { name, genus, flavorText, ...restPokemon } = pokemon;

  return {
    name: getContent(name, currentLanguage),
    genus: getContent(genus, currentLanguage),
    flavorText: getContent(flavorText, currentLanguage),
    ...restPokemon,
  };
}

export function useGetPokemonTypeContent(typeName: string) {
  const {
    language: { currentLanguage },
    pokemon: { type },
  } = useAppSelector((state) => state);

  if (!Object.prototype.hasOwnProperty.call(type, typeName)) {
    return null;
  }

  const typeContent = type[typeName];

  return getContent(typeContent, currentLanguage);
}

export function useSetPokemon(dispatch: ReturnType<typeof useAppDispatch>) {
  return useCallback(
    (pokemon: Pokemon) => {
      dispatch(setPokemon(pokemon));
    },
    [dispatch],
  );
}

export function useSetPokemonType(dispatch: ReturnType<typeof useAppDispatch>) {
  return useCallback(
    (pokemonType: PokemonType) => {
      dispatch(setPokemonType(pokemonType));
    },
    [dispatch],
  );
}

interface EvolutionChainInfo {
  originName: string;
  evolutionChain: EvolutionInfo[];
}

export function useSetEvolutionChain(dispatch: ReturnType<typeof useAppDispatch>) {
  return useCallback(
    (info: EvolutionChainInfo) => {
      dispatch(setEvolutionChain(info));
    },
    [dispatch],
  );
}
