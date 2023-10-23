import { EvolutionInfo } from "../../../entites";
import { useGetPokemon, useSetEvolutionChain, useSetPokemon } from "../../../hooks/usePokemon";
import { pokemonService } from "../../../services/pokemon";
import FetchSuspence from "../../fetch-suspence";

interface PokemonEvolutionProps {
  evolutionInfo: EvolutionInfo;
}

function PokemonEvolution({ evolutionInfo: { originName } }: PokemonEvolutionProps) {
  const pokemon = useGetPokemon(originName);
  const setPokemonAction = useSetPokemon();
  const setPokemon = async () => {
    const pokemonResult = await pokemonService.getPokemon(originName);

    setPokemonAction(pokemonResult);

    return true;
  };

  return (
    <FetchSuspence fallback={<div>loading</div>} data={pokemon} queryKey={["pokemon", originName]} queryFn={setPokemon}>
      {({ name, imgUrl }) => (
        <div>
          <img src={imgUrl} alt={name} />
          <p>{name}</p>
        </div>
      )}
    </FetchSuspence>
  );
}

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

  return (
    <FetchSuspence
      fallback={<div>loading</div>}
      data={evolutionChain}
      queryKey={["evolutionChain", `${evolutionChainId}`]}
      queryFn={setEvolutionChain}
    >
      {(dataList) => (
        <div className="flex justify-center">
          <h3>진화정보</h3>
          {dataList.map((data) => (
            <PokemonEvolution key={data.originName} evolutionInfo={data} />
          ))}
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
