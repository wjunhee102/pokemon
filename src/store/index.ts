import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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

export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export type AppDispatch = ReturnType<typeof useAppDispatch>;

export default store;
