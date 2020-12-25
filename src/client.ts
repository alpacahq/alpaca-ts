import qs from 'qs'
import fetch from 'node-fetch'
import urls from './urls.js'
import limiter from 'limiter'

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

export class AlpacaClient {
  private limiter = new limiter.RateLimiter(200, 'minute')

  constructor(
    public params: {
      credentials?: DefaultCredentials | OAuthCredentials
      rate_limit?: boolean
    },
  ) {
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

  async cancelOrder(params: CancelOrder): Promise<Order> {
    return parse.order(
      await this.request<RawOrder>(
        'DELETE',
        urls.rest.account,
        `orders/${params.order_id}`,
      ),
    )
  }

  async cancelOrders(): Promise<Order[]> {
    return parse.orders(
      await this.request<RawOrder[]>('DELETE', urls.rest.account, `orders`),
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

  removeFromWatchlist(params: RemoveFromWatchList): Promise<void> {
    return this.request(
      'DELETE',
      urls.rest.account,
      `watchlists/${params.uuid}/${params.symbol}`,
    )
  }

  deleteWatchlist(params: DeleteWatchList): Promise<void> {
    return this.request(
      'DELETE',
      urls.rest.account,
      `watchlists/${params.uuid}`,
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
    var transformed = {}

    // join the symbols into a comma-delimited string
    transformed = params
    transformed['symbols'] = params.symbols.join(',')

    return this.request(
      'GET',
      urls.rest.market_data,
      `bars/${params.timeframe}?${qs.stringify(params)}`,
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

  private request<T = any>(
    method: string,
    url: string,
    endpoint: string,
    data?: { [key: string]: any },
  ): Promise<T> {
    let headers = {}

    if ('access_token' in this.params.credentials) {
      headers[
        'Authorization'
      ] = `Bearer ${this.params.credentials.access_token}`
      url == urls.rest.account
    } else {
      headers['APCA-API-KEY-ID'] = this.params.credentials.key
      headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret
      if (
        this.params.credentials.key.startsWith('PK') &&
        url == urls.rest.account
      ) {
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

    return new Promise<T>(async (resolve, reject) => {
      if (this.params.rate_limit) {
        await new Promise((resolve) => this.limiter.removeTokens(1, resolve))
      }

      await fetch(`${url}/${endpoint}`, {
        method: method,
        headers,
        body: JSON.stringify(data),
      })
        // if json parse fails we default to an empty object
        .then(async (resp) => (await resp.json().catch(() => false)) || {})
        .then((resp) =>
          'code' in resp && 'message' in resp ? reject(resp) : resolve(resp),
        )
        .catch(reject)
    })
  }
}
