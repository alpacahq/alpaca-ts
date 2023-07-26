import type { Quote } from "./Quote.js";

/**
 * A model representing the result of hitting the Latest Quote api.
 *
 * Represents a single Quote that should be the latest quote data for a given ticker symbol
 */
export type LatestQuoteResponse = {
  quote: Quote;
  symbol: string;
};
