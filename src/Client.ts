import type { BaseHttpRequest } from "./rest/BaseHttpRequest";
import type { ApiRequestOptions } from "./rest/ApiRequestOptions";
import account from "./api/account";
import { AxiosHttpRequest } from "./rest/AxiosHttpRequest";
import { prewrap } from "./rest/prewrap";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  HEADERS?: Headers | Resolver<Headers> | undefined;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: "https://paper-api.alpaca.markets",
  HEADERS: undefined,
};

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

interface ClientOptions {
  paper: boolean;
  credentials: {
    key: string;
    secret: string;
  };
}

export class Client {
  private readonly baseHttpRequest: BaseHttpRequest;

  constructor(
    options?: ClientOptions,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    const { paper, credentials } = options ?? {};

    // base request object for all requests
    // changes based on paper/live mode and/or data endpoints
    this.baseHttpRequest = new HttpRequest({
      BASE:
        paper === true || paper === undefined
          ? "https://paper-api.alpaca.markets"
          : "https://api.alpaca.markets",
      HEADERS: !!credentials
        ? {
            "APCA-API-KEY-ID": credentials.key,
            "APCA-API-SECRET-KEY": credentials.secret,
          }
        : undefined,
    });
  }

  get account() {
    return prewrap(account, this.baseHttpRequest.config);
  }

  get assets() {
    return prewrap(assets, this.baseHttpRequest.config);
  }
}

const client = new Client();

client.account.get().then((account) => {
  console.log(account);
});
