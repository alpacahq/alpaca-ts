import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";

import { AccountActivitiesService } from "./services/AccountActivitiesService";
import { AccountConfigurationsService } from "./services/AccountConfigurationsService";
import { AccountsService } from "./services/AccountsService";
import { CalendarService } from "./services/CalendarService";
import { ClockService } from "./services/ClockService";
import { DefaultService } from "./services/DefaultService";
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
  // API services from the first client
  public readonly accountActivities: AccountActivitiesService;
  public readonly accountConfigurations: AccountConfigurationsService;
  public readonly accounts: AccountsService;
  public readonly calendar: CalendarService;
  public readonly clock: ClockService;
  public readonly default: DefaultService;
  public readonly orders: OrdersService;
  public readonly portfolioHistory: PortfolioHistoryService;
  public readonly positions: PositionsService;
  public readonly watchlists: WatchlistsService;

  // API services from the second client
  public readonly cryptoPricingDataApi: CryptoPricingDataApiService;
  public readonly logo: LogoService;
  public readonly news: NewsService;
  public readonly screener: ScreenerService;
  public readonly stockPricingDataApi: StockPricingDataApiService;

  public readonly request: BaseHttpRequest;

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
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
    });

    // Instantiate API services from the first client
    this.accountActivities = new AccountActivitiesService(this.request);
    this.accountConfigurations = new AccountConfigurationsService(this.request);
    this.accounts = new AccountsService(this.request);
    this.calendar = new CalendarService(this.request);
    this.clock = new ClockService(this.request);
    this.default = new DefaultService(this.request);
    this.orders = new OrdersService(this.request);
    this.portfolioHistory = new PortfolioHistoryService(this.request);
    this.positions = new PositionsService(this.request);
    this.watchlists = new WatchlistsService(this.request);

    // Instantiate API services from the second client
    this.cryptoPricingDataApi = new CryptoPricingDataApiService(this.request);
    this.logo = new LogoService(this.request);
    this.news = new NewsService(this.request);
    this.screener = new ScreenerService(this.request);
    this.stockPricingDataApi = new StockPricingDataApiService(this.request);
  }
}