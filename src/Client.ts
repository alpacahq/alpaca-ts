import type { OpenAPIConfig } from "./core/OpenAPI.js";
import type { BaseHttpRequest } from "./core/BaseHttpRequest.js";

import { AxiosHttpRequest } from "./core/AxiosHttpRequest.js";

import { LogoService } from "./services/LogoService.js";
import { NewsService } from "./services/NewsService.js";
import { ClockService } from "./services/ClockService.js";
import { OrdersService } from "./services/OrdersService.js";
import { AssetsService } from "./services/AssetsService.js";
import { AccountService } from "./services/AccountService.js";
import { CalendarService } from "./services/CalendarService.js";
import { CryptoDataService } from "./services/CryptoDataService.js";
import { StockDataService } from "./services/StockDataService.js";
import { ScreenerService } from "./services/ScreenerService.js";
import { PositionsService } from "./services/PositionsService.js";
import { WatchlistsService } from "./services/WatchlistsService.js";
import { AccountActivitiesService } from "./services/AccountActivitiesService.js";
import { PortfolioHistoryService } from "./services/PortfolioHistoryService.js";
import { AccountConfigurationsService } from "./services/AccountConfigurationsService.js";

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
  activities: AccountActivitiesService;
  configurations: AccountConfigurationsService;
  positions: PositionsService;
  orders: OrdersService;
  portfolioHistory: PortfolioHistoryService;

  constructor(httpRequest: BaseHttpRequest) {
    super(httpRequest);
    this.activities = new AccountActivitiesService(httpRequest);
    this.configurations = new AccountConfigurationsService(httpRequest);
    this.positions = new PositionsService(httpRequest);
    this.orders = new OrdersService(httpRequest);
    this.portfolioHistory = new PortfolioHistoryService(httpRequest);
  }
}

export class Client {
  private readonly request: BaseHttpRequest;

  public readonly calendar: CalendarService;
  public readonly clock: ClockService;
  public readonly assets: AssetsService;
  public readonly crypto: CryptoDataService;
  public readonly logo: LogoService;
  public readonly news: NewsService;
  public readonly screener: ScreenerService;
  public readonly stocks: StockDataService;
  public readonly watchlists: WatchlistsService;
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
    this.watchlists = new WatchlistsService(this.request);
    this.calendar = new CalendarService(this.request);
    this.clock = new ClockService(this.request);
    this.assets = new AssetsService(this.request);
    this.crypto = new CryptoDataService(this.request);
    this.logo = new LogoService(this.request);
    this.news = new NewsService(this.request);
    this.screener = new ScreenerService(this.request);
    this.stocks = new StockDataService(this.request);
  }
}
