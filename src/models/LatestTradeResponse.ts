/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Trade } from './Trade';

/**
 * A model representing the result of hitting the Latest Trade api.
 *
 * Represents a single Trade that should be the latest trade data for a given ticker symbol
 */
export type LatestTradeResponse = {
    trade?: Trade;
    /**
     * Symbol that was queried
     */
    symbol: string;
};

