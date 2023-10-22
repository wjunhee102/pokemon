import { RestAPI, RestAPIProtocol } from "../../utils/api";
import { EvolutionChainSchema, PokemonSchema, PokemonSpeciesSchema } from "./schema";

class PokemonAPI {
  constructor(private fetch: RestAPIProtocol = new RestAPI("https://pokeapi.co/api/v2")) {}

  public getPokemon(id: number) {
    return this.fetch.get({ url: "pokemon", param: `${id}`, validate: PokemonSchema.parse });
  }

  public getPokemonSpecies(id: number) {
    return this.fetch.get({ url: "pokemon-species", param: `${id}`, validate: PokemonSpeciesSchema.parse });
  }

  public getEvolutionChain(id: number) {
    return this.fetch.get({ url: "evolution-chain", param: `${id}`, validate: EvolutionChainSchema.parse });
  }

  async getPokemonInfo(id: number) {
    try {
      const pokemon = await this.getPokemon(id);
      const pokemonSpec = await this.getPokemonSpecies(id);

      return {
        pokemon,
        pokemonSpec,
      };
    } catch (error) {
      return null;
    }
  }
}

export default PokemonAPI;
