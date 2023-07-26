import type { BarsResponse } from "../entities/BarsResponse.js";
import type { LatestBarResponse } from "../entities/LatestBarResponse.js";
import type { LatestMultiBarsResponse } from "../entities/LatestMultiBarsResponse.js";
import type { LatestMultiQuotesResponse } from "../entities/LatestMultiQuotesResponse.js";
import type { LatestMultiTradesResponse } from "../entities/LatestMultiTradesResponse.js";
import type { LatestQuoteResponse } from "../entities/LatestQuoteResponse.js";
import type { LatestTradeResponse } from "../entities/LatestTradeResponse.js";
import type { MultiBarsResponse } from "../entities/MultiBarsResponse.js";
import type { MultiQuotesReponse } from "../entities/MultiQuotesReponse.js";
import type { MultiSnapshotResponse } from "../entities/MultiSnapshotResponse.js";
import type { MultiTradesResponse } from "../entities/MultiTradesResponse.js";
import type { Snapshot } from "../entities/Snapshot.js";
import type { TradesResponse } from "../entities/TradesResponse.js";
import type { CancelablePromise } from "../rest/CancelablePromise";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest";

export class Crypto {
  constructor(public readonly httpRequest: BaseHttpRequest) {
    // change the baseURL to data.alpaca.markets
    this.httpRequest.config.BASE = "https://data.alpaca.markets";
  }

