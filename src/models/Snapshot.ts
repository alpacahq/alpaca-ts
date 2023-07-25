/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Bar } from './Bar';
import type { Quote } from './Quote';
import type { Trade } from './Trade';

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

