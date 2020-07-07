import fetch from 'node-fetch'
import method from 'http-method-enum'
import qs from 'qs'

import { RateLimiter } from 'limiter'
import { BaseURL } from './common'

import {
  Account,
  Order,
  Position,
  Asset,
  Watchlist,
  Calendar,
  Clock,
  AccountConfigurations,
  TradeActivity,
  NonTradeActivity,
  PortfolioHistory,
  Bar,
  LastTradeResponse,
  LastQuoteResponse,
  GetOrderParameters,
  GetOrdersParameters,
  PlaceOrderParameters,
  ReplaceOrderParameters,
  CancelOrderParameters,
  GetPositionParameters,
  ClosePositionParameters,
  GetAssetParameters,
  GetAssetsParameters,
  GetWatchListParameters,
  CreateWatchListParameters,
  UpdateWatchListParameters,
  AddToWatchListParameters,
  RemoveFromWatchListParameters,
  DeleteWatchListParameters,
  GetCalendarParameters,
  UpdateAccountConfigurationsParameters,
  GetAccountActivitiesParameters,
  GetPortfolioHistoryParameters,
  GetBarsParameters,
  GetLastTradeParameters,
  GetLastQuoteParameters,
} from './entities'

export class Client {
  private limiter: RateLimiter = new RateLimiter(199, 'minute')
  private pendingPromises: Promise<any>[] = []
  constructor(
    public options?: {
      key?: string
      secret?: string
      paper?: boolean
      rate_limit?: boolean
    }
  ) {

    
    // if the alpaca key hasn't been provided, try env var
    if (!this.options.key) {
      this.options.key = process.env.APCA_API_KEY_ID
    }

    // if the alpaca secret hasn't been provided, try env var
    if (!this.options.secret) {
      this.options.secret = process.env.APCA_API_SECRET_KEY
    }

    // if url has been set as an env var, check if it's for paper
    if (process.env.APCA_PAPER && process.env.APCA_PAPER == 'true') {
      this.options.paper = true
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      await this.getAccount()
      return true
    }
    catch (e) {
      return false
    }
  }

  getAccount(): Promise<Account> {
    return this.request(method.GET, BaseURL.Account, 'account')
  }

