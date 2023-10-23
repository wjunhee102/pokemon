import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Language } from "../../entites";
import { LANGUAGE_LIST } from "../../constants";

interface LanguageState {
  languageList: Language[];
  currentLanguage: Language;
}

const initialState: LanguageState = {
  languageList: LANGUAGE_LIST,
  currentLanguage: "ko",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage(state, { payload: language }: PayloadAction<Language>) {
      state.currentLanguage = language;
    },
  },
});

export const { changeLanguage } = languageSlice.actions;
export default languageSlice.reducer;
