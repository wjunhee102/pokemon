import axios from "axios";
import { Pokemon } from "../../entites/pokemon";

function getLanguageContent<T extends object>(dataList: T[], key: string) {
  const languageList = ["en", "ko"];

  const content = {
    en: "",
    ko: "",
  };

  return dataList.reduce((acc, data: any) => {
    if (languageList.includes(data.language.name)) {
      acc[data.language.name as keyof typeof content] = data[key];
    }

    return acc;
  }, content);
}

class PokemonAPI {
  getPokemon(id: number) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
  }

  getPokemonSpecies(id: number) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  }

  async getPokemonInit(id: number): Promise<Pokemon<"en" | "ko">> {
    const pokemon = await this.getPokemon(id);
    const pokemonSpec = await this.getPokemonSpecies(id);

    return {
      id,
      imgUrl: pokemon.data.sprites.front_default,
      originName: pokemonSpec.data.name,
      weight: pokemon.data.weight,
      height: pokemon.data.height,
      color: pokemonSpec.data.color.name,
      name: getLanguageContent(pokemonSpec.data.names, "name"),
      genus: getLanguageContent(pokemonSpec.data.genera, "genus"),
      types: [],
    };
  }
}

export default PokemonAPI;
