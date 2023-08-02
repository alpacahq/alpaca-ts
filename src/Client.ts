import type { BaseHttpRequest } from "./rest/BaseHttpRequest";
import type { ApiRequestOptions } from "./rest/ApiRequestOptions";

import { prewrap } from "./rest/prewrap";
import { AxiosHttpRequest } from "./rest/AxiosHttpRequest";

import { account, assets, clock, calendar } from "./api";

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

export enum BaseURL {
    BROKER_SANDBOX = "https://broker-api.sandbox.alpaca.markets",
    BROKER_PRODUCTION = "https://broker-api.alpaca.markets",
    TRADING_PAPER = "https://paper-api.alpaca.markets",
    TRADING_LIVE = "https://api.alpaca.markets",
    DATA = "https://data.alpaca.markets",
    MARKET_DATA_STREAM = "wss://stream.data.alpaca.markets",
    TRADING_STREAM_PAPER = "wss://paper-api.alpaca.markets/stream",
    TRADING_STREAM_LIVE = "wss://api.alpaca.markets/stream",
}

interface ClientOptions {
  paper: boolean;
  baseURL?: BaseURL;
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
    const { paper, baseURL, credentials } = options ?? {};

    // base request object for all requests
    // changes based on paper/live mode and/or data endpoints
    this.baseHttpRequest = new HttpRequest({
      BASE:
        baseURL ? baseURL :
        paper === true || paper === undefined
          ? BaseURL.TRADING_PAPER
          : BaseURL.TRADING_LIVE,
      // TODO: need to implement credentials accordingly
      HEADERS: !!credentials
        ? {
            "APCA-API-KEY-ID": credentials.key,
            "APCA-API-SECRET-KEY": credentials.secret,
          }
        : undefined,
    });
  }

  get account() {
    return prewrap(account, this.baseHttpRequest);
  }

  get assets() {
    return prewrap(assets, this.baseHttpRequest);
  }

  get clock() {
    return prewrap(clock, this.baseHttpRequest);
  }

  get calendar() {
    return prewrap(calendar, this.baseHttpRequest);
  }
}

const client = new Client();

client.assets.list({}).then((assets) => {
  console.log(assets);
});
