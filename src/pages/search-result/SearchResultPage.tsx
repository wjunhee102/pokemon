import { useParams } from "react-router-dom";
import FetchSuspence from "../../components/fetch-suspence";
import { Language } from "../../entites";
import BaseTemplate from "../../templates/base";
import Redirect from "../../components/redirect";
import { usePokemon } from "../../hooks/usePokemon";
import PokemonCard from "../../components/pokemon-card";
import { getPokemonUrl } from "../../utils/getUrl";

interface SearchResultPageProps {
  language?: Language;
}

function SearchResultPage({ language }: SearchResultPageProps) {
  const { pokemonid } = useParams();

  const [pokemon, fetchAndSetPokemon] = usePokemon(pokemonid ?? "");

  if (!pokemonid || typeof pokemonid !== "string") {
    return <Redirect to={getPokemonUrl(language)} />;
  }

  return (
    <BaseTemplate language={language}>
      <div className="w-full h-full overflow-auto">
        <div className="w-full h-auto">
          <FetchSuspence
            fallback={<div>loading...</div>}
            data={pokemon}
            queryKey={["pokemon", pokemonid]}
            queryFn={fetchAndSetPokemon}
          >
            {({ originName }) => (
              <div className="grid w-full grid-cols-3 gap-3">
                <PokemonCard originName={originName} />
              </div>
            )}
          </FetchSuspence>
        </div>
      </div>
    </BaseTemplate>
  );
}

export default SearchResultPage;
