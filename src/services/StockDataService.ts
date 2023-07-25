/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BarsResponse } from "../models/BarsResponse.js";
import type { ExchangesResponse } from "../models/ExchangesResponse.js";
import type { LatestBarResponse } from "../models/LatestBarResponse.js";
import type { LatestMultiBarsResponse } from "../models/LatestMultiBarsResponse.js";
import type { LatestMultiQuotesResponse } from "../models/LatestMultiQuotesResponse.js";
import type { LatestMultiTradesResponse } from "../models/LatestMultiTradesResponse.js";
import type { LatestQuoteResponse } from "../models/LatestQuoteResponse.js";
import type { LatestTradeResponse } from "../models/LatestTradeResponse.js";
import type { MultiBarsResponse } from "../models/MultiBarsResponse.js";
import type { MultiQuotesReponse } from "../models/MultiQuotesReponse.js";
import type { MultiSnapshotResponse } from "../models/MultiSnapshotResponse.js";
import type { MultiTradesResponse } from "../models/MultiTradesResponse.js";
import type { Snapshot } from "../models/Snapshot.js";
import type { TradesResponse } from "../models/TradesResponse.js";

import type { CancelablePromise } from "../core/CancelablePromise.js";
import type { BaseHttpRequest } from "../core/BaseHttpRequest.js";

export class StockDataService {
  constructor(public readonly httpRequest: BaseHttpRequest) {
    // change the baseURL to data.alpaca.markets
    this.httpRequest.config.BASE = "https://data.alpaca.markets";
  }

