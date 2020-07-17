import fetch from 'node-fetch'
import method from 'http-method-enum'
import qs from 'qs'

import * as entities from './entities'
import * as params from './params'

import { RateLimiter } from 'limiter'
import { URL } from './url'

export class Client {
  private limiter: RateLimiter = new RateLimiter(199, 'minute')

  constructor(
    protected params: {
      credentials: {
        key: string
        secret: string
      }
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

  getAccount(): Promise<entities.Account> {
    return this.request(method.GET, URL.REST_ACCOUNT, 'account')
  }

  getOrder(params: params.GetOrder): Promise<entities.Order> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `orders/${params.order_id || params.client_order_id}?${qs.stringify({
        nested: params.nested,
      })}`
    )
  }

  getOrders(params?: params.GetOrders): Promise<entities.Order[]> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `orders?${qs.stringify(params)}`
    )
  }

  placeOrder(params: params.PlaceOrder): Promise<entities.Order> {
    return this.request(method.POST, URL.REST_ACCOUNT, `orders`, params)
  }

  replaceOrder(params: params.ReplaceOrder): Promise<entities.Order> {
    return this.request(
      method.PATCH,
      URL.REST_ACCOUNT,
      `orders/${params.order_id}`,
      params
    )
  }

  cancelOrder(params: params.CancelOrder): Promise<entities.Order> {
    return this.request(
      method.DELETE,
      URL.REST_ACCOUNT,
      `orders/${params.order_id}`
    )
  }

  cancelOrders(): Promise<entities.Order[]> {
    return this.request(method.DELETE, URL.REST_ACCOUNT, `orders`)
  }

  getPosition(params: params.GetPosition): Promise<entities.Position> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `positions/${params.symbol}`
    )
  }

  getPositions(): Promise<entities.Position[]> {
    return this.request(method.GET, URL.REST_ACCOUNT, `positions`)
  }

  closePosition(params: params.ClosePosition): Promise<entities.Order> {
    return this.request(
      method.DELETE,
      URL.REST_ACCOUNT,
      `positions/${params.symbol}`
    )
  }

  closePositions(): Promise<entities.Order[]> {
    return this.request(method.DELETE, URL.REST_ACCOUNT, `positions`)
  }

  getAsset(params: params.GetAsset): Promise<entities.Asset> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `assets/${params.asset_id_or_symbol}`
    )
  }

  getAssets(params?: params.GetAssets): Promise<entities.Asset[]> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `assets?${qs.stringify(params)}`
    )
  }

  getWatchlist(params: params.GetWatchList): Promise<entities.Watchlist> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `watchlists/${params.uuid}`
    )
  }

  getWatchlists(): Promise<entities.Watchlist[]> {
    return this.request(method.GET, URL.REST_ACCOUNT, `watchlists`)
  }

  createWatchlist(
    params: params.CreateWatchList
  ): Promise<entities.Watchlist[]> {
    return this.request(method.POST, URL.REST_ACCOUNT, `watchlists`, params)
  }

  updateWatchlist(params: params.UpdateWatchList): Promise<entities.Watchlist> {
    return this.request(
      method.PUT,
      URL.REST_ACCOUNT,
      `watchlists/${params.uuid}`,
      params
    )
  }

  addToWatchlist(params: params.AddToWatchList): Promise<entities.Watchlist> {
    return this.request(
      method.POST,
      URL.REST_ACCOUNT,
      `watchlists/${params.uuid}`,
      params
    )
  }

  removeFromWatchlist(params: params.RemoveFromWatchList): Promise<void> {
    return this.request(
      method.DELETE,
      URL.REST_ACCOUNT,
      `watchlists/${params.uuid}/${params.symbol}`
    )
  }

  deleteWatchlist(params: params.DeleteWatchList): Promise<void> {
    return this.request(
      method.DELETE,
      URL.REST_ACCOUNT,
      `watchlists/${params.uuid}`
    )
  }

  getCalendar(params?: params.GetCalendar): Promise<entities.Calendar[]> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `calendar?${qs.stringify(params)}`
    )
  }

  getClock(): Promise<entities.Clock> {
    return this.request(method.GET, URL.REST_ACCOUNT, `clock`)
  }

  getAccountConfigurations(): Promise<entities.AccountConfigurations> {
    return this.request(method.GET, URL.REST_ACCOUNT, `account/configurations`)
  }

  updateAccountConfigurations(
    params: params.UpdateAccountConfigurations
  ): Promise<entities.AccountConfigurations> {
    return this.request(
      method.PATCH,
      URL.REST_ACCOUNT,
      `account/configurations`,
      params
    )
  }

  getAccountActivities(
    params: params.GetAccountActivities
  ): Promise<Array<entities.NonTradeActivity | entities.TradeActivity>[]> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `account/activities/${params.activity_type}?${qs.stringify(params)}`
    )
  }

  getPortfolioHistory(
    params?: params.GetPortfolioHistory
  ): Promise<entities.PortfolioHistory> {
    return this.request(
      method.GET,
      URL.REST_ACCOUNT,
      `account/portfolio/history?${qs.stringify(params)}`
    )
  }

  getBars(params: params.GetBars): Promise<Map<String, entities.Bar[]>> {
    var transformed = {}

    // join the symbols into a comma-delimited string
    transformed = params
    transformed['symbols'] = params.symbols.join(',')

    return this.request(
      method.GET,
      URL.REST_MARKET_DATA,
      `bars/${params.timeframe}?${qs.stringify(params)}`
    )
  }

  getLastTrade(params: params.GetLastTrade): Promise<entities.LastTrade> {
    return this.request(
      method.GET,
      URL.REST_MARKET_DATA,
      `last/stocks/${params.symbol}`
    )
  }

  getLastQuote(params: params.GetLastQuote): Promise<entities.LastQuote> {
    return this.request(
      method.GET,
      URL.REST_MARKET_DATA,
      `last_quote/stocks/${params.symbol}`
    )
  }

  private request(
    method: method,
    url: string,
    endpoint: string,
    data?: any
  ): Promise<any> {
    // modify the base url if paper is true
    if (this.params.paper && url == URL.REST_ACCOUNT) {
      url = URL.REST_ACCOUNT.replace('api.', 'paper-api.')
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
      if (this.params.rate_limit) {
        await new Promise<void>((resolve) =>
          this.limiter.removeTokens(1, resolve)
        )
      }

      await fetch(`${url}/${endpoint}`, {
        method: method,
        headers: {
          'APCA-API-KEY-ID': this.params.credentials.key,
          'APCA-API-SECRET-KEY': this.params.credentials.secret,
        },
        body: JSON.stringify(data),
      })
        .then(
          async (response) => (await response.json().catch(() => false)) || {}
        )
        .then((json) =>
          'code' in json && 'message' in json ? reject(json) : resolve(json)
        )
        .catch(reject)
    })
  }
}
