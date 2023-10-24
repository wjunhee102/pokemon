import { useTranslation } from "react-i18next";
import { EvolutionInfo } from "../../../entites";
import { useSetEvolutionChain } from "../../../hooks/usePokemon";
import { pokemonService } from "../../../services/pokemon";
import FetchSuspence from "../../fetch-suspence";
import PokemonCard from "../../pokemon-card";

interface PokemonEvolutionListProps {
  originName: string;
  evolutionChainId: number;
  evolutionChain?: EvolutionInfo[];
}

function PokemonEvolutionList({ originName, evolutionChainId, evolutionChain }: PokemonEvolutionListProps) {
  const setEvolutionChainAction = useSetEvolutionChain();
  const setEvolutionChain = async () => {
    const evolutionChainResult = await pokemonService.getEvolutionList(evolutionChainId);

    setEvolutionChainAction({ originName, evolutionChain: evolutionChainResult });

    return true;
  };
  const { t } = useTranslation();

  return (
    <FetchSuspence
      fallback={<div>loading</div>}
      data={evolutionChain}
      queryKey={["evolutionChain", `${evolutionChainId}`]}
      queryFn={setEvolutionChain}
    >
      {(dataList) => (
        <div>
          <h3>{t("evolutionInfo")}</h3>
          <div className="flex justify-center gap-2">
            {dataList.map((data) => (
              <PokemonCard key={data.originName} originName={data.originName} />
            ))}
          </div>
        </div>
      )}
    </FetchSuspence>
  );
}

interface PokemonEvolutionInfoProps {
  originName: string;
  evolutionChainId: number | null;
  evolutionChain?: EvolutionInfo[];
}

function PokemonEvolutionChain({ evolutionChainId, ...restProps }: PokemonEvolutionInfoProps) {
  if (!evolutionChainId) {
    return null;
  }

  return <PokemonEvolutionList evolutionChainId={evolutionChainId} {...restProps} />;
}

export default PokemonEvolutionChain;
