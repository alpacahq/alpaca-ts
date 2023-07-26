import type { BaseHttpRequest } from "./rest/BaseHttpRequest";
import type { ApiRequestOptions } from "./rest/ApiRequestOptions";

import { AxiosHttpRequest } from "./rest/AxiosHttpRequest";
import { Logos } from "./paths/logos";
import { News } from "./paths/news";
import { Clock } from "./paths/clock";
import { Orders } from "./paths/orders";
import { Assets } from "./paths/assets";
import { AccountService } from "./paths/AccountService.js";
import { Calendar } from "./paths/calendar";
import { Crypto } from "./paths/crypto";
import { Stocks } from "./paths/stocks";
import { Screener } from "./paths/screener";
import { Positions } from "./paths/positions";
import { Watchlists } from "./paths/watchlists";
import { Account } from "./paths/account";
import { PortfolioHistoryService } from "./paths/PortfolioHistoryService.js";
import { AccountConfigurations } from "./paths/AccountConfigurations";

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

// bundle all account services into one class for convenience
class AccountServices extends AccountService {
  activities: Account;
  configurations: AccountConfigurations;
  positions: Positions;
  orders: Orders;
  portfolioHistory: PortfolioHistoryService;

  constructor(httpRequest: BaseHttpRequest) {
    super(httpRequest);
    this.activities = new Account(httpRequest);
    this.configurations = new AccountConfigurations(httpRequest);
    this.positions = new Positions(httpRequest);
    this.orders = new Orders(httpRequest);
    this.portfolioHistory = new PortfolioHistoryService(httpRequest);
  }
}

export class Client {
  private readonly request: BaseHttpRequest;

  public readonly calendar: Calendar;
  public readonly clock: Clock;
  public readonly assets: Assets;
  public readonly crypto: Crypto;
  public readonly logo: Logos;
  public readonly news: News;
  public readonly screener: Screener;
  public readonly stocks: Stocks;
  public readonly watchlists: Watchlists;
  public readonly account: AccountServices;

  constructor(
    options?: ClientOptions,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    const { paper, credentials } = options ?? {};

    this.request = new HttpRequest({
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

    this.account = new AccountServices(this.request);
    this.watchlists = new Watchlists(this.request);
    this.calendar = new Calendar(this.request);
    this.clock = new Clock(this.request);
    this.assets = new Assets(this.request);
    this.crypto = new Crypto(this.request);
    this.logo = new Logos(this.request);
    this.news = new News(this.request);
    this.screener = new Screener(this.request);
    this.stocks = new Stocks(this.request);
  }
}
