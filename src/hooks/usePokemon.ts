import { useCallback, useEffect, useState } from "react";
import { EvolutionInfo, Language, LanguageContent, Pokemon, PokemonType } from "../entites";
import { setPokemon, setEvolutionChain, useAppSelector, setPokemonType, useAppDispatch } from "../store";
import { pokemonService } from "../services/pokemon";

function getContent(languageContent: LanguageContent, language: Language) {
  if (!Object.prototype.hasOwnProperty.call(languageContent, language)) {
    return Object.values(languageContent)[0] ?? "";
  }

  return languageContent[language];
}

export function useGetPokemon(originName: string) {
  const { pokedex } = useAppSelector((state) => state.pokemon);
  const { currentLanguage } = useAppSelector((state) => state.language);

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
  const { type } = useAppSelector((state) => state.pokemon);
  const { currentLanguage } = useAppSelector((state) => state.language);

  if (!Object.prototype.hasOwnProperty.call(type, typeName)) {
    return null;
  }

  const typeContent = type[typeName];

  return getContent(typeContent, currentLanguage);
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

export function usePokemon(idOrName: string) {
  const [originName, setName] = useState(idOrName);

  const pokemon = useGetPokemon(originName);
  const setPokemonAction = useSetPokemon();
  const fetchAndSetPokemon = async () => {
    const pokemonResult = await pokemonService.getPokemon(idOrName);

    if (pokemonResult.originName !== idOrName) {
      setName(pokemonResult.originName);
    }

    setPokemonAction(pokemonResult);

    return true;
  };

  useEffect(() => {
    setName(idOrName);
  }, [idOrName]);

  return [pokemon, fetchAndSetPokemon] as const;
}
