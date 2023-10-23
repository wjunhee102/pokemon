import { Pokemon } from "../entites";
import pokemonReducer, { setPokemon, setPokemonType, setEvolutionChain, PokemonState } from "./slices/pokemon";

function createInitialState(props?: Partial<PokemonState>) {
  return {
    pokedex: {},
    type: {},
    ...props,
  } as PokemonState;
}

function createPokemon(props?: Partial<Pokemon>): Pokemon {
  return {
    id: 1,
    imgUrl: "",
    originName: "origin",
    height: 1,
    weight: 1,
    color: "black",
    types: ["grass"],
    name: {
      en: "en",
      ko: "ko",
    },
    genus: {
      en: "en",
      ko: "ko",
    },
    flavorText: {
      en: "en",
      ko: "ko",
    },
    evolutionChainId: 1,
    ...props,
  };
}

test("set pokemon in pokedex", () => {
  const initialState: PokemonState = createInitialState();

  expect(pokemonReducer(initialState, setPokemon(createPokemon()))).toEqual({
    pokedex: { origin: createPokemon() },
    type: {},
  });
});

test("set evolution chain in pokemon", () => {
  const initialState: PokemonState = createInitialState({ pokedex: { origin: createPokemon() } });

  const firstState = pokemonReducer(
    initialState,
    setEvolutionChain({ originName: "origin", evolutionChain: [{ originName: "next" }] }),
  );

  expect(firstState).toEqual({
    pokedex: { origin: createPokemon({ evolutionChain: [{ originName: "next" }] }) },
    type: {},
  });

  const secondState = pokemonReducer(
    firstState,
    setEvolutionChain({ originName: "origin", evolutionChain: [{ originName: "next" }] }),
  );

  expect(firstState.pokedex.origin === secondState.pokedex.origin).toEqual(false);
});

test("set pokemon type in type", () => {
  const initialState: PokemonState = createInitialState();

  expect(
    pokemonReducer(
      initialState,
      setPokemonType({
        origin: {
          en: "en",
          ko: "ko",
        },
      }),
    ),
  ).toEqual({
    pokedex: {},
    type: {
      origin: {
        en: "en",
        ko: "ko",
      },
    },
  });
});
