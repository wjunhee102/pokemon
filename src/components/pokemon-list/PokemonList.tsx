import PokemonCard from "../pokemon-card";

interface PokemonListProps {
  pokemonList: { name: string }[];
}

function PokemonList({ pokemonList }: PokemonListProps) {
  return (
    <div className="grid w-full grid-cols-3 gap-3">
      {pokemonList.map(({ name }) => (
        <PokemonCard key={name} originName={name} />
      ))}
    </div>
  );
}

export default PokemonList;
