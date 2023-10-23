import { RestAPIProtocol, TestRestAPI } from "../../../utils/api";
import { evolutionChain, pokemon, pokemonList, pokemonSpecies, pokemonType } from "./data";

const pokemonTestApi: RestAPIProtocol = new TestRestAPI(
  {
    pokemon: {
      method: "get",
      data: pokemonList,
    },
    "pokemon/1": {
      method: "get",
      data: pokemon,
    },
    "pokemon/bulbasaur": {
      method: "get",
      data: pokemon,
    },
    "pokemon-species/1": {
      method: "get",
      data: pokemonSpecies,
    },
    "pokemon-species/bulbasaur": {
      method: "get",
      data: pokemonSpecies,
    },
    "evolution-chain/1": {
      method: "get",
      data: evolutionChain,
    },
    "type/grass": {
      method: "get",
      data: pokemonType,
    },
  },
  false,
);

export default pokemonTestApi;
