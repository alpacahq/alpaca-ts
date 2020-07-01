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
} from './entities'

export interface GetOrderParameters {
  order_id?: string
  client_order_id?: string
  nested?: boolean
}

export interface GetOrdersParameters {
  status?: string
  limit?: number
  after?: Date
  until?: Date
  direction?: string
  nested?: boolean
}

export interface PlaceOrderParameters {
  symbol: string
  qty: number
  side: 'buy' | 'sell'
  type: 'market' | 'limit' | 'stop' | 'stop_limit'
  time_in_force: 'day' | 'gtc' | 'opg' | 'cls' | 'ioc' | 'fok'
  limit_price?: number
  stop_price?: number
  extended_hours?: boolean
  client_order_id?: string
  order_class?: 'simple' | 'bracket' | 'oco' | 'oto'
  take_profit?: {
    limit_price: number
  }
  stop_loss?: {
    stop_price: number
    limit_price?: number
  }
}

export interface ReplaceOrderParameters {
  order_id: string
  qty?: number
  time_in_force?: string
  limit_price?: number
  stop_price?: number
  client_order_id?: string
}

export interface CancelOrderParameters {
  order_id: string
}

export interface GetPositionParameters {
  symbol: string
} 

export interface ClosePositionParameters {
  symbol: string
}

export interface GetAssetParameters {
  asset_id_or_symbol: string
}

export interface GetAssetsParameters {
  status?: 'active' | 'inactive'
  asset_class?: string // i don't know where to find all asset classes
}

export interface GetWatchListParameters {
  uuid: string
}

export interface CreateWatchListParameters {
  name: string
  symbols?: string[]
}

export interface UpdateWatchListParameters {
  uuid: string
  name?: string
  symbols?: string[]
}

export interface AddToWatchListParameters {
  uuid: string
  symbol: string
}

export interface RemoveFromWatchListParameters {
  uuid: string
  symbol: string
}

export interface DeleteWatchListParameters {
  uuid: string
}

export interface GetCalendarParameters {
  start?: Date
  end?: Date
}

export interface UpdateAccountConfigurationsParameters {
  dtbp_check?: string
  no_shorting?: boolean
  suspend_trade?: boolean
  trade_confirm_email?: string
}

export interface GetAccountActivitiesParameters {
  activity_type: string
  date?: Date
  until?: Date
  after?: Date
  direction?: 'asc' | 'desc'
  page_size?: number
  page_token?: string
}

export interface GetPortfolioHistoryParameters {
  period?: string
  timeframe?: string
  date_end?: Date
  extended_hours?: boolean
}

export interface GetBarsParameters {
  timeframe?: string
  symbols: string[]
  limit?: number
  start?: Date
  end?: Date
  after?: Date
  until?: Date
}

export interface GetLastTradeParameters {
  symbol: string
}

