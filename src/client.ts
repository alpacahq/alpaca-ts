import Bottleneck from 'bottleneck'

import qs from 'qs'
import isofetch from 'isomorphic-unfetch'

import urls from './urls.js'
import parse from './parse.js'

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
  PortfolioHistory,
  Bar,
  LastQuote,
  LastTrade,
  RawOrder,
  RawPosition,
  RawActivity,
  Activity,
  DefaultCredentials,
  OAuthCredentials,
  OrderCancelation,
  RawOrderCancelation,
} from './entities.js'

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
} from './params.js'

const unifetch = typeof fetch !== 'undefined' ? fetch : isofetch
export class AlpacaClient {
  private limiter = new Bottleneck({
    reservoir: 200, // initial value
    reservoirRefreshAmount: 200,
    reservoirRefreshInterval: 60 * 1000, // must be divisible by 250
    // also use maxConcurrent and/or minTime for safety
    maxConcurrent: 1,
    minTime: 200,
  })

  constructor(
    public params: {
      credentials?: DefaultCredentials | OAuthCredentials
      rate_limit?: boolean
    },
  ) {
    if (
      // if not specified
      !('paper' in params.credentials) &&
      // and live key isn't already provided
      !('key' in params.credentials && params.credentials.key.startsWith('A'))
    ) {
      params.credentials['paper'] = true
    }

    if (
      'access_token' in params.credentials &&
      ('key' in params.credentials || 'secret' in params.credentials)
    ) {
      throw new Error(
        "can't create client with both default and oauth credentials",
      )
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      await this.getAccount()
      return true
    } catch {
      return false
    }
  }

  async getAccount(): Promise<Account> {
    return parse.account(
      await this.request<RawAccount>('GET', urls.rest.account, 'account'),
    )
  }

  async getOrder(params: GetOrder): Promise<Order> {
    return parse.order(
      await this.request<RawOrder>(
        'GET',
        urls.rest.account,
        `orders/${params.order_id || params.client_order_id}?${qs.stringify({
          nested: params.nested,
        })}`,
      ),
    )
  }

  async getOrders(params?: GetOrders): Promise<Order[]> {
    return parse.orders(
      await this.request<RawOrder[]>(
        'GET',
        urls.rest.account,
        `orders?${qs.stringify(params)}`,
      ),
    )
  }

  async placeOrder(params: PlaceOrder): Promise<Order> {
    return parse.order(
      await this.request<RawOrder>('POST', urls.rest.account, `orders`, params),
    )
  }

  async replaceOrder(params: ReplaceOrder): Promise<Order> {
    return parse.order(
      await this.request<RawOrder>(
        'PATCH',
        urls.rest.account,
        `orders/${params.order_id}`,
        params,
      ),
    )
  }

  cancelOrder(params: CancelOrder): Promise<Boolean> {
    return this.request<Boolean>(
      'DELETE',
      urls.rest.account,
      `orders/${params.order_id}`,
      undefined,
      false,
    )
  }

  async cancelOrders(): Promise<OrderCancelation[]> {
    return parse.canceled_orders(
      await this.request<RawOrderCancelation[]>(
        'DELETE',
        urls.rest.account,
        `orders`,
      ),
    )
  }

  async getPosition(params: GetPosition): Promise<Position> {
    return parse.position(
      await this.request<RawPosition>(
        'GET',
        urls.rest.account,
        `positions/${params.symbol}`,
      ),
    )
  }

  async getPositions(): Promise<Position[]> {
    return parse.positions(
      await this.request<RawPosition[]>('GET', urls.rest.account, `positions`),
    )
  }

  async closePosition(params: ClosePosition): Promise<Order> {
    return parse.order(
      await this.request<RawOrder>(
        'DELETE',
        urls.rest.account,
        `positions/${params.symbol}`,
      ),
    )
  }

  async closePositions(): Promise<Order[]> {
    return parse.orders(
      await this.request<RawOrder[]>('DELETE', urls.rest.account, `positions`),
    )
  }

  getAsset(params: GetAsset): Promise<Asset> {
    return this.request(
      'GET',
      urls.rest.account,
      `assets/${params.asset_id_or_symbol}`,
    )
  }

  getAssets(params?: GetAssets): Promise<Asset[]> {
    return this.request(
      'GET',
      urls.rest.account,
      `assets?${qs.stringify(params)}`,
    )
  }

  getWatchlist(params: GetWatchList): Promise<Watchlist> {
    return this.request('GET', urls.rest.account, `watchlists/${params.uuid}`)
  }

  getWatchlists(): Promise<Watchlist[]> {
    return this.request('GET', urls.rest.account, `watchlists`)
  }

