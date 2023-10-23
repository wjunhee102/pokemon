import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImmutableObject } from "../../utils/object";
import { EvolutionInfo, Pokemon, PokemonType } from "../../entites";

interface Pokedex {
  [key: string]: Pokemon;
}

interface SetEvolutionChainActionProps {
  originName: string;
  evolutionChain: EvolutionInfo[];
}

interface PokemonState {
  pokedex: ImmutableObject<Pokedex>;
  type: ImmutableObject<PokemonType>;
}

const initialState: PokemonState = {
  pokedex: new ImmutableObject({} as Pokedex),
  type: new ImmutableObject({} as PokemonType),
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemon(state, { payload: pokemon }: PayloadAction<Pokemon>) {
      state.pokedex = state.pokedex.set(pokemon.originName, pokemon);
    },
    setEvolutionChain(state, { payload: { originName, evolutionChain } }: PayloadAction<SetEvolutionChainActionProps>) {
      state.pokedex = state.pokedex.edit(originName, { evolutionChain });
    },
    setPokemonType(state, { payload: pokemonType }: PayloadAction<PokemonType>) {
      const [type, content] = Object.entries(pokemonType)[0];
      state.type = state.type.set(type, content);
    },
  },
});

export const { setPokemon, setEvolutionChain, setPokemonType } = pokemonSlice.actions;
export default pokemonSlice.reducer;
