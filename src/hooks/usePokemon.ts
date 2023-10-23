import { useCallback } from "react";
import { EvolutionInfo, Language, LanguageContent, Pokemon, PokemonType } from "../entites";
import { setPokemon, setEvolutionChain, useAppSelector, setPokemonType, useAppDispatch } from "../store";
import { pokemonService } from "../services/pokemon";

function getContent(languageContent: LanguageContent, language: Language) {
  if (!Object.prototype.hasOwnProperty.call(languageContent, language)) {
    return Object.values(languageContent)[0] ?? "";
  }

  return languageContent[language];
}

export function useGetPokemon(originName: string, language: Language = "ko") {
  const { pokedex } = useAppSelector((state) => state.pokemon);

  if (!Object.prototype.hasOwnProperty.call(pokedex, originName)) {
    return null;
  }

  const pokemon = pokedex[originName];

  const { name, genus, flavorText, ...restPokemon } = pokemon;

  return {
    name: getContent(name, language),
    genus: getContent(genus, language),
    flavorText: getContent(flavorText, language),
    ...restPokemon,
  };
}

export function useGetPokemonTypeContent(typeName: string, language: Language = "ko") {
  const { type } = useAppSelector((state) => state.pokemon);

  if (!Object.prototype.hasOwnProperty.call(type, typeName)) {
    return null;
  }

  const typeContent = type[typeName];

  return getContent(typeContent, language);
}

export function useSetPokemon() {
  const dispatch = useAppDispatch();

  return useCallback(
    (pokemon: Pokemon) => {
      dispatch(setPokemon(pokemon));
    },
    [dispatch],
  );
}

export function useSetPokemonType() {
  const dispatch = useAppDispatch();

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

export function useSetEvolutionChain() {
  const dispatch = useAppDispatch();

  return useCallback(
    (info: EvolutionChainInfo) => {
      dispatch(setEvolutionChain(info));
    },
    [dispatch],
  );
}

export function usePokemon(originName: string) {
  const pokemon = useGetPokemon(originName);
  const setPokemonAction = useSetPokemon();
  const fetchAndSetPokemon = async () => {
    const pokemonResult = await pokemonService.getPokemon(originName);

    setPokemonAction(pokemonResult);

    return true;
  };

  return [pokemon, fetchAndSetPokemon] as const;
}
