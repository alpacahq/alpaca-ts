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

  v2 = {
    account: {
      activity: {
        list: async (
          params: Types.GetAccountActivities
        ): Promise<Types.Activity[]> => {
          if (params.activity_types && Array.isArray(params.activity_types)) {
            params.activity_types = params["activity_types"].join(",");
          }

          return await this.request({
            method: "GET",
            data: { ...params, activity_type: undefined },
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "account/activities",
              params.activity_type ? "/".concat(params.activity_type) : ""
            ),
          });
        },
      },
      authenticated: async (): Promise<boolean> =>
        this.v2.account
          .get()
          .then(() => true)
          .catch(() => false),
      configuration: {
        get: (): Promise<Types.AccountConfigurations> =>
          this.request({
            method: "GET",
            url: this.buildURL(this.baseURLs.rest.v2, "account/configurations"),
          }),
        update: (
          params: Types.UpdateAccountConfigurations
        ): Promise<Types.AccountConfigurations> =>
          this.request({
            method: "PATCH",
            url: this.baseURLs.rest.v2.concat("/account/configurations"),
            data: params,
          }),
      },
      get: (): Promise<Types.Account> =>
        this.request({
          method: "GET",
          url: this.buildURL(this.baseURLs.rest.v2, "account"),
        }),
      order: {
        create: (params: Types.PlaceOrder): Promise<Types.Order> =>
          this.request({
            method: "POST",
            url: `${this.baseURLs.rest.v2}/orders`,
            data: params,
          }),
        get: (params: Types.GetOrder): Promise<Types.Order> =>
          this.request({
            method: "GET",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "orders",
              params.order_id || params.client_order_id
            ),
            data: { nested: params.nested },
          }),
        list: async (params: Types.GetOrders = {}): Promise<Types.Order[]> =>
          this.request({
            method: "GET",
            url: this.buildURL(this.baseURLs.rest.v2, "orders"),
            data: {
              ...params,
              symbols: params.symbols ? params.symbols.join(",") : undefined,
            },
          }),
        cancel: (params: Types.CancelOrder): Promise<boolean> =>
          this.request<boolean>({
            method: "DELETE",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "orders",
              params.order_id
            ),
            isJSON: false,
          }),
        cancel_all: (): Promise<Types.OrderCancelation[]> =>
          this.request({
            method: "DELETE",
            url: this.buildURL(this.baseURLs.rest.v2, "orders"),
          }),
        replace: (params: Types.ReplaceOrder): Promise<Types.Order> =>
          this.request({
            method: "PATCH",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "orders",
              params.order_id
            ),
            data: params,
          }),
      },
      portfolio: {
        history: (
          params: Types.GetPortfolioHistory
        ): Promise<Types.PortfolioHistory> =>
          this.request({
            method: "GET",
            data: params,
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "account/portfolio/history"
            ),
          }),
      },
      position: {
        close: (params: Types.ClosePosition): Promise<Types.Order> =>
          this.request({
            method: "DELETE",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "positions",
              params.symbol
            ),
            data: params,
          }),
        close_all: (params: Types.ClosePositions): Promise<Types.Order[]> =>
          this.request({
            method: "DELETE",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "positions",
              "?cancel_orders=",
              JSON.stringify(params.cancel_orders ?? false)
            ),
          }),
        get: async (params: Types.GetPosition): Promise<Types.Position> =>
          this.request({
            method: "GET",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "positions",
              params.symbol
            ),
          }),
        list: async (): Promise<Types.Position[]> =>
          this.request({
            method: "GET",
            url: this.buildURL(this.baseURLs.rest.v2, "positions"),
          }),
      },
      watchlist: {
        add: (params: Types.AddToWatchList): Promise<Types.Watchlist> =>
          this.request({
            method: "POST",
            url: `${this.baseURLs.rest.v2}/watchlists/${params.uuid}`,
            data: params,
          }),
        create: async (
          params: Types.CreateWatchList
        ): Promise<Types.Watchlist[]> =>
          this.request({
            method: "POST",
            url: `${this.baseURLs.rest.v2}/watchlists`,
            data: params,
          }),
        delete: (params: Types.DeleteWatchList): Promise<boolean> =>
          this.request<boolean>({
            method: "DELETE",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "watchlists",
              params.uuid
            ),
          }),
        get: async (params: Types.GetWatchList): Promise<Types.Watchlist> =>
          this.request({
            method: "GET",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "watchlists",
              params.uuid
            ),
          }),
        list: async (): Promise<Types.Watchlist[]> =>
          await this.request({
            method: "GET",
            url: this.buildURL(this.baseURLs.rest.v2, "watchlists"),
          }),
        remove: (params: Types.RemoveFromWatchList): Promise<boolean> =>
          this.request<boolean>({
            method: "DELETE",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "watchlists",
              params.uuid,
              params.symbol
            ),
          }),
        update: (params: Types.UpdateWatchList): Promise<Types.Watchlist> =>
          this.request({
            method: "PUT",
            url: this.buildURL(
              this.baseURLs.rest.v2,
              "watchlists",
              params.uuid
            ),
            data: params,
          }),
      },
    },
    asset: {
      get: (params: Types.GetAsset): Promise<Types.Asset> =>
        this.request({
          method: "GET",
          url: this.buildURL(
            this.baseURLs.rest.v2,
            "assets",
            params.asset_id_or_symbol
          ),
        }),
      list: (params?: Types.GetAssets): Promise<Types.Asset[]> =>
        this.request({
          method: "GET",
          url: this.buildURL(this.baseURLs.rest.v2, "assets"),
          data: params,
        }),
    },
    market: {
      news: (params: Types.GetNews): Promise<Types.NewsPage> =>
        this.request({
          method: "GET",
          url: this.buildURL(this.baseURLs.rest.v2, "account/news"),
          data: params,
        }),
      calendar: async (
        params?: Types.GetCalendar
      ): Promise<Types.Calendar[]> => {
        return this.request({
          method: "GET",
          url: `${this.baseURLs.rest.v2}/calendar`,
          data: params,
        });
      },
      clock: async (): Promise<Types.Clock> => {
        return await this.request({
          method: "GET",
          url: `${this.baseURLs.rest.v2}/clock`,
        });
      },
    },
  };

  private buildURL = (base: string, ...parts: string[]): string => {
    return [base, ...parts].join("/");
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

    const call = () =>
        unifetch(params.url.concat(query), {
          method: params.method,
          headers,
          body: JSON.stringify(params.data),
        }),
      func = this.params.rate_limit ? () => this.limiter.schedule(call) : call;

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
