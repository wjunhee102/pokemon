import { useGetPokemonTypeContent, useSetPokemonType } from "../../../hooks/usePokemon";
import { pokemonService } from "../../../services/pokemon";
import FetchSuspence from "../../fetch-suspence";

interface PokemonTypeProps {
  typeName: string;
}

function PokemonType({ typeName }: PokemonTypeProps) {
  const typeContent = useGetPokemonTypeContent(typeName);
  const setPokemonTypeAction = useSetPokemonType();
  const setPokemonType = async () => {
    const typeResult = await pokemonService.getPokemonType(typeName);

    setPokemonTypeAction(typeResult);

    return true;
  };

  return (
    <FetchSuspence
      fallback={<div>loading</div>}
      data={typeContent}
      queryKey={["pokemon-type", typeName]}
      queryFn={setPokemonType}
    >
      {(data) => <div className="h-6 leading-6 w-content">{data}</div>}
    </FetchSuspence>
  );
}

export default PokemonType;
