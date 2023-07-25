/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bar } from "./Bar";

/**
 * A model representing the result of hitting the Multi Bars api; represents multiple Bars for multiple symbols.
 *
 * Returned results are sorted by symbol first then by Bar timestamp. This means that you are likely to see only one symbol in your first response if there are enough Bars in the duration you specified for that symbol to hit the limit you requested on that request.
 *
 * In these situations if you keep requesting again with the next_page_token you will eventually reach the next symbols if any Bars were found for them in the timeframe.
 *
 */
export type MultiBarsResponse = {
  bars: Record<string, Array<Bar>>;
  next_page_token?: string | null;
};