  createWatchlist(params: CreateWatchList): Promise<Watchlist[]> {
    return this.request('POST', urls.rest.account, `watchlists`, params)
  }

  updateWatchlist(params: UpdateWatchList): Promise<Watchlist> {
    return this.request(
      'PUT',
      urls.rest.account,
      `watchlists/${params.uuid}`,
      params,
    )
  }

  addToWatchlist(params: AddToWatchList): Promise<Watchlist> {
    return this.request(
      'POST',
      urls.rest.account,
      `watchlists/${params.uuid}`,
      params,
    )
  }

  removeFromWatchlist(params: RemoveFromWatchList): Promise<Boolean> {
    return this.request<Boolean>(
      'DELETE',
      urls.rest.account,
      `watchlists/${params.uuid}/${params.symbol}`,
      undefined,
      false,
    )
  }

  deleteWatchlist(params: DeleteWatchList): Promise<Boolean> {
    return this.request<Boolean>(
      'DELETE',
      urls.rest.account,
      `watchlists/${params.uuid}`,
      undefined,
      false,
    )
  }

  getCalendar(params?: GetCalendar): Promise<Calendar[]> {
    return this.request(
      'GET',
      urls.rest.account,
      `calendar?${qs.stringify(params)}`,
    )
  }

  async getClock(): Promise<Clock> {
    return parse.clock(await this.request('GET', urls.rest.account, `clock`))
  }

  getAccountConfigurations(): Promise<AccountConfigurations> {
    return this.request('GET', urls.rest.account, `account/configurations`)
  }

  updateAccountConfigurations(
    params: UpdateAccountConfigurations,
  ): Promise<AccountConfigurations> {
    return this.request(
      'PATCH',
      urls.rest.account,
      `account/configurations`,
      params,
    )
  }

  async getAccountActivities(
    params: GetAccountActivities,
  ): Promise<Activity[]> {
    if (params.activity_types && Array.isArray(params.activity_types)) {
      params.activity_types = params.activity_types.join(',')
    }

    return parse.activities(
      await this.request<RawActivity[]>(
        'GET',
        urls.rest.account,
        `account/activities${
          params.activity_type ? '/'.concat(params.activity_type) : ''
        }?${qs.stringify(params)}`,
      ),
    )
  }

  getPortfolioHistory(params?: GetPortfolioHistory): Promise<PortfolioHistory> {
    return this.request(
      'GET',
      urls.rest.account,
      `account/portfolio/history?${qs.stringify(params)}`,
    )
  }

  getBars(params: GetBars): Promise<{ [symbol: string]: Bar[] }> {
    const transformed: Omit<GetBars, 'symbols'> & { symbols: string } = {
      ...params,
      symbols: params.symbols.join(','),
    }

    return this.request(
      'GET',
      urls.rest.market_data,
      `bars/${params.timeframe}?${qs.stringify(transformed)}`,
    )
  }

  getLastTrade(params: GetLastTrade): Promise<LastTrade> {
    return this.request(
      'GET',
      urls.rest.market_data,
      `last/stocks/${params.symbol}`,
    )
  }

  getLastQuote(params: GetLastQuote): Promise<LastQuote> {
    return this.request(
      'GET',
      urls.rest.market_data,
      `last_quote/stocks/${params.symbol}`,
    )
  }

  private async request<T = any>(
    method: string,
    url: string,
    endpoint: string,
    data?: { [key: string]: any },
    isJson: boolean = true,
  ): Promise<T> {
    let headers: any = {}

    if ('access_token' in this.params.credentials) {
      headers[
        'Authorization'
      ] = `Bearer ${this.params.credentials.access_token}`
      url == urls.rest.account
    } else {
      headers['APCA-API-KEY-ID'] = this.params.credentials.key
      headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret
      if (this.params.credentials.paper && url == urls.rest.account) {
        url = urls.rest.account.replace('api.', 'paper-api.')
      }
    }

    // modify the base url if paper key
    // convert any dates to ISO 8601 for Alpaca
    if (data) {
      for (let [key, value] of Object.entries(data)) {
        if (value instanceof Date) {
          data[key] = (value as Date).toISOString()
        }
      }
    }

    const makeCall = () =>
      unifetch(`${url}/${endpoint}`, {
        method: method,
        headers,
        body: JSON.stringify(data),
      })
    const func = this.params.rate_limit
      ? () => this.limiter.schedule(makeCall)
      : makeCall

    let resp
    let result = {}
    try {
      resp = await func()

      if (!isJson) return resp.ok as any

      result = await resp.json()
    } catch (e) {
      console.error(e)
      throw result
    }

    if ('code' in result && 'message' in result) throw result
    return result as any
  }
}
