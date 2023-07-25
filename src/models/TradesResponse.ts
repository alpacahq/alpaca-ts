/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Trade } from "./Trade";

/**
 * A model representing the result of hitting the Trades api.
 *
 * Represents multiple Trades for a single symbol with support for paging.
 */
export type TradesResponse = {
  /**
   * Array of trades
   */
  trades: Array<Trade>;
  /**
   * Symbol that was queried
   */
  symbol: string;
  /**
   * Token that can be used to query the next page
   */
  next_page_token?: string | null;
};
