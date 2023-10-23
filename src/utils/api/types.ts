import { AxiosError, AxiosHeaders, AxiosRequestConfig } from "axios";
import APIError from "./apiError";

export type HttpMethod = "get" | "post" | "delete" | "patch" | "put";

export interface URLProps {
  [p: string]: string | number | undefined;
}

// eslint-disable-next-line
export interface ApiProps<T extends (response: any) => any> {
  url: string;
  config?: AxiosRequestConfig;
  param?: string;
  query?: URLProps;
  // eslint-disable-next-line
  data?: any;
  validate?: T;
}

export type SetAPIErrorCallback = (error: AxiosError) => APIError;

export interface RestAPIConfig {
  headers?: AxiosHeaders;
  setAPIError?: SetAPIErrorCallback;
}

export interface RestAPIProtocol {
  // eslint-disable-next-line
  fetch: <T extends (response: any) => any>(
    method: "get" | "post" | "delete" | "patch" | "put",
    props: ApiProps<T>,
    isErrorLog?: boolean,
  ) => Promise<ReturnType<T>>;
  // eslint-disable-next-line
  get: <T extends (response: any) => any>(
    props: ApiProps<T>,
    isErrorLog?: boolean
  ) => Promise<ReturnType<T>>;
}
