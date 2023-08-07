import services from "./services/index.js";

import type { BaseHttpRequest } from "./rest/BaseHttpRequest.js";
import type { ApiRequestOptions } from "./rest/ApiRequestOptions.js";

import { prewrap } from "./rest/prewrap.js";
import { AxiosHttpRequest } from "./rest/AxiosHttpRequest.js";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type Config = {
  BASE: string;
  HEADERS?: Headers | Resolver<Headers> | undefined;
};

type HttpRequestConstructor = new (config: Config) => BaseHttpRequest;

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

  get v2() {
    const { account, assets, clock, calendar, orders, positions, watchlists } =
      services;

    return prewrap(
      {
        ...account,
        ...assets,
        ...clock,
        ...calendar,
        ...orders,
        ...positions,
        ...watchlists,
      },
      this.baseHttpRequest
    );
  }

  get v1beta3() {
    const { crypto } = services;
    return prewrap(crypto, this.baseHttpRequest);
  }

  get v1beta1() {
    const { news, screener, logos } = services;
    return prewrap(
      {
        ...news,
        ...screener,
        ...logos,
      },
      this.baseHttpRequest
    );
  }
}
