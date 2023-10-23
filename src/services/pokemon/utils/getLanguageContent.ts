import { LANGUAGE_LIST, LANGUAGE_CONTENT } from "../../../constants";
import { Language } from "../../../entites/language";

type RawLanguageContent<T extends string> = {
  [Key in T]: string;
} & {
  language: {
    name: string;
    url: string;
  };
};

function getLanguageContent<T extends string>(dataList: RawLanguageContent<T>[], key: T) {
  const content = { ...LANGUAGE_CONTENT };

  return dataList.reduce((acc, data: RawLanguageContent<T>) => {
    if (LANGUAGE_LIST.includes(data.language.name as Language) && data[key]) {
      acc[data.language.name as keyof typeof content] = data[key];
    }

    return acc;
  }, content);
}

export default getLanguageContent;
