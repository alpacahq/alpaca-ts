/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bar } from "./Bar.js";

export type BarsResponse = {
  /**
   * The array of Bar data
   */
  bars: Array<Bar>;
  /**
   * the stock ticker or crypto symbol this set of bar data is for
   */
  symbol: string;
  next_page_token: string | null;
};
