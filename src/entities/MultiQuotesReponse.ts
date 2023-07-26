import type { Quote } from "./Quote.js";

/**
 * A model representing the result of hitting the Multi Quotes api; represents multiple Quotes for multiple symbols.
 *
 * Returned results are sorted by symbol first then by Quote timestamp. This means that you are likely to see only one symbol in your first response if there are enough Quotes for that symbol to hit the limit you requested on that request.
 *
 * In these situations if you keep requesting again with the next_page_token you will eventually reach the next symbols if any Quotes were found for them.
 *
 */
export type MultiQuotesReponse = {
  quotes: Record<string, Array<Quote>>;
  /**
   * pass this token with your request again to get the next page of results
   */
  next_page_token?: string | null;
};
