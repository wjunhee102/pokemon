import { useCallback } from "react";
import { changeLanguage, useAppDispatch, useAppSelector } from "../store";
import { Language } from "../entites";

export function useGetLanguage() {
  return useAppSelector((state) => state.language);
}

export function useChangeLanguage() {
  const dispatch = useAppDispatch();

  return useCallback(
    (language: Language) => {
      dispatch(changeLanguage(language));
    },
    [dispatch],
  );
}
