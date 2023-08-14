import { cloneDeep } from "lodash-es";

import type { BaseHttpRequest } from "../rest/BaseHttpRequest.js";
import type { MultiBarsResponse } from "../entities/MultiBarsResponse.js";
import type { CancelablePromise } from "../rest/CancelablePromise.js";
import type { MultiQuotesReponse } from "../entities/MultiQuotesReponse.js";
import type { MultiTradesResponse } from "../entities/MultiTradesResponse.js";
import type { MultiSnapshotResponse } from "../entities/MultiSnapshotResponse.js";
import type { LatestMultiBarsResponse } from "../entities/LatestMultiBarsResponse.js";
import type { LatestMultiQuotesResponse } from "../entities/LatestMultiQuotesResponse.js";
import type { LatestMultiTradesResponse } from "../entities/LatestMultiTradesResponse.js";

const BASE = "https://data.alpaca.markets";

// todo: this is a temporary hack
const customBase = (httpRequest: BaseHttpRequest): BaseHttpRequest => {
  const clonedRequest = cloneDeep(httpRequest);
  clonedRequest.config.BASE = BASE;
  return clonedRequest;
};

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
export const getCryptoTrades = (
  httpRequest: BaseHttpRequest,
  {
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
  }
): CancelablePromise<MultiTradesResponse> =>
  customBase(httpRequest).request({
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

/**
 * Get Latest Trade data for multiple Crypto symbols
 * Provides latest trade data for a list of given crypto symbols.
 * @returns LatestMultiTradesResponse OK
 * @throws ApiError
 */
export const getCryptoTradesLatest = (
  httpRequest: BaseHttpRequest,
  {
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
  }
): CancelablePromise<LatestMultiTradesResponse> =>
  customBase(httpRequest).request({
    method: "GET",
    url: "/v1beta3/crypto/us/trades/latest",
    query: {
      symbols,
      exchange,
    },
  });

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
export const getCryptoBars = (
  httpRequest: BaseHttpRequest,
  {
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
  }
): CancelablePromise<MultiBarsResponse> =>
  customBase(httpRequest).request({
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

/**
 * Get Latest Bars for multiple Crypto symbols
 * returns latest historical data for the requested crypto symbols for a specific exchange
 * @returns LatestMultiBarsResponse OK
 * @throws ApiError
 */
export const getCryptoBarsLatest = (
  httpRequest: BaseHttpRequest,
  {
    symbols,
    exchange,
  }: {
    /**
     * The comma-separated list of crypto symbols to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD,ETHUSD" would get both BTC and ETH
     */
    symbols: string;
  }
): CancelablePromise<LatestMultiBarsResponse> =>
  customBase(httpRequest).request({
    method: "GET",
    url: "/v1beta3/crypto/us/latest/bars",
    query: { symbols },
  });

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
export const getCryptoQuotes = (
  httpRequest: BaseHttpRequest,
  {
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
  }
): CancelablePromise<MultiQuotesReponse> =>
  customBase(httpRequest).request({
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

/**
 * Get Latest Quotes for multiple Crypto symbols
 * Provides latest quotes for a list of given crypto symbols.
 * @returns LatestMultiQuotesResponse OK
 * @throws ApiError
 */
export const getCryptoQuotesLatest = (
  httpRequest: BaseHttpRequest,
  {
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
  }
): CancelablePromise<LatestMultiQuotesResponse> =>
  customBase(httpRequest).request({
    method: "GET",
    url: "/v1beta3/crypto/us/latest/quotes",
    query: {
      symbols: symbols,
      exchange: exchange,
    },
  });

/**
 * Get Snapshots for multiple crypto symbols
 * The Multi Snapshot API returns the latest trade, latest quote, minute bar daily bar, and previous daily bar data for list of given crypto symbols.
 * @returns MultiSnapshotResponse Successful response
 * @throws ApiError
 */
export const getCryptoSnapshots = (
  httpRequest: BaseHttpRequest,
  {
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
  }
): CancelablePromise<MultiSnapshotResponse> =>
  customBase(httpRequest).request({
    method: "GET",
    url: "/v1beta3/crypto/us/snapshots",
    query: {
      exchange: exchange,
      symbols: symbols,
    },
  });
