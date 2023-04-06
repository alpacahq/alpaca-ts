import * as Types from "./types";

import qs from "qs";
import isofetch from "isomorphic-unfetch";
import Bottleneck from "bottleneck";

import { Endpoints, endpoints } from "./index";

const unifetch = typeof fetch !== "undefined" ? fetch : isofetch;

export class Client {
  private baseURLs: Endpoints = endpoints;
  private limiter = new Bottleneck({
    reservoir: 200, // initial value
    reservoirRefreshAmount: 200,
    reservoirRefreshInterval: 60 * 1000, // must be divisible by 250
    // also use maxConcurrent and/or minTime for safety
    maxConcurrent: 1,
    minTime: 200,
  });

  constructor(
    public params: {
      rate_limit?: boolean;
      endpoints?: Endpoints | Map<keyof Endpoints, any>;
      credentials?: Types.DefaultCredentials | Types.OAuthCredentials;
    }
  ) {
    // override endpoints if custom provided
    if ("endpoints" in params) {
      this.baseURLs = Object.assign(endpoints, params.endpoints);
    }

    if (
      // if not specified
      !("paper" in params.credentials) &&
      // and live key isn't already provided
      !("key" in params.credentials && params.credentials.key.startsWith("A"))
    ) {
      params.credentials["paper"] = true;
    }

    if (
      "access_token" in params.credentials &&
      ("key" in params.credentials || "secret" in params.credentials)
    ) {
      throw new Error(
        "can't create client with both default and oauth credentials"
      );
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      await this.get.account();
      return true;
    } catch {
      return false;
    }
  }

  async placeOrder(params: Types.PlaceOrder): Promise<Types.Order> {
    return await this.request({
      method: "POST",
      url: `${this.baseURLs.rest.account}/orders`,
      data: params,
    });
  }

  async replaceOrder(params: Types.ReplaceOrder): Promise<Types.Order> {
    return await this.request({
      method: "PATCH",
      url: `${this.baseURLs.rest.account}/orders/${params.order_id}`,
      data: params,
    });
  }

  cancelOrder(params: Types.CancelOrder): Promise<boolean> {
    return this.request<boolean>({
      method: "DELETE",
      url: `${this.baseURLs.rest.account}/orders/${params.order_id}`,
      isJSON: false,
    });
  }

  async cancelOrders(): Promise<Types.OrderCancelation[]> {
    return await this.request({
      method: "DELETE",
      url: `${this.baseURLs.rest.account}/orders`,
    });
  }

  async closePosition(params: Types.ClosePosition): Promise<Types.Order> {
    return await this.request({
      method: "DELETE",
      url: `${this.baseURLs.rest.account}/positions/${params.symbol}`,
      data: params,
    });
  }

  async closePositions(params: Types.ClosePositions): Promise<Types.Order[]> {
    return await this.request({
      method: "DELETE",
      url: `${
        this.baseURLs.rest.account
      }/positions?cancel_orders=${JSON.stringify(
        params.cancel_orders ?? false
      )}`,
    });
  }

  createWatchlist(params: Types.CreateWatchList): Promise<Types.Watchlist[]> {
    return this.request({
      method: "POST",
      url: `${this.baseURLs.rest.account}/watchlists`,
      data: params,
    });
  }

  updateWatchlist(params: Types.UpdateWatchList): Promise<Types.Watchlist> {
    return this.request({
      method: "PUT",
      url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
      data: params,
    });
  }

  addToWatchlist(params: Types.AddToWatchList): Promise<Types.Watchlist> {
    return this.request({
      method: "POST",
      url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
      data: params,
    });
  }

