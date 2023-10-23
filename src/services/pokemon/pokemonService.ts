import { EvolutionInfo, Pokemon } from "../../entites";
import { RestAPI, RestAPIProtocol } from "../../utils/api";
import {
  EvolutionChainSchema,
  PokemonListSchema,
  BasedPokemonSchema,
  PokemonSpeciesSchema,
  PokemonTypeInfoSchema,
} from "./schema";
import { createEvolutionInfoList, createPokemon, createPokemonType } from "./utils/create";

class PokemonService {
  constructor(private fetch: RestAPIProtocol = new RestAPI("https://pokeapi.co/api/v2")) {}

  public getBasedPokemon(pokemonIdOrName: number | string) {
    return this.fetch.get({ url: "pokemon", param: `${pokemonIdOrName}`, validate: BasedPokemonSchema.parse });
  }

  public getPokemonSpecies(pokemonIdOrName: number | string) {
    return this.fetch.get({
      url: "pokemon-species",
      param: `${pokemonIdOrName}`,
      validate: PokemonSpeciesSchema.parse,
    });
  }

  public getEvolutionChain(evolutionChainId: number) {
    return this.fetch.get({
      url: "evolution-chain",
      param: `${evolutionChainId}`,
      validate: EvolutionChainSchema.parse,
    });
  }

  public async getPokemon(pokemonIdOrName: number | string): Promise<Pokemon> {
    const [basedPokemon, pokemonSpecies] = await Promise.all([
      this.getBasedPokemon(pokemonIdOrName),
      this.getPokemonSpecies(pokemonIdOrName),
    ]);

    return createPokemon({ basedPokemon, pokemonSpecies });
  }

  public async getEvolutionList(evolutionChainId: number): Promise<EvolutionInfo[]> {
    const evolutionChain = await this.getEvolutionChain(evolutionChainId);

    return createEvolutionInfoList(evolutionChain);
  }

  public getPokemonList(query?: { offset: number; limit: number }) {
    return this.fetch.get({ url: "pokemon", query, validate: PokemonListSchema.parse });
  }

  public async getPokemonType(type: number | string) {
    return createPokemonType(
      await this.fetch.get({ url: "type", param: `${type}`, validate: PokemonTypeInfoSchema.parse }),
    );
  }
}

export default PokemonService;
