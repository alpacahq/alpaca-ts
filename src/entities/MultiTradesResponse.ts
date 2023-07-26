import type { Trade } from "./Trade.js";

/**
 * A model representing the result of hitting the Multi Trades api; represents multiple trades for multiple symbols.
 *
 * Returned results are sorted by symbol first then by Trade timestamp. This means that you are likely to see only one symbol in your first response if there are enough Trades for that symbol to hit the limit you requested on that request.
 *
 * In these situations if you keep requesting again with the next_page_token you will eventually reach the next symbols if any Trades were found for them.
 *
 */
export type MultiTradesResponse = {
  trades: Record<string, Array<Trade>>;
  next_page_token?: string | null;
};
