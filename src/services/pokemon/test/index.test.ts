import pokemonTestApi from ".";
import { APIError } from "../../../utils/api";
import PokemonService from "../pokemonService";

const pokemonService = new PokemonService(pokemonTestApi);

test("bring up the Pokemon list", async () => {
  const result = await pokemonService.getPokemonList();

  expect(result.results[0].name).toEqual("bulbasaur");
});

test("get Pokemon information", async () => {
  const result = await pokemonService.getPokemon("bulbasaur");

  expect(result.originName).toEqual("bulbasaur");
});

test("get Pokemon evolution chain information", async () => {
  const result = await pokemonService.getEvolutionList(1);

  expect(result[0].originName).toEqual("bulbasaur");
});

test("retrieves Pokemon type information", async () => {
  const result = await pokemonService.getPokemonType("grass");

  expect(result.grass.ko).toEqual("풀");
});

test("should throw APIError", async () => {
  await expect(pokemonService.getPokemon("2")).rejects.toBeInstanceOf(APIError);
});
