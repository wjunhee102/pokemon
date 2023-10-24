import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { pokemonService } from "../../services/pokemon";
import PokemonList from "../../components/pokemon-list";
import { Language } from "../../entites";
import BaseTemplate from "../../templates/base";

async function getPokemonList({ pageParam }: { pageParam: number }) {
  const limit = 18;

  const pokemonList = await pokemonService.getPokemonList({ offset: limit * pageParam, limit });

  return pokemonList;
}

interface PokemonPageProps {
  language?: Language;
}

function PokemonPage(props: PokemonPageProps) {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: ["pokemonList"],
    queryFn: getPokemonList,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.length + 1,
  });

  useEffect(() => {
    function fetch() {
      if (window.innerHeight + document.documentElement.scrollTop + 200 < document.documentElement.offsetHeight) {
        return;
      }
      fetchNextPage();
    }

    window.addEventListener("scroll", fetch);

    return () => window.removeEventListener("scroll", fetch);
  }, [fetchNextPage]);

  return (
    <BaseTemplate {...props}>
      <div className="w-full h-full overflow-auto">
        <div className="w-full h-auto">
          {isLoading && <div>Loading</div>}
          {!isLoading &&
            data &&
            data.pages.map((page) => <PokemonList key={page.previous} pokemonList={page.results} />)}
        </div>
      </div>
    </BaseTemplate>
  );
}

export default PokemonPage;
