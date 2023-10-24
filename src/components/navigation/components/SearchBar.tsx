import { FormEvent, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLanguage } from "../../../hooks/useLanguage";
import { Language } from "../../../entites";

function getUrl(id: string, language: Language) {
  if (language === "ko") {
    return `/search/${id}`;
  }

  return `/${language}/search/${id}`;
}

function SearchBar() {
  const [searchWord, setSearchWord] = useState("");
  const navigate = useNavigate();
  const { currentLanguage } = useGetLanguage();

  const moveToPokemonList = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      navigate(getUrl(searchWord, currentLanguage));
    },
    [navigate, currentLanguage, searchWord],
  );

  const changeSearchWord = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchWord(e.target.value.replace(/\D/g, ""));
    },
    [setSearchWord],
  );

  return (
    <form onSubmit={moveToPokemonList}>
      <div className="w-[120px] h-full py-1 flex justify-around items-center">
        <input
          className="w-[90px] h-full border rounded border-gray-100"
          type="text"
          value={searchWord}
          onChange={changeSearchWord}
        />
        <div className="w-4 h-full" />
        <button className="w-[20px] h-[20px] rounded border border-gray-50" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
