import { EvolutionInfo, Pokemon } from "../../../entites";
import { getLastSegment } from "../../../utils/getLastSegment";
import {
  BasedPokemonSchemaType,
  EvolutionChainSchemaType,
  EvolvesToSchemaType,
  NameUrlSchemaType,
  PokemonSpeciesSchemaType,
  PokemonTypeInfoSchemaType,
} from "../schema";
import getLanguageContent from "./getLanguageContent";

function getIdInURL(url: string) {
  const id = Number(getLastSegment(url));

  if (Number.isNaN(id)) {
    return null;
  }

  return id;
}

interface CreateBasedPokemonProps {
  basedPokemon: BasedPokemonSchemaType;
  pokemonSpecies: PokemonSpeciesSchemaType;
}

export function createPokemon({ basedPokemon, pokemonSpecies }: CreateBasedPokemonProps): Pokemon {
  const { id, sprites, name, weight, height, types } = basedPokemon;
  const { color, names, genera, flavor_text_entries: flavorTexts, evolution_chain: evolutionChain } = pokemonSpecies;

  return {
    id,
    imgUrl: sprites.front_default,
    originName: name,
    weight,
    height,
    color: color.name,
    name: getLanguageContent(names, "name"),
    types: types.map(({ type }) => type.name),
    genus: getLanguageContent(genera, "genus"),
    flavorText: getLanguageContent(flavorTexts, "flavor_text"),
    evolutionChainId: getIdInURL(evolutionChain.url),
  };
}

interface LastEvolvesTo {
  species: NameUrlSchemaType;
}

function extractEvolutionInfo(evolve: EvolvesToSchemaType | LastEvolvesTo, evolutionInfoList: EvolutionInfo[]) {
  const {
    species: { name },
  } = evolve;

  evolutionInfoList.push({ originName: name });

  if (!Object.prototype.hasOwnProperty.call(evolve, "evolves_to")) {
    return;
  }

  const evolveTo = evolve as EvolvesToSchemaType;

  evolveTo.evolves_to.forEach((evolves) => {
    extractEvolutionInfo(evolves, evolutionInfoList);
  });
}

export function createEvolutionInfoList(evolutionChain: EvolutionChainSchemaType): EvolutionInfo[] {
  const evolutionInfoList: EvolutionInfo[] = [];

  evolutionInfoList.push({ originName: evolutionChain.chain.species.name });

  evolutionChain.chain.evolves_to.forEach((evolve) => extractEvolutionInfo(evolve, evolutionInfoList));

  return evolutionInfoList;
}

export function createPokemonType({ name, names }: PokemonTypeInfoSchemaType) {
  return {
    [name]: getLanguageContent(names, "name"),
  };
}
