/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Quote } from "./Quote";

/**
 * A model representing the result of hitting the Latest Quote api.
 *
 * Represents a single Quote that should be the latest quote data for a given ticker symbol
 */
export type LatestQuoteResponse = {
  quote: Quote;
  symbol: string;
};
