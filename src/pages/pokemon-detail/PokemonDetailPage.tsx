import { useParams } from "react-router-dom";
import PokemonDetail from "../../components/pokemon-detail";
import Redirect from "../../components/redirect";
import BaseTemplate from "../../templates/base";
import { Language } from "../../entites";
import { getPokemonUrl } from "../../utils/getUrl";

interface PokemonDetailPageProps {
  language?: Language;
}

function PokemonDetailPage({ language }: PokemonDetailPageProps) {
  const { pokemonname } = useParams();

  if (!pokemonname || typeof pokemonname !== "string") {
    return <Redirect to={getPokemonUrl(language)} />;
  }

  return (
    <BaseTemplate language={language}>
      <PokemonDetail originName={pokemonname} />
    </BaseTemplate>
  );
}

export default PokemonDetailPage;
