import fetch from 'node-fetch'
import method from 'http-method-enum'
import qs from 'qs'
import urls from './urls'

import { Parser } from './parser'
import { RateLimiter } from 'limiter'

import {
  RawAccount,
  Account,
  Order,
  Position,
  Asset,
  Watchlist,
  Calendar,
  Clock,
  AccountConfigurations,
  NonTradeActivity,
  TradeActivity,
  PortfolioHistory,
  Bar,
  LastQuote,
  LastTrade,
  Credentials,
  RawOrder,
  RawPosition,
  RawActivity,
  Activity,
} from './entities'

import {
  GetOrder,
  GetOrders,
  PlaceOrder,
  ReplaceOrder,
  CancelOrder,
  GetPosition,
  ClosePosition,
  GetAsset,
  GetAssets,
  GetWatchList,
  CreateWatchList,
  UpdateWatchList,
  AddToWatchList,
  RemoveFromWatchList,
  DeleteWatchList,
  GetCalendar,
  UpdateAccountConfigurations,
  GetAccountActivities,
  GetPortfolioHistory,
  GetBars,
  GetLastTrade,
  GetLastQuote,
} from './params'

export class AlpacaClient {
  private limiter: RateLimiter = new RateLimiter(199, 'minute')
  private parser: Parser = new Parser()

  constructor(
    protected options: {
      credentials: Credentials
      paper?: boolean
      rate_limit?: boolean
    }
  ) {}

  async isAuthenticated(): Promise<boolean> {
    try {
      await this.getAccount()
      return true
    } catch {
      return false
    }
  }

  async getAccount(): Promise<Account> {
    const rawAccount = await this.request<RawAccount>(
      method.GET,
      urls.rest.account,
      'account'
    )
    return this.parser.parseAccount(rawAccount)
  }

  async getOrder(params: GetOrder): Promise<Order> {
    const rawOrder = await this.request<RawOrder>(
      method.GET,
      urls.rest.account,
      `orders/${params.order_id || params.client_order_id}?${qs.stringify({
        nested: params.nested,
      })}`
    )
    return this.parser.parseOrder(rawOrder)
  }

  async getOrders(params?: GetOrders): Promise<Order[]> {
    const rawOrders = await this.request<RawOrder[]>(
      method.GET,
      urls.rest.account,
      `orders?${qs.stringify(params)}`
    )
    return this.parser.parseOrders(rawOrders)
  }

  async placeOrder(params: PlaceOrder): Promise<Order> {
    const rawOrder = await this.request<RawOrder>(
      method.POST,
      urls.rest.account,
      `orders`,
      params
    )
    return this.parser.parseOrder(rawOrder)
  }

  async replaceOrder(params: ReplaceOrder): Promise<Order> {
    const rawOrder = await this.request<RawOrder>(
      method.PATCH,
      urls.rest.account,
      `orders/${params.order_id}`,
      params
    )
    return this.parser.parseOrder(rawOrder)
  }

  async cancelOrder(params: CancelOrder): Promise<Order> {
    const rawOrder = await this.request<RawOrder>(
      method.DELETE,
      urls.rest.account,
      `orders/${params.order_id}`
    )
    return this.parser.parseOrder(rawOrder)
  }

  async cancelOrders(): Promise<Order[]> {
    const rawOrders = await this.request<RawOrder[]>(
      method.DELETE,
      urls.rest.account,
      `orders`
    )
    return this.parser.parseOrders(rawOrders)
  }

  async getPosition(params: GetPosition): Promise<Position> {
    const rawPosition = await this.request<RawPosition>(
      method.GET,
      urls.rest.account,
      `positions/${params.symbol}`
    )
    return this.parser.parsePosition(rawPosition)
  }

  async getPositions(): Promise<Position[]> {
    const rawPositions = await this.request<RawPosition[]>(
      method.GET,
      urls.rest.account,
      `positions`
    )
    return this.parser.parsePositions(rawPositions)
  }

  async closePosition(params: ClosePosition): Promise<Order> {
    const rawOrder = await this.request<RawOrder>(
      method.DELETE,
      urls.rest.account,
      `positions/${params.symbol}`
    )
    return this.parser.parseOrder(rawOrder)
  }

  async closePositions(): Promise<Order[]> {
    const rawOrders = await this.request<RawOrder[]>(
      method.DELETE,
      urls.rest.account,
      `positions`
    )
    return this.parser.parseOrders(rawOrders)
  }

  getAsset(params: GetAsset): Promise<Asset> {
    return this.request(
      method.GET,
      urls.rest.account,
      `assets/${params.asset_id_or_symbol}`
    )
  }

