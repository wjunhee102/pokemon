import { useEffect } from "react";
import PokemonApi from "../../services/pokemon/pokemonApi";

const pokemonApi = new PokemonApi();

function Home() {
  useEffect(() => {
    async function getData() {
      const data = await pokemonApi.getPokemonInit(1);

      console.log(data);
    }
    getData();
  }, []);

  return <div>home</div>;
}

export default Home;
