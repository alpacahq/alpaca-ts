/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MarketMoverAsset } from "./MarketMoverAsset";

/**
 * Contains list of market movers
 */
export type MarketMoversResponse = {
  /**
   * List of top N gainers
   */
  gainers: Array<MarketMoverAsset>;
  /**
   * List of top N losers
   */
  losers: Array<MarketMoverAsset>;
  /**
   * Market type (stocks or crypto)
   */
  market_type: MarketMoversResponse.market_type;
  /**
   * Time the movers where last computed
   */
  last_updated: string;
};

export namespace MarketMoversResponse {
  /**
   * Market type (stocks or crypto)
   */
  export enum market_type {
    STOCKS = "stocks",
    CRYPTO = "crypto",
  }
}