  /**
   * Get Trade data for multiple crypto symbols
   * The Multi Trades API provides historical trade data for a list of given crypto symbols on a specified date. Returns trades for the queried crypto symbols.
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
    exchanges,
    limit,
    pageToken,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
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
     * A comma separated list of which crypto exchanges to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchanges?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
  }): CancelablePromise<MultiTradesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/trades",
      query: {
        start: start,
        end: end,
        exchanges: exchanges,
        limit: limit,
        page_token: pageToken,
        symbols: symbols,
      },
    });
  }

  /**
   * Get Latest Trade data for multiple Crypto symbols
   * Provides latest trade data for a list of given crypto symbols.
   * @returns LatestMultiTradesResponse OK
   * @throws ApiError
   */
  public getLatestTradesForMultipleSymbols({
    symbols,
    exchange,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
     */
    symbols: string;
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
  }): CancelablePromise<LatestMultiTradesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/trades/latest",
      query: {
        symbols,
        exchange,
      },
    });
  }

  /**
   * Get Trade data for a crypto symbol
   * The Trades API provides historical trade data for a given crypto symbol on a specified date. Returns trades for the queried crypto symbol
   * @returns TradesResponse Successful response
   * @throws ApiError
   */
  public getTradesForSymbol({
    symbol,
    start,
    end,
    exchanges,
    limit,
    pageToken,
  }: {
    /**
     * The crypto symbol to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD" would be how you query for BTC.
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
     * A comma separated list of which crypto exchanges to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchanges?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
  }): CancelablePromise<TradesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/trades",
      query: {
        symbols: symbol,
        start: start,
        end: end,
        exchanges: exchanges,
        limit: limit,
        page_token: pageToken,
      },
    });
  }

  /**
   * Latest Trades
   * The Latest Trades API provides the latest historical trade data for a given crypto symbol. Returns trades for the queried crypto symbol.
   * @returns LatestTradeResponse Successful response
   * @throws ApiError
   */
  public getLatestTradesForSymbol({
    symbol,
    exchange,
  }: {
    /**
     * The crypto symbol to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD" would be how you query for BTC.
     */
    symbol: string;
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
  }): CancelablePromise<LatestTradeResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/latest/trades",
      query: {
        symbols: symbol,
        exchange: exchange,
      },
    });
  }

  /**
   * Get Bars for multiple Crypto symbols
   * returns aggregate historical data for the requested crypto symbols.
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
    pageToken,
    limit,
    exchanges,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
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
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * A comma separated list of which crypto exchanges to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchanges?: string;
  }): CancelablePromise<MultiBarsResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/bars",
      query: {
        symbols: symbols,
        start: start,
        end: end,
        timeframe: timeframe,
        page_token: pageToken,
        limit: limit,
        exchanges: exchanges,
      },
    });
  }

  /**
   * Get Latest Bars for multiple Crypto symbols
   * returns latest historical data for the requested crypto symbols for a specific exchange
   * @returns LatestMultiBarsResponse OK
   * @throws ApiError
   */
  public getLatestBarsForMultipleSymbols({
    symbols,
    exchange,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
     */
    symbols: string;
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
  }): CancelablePromise<LatestMultiBarsResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/bars/latest",
      query: {
        symbols,
        exchange,
      },
    });
  }

  /**
   * Get Bar data for a crypto symbol
   * The Bars API returns aggregate historical data for the requested securities.. Returns bars for the queried crypto symbol
   * @returns BarsResponse Successful response
   * @throws ApiError
   */
  public getBarsForSymbol({
    symbol,
    timeframe,
    start,
    end,
    exchanges,
    limit,
    pageToken,
  }: {
    /**
     * The crypto symbol to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD" would be how you query for BTC.
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
     * A comma separated list of which crypto exchanges to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchanges?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
  }): CancelablePromise<BarsResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/bars",
      query: {
        symbols: symbol,
        start: start,
        end: end,
        timeframe: timeframe,
        exchanges: exchanges,
        limit: limit,
        page_token: pageToken,
      },
    });
  }

  /**
   * Get Latest Bar data for a Crypto symbol
   * Gets latest historical bar data for the requested crypto symbol for a specific exchange
   * @returns LatestBarResponse OK
   * @throws ApiError
   */
  public getLatestBarsForSymbol({
    symbol,
    exchange,
  }: {
    /**
     * The crypto symbol to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD" would be how you query for BTC.
     */
    symbol: string;
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
  }): CancelablePromise<LatestBarResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/latest/bars",
      query: {
        symbols: symbol,
        exchange: exchange,
      },
    });
  }

  /**
   * Get Quotes for multiple crypto symbols
   * The Multi Quotes API provides quotes for a list of given crypto symbols at a specified date. Returns quotes for each of  the queried crypto symbols.
   *
   * Returned results are sorted by symbol first then by Quote timestamp. This means that you are likely to see only one symbol in your first response if there are enough Quotes for that symbol to hit the limit you requested on that request.
   *
   * In these situations if you keep requesting again with the next_page_token you will eventually reach the next symbols if any Quotes were found for them.
   * @returns MultiQuotesReponse Successful response
   * @throws ApiError
   */
  public getQuotesForMultipleSymbols({
    symbols,
    start,
    end,
    exchanges,
    limit,
    pageToken,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
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
     * A comma separated list of which crypto exchanges to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchanges?: string;
    /**
     * Number of data points to return. Must be in range 1-10000, defaults to 1000.
     */
    limit?: number;
    /**
     * Pagination token to continue from. The value to pass here is returned in specific requests when more data is available than the request limit allows.
     */
    pageToken?: string;
  }): CancelablePromise<MultiQuotesReponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/quotes",
      query: {
        start: start,
        end: end,
        exchanges: exchanges,
        limit: limit,
        page_token: pageToken,
        symbols: symbols,
      },
    });
  }

  /**
   * Get Latest Quotes for multiple Crypto symbols
   * Provides latest quotes for a list of given crypto symbols.
   * @returns LatestMultiQuotesResponse OK
   * @throws ApiError
   */
  public getLatestQuotesForMultipleSymbols({
    symbols,
    exchange,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
     */
    symbols: string;
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
  }): CancelablePromise<LatestMultiQuotesResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/latest/quotes",
      query: {
        symbols: symbols,
        exchange: exchange,
      },
    });
  }

  /**
   * Latest Quote
   * Returns latest quote for the queried crypto symbol
   * @returns LatestQuoteResponse Successful response
   * @throws ApiError
   */
  public getLatestQuoteForSymbol({
    symbol,
    exchange,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
     */
    symbol: string;
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
  }): CancelablePromise<LatestQuoteResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/latest/quotes",
      query: {
        symbols: symbol,
        exchange: exchange,
      },
    });
  }

  /**
   * Get Snapshots for multiple crypto symbols
   * The Multi Snapshot API returns the latest trade, latest quote, minute bar daily bar, and previous daily bar data for list of given crypto symbols.
   * @returns MultiSnapshotResponse Successful response
   * @throws ApiError
   */
  public getSnapshotsForMultipleSymbols({
    exchange,
    symbols,
  }: {
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
     */
    symbols: string;
  }): CancelablePromise<MultiSnapshotResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/snapshots",
      query: {
        exchange: exchange,
        symbols: symbols,
      },
    });
  }

  /**
   * Get a Snapshot for a crypto symbol
   * The Snapshot API returns the latest trade, latest quote, minute bar daily bar, and previous daily bar data for a given crypto symbol.
   * @returns Snapshot Successful response
   * @throws ApiError
   */
  public getSnapshotForSymbol({
    symbol,
    exchange,
  }: {
    /**
     * The crypto symbol to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD" would be how you query for BTC.
     */
    symbol: string;
    /**
     * Which crypto exchange to pull the data from. Alpaca currently supports `ERSX`, `CBSE`, and `FTXU`
     */
    exchange: "ERSX" | "CBSE" | "FTXU";
  }): CancelablePromise<Snapshot> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta3/crypto/us/snapshot",
      query: {
        symbols: symbol,
        exchange: exchange,
      },
    });
  }
}