  getAssets(params?: GetAssets): Promise<Asset[]> {
    return this.request(
      method.GET,
      urls.rest.account,
      `assets?${qs.stringify(params)}`
    )
  }

  getWatchlist(params: GetWatchList): Promise<Watchlist> {
    return this.request(
      method.GET,
      urls.rest.account,
      `watchlists/${params.uuid}`
    )
  }

  getWatchlists(): Promise<Watchlist[]> {
    return this.request(method.GET, urls.rest.account, `watchlists`)
  }

  createWatchlist(params: CreateWatchList): Promise<Watchlist[]> {
    return this.request(method.POST, urls.rest.account, `watchlists`, params)
  }

  updateWatchlist(params: UpdateWatchList): Promise<Watchlist> {
    return this.request(
      method.PUT,
      urls.rest.account,
      `watchlists/${params.uuid}`,
      params
    )
  }

  addToWatchlist(params: AddToWatchList): Promise<Watchlist> {
    return this.request(
      method.POST,
      urls.rest.account,
      `watchlists/${params.uuid}`,
      params
    )
  }

  removeFromWatchlist(params: RemoveFromWatchList): Promise<void> {
    return this.request(
      method.DELETE,
      urls.rest.account,
      `watchlists/${params.uuid}/${params.symbol}`
    )
  }

  deleteWatchlist(params: DeleteWatchList): Promise<void> {
    return this.request(
      method.DELETE,
      urls.rest.account,
      `watchlists/${params.uuid}`
    )
  }

  getCalendar(params?: GetCalendar): Promise<Calendar[]> {
    return this.request(
      method.GET,
      urls.rest.account,
      `calendar?${qs.stringify(params)}`
    )
  }

  getClock(): Promise<Clock> {
    return this.request(method.GET, urls.rest.account, `clock`)
  }

  getAccountConfigurations(): Promise<AccountConfigurations> {
    return this.request(method.GET, urls.rest.account, `account/configurations`)
  }

  updateAccountConfigurations(
    params: UpdateAccountConfigurations
  ): Promise<AccountConfigurations> {
    return this.request(
      method.PATCH,
      urls.rest.account,
      `account/configurations`,
      params
    )
  }

  async getAccountActivities(
    params: GetAccountActivities
  ): Promise<Activity[]> {
    const rawActivities = await this.request<RawActivity[]>(
      method.GET,
      urls.rest.account,
      `account/activities/${params.activity_type}?${qs.stringify(params)}`
    )
    return this.parser.parseActivities(rawActivities)
  }

  getPortfolioHistory(params?: GetPortfolioHistory): Promise<PortfolioHistory> {
    return this.request(
      method.GET,
      urls.rest.account,
      `account/portfolio/history?${qs.stringify(params)}`
    )
  }

  getBars(params: GetBars): Promise<Map<String, Bar[]>> {
    var transformed = {}

    // join the symbols into a comma-delimited string
    transformed = params
    transformed['symbols'] = params.symbols.join(',')

    return this.request(
      method.GET,
      urls.rest.market_data,
      `bars/${params.timeframe}?${qs.stringify(params)}`
    )
  }

  getLastTrade(params: GetLastTrade): Promise<LastTrade> {
    return this.request(
      method.GET,
      urls.rest.market_data,
      `last/stocks/${params.symbol}`
    )
  }

  getLastQuote(params: GetLastQuote): Promise<LastQuote> {
    return this.request(
      method.GET,
      urls.rest.market_data,
      `last_quote/stocks/${params.symbol}`
    )
  }

  private request<T = any>(
    method: method,
    url: string,
    endpoint: string,
    data?: { [key: string]: any }
  ): Promise<T> {
    // modify the base url if paper is true
    if (this.options.paper && url == urls.rest.account) {
      url = urls.rest.account.replace('api.', 'paper-api.')
    }

    // convert any dates to ISO 8601 for Alpaca
    if (data) {
      for (let [key, value] of Object.entries(data)) {
        if (value instanceof Date) {
          data[key] = (value as Date).toISOString()
        }
      }
    }

    return new Promise<T>(async (resolve, reject) => {
      // do rate limiting
      if (this.options.rate_limit) {
        await new Promise<void>((resolve) =>
          this.limiter.removeTokens(1, resolve)
        )
      }

      await fetch(`${url}/${endpoint}`, {
        method: method,
        headers: {
          'APCA-API-KEY-ID': this.options.credentials.key,
          'APCA-API-SECRET-KEY': this.options.credentials.secret,
        },
        body: JSON.stringify(data),
      })
        .then(
          // if json parse fails we default to an empty object
          async (response) => (await response.json().catch(() => false)) || {}
        )
        .then((json) =>
          'code' in json && 'message' in json ? reject(json) : resolve(json)
        )
        .catch(reject)
    })
  }
}
