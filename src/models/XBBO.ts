/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * XBBO or Cross Best Bid and Offer represents the Best Bid and Offer for an exchange
 */
export type XBBO = {
    /**
     * Timestamp in RFC-3339 format with nanosecond precision.
     */
    't': string;
    /**
     * Ask exchange.
     */
    ax: string;
    /**
     * Ask price.
     */
    ap: number;
    /**
     * Ask size.
     */
    as: number;
    /**
     * Bid exchange.
     */
    bx: string;
    /**
     * Bid price.
     */
    bp: number;
    /**
     * Bid size.
     */
    bs: number;
};

