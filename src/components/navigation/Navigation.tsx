import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetLanguage } from "../../hooks/useLanguage";
import SearchBar from "./components/SearchBar";
import { getPokemonUrl } from "../../utils/getUrl";

function Navigation() {
  const { currentLanguage } = useGetLanguage();
  const { t } = useTranslation();

  return (
    <nav className="flex items-center justify-around w-full h-12 bg-white border-b border-gray-200">
      <div className="flex items-center justify-start gap-4">
        <Link to={getPokemonUrl(currentLanguage)}>{t("listView")}</Link>
        <Link to={getPokemonUrl(currentLanguage === "en" ? "ko" : "en")}>{t("changeLanguage")}</Link>
      </div>
      <SearchBar />
    </nav>
  );
}

export default Navigation;
