import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EvolutionInfo, Pokemon, PokemonType } from "../../entites";

interface Pokedex {
  [key: string]: Pokemon;
}

interface SetEvolutionChainActionProps {
  originName: string;
  evolutionChain: EvolutionInfo[];
}

interface PokemonState {
  pokedex: Pokedex;
  type: PokemonType;
}

const initialState: PokemonState = {
  pokedex: {} as Pokedex,
  type: {} as PokemonType,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemon(state, { payload: pokemon }: PayloadAction<Pokemon>) {
      state.pokedex[pokemon.originName] = pokemon;
    },
    setEvolutionChain(state, { payload: { originName, evolutionChain } }: PayloadAction<SetEvolutionChainActionProps>) {
      if (!Object.prototype.hasOwnProperty.call(state.pokedex, originName)) {
        return;
      }
      state.pokedex[originName].evolutionChain = evolutionChain;
    },
    setPokemonType(state, { payload: pokemonType }: PayloadAction<PokemonType>) {
      const [typeName, content] = Object.entries(pokemonType)[0];
      state.type[typeName] = content;
    },
  },
});

export const { setPokemon, setEvolutionChain, setPokemonType } = pokemonSlice.actions;
export default pokemonSlice.reducer;
