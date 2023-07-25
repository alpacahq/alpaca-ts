/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Quote } from './Quote';

/**
 * The Quotes API provides NBBO quotes for a given ticker symbol at a specified date.
 *
 */
export type QuotesResponse = {
    quotes: Array<Quote> | null;
    symbol: string;
    next_page_token?: string | null;
};

