import { Link } from "react-router-dom";
import { usePokemon } from "../../hooks/usePokemon";
import FetchSuspence from "../fetch-suspence";

interface PokemonCardProps {
  originName: string;
}

function PokemonCard({ originName }: PokemonCardProps) {
  const [pokemon, fetchAndSetPokemon] = usePokemon(originName);

  return (
    <FetchSuspence
      fallback={<div>loading</div>}
      data={pokemon}
      queryKey={["pokemon", originName]}
      queryFn={fetchAndSetPokemon}
    >
      {({ name, imgUrl, id }) => (
        <Link to={`pokemon/${originName}`}>
          <div className="flex flex-col items-center justify-center w-40 h-40 border border-gray-100 rounded">
            <img src={imgUrl} alt={name} />
            <div className="flex justify-around w-full">
              <p>no.{id}</p>
              <h4>{name}</h4>
            </div>
          </div>
        </Link>
      )}
    </FetchSuspence>
  );
}

export default PokemonCard;
