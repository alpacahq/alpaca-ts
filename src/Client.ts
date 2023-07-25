import type { BaseHttpRequest } from "./core/BaseHttpRequest.js";
import type { OpenAPIConfig } from "./core/OpenAPI.js";

import { AxiosHttpRequest } from "./core/AxiosHttpRequest.js";
import { AccountActivitiesService } from "./services/AccountActivitiesService.js";
import { AccountConfigurationsService } from "./services/AccountConfigurationsService.js";
import { AccountService } from "./services/AccountService.js";
import { CalendarService } from "./services/CalendarService.js";
import { ClockService } from "./services/ClockService.js";
import { AssetsService } from "./services/AssetsService.js";
import { OrdersService } from "./services/OrdersService.js";
import { PortfolioHistoryService } from "./services/PortfolioHistoryService.js";
import { PositionsService } from "./services/PositionsService.js";
import { WatchlistsService } from "./services/WatchlistsService.js";
import { CryptoDataService } from "./services/CryptoDataService.js";
import { LogoService } from "./services/LogoService.js";
import { NewsService } from "./services/NewsService.js";
import { ScreenerService } from "./services/ScreenerService.js";
import { StockDataService } from "./services/StockDataService.js";
import { BaseURL } from "./BaseURL";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

interface ClientOptions {
  baseURL: typeof BaseURL | string;
  credentials: {
    key: string;
    secret: string;
  };
}

export class Client {
  public readonly calendar: CalendarService;
  public readonly clock: ClockService;
  public readonly assets: AssetsService;
  public readonly crypto: CryptoDataService;
  public readonly logo: LogoService;
  public readonly news: NewsService;
  public readonly screener: ScreenerService;
  public readonly stocks: StockDataService;
  public readonly watchlists: WatchlistsService;
  public readonly request: BaseHttpRequest;
  public readonly account: {
    activities: AccountActivitiesService;
    configurations: AccountConfigurationsService;
    positions: PositionsService;
    orders: OrdersService;
    portfolioHistory: PortfolioHistoryService;
    service: AccountService;
  };

  constructor(
    options?: ClientOptions,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "https://paper-api.alpaca.markets",
      VERSION: config?.VERSION ?? "2.0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: options?.CREDENTIALS ?? "include",
      TOKEN: options?.TOKEN,
      HEADERS: !!options?.credentials
        ? {
            "APCA-API-KEY-ID": options.credentials.key,
            "APCA-API-SECRET-KEY": options.credentials.secret,
          }
        : undefined,
    });

    this.account = {
      service: new AccountService(this.request),
      activities: new AccountActivitiesService(this.request),
      configurations: new AccountConfigurationsService(this.request),
      positions: new PositionsService(this.request),
      portfolioHistory: new PortfolioHistoryService(this.request),
      orders: new OrdersService(this.request),
    };

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
