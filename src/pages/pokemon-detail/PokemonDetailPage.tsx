import { useParams } from "react-router-dom";
import PokemonDetail from "../../components/pokemon-detail";
import Redirect from "../../components/redirect";

function PokemonDetailPage() {
  const { pokemonname } = useParams();

  if (!pokemonname || typeof pokemonname !== "string") {
    return <Redirect to="/pokemon" />;
  }

  return <PokemonDetail originName={pokemonname} />;
}

export default PokemonDetailPage;
