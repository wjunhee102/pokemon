import { useGetPokemon, useSetPokemon } from "../../hooks/usePokemon";
import FetchSuspence from "../fetch-suspence";
import { pokemonService } from "../../services/pokemon";
import PokemonDetailView from "./components/PokemonDetailView";
import PokemonType from "./components/PokemonType";
import PokemonEvolutionChain from "./components/PokemonEvolutionChain";

interface PokemonDetailProps {
  originName: string;
}

function PokemonDetail({ originName }: PokemonDetailProps) {
  const pokemon = useGetPokemon(originName);
  const setPokemonAction = useSetPokemon();
  const setPokemon = async () => {
    const pokemonResult = await pokemonService.getPokemon(originName);

    setPokemonAction(pokemonResult);

    return true;
  };

  return (
    <FetchSuspence fallback={<div>loading</div>} data={pokemon} queryKey={["pokemon", originName]} queryFn={setPokemon}>
      {({ types, evolutionChainId, evolutionChain, ...restPokemon }) => (
        <div>
          <PokemonDetailView {...restPokemon} />
          <div className="flex justify-start gap-2">
            {types.map((typeName) => (
              <PokemonType key={typeName} typeName={typeName} />
            ))}
          </div>
          <div>
            <PokemonEvolutionChain
              originName={originName}
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
