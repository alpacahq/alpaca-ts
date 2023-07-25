/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A model representing a trade
 */
export type Trade = {
  /**
   * Timestamp in RFC-3339 format with nanosecond precision
   */
  t?: string;
  /**
   * Exchange where the trade happened.
   */
  x: string;
  /**
   * Trade price.
   */
  p?: number;
  /**
   * Trade Size.
   */
  s?: number;
  /**
   * Trade conditions (Stock trade only)
   */
  c?: Array<string>;
  /**
   * Trade ID
   */
  i: number;
  /**
   * Tape (Stock trade only)
   */
  z?: string;
  /**
   * Taker's side (crypto trade only)
   */
  tks?: string;
};