  /**
   * Get Bar data for multiple stock symbols
   * The Multi Bars API returns aggregate historical data for multiple given ticker symbols over a specified time period.
   *
   * Returned results are sorted by symbol first then by Bar timestamp. This means that you are likely to see only one symbol in your first response if there are enough Bars for that symbol to hit the limit you requested on that request.
   *
   * In these situations if you keep requesting again with the next_page_token you will eventually reach the next symbols if any Bars were found for them.
   * @returns MultiBarsResponse Successful response
   * @throws ApiError
   */
  public getBarsForMultipleSymbols({
    symbols,
    timeframe,
    start,
    end,
    limit,
    pageToken,
    adjustment,
    feed,
  }: {
    /**
     * The comma-separated list of stock ticker symbols to query for.
     */
    symbols: string;
    /**
     * Timeframe for the aggregation. Values are customizeable, frequently used examples: 1Min, 15Min, 1Hour, 1Day. Limits: 1Min-59Min, 1Hour-23Hour.
     */
    timeframe: string;
    /**
     * Filter data equal to or after this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    start?: string;
    /**
     * Filter data equal to or before this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    end?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
    /**
     * specifies the corporate action adjustment(s) for bars data
     */
    adjustment?: "raw" | "split" | "dividend" | "all";
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<MultiBarsResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/bars",
      query: {
        symbols: symbols,
        start: start,
        end: end,
        timeframe: timeframe,
        limit: limit,
        page_token: pageToken,
        adjustment: adjustment,
        feed: feed,
      },
    });
  }

  /**
   * Get Latest Bar data for multiple stock symbols
   * The Bars API returns aggregate historical data for the requested security. Returns the latest bar data for the queried stock symbols.
   * @returns LatestMultiBarsResponse OK
   * @throws ApiError
   */
  public getLatestBarsForMultipleSymbols({
    symbols,
    feed,
  }: {
    /**
     * The comma-separated list of stock ticker symbols to query for.
     */
    symbols: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<LatestMultiBarsResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/bars/latest",
      query: {
        symbols: symbols,
        feed: feed,
      },
    });
  }

  /**
   * Bars
   * The Bars API returns aggregate historical data for the requested security. Returns bars for the queried stock symbol.
   * @returns BarsResponse Successful response
   * @throws ApiError
   */
  public getBarsForSymbol({
    symbol,
    timeframe,
    start,
    end,
    limit,
    pageToken,
    feed,
    adjustment,
  }: {
    /**
     * The stock ticker symbol to query for.
     */
    symbol: string;
    /**
     * Timeframe for the aggregation. Values are customizeable, frequently used examples: 1Min, 15Min, 1Hour, 1Day. Limits: 1Min-59Min, 1Hour-23Hour.
     */
    timeframe: string;
    /**
     * Filter data equal to or after this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    start?: string;
    /**
     * Filter data equal to or before this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    end?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
    /**
     * specifies the corporate action adjustment(s) for bars data
     */
    adjustment?: "raw" | "split" | "dividend" | "all";
  }): CancelablePromise<BarsResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/{symbol}/bars",
      path: {
        symbol: symbol,
      },
      query: {
        start: start,
        end: end,
        timeframe: timeframe,
        limit: limit,
        page_token: pageToken,
        feed: feed,
        adjustment: adjustment,
      },
    });
  }

  /**
   * Get Latest Bars for Symbol
   * The Bars API returns aggregate historical data for the requested security. Returns the latest bar data for the queried stock symbol.
   * @returns LatestBarResponse OK
   * @throws ApiError
   */
  public getLatestBarForSymbol({
    symbol,
    feed,
  }: {
    /**
     * The stock ticker symbol to query for.
     */
    symbol: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<LatestBarResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/{symbol}/bars/latest",
      path: {
        symbol: symbol,
      },
      query: {
        feed: feed,
      },
    });
  }

  /**
   * Get Trade data for multiple stock symbols
   * The Multi Trades API provides historical trade data for multiple given ticker symbols over a specified time period.
   *
   * Returned results are sorted by symbol first then by Trade timestamp. This means that you are likely to see only one symbol in your first response if there are enough Trades for that symbol to hit the limit you requested on that request.
   *
   * In these situations if you keep requesting again with the next_page_token you will eventually reach the next symbols if any Trades were found for them.
   * @returns MultiTradesResponse Successful response
   * @throws ApiError
   */
  public getTradesForMultipleSymbols({
    symbols,
    start,
    end,
    limit,
    pageToken,
    feed,
  }: {
    /**
     * The comma-separated list of stock ticker symbols to query for.
     */
    symbols: string;
    /**
     * Filter data equal to or after this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    start?: string;
    /**
     * Filter data equal to or before this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    end?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<MultiTradesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/trades",
      query: {
        symbols: symbols,
        start: start,
        end: end,
        limit: limit,
        page_token: pageToken,
        feed: feed,
      },
    });
  }

  /**
   * Get Latest Trades data for multiple stock symbols
   * Returns the latest trades data for the queried stock symbols.
   * @returns LatestMultiTradesResponse OK
   * @throws ApiError
   */
  public getLatestTradesForMultipleSymbols({
    symbols,
    feed,
  }: {
    /**
     * The comma-separated list of stock ticker symbols to query for.
     */
    symbols: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<LatestMultiTradesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/trades/latest",
      query: {
        symbols: symbols,
        feed: feed,
      },
    });
  }

  /**
   * Trades
   * The Trades API provides historical trade data for a given ticker symbol on a specified date. Returns trades for the queried stock signal.
   * @returns TradesResponse Successful response
   * @throws ApiError
   */
  public getTradesForSymbol({
    symbol,
    start,
    end,
    limit,
    pageToken,
    feed,
  }: {
    /**
     * The stock ticker symbol to query for.
     */
    symbol: string;
    /**
     * Filter data equal to or after this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    start?: string;
    /**
     * Filter data equal to or before this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    end?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<TradesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/{symbol}/trades",
      path: {
        symbol: symbol,
      },
      query: {
        start: start,
        end: end,
        limit: limit,
        page_token: pageToken,
        feed: feed,
      },
    });
  }

  /**
   * Latest Trade
   * The Latest Trade API provides the latest trade data for a given ticker symbol.
   * @returns LatestTradeResponse Successful response
   * @throws ApiError
   */
  public getLatestTradeForSymbol({
    symbol,
    feed,
  }: {
    /**
     * The stock ticker symbol to query for.
     */
    symbol: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<LatestTradeResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/{symbol}/trades/latest",
      path: {
        symbol: symbol,
      },
      query: {
        feed: feed,
      },
    });
  }

  /**
   * Get Quotes for multiple stock symbols
   * The Multi Quotes API provides NBBO quotes for multiple given ticker symbols over a specified time period.
   *
   * Returned results are sorted by symbol first then by Quote timestamp. This means that you are likely to see only one symbol in your first response if there are enough Quotes for that symbol to hit the limit you requested on that request.
   *
   * In these situations if you keep requesting again with the next_page_token you will eventually reach the next symbols if any Quotes were found for them.
   * @returns MultiQuotesReponse Successful response
   *
   * @throws ApiError
   */
  public getQuotesForMultipleSymbols({
    symbols,
    start,
    end,
    limit,
    pageToken,
    feed,
  }: {
    /**
     * The comma-separated list of stock ticker symbols to query for.
     */
    symbols: string;
    /**
     * Filter data equal to or after this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    start?: string;
    /**
     * Filter data equal to or before this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    end?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<MultiQuotesReponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/quotes",
      query: {
        symbols: symbols,
        start: start,
        end: end,
        limit: limit,
        page_token: pageToken,
        feed: feed,
      },
    });
  }

  /**
   * Get Latest Quotes for multiple stock symbols
   * Returns the latest quotes data for the queried stock symbols.
   * @returns LatestMultiQuotesResponse OK
   * @throws ApiError
   */
  public getLatestQuotesForMultipleSymbols({
    symbols,
    feed,
  }: {
    /**
     * The comma-separated list of stock ticker symbols to query for.
     */
    symbols: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<LatestMultiQuotesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/quotes/latest",
      query: {
        symbols: symbols,
        feed: feed,
      },
    });
  }

  /**
   * Get Quotes for stock symbol
   * The Quotes API provides NBBO quotes for a single given ticker symbol at a specified date. Returns quotes (NBBOs) for the querried stock symbol.
   * @returns QuotesResponse Successful response
   * @throws ApiError
   */
  public getQuotesForSymbol({
    symbol,
    start,
    end,
    limit,
    pageToken,
    feed,
  }: {
    /**
     * The stock ticker symbol to query for.
     */
    symbol: string;
    /**
     * Filter data equal to or after this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    start?: string;
    /**
     * Filter data equal to or before this time in RFC-3339 format. Fractions of a second are not accepted.
     */
    end?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<MultiQuotesReponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/{symbol}/quotes",
      path: {
        symbol: symbol,
      },
      query: {
        start: start,
        end: end,
        limit: limit,
        page_token: pageToken,
        feed: feed,
      },
    });
  }

  /**
   * Get Latest Quote for stock symbol
   * The Latest Quote API provides the latest quote data for a given ticker symbol.
   * @returns LatestQuoteResponse Successful response
   * @throws ApiError
   */
  public getLatestQuoteForSymbol({
    symbol,
    feed,
  }: {
    /**
     * The stock ticker symbol to query for.
     */
    symbol: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<LatestQuoteResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/{symbol}/quotes/latest",
      path: {
        symbol: symbol,
      },
      query: {
        feed: feed,
      },
    });
  }

  /**
   * Get Snapshots for multiple stock symbols
   * The Snapshot API for multiple tickers provides the latest trade, latest quote, minute bar daily bar and previous daily bar data for the given ticker symbols.
   * @returns MultiSnapshotResponse Successful response
   * @throws ApiError
   */
  public getSnapshotsForMultipleSymbols({
    symbols,
    feed,
  }: {
    /**
     * The comma-separated list of stock ticker symbols to query for.
     */
    symbols: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<MultiSnapshotResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/snapshots",
      query: {
        symbols: symbols,
        feed: feed,
      },
    });
  }

  /**
   * Get a Snapshot for a stock symbol
   * The Snapshot API for one ticker provides the latest trade, latest quote, minute bar daily bar and previous daily bar data for a given ticker symbol. This endpoint returns the snapshot for the requested security.
   * @returns Snapshot Successful response
   * @throws ApiError
   */
  public getSnapshotForSymbol({
    symbol,
    feed,
  }: {
    /**
     * The stock ticker symbol to query for.
     */
    symbol: string;
    /**
     * Which feed to pull market data from. This is either `iex` or `sip`. `sip` and `otc` are only available to those with a subscription
     */
    feed?: "iex" | "sip" | "otc";
  }): CancelablePromise<Snapshot> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/{symbol}/snapshot",
      path: {
        symbol: symbol,
      },
      query: {
        feed: feed,
      },
    });
  }

  /**
   * Get List of supported exchanges
   * Returns a json object representing the exchanges we support. The keys are the short form codes you will see in our responses and the values are their respective full names.
   * @returns ExchangesResponse OK
   * @throws ApiError
   */
  public getExchanges(): CancelablePromise<ExchangesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/meta/exchanges",
    });
  }

  /**
   * Get list of Conditions
   * Each feed/exchange uses its own set of codes to identify trade and quote conditions, so the same condition may have a different code depending on the originator of the data.
   *
   * See [Our documentation](https://alpaca.markets/docs/market-data/#conditions) for more information
   * @returns any OK
   *
   * Response is a JSON object mapping a condition to a plain text description
   * @throws ApiError
   */
  public getConditions({
    type,
    tape,
  }: {
    /**
     * either "trade" or "quote"
     */
    type: "trade" | "quote";
    /**
     * What kind of conditions to retrieve, "A" and "B" return CTS, where "C" will give you UTP
     */
    tape: "A" | "B" | "C";
  }): CancelablePromise<Record<string, any>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/stocks/meta/conditions/{type}",
      path: {
        type: type,
      },
      query: {
        tape: tape,
      },
    });
  }
}
