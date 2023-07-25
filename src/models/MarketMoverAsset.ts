/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Name or source of given news article
 */
export type MarketMoverAsset = {
    /**
     * Symbol of market moving asset
     */
    symbol: string;
    /**
     * Percentage difference change for the day
     */
    percent_change: number;
    /**
     * Difference in change for the day
     */
    change: number;
    /**
     * Current price of market moving asset
     */
    price: number;
};

