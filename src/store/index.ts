import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slices/language";
import pokemonReducer from "./slices/pokemon";

export * from "./slices/language";
export * from "./slices/pokemon";

const store = configureStore({
  reducer: {
    language: languageReducer,
    pokemon: pokemonReducer,
  },
  devTools: true,
});

export default store;
