import { useTranslation } from "react-i18next";
import { usePokemon } from "../../hooks/usePokemon";
import FetchSuspence from "../fetch-suspence";
import PokemonDetailView from "./components/PokemonDetailView";
import PokemonType from "./components/PokemonType";
import PokemonEvolutionChain from "./components/PokemonEvolutionChain";

interface PokemonDetailProps {
  originName: string;
}

function PokemonDetail({ originName }: PokemonDetailProps) {
  const [pokemon, fetchAndSetPokemon] = usePokemon(originName);
  const { t } = useTranslation();

  return (
    <FetchSuspence
      fallback={<div>loading</div>}
      data={pokemon}
      queryKey={["pokemon", originName]}
      queryFn={fetchAndSetPokemon}
    >
      {({ types, evolutionChainId, evolutionChain, ...restPokemon }) => (
        <div className="w-full min-h-full">
          <PokemonDetailView {...restPokemon} />
          <div className="flex justify-center w-full h-auto gap-2">
            <p>{t("type")}:</p>
            {types.map((typeName) => (
              <PokemonType key={typeName} typeName={typeName} />
            ))}
          </div>
          <div>
            <PokemonEvolutionChain
              originName={restPokemon.originName}
              evolutionChainId={evolutionChainId}
              evolutionChain={evolutionChain}
            />
          </div>
        </div>
      )}
    </FetchSuspence>
  );
}

export default PokemonDetail;
