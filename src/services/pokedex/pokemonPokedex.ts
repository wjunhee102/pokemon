import { EvolutionInfo, Pokemon } from "../../entites";

interface PokedexData {
  [originName: string]: Pokemon;
}

class PokemonPokedex {
  constructor(private pokedex: PokedexData) {}

  has(originName: string) {
    return Object.prototype.hasOwnProperty.call(this.pokedex, originName);
  }

  get(originName: string): Pokemon | null {
    if (!this.has(originName)) {
      return null;
    }

    return this.pokedex[originName];
  }

  add(pokemon: Pokemon) {
    const { originName } = pokemon;

    if (this.has(originName)) {
      return this;
    }

    return new PokemonPokedex({ ...this.pokedex, originName: pokemon });
  }

  addEvolutionChain(originName: string, evolutionChain: EvolutionInfo[]) {
    const pokemon = this.get(originName);

    if (!pokemon) {
      return this;
    }

    return new PokemonPokedex({ ...this.pokedex, originName: { ...pokemon, evolutionChain } });
  }
}

export default PokemonPokedex;
