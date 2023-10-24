import { ReactNode, useEffect } from "react";
import Navigation from "../../components/navigation";
import { Language } from "../../entites";
import { useChangeLanguage } from "../../hooks/useLanguage";
import i18n from "../../locales/i18n";

interface BaseTemplateProps {
  language?: Language;
  children: ReactNode;
}

function BaseTemplate({ language, children }: BaseTemplateProps) {
  const changeLanguage = useChangeLanguage();

  useEffect(() => {
    if (language) {
      changeLanguage(language);
      i18n.changeLanguage(language);
    }
  }, [language, changeLanguage]);

  return (
    <div className="w-full h-full min-h-screen overflow-auto">
      <div className="fixed w-full">
        <Navigation />
      </div>
      <div className="w-full h-auto min-h-full">
        <div className="w-full h-12" />
        {children}
      </div>
    </div>
  );
}

export default BaseTemplate;