  getOrder(parameters: GetOrderParameters): Promise<Order> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `orders/${parameters.order_id || parameters.client_order_id}?${qs.stringify({ nested: parameters.nested })}`
    )
  }

  getOrders(parameters?: GetOrdersParameters): Promise<Order[]> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `orders?${qs.stringify(parameters)}`
    )
  }

  placeOrder(parameters: PlaceOrderParameters): Promise<Order> {
    let transaction = this.request(
      method.POST,
      BaseURL.Account,
      `orders`,
      parameters
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  replaceOrder(parameters: ReplaceOrderParameters): Promise<Order> {
    let transaction = this.request(
      method.PATCH,
      BaseURL.Account,
      `orders/${parameters.order_id}`,
      parameters
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  cancelOrder(parameters: CancelOrderParameters): Promise<Order> {
    let transaction = this.request(
      method.DELETE,
      BaseURL.Account,
      `orders/${parameters.order_id}`
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  cancelOrders(): Promise<Order[]> {
    let transaction = this.request(
      method.DELETE,
      BaseURL.Account,
      `orders`
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  getPosition(parameters: GetPositionParameters): Promise<Position> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `positions/${parameters.symbol}`
    )
  }

  getPositions(): Promise<Position[]> {
    return this.request(method.GET, BaseURL.Account, `positions`)
  }

  closePosition(parameters: ClosePositionParameters): Promise<Order> {
    let transaction = this.request(
      method.DELETE,
      BaseURL.Account,
      `positions/${parameters.symbol}`
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  closePositions(): Promise<Order[]> {
    let transaction = this.request(
      method.DELETE,
      BaseURL.Account,
      `positions`
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  getAsset(parameters: GetAssetParameters): Promise<Asset> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `assets/${parameters.asset_id_or_symbol}`
    )
  }

  getAssets(parameters?: GetAssetsParameters): Promise<Asset[]> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `assets?${qs.stringify(parameters)}`
    )
  }

  getWatchlist(parameters: GetWatchListParameters): Promise<Watchlist> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `watchlists/${parameters.uuid}`
    )
  }

  getWatchlists(): Promise<Watchlist[]> {
    return this.request(method.GET, BaseURL.Account, `watchlists`)
  }

  createWatchlist(parameters: CreateWatchListParameters): Promise<Watchlist[]> {
    let transaction = this.request(
      method.POST,
      BaseURL.Account,
      `watchlists`,
      parameters
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  updateWatchlist(parameters: UpdateWatchListParameters): Promise<Watchlist> {
    let transaction = this.request(
      method.PUT,
      BaseURL.Account,
      `watchlists/${parameters.uuid}`,
      parameters
    ).finally(() => {
      this.pendingPromises.splice(this.pendingPromises.indexOf(transaction), 1);
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  addToWatchlist(parameters: AddToWatchListParameters): Promise<Watchlist> {
    let transaction = this.request(
      method.POST,
      BaseURL.Account,
      `watchlists/${parameters.uuid}`,
      parameters
    ).finally(() => {
      this.pendingPromises = this.pendingPromises.filter(
        (p) => p !== transaction
      )
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  removeFromWatchlist(
    parameters: RemoveFromWatchListParameters
  ): Promise<void> {
    let transaction = this.request(
      method.DELETE,
      BaseURL.Account,
      `watchlists/${parameters.uuid}/${parameters.symbol}`
    ).finally(() => {
      this.pendingPromises = this.pendingPromises.filter(
        (p) => p !== transaction
      )
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  deleteWatchlist(parameters: DeleteWatchListParameters): Promise<void> {
    let transaction = this.request(
      method.DELETE,
      BaseURL.Account,
      `watchlists/${parameters.uuid}`
    ).finally(() => {
      this.pendingPromises = this.pendingPromises.filter(
        (p) => p !== transaction
      )
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  getCalendar(parameters?: GetCalendarParameters): Promise<Calendar[]> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `calendar?${qs.stringify(parameters)}`
    )
  }

  getClock(): Promise<Clock> {
    return this.request(method.GET, BaseURL.Account, `clock`)
  }

  getAccountConfigurations(): Promise<AccountConfigurations> {
    return this.request(method.GET, BaseURL.Account, `account/configurations`)
  }

  updateAccountConfigurations(
    parameters: UpdateAccountConfigurationsParameters
  ): Promise<AccountConfigurations> {
    let transaction = this.request(
      method.PATCH,
      BaseURL.Account,
      `account/configurations`,
      parameters
    ).finally(() => {
      this.pendingPromises = this.pendingPromises.filter(
        (p) => p !== transaction
      )
    })

    this.pendingPromises.push(transaction)
    return transaction
  }

  getAccountActivities(
    parameters: GetAccountActivitiesParameters
  ): Promise<Array<NonTradeActivity | TradeActivity>[]> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `account/activities/${parameters.activity_type}?${qs.stringify(
        parameters
      )}`
    )
  }

  getPortfolioHistory(
    parameters?: GetPortfolioHistoryParameters
  ): Promise<PortfolioHistory> {
    return this.request(
      method.GET,
      BaseURL.Account,
      `account/portfolio/history?${qs.stringify(parameters)}`
    )
  }

  getBars(parameters: GetBarsParameters): Promise<Map<String, Bar[]>> {
    var transformed = {}

    // join the symbols into a comma-delimited string
    transformed = parameters
    transformed['symbols'] = parameters.symbols.join(',')

    return this.request(method.GET, BaseURL.MarketData,`bars/${parameters.timeframe}?${qs.stringify(parameters)}`
    )
  }

  getLastTrade(parameters: GetLastTradeParameters): Promise<LastTradeResponse> {
    return this.request(
      method.GET,
      BaseURL.MarketData,
      `last/stocks/${parameters.symbol}`
    )
  }

  getLastQuote(parameters: GetLastQuoteParameters): Promise<LastQuoteResponse> {
    return this.request(
      method.GET,
      BaseURL.MarketData,
      `last_quote/stocks/${parameters.symbol}`
    )
  }

  // allow all promises to complete
  async close(): Promise<void> {

    // Finishes all promises.
    await Promise.all(this.pendingPromises);

    // Returns null
    return null;
  }

  private async request(
    method: method,
    url: string,
    endpoint: string,
    data?: any
  ): Promise<any> {

    // modify the base url if paper is true
    if (this.options.paper && url == BaseURL.Account)
      url = BaseURL.Account.replace('api.', 'paper-api.');

    // convert any dates to ISO 8601 for Alpaca
    if (data)
      for (let [key, value] of Object.entries(data))
        if (value instanceof Date)
          data[key] = (value as Date).toISOString()
    
    // do rate limiting
    if (this.options.rate_limit)
      await new Promise<void>(resolve => this.limiter.removeTokens(1, resolve))

    // Fetches the response and converts it to JSON
    const res = (await fetch(`${url}/${endpoint}`, {
      method, headers: {
        'APCA-API-KEY-ID': this.options.key,
        'APCA-API-SECRET-KEY': this.options.secret,
      },
      body: JSON.stringify(data),
    }).catch(err => { throw new Error(err) })).json();
      
    // Is it an alpaca error response?
    if('code' in res && 'message' in res)
      throw new Error("Alpaca error detected in request response: " + JSON.stringify(res));

    // Returns the finalized response.
    return res;
  }
}
