import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import APIError from "./apiError";
import { ApiProps, HttpMethod, RestAPIConfig, RestAPIProtocol, SetAPIErrorCallback } from "./types";

class RestAPI implements RestAPIProtocol {
  private ajax!: AxiosInstance;

  constructor(
    protected baseURL: string,
    { headers, setAPIError }: RestAPIConfig = {},
  ) {
    this.ajax = axios.create({
      baseURL,
      headers,
    });

    this.initAjax(setAPIError);
  }

  private initAjax(setAPIError?: SetAPIErrorCallback) {
    this.ajax.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      (error: AxiosError) => {
        const apiError = new APIError();

        if (!error.response) {
          apiError.setStatus(500);
          apiError.setMessage("response not");

          return Promise.reject(apiError);
        }

        if (setAPIError) {
          return Promise.reject(setAPIError(error));
        }

        apiError.setStatus(error.response.status);
        apiError.setMessage(error.response.statusText);

        return Promise.reject(apiError);
      },
    );
  }

  /**
   * 성공 시 응답될 데이터 아니면 null만 리턴합니다.
   * catch 되지 않습니다.
   */
  // eslint-disable-next-line
  public async fetch<T extends (response: any) => any>(
    method: HttpMethod,
    { url, data, param, query, config, validate }: ApiProps<T>,
    isErrorLog = false,
  ): Promise<ReturnType<T>> {
    const appliedURL = param ? `${url}/${param}` : url;

    try {
      const response = await this.ajax({ url: appliedURL, method, data, params: query, ...config });

      if (validate) {
        return validate(response);
      }

      return response as ReturnType<T>;
    } catch (error) {
      // eslint-disable-next-line
      isErrorLog && console.error(error);

      if (error instanceof APIError) {
        return Promise.reject(error);
      }

      return Promise.reject(new APIError({ status: 400, message: "validate error" }));
    }
  }

  // eslint-disable-next-line
  public get<T extends (response: any) => any>(props: Omit<ApiProps<T>, "data">, isErrorLog?: boolean) {
    return this.fetch("get", props, isErrorLog);
  }
}

export default RestAPI;