export interface GetLastQuoteParameters {
  symbol: string
}

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

  getAccount(): Promise<Account> {
    return new Promise<Account>((resolve, reject) =>
      this.request(method.GET, BaseURL.Account, 'account')
        .then(resolve)
        .catch(reject)
    )
  }

  getOrder(parameters: GetOrderParameters): Promise<Order> {
    return new Promise<Order>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.Account,
        `orders/${
          parameters.order_id || parameters.client_order_id
        }?${qs.stringify({
          nested: parameters.nested,
        })}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getOrders(parameters?: GetOrdersParameters): Promise<Order[]> {
    return new Promise<Order[]>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.Account,
        `orders?${qs.stringify(parameters)}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  placeOrder(parameters: PlaceOrderParameters): Promise<Order> {
    let transaction = new Promise<Order>((resolve, reject) =>
      this.request(method.POST, BaseURL.Account, `orders`, parameters)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  replaceOrder(parameters: ReplaceOrderParameters): Promise<Order> {
    let transaction = new Promise<Order>((resolve, reject) =>
      this.request(
        method.PATCH,
        BaseURL.Account,
        `orders/${parameters.order_id}`,
        parameters
      )
        .then(resolve)
        .catch(reject)
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  cancelOrder(parameters: CancelOrderParameters): Promise<Order> {
    let transaction = new Promise<Order>((resolve, reject) =>
      this.request(
        method.DELETE,
        BaseURL.Account,
        `orders/${parameters.order_id}`
      )
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  cancelOrders(): Promise<Order[]> {
    let transaction = new Promise<Order[]>((resolve, reject) =>
      this.request(method.DELETE, BaseURL.Account, `orders`)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  getPosition(parameters: GetPositionParameters): Promise<Position> {
    return new Promise<Position>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.Account,
        `positions/${parameters.symbol}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getPositions(): Promise<Position[]> {
    return new Promise<Position[]>((resolve, reject) =>
      this.request(method.GET, BaseURL.Account, `positions`)
        .then(resolve)
        .catch(reject)
    )
  }

  closePosition(parameters: ClosePositionParameters): Promise<Order> {
    let transaction = new Promise<Order>((resolve, reject) =>
      this.request(
        method.DELETE,
        BaseURL.Account,
        `positions/${parameters.symbol}`
      )
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  closePositions(): Promise<Order[]> {
    let transaction = new Promise<Order[]>((resolve, reject) =>
      this.request(method.DELETE, BaseURL.Account, `positions`)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  getAsset(parameters: GetAssetParameters): Promise<Asset> {
    return new Promise<Asset>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.Account,
        `assets/${parameters.asset_id_or_symbol}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getAssets(parameters?: GetAssetsParameters): Promise<Asset[]> {
    return new Promise<Asset[]>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.Account,
        `assets?${qs.stringify(parameters)}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getWatchlist(parameters: GetWatchListParameters): Promise<Watchlist> {
    return new Promise<Watchlist>((resolve, reject) =>
      this.request(method.GET, BaseURL.Account, `watchlists/${parameters.uuid}`)
        .then(resolve)
        .catch(reject)
    )
  }

  getWatchlists(): Promise<Watchlist[]> {
    return new Promise<Watchlist[]>((resolve, reject) =>
      this.request(method.GET, BaseURL.Account, `watchlists`)
        .then(resolve)
        .catch(reject)
    )
  }

  createWatchlist(parameters: CreateWatchListParameters): Promise<Watchlist[]> {
    let transaction = new Promise<Watchlist[]>((resolve, reject) =>
      this.request(method.POST, BaseURL.Account, `watchlists`, parameters)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  updateWatchlist(parameters: UpdateWatchListParameters): Promise<Watchlist> {
    let transaction = new Promise<Watchlist>((resolve, reject) =>
      this.request(
        method.PUT,
        BaseURL.Account,
        `watchlists/${parameters.uuid}`,
        parameters
      )
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  addToWatchlist(parameters: AddToWatchListParameters): Promise<Watchlist> {
    let transaction = new Promise<Watchlist>((resolve, reject) =>
      this.request(
        method.POST,
        BaseURL.Account,
        `watchlists/${parameters.uuid}`,
        parameters
      )
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  removeFromWatchlist(parameters: RemoveFromWatchListParameters): Promise<void> {
    let transaction = new Promise<void>((resolve, reject) =>
      this.request(
        method.DELETE,
        BaseURL.Account,
        `watchlists/${parameters.uuid}/${parameters.symbol}`
      )
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  deleteWatchlist(parameters: DeleteWatchListParameters): Promise<void> {
    let transaction = new Promise<void>((resolve, reject) =>
      this.request(
        method.DELETE,
        BaseURL.Account,
        `watchlists/${parameters.uuid}`
      )
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  getCalendar(parameters?: GetCalendarParameters): Promise<Calendar[]> {
    return new Promise<Calendar[]>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.Account,
        `calendar?${qs.stringify(parameters)}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getClock(): Promise<Clock> {
    return new Promise<Clock>((resolve, reject) =>
      this.request(method.GET, BaseURL.Account, `clock`)
        .then(resolve)
        .catch(reject)
    )
  }

  getAccountConfigurations(): Promise<AccountConfigurations> {
    return new Promise<AccountConfigurations>((resolve, reject) =>
      this.request(method.GET, BaseURL.Account, `account/configurations`)
        .then(resolve)
        .catch(reject)
    )
  }

  updateAccountConfigurations(parameters: UpdateAccountConfigurationsParameters): Promise<AccountConfigurations> {
    let transaction = new Promise<AccountConfigurations>((resolve, reject) =>
      this.request(
        method.PATCH,
        BaseURL.Account,
        `account/configurations`,
        parameters
      )
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.pendingPromises = this.pendingPromises.filter(
            (p) => p !== transaction
          )
        })
    )

    this.pendingPromises.push(transaction)
    return transaction
  }

  getAccountActivities(parameters: GetAccountActivitiesParameters): Promise<Array<NonTradeActivity | TradeActivity>[]> {
    return new Promise<Array<NonTradeActivity | TradeActivity>[]>(
      (resolve, reject) =>
        this.request(
          method.GET,
          BaseURL.Account,
          `account/activities/${parameters.activity_type}?${qs.stringify(
            parameters
          )}`
        )
          .then(resolve)
          .catch(reject)
    )
  }

  getPortfolioHistory(parameters?: GetPortfolioHistoryParameters): Promise<PortfolioHistory> {
    return new Promise<PortfolioHistory>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.Account,
        `account/portfolio/history?${qs.stringify(parameters)}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getBars(parameters: GetBarsParameters): Promise<Map<String, Bar[]>> {
    var transformed = {}

    // join the symbols into a comma-delimited string
    transformed = parameters
    transformed['symbols'] = parameters.symbols.join(',')

    return new Promise<Map<String, Bar[]>>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.MarketData,
        `bars/${parameters.timeframe}?${qs.stringify(parameters)}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getLastTrade(parameters: GetLastTradeParameters): Promise<LastTradeResponse> {
    return new Promise<LastTradeResponse>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.MarketData,
        `last/stocks/${parameters.symbol}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  getLastQuote(parameters: GetLastQuoteParameters): Promise<LastQuoteResponse> {
    return new Promise<LastQuoteResponse>((resolve, reject) =>
      this.request(
        method.GET,
        BaseURL.MarketData,
        `last_quote/stocks/${parameters.symbol}`
      )
        .then(resolve)
        .catch(reject)
    )
  }

  // allow all promises to complete
  async close(): Promise<void> {
    await Promise.all(this.pendingPromises)
  }

  private request(
    method: method,
    url: string,
    endpoint: string,
    data?: any
  ): Promise<any> {
    // modify the base url if paper is true
    if (this.options.paper && url == BaseURL.Account) {
      url = BaseURL.Account.replace('api.', 'paper-api.')
    }

    // convert any dates to ISO 8601 for Alpaca
    if (data) {
      for (let [key, value] of Object.entries(data)) {
        if (value instanceof Date) {
          data[key] = (value as Date).toISOString()
        }
      }
    }

    return new Promise<any>(async (resolve, reject) => {
      // do rate limiting
      if (this.options.rate_limit) {
        await new Promise<void>((resolve) =>
          this.limiter.removeTokens(1, resolve)
        )
      }

      await fetch(`${url}/${endpoint}`, {
        method: method,
        headers: {
          'APCA-API-KEY-ID': this.options.key,
          'APCA-API-SECRET-KEY': this.options.secret,
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((response) => {
          // is it an alpaca error response?
          if ('code' in response && 'message' in response) {
            reject(response)
          } else {
            resolve(response)
          }
        })
        .catch(reject)
    })
  }
}
