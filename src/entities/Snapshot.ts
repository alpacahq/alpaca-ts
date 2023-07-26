import type { Bar } from "./Bar.js";
import type { Quote } from "./Quote.js";
import type { Trade } from "./Trade.js";

/**
 * The Snapshot API for one ticker provides the latest trade, latest quote, minute bar daily bar and previous daily bar data for a given ticker symbol.
 *
 */
export type Snapshot = {
  latestTrade?: Trade;
  latestQuote?: Quote;
  minuteBar?: Bar;
  dailyBar?: Bar;
  prevDailyBar?: Bar;
};
