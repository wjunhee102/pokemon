import APIError from "./apiError";
import { ApiProps, HttpMethod, RestAPIProtocol } from "./types";
// eslint-disable-next-line
class TestRestAPI<P extends { [key: string]: { method: HttpMethod; data: any } }> implements RestAPIProtocol {
  constructor(
    private data: P,
    private isErrorLog: boolean = true,
  ) {}

  // eslint-disable-next-line
  public async fetch<T extends (response: any) => any>(
    method: HttpMethod,
    { url, param, validate }: ApiProps<T>,
    isErrorLog: boolean = this.isErrorLog,
  ): Promise<ReturnType<T>> {
    const appliedURL = param ? `${url}/${param}` : url;

    try {
      const response = await this.data[appliedURL];

      if (!response) {
        return await Promise.reject(new APIError({ message: "not data" }));
      }

      if (response.method !== method) {
        return await Promise.reject(new APIError({ message: "not matching http method" }));
      }

      if (validate) {
        return validate(response.data);
      }

      return response.data as ReturnType<T>;
    } catch (error) {
      // eslint-disable-next-line
      isErrorLog && console.error(error);

      return Promise.reject(new APIError({ status: 400, message: "validate error" }));
    }
  }

  // eslint-disable-next-line
  public get<T extends (response: any) => any>(props: Omit<ApiProps<T>, "data">, isErrorLog?: boolean) {
    return this.fetch("get", props, isErrorLog);
  }
}

export default TestRestAPI;
