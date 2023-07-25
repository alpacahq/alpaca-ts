/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The bars API returns aggregate historical data for the requested securities.
 *
 */
export type Bar = {
    /**
     * Timestamp in RFC-3339 format with nanosecond precision.
     */
    't': string;
    /**
     * Exchange. Only present on Bars for Crypto symbols
     */
    'x'?: Bar.'x';
    /**
     * Open price
     */
    'o': number;
    /**
     * High price.
     */
    'h': number;
    /**
     * Low price.
     *
     */
    'l': number;
    /**
     * Close price.
     */
    'c': number;
    /**
     * Volume.
     */
    'v': number;
    /**
     * Number of trades.
     */
    'n'?: number;
    /**
     * Volume weighted average price.
     */
    vw?: number;
};

export namespace Bar {

    /**
     * Exchange. Only present on Bars for Crypto symbols
     */
    export enum 'x' {
        FTXU = 'FTXU',
        ERSX = 'ERSX',
        CBSE = 'CBSE',
    }


}

