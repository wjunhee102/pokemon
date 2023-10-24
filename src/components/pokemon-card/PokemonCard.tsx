import { Link } from "react-router-dom";
import { usePokemon } from "../../hooks/usePokemon";
import FetchSuspence from "../fetch-suspence";
import { useGetLanguage } from "../../hooks/useLanguage";
import { Language } from "../../entites";

function getUrl(originName: string, language: Language) {
  if (language === "ko") {
    return `/pokemon/${originName}`;
  }

  return `/${language}/pokemon/${originName}`;
}

interface PokemonCardProps {
  originName: string;
}

function PokemonCard({ originName }: PokemonCardProps) {
  const [pokemon, fetchAndSetPokemon] = usePokemon(originName);
  const { currentLanguage } = useGetLanguage();

  return (
    <FetchSuspence
      fallback={<div>loading</div>}
      data={pokemon}
      queryKey={["pokemon", originName]}
      queryFn={fetchAndSetPokemon}
    >
      {({ name, imgUrl, id }) => (
        <Link to={getUrl(originName, currentLanguage)}>
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