  removeFromWatchlist(params: Types.RemoveFromWatchList): Promise<boolean> {
    return this.request<boolean>({
      method: "DELETE",
      url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}/${params.symbol}`,
    });
  }

  deleteWatchlist(params: Types.DeleteWatchList): Promise<boolean> {
    return this.request<boolean>({
      method: "DELETE",
      url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
    });
  }

  updateAccountConfigurations(
    params: Types.UpdateAccountConfigurations
  ): Promise<Types.AccountConfigurations> {
    return this.request({
      method: "PATCH",
      url: `${this.baseURLs.rest.account}/account/configurations`,
      data: params,
    });
  }

  get = {
    account: async (): Promise<Types.Account> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/account`,
      });
    },
    order: async (params: Types.GetOrder): Promise<Types.Order> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/orders/${
          params.order_id || params.client_order_id
        }`,
        data: { nested: params.nested },
      });
    },
    orders: async (params: Types.GetOrders = {}): Promise<Types.Order[]> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/orders`,
        data: {
          ...params,
          symbols: params.symbols ? params.symbols.join(",") : undefined,
        },
      });
    },
    positions: async (): Promise<Types.Position[]> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/positions`,
      });
    },
    position: async (params: Types.GetPosition): Promise<Types.Position> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/positions/${params.symbol}`,
      });
    },
    activities: async (
      params: Types.GetAccountActivities
    ): Promise<Types.Activity[]> => {
      if (params.activity_types && Array.isArray(params.activity_types)) {
        params.activity_types = params.activity_types.join(",");
      }

      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/account/activities${
          params.activity_type ? "/".concat(params.activity_type) : ""
        }`,
        data: { ...params, activity_type: undefined },
      });
    },
    calendar: async (params?: Types.GetCalendar): Promise<Types.Calendar[]> => {
      return this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/calendar`,
        data: params,
      });
    },
    clock: async (): Promise<Types.Clock> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/clock`,
      });
    },
    assets: async (params?: Types.GetAssets): Promise<Types.Asset[]> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/assets`,
        data: params,
      });
    },
    asset: async (params: Types.GetAsset): Promise<Types.Asset> => {
      return this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/assets/${params.asset_id_or_symbol}`,
      });
    },
    watchlists: async (): Promise<Types.Watchlist[]> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/watchlists`,
      });
    },
    watchlist: async (params: Types.GetWatchList): Promise<Types.Watchlist> => {
      return this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
      });
    },
    bars: async (params: Types.GetBars): Promise<Types.PageOfBars> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/bars`,
        data: { ...params, symbol: undefined },
      });
    },
    trades: async (params: Types.GetTrades): Promise<Types.PageOfTrades> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/trades`,
        data: { ...params, symbol: undefined },
      });
    },
    quotes: async (params: Types.GetQuotes): Promise<Types.PageOfQuotes> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/quotes`,
        data: { ...params, symbol: undefined },
      });
    },
    portfolioHistory: async (
      params: Types.GetPortfolioHistory
    ): Promise<Types.PortfolioHistory> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/account/portfolio/history`,
        data: params,
      });
    },
    accountConfigurations: async (): Promise<Types.AccountConfigurations> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/account/configurations`,
      });
    },
    news: async (params: Types.GetNews): Promise<Types.NewsPage> => {
      return await this.request({
        method: "GET",
        url: `${this.baseURLs.rest.account}/account/news`,
        data: params,
      });
    },
  };

  private async request<T = any>(params: {
    method: "GET" | "DELETE" | "PUT" | "PATCH" | "POST";
    url: string;
    data?: { [key: string]: any };
    isJSON?: boolean;
  }): Promise<T> {
    let headers: any = {};

    if ("access_token" in this.params.credentials) {
      headers[
        "Authorization"
      ] = `Bearer ${this.params.credentials.access_token}`;
    } else {
      headers["APCA-API-KEY-ID"] = this.params.credentials.key;
      headers["APCA-API-SECRET-KEY"] = this.params.credentials.secret;
    }

    if (this.params.credentials.paper) {
      params.url = params.url.replace("api.", "paper-api.");
    }

    let query = "";

    if (params.data) {
      // translate dates to ISO strings
      for (let [key, value] of Object.entries(params.data)) {
        if (value instanceof Date) {
          params.data[key] = (value as Date).toISOString();
        }
      }

      // build query
      if (!["POST", "PATCH", "PUT"].includes(params.method)) {
        query = "?".concat(qs.stringify(params.data));
        params.data = undefined;
      }
    }

    const makeCall = () =>
        unifetch(params.url.concat(query), {
          method: params.method,
          headers,
          body: JSON.stringify(params.data),
        }),
      func = this.params.rate_limit
        ? () => this.limiter.schedule(makeCall)
        : makeCall;

    let resp,
      result = {};

    try {
      resp = await func();

      if (!(params.isJSON == undefined ? true : params.isJSON)) {
        return resp.ok as any;
      }

      result = await resp.json();
    } catch (e) {
      console.error(e);
      throw result;
    }

    if ("code" in result || "message" in result) {
      throw result;
    }

    return result as any;
  }
}

export default Client;
