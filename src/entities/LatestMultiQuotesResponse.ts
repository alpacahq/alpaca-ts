import type { Quote } from "./Quote.js";

export type LatestMultiQuotesResponse = {
  quotes: Record<string, Quote>;
};
