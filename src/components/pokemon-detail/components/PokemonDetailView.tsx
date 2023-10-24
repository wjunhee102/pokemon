import { useTranslation } from "react-i18next";

interface PokemonDetailViewProps {
  name: string;
  imgUrl: string;
  height: number;
  weight: number;
  color: string;
  genus: string;
  flavorText: string;
}

function PokemonDetailView({ name, imgUrl, height, weight, color, genus, flavorText }: PokemonDetailViewProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center w-full h-auto">
      <h2>{name}</h2>
      <div>
        <img src={imgUrl} alt={name} />
      </div>
      <div>
        <p>
          {t("height")}: {height}
        </p>
        <p>
          {t("weight")}: {weight}
        </p>
        <p>
          {t("color")}: {color}
        </p>
      </div>
      <p>{flavorText}</p>
      <p>{genus}</p>
    </div>
  );
}

export default PokemonDetailView;
