import { QueryFunction, useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { APIError } from "../../utils/api";
import ErrorComponent from "./components/ErrorComponent";

interface FetchComponentProps {
  errorFallback?: ReactElement | ((error: APIError) => ReactElement);
  fallback?: ReactElement;
  queryKey: string[];
  queryFn: QueryFunction;
}

function FetchComponent({ errorFallback, fallback, queryKey, queryFn }: FetchComponentProps) {
  const { error } = useQuery({ queryKey, queryFn, retry: 0 });

  if (error) {
    const apiError = new APIError(error);

    return <ErrorComponent error={apiError}>{errorFallback}</ErrorComponent>;
  }

  if (fallback) {
    return fallback;
  }

  return null;
}

interface FetchSuspenceProps<T> extends FetchComponentProps {
  data?: T | null;
  children: (data: T) => ReactElement;
}

function FetchSuspence<T>({ data, errorFallback, children, ...fetchProps }: FetchSuspenceProps<T>) {
  if (!data) {
    return <FetchComponent {...fetchProps} />;
  }

  return children(data);
}

export default FetchSuspence;
