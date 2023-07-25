import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";

import { AxiosHttpRequest } from "./core/AxiosHttpRequest";
import { AccountActivitiesService } from "./services/AccountActivitiesService";
import { AccountConfigurationsService } from "./services/AccountConfigurationsService";
import { AccountService } from "./services/AccountService";
import { CalendarService } from "./services/CalendarService";
import { ClockService } from "./services/ClockService";
import { AssetsService } from "./services/AssetsService";
import { OrdersService } from "./services/OrdersService";
import { PortfolioHistoryService } from "./services/PortfolioHistoryService";
import { PositionsService } from "./services/PositionsService";
import { WatchlistsService } from "./services/WatchlistsService";
import { CryptoPricingDataApiService } from "./services/CryptoPricingDataApiService";
import { LogoService } from "./services/LogoService";
import { NewsService } from "./services/NewsService";
import { ScreenerService } from "./services/ScreenerService";
import { StockPricingDataApiService } from "./services/StockPricingDataApiService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class OpenAPIClient {
  public readonly calendar: CalendarService;
  public readonly clock: ClockService;
  public readonly assets: AssetsService;
  public readonly crypto: CryptoPricingDataApiService;
  public readonly logo: LogoService;
  public readonly news: NewsService;
  public readonly screener: ScreenerService;
  public readonly stocks: StockPricingDataApiService;
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
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = AxiosHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? "https://paper-api.alpaca.markets",
      VERSION: config?.VERSION ?? "2.0.0",
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? "include",
      TOKEN: config?.TOKEN,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
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
    this.crypto = new CryptoPricingDataApiService(this.request);
    this.logo = new LogoService(this.request);
    this.news = new NewsService(this.request);
    this.screener = new ScreenerService(this.request);
    this.stocks = new StockPricingDataApiService(this.request);
  }
}
