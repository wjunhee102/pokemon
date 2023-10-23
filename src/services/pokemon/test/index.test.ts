import pokemonTestApi from ".";
import { APIError } from "../../../utils/api";
import PokemonService from "../pokemonService";

describe("pokemonService", () => {
  const pokemonService = new PokemonService(pokemonTestApi);

  it("bring up the Pokemon list", async () => {
    const result = await pokemonService.getPokemonList();

    expect(result.results[0].name).toEqual("bulbasaur");
  });

  it("get Pokemon information", async () => {
    const result = await pokemonService.getPokemon("bulbasaur");

    expect(result.originName).toEqual("bulbasaur");
  });

  it("get Pokemon evolution chain information", async () => {
    const result = await pokemonService.getEvolutionList(1);

    expect(result[0].originName).toEqual("bulbasaur");
  });

  it("retrieves Pokemon type information", async () => {
    const result = await pokemonService.getPokemonType("grass");

    expect(result.grass.ko).toEqual("풀");
  });

  it("should throw APIError", async () => {
    await expect(pokemonService.getPokemon("2")).rejects.toBeInstanceOf(APIError);
  });
});
