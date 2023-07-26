import type { Trade } from "./Trade.js";

/**
 * A model representing the result of hitting the Latest Trade api.
 *
 * Represents a single Trade that should be the latest trade data for a given ticker symbol
 */
export type LatestTradeResponse = {
  trade?: Trade;
  /**
   * Symbol that was queried
   */
  symbol: string;
};
