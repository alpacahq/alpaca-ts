/**
 * The bars API returns aggregate historical data for the requested securities.
 */
export type Bar = {
  /**
   * Timestamp in RFC-3339 format with nanosecond precision.
   */
  t: string;
  /**
   * Exchange. Only present on Bars for Crypto symbols
   */
  x?: BarExchange;
  /**
   * Open price
   */
  o: number;
  /**
   * High price.
   */
  h: number;
  /**
   * Low price.
   */
  l: number;
  /**
   * Close price.
   */
  c: number;
  /**
   * Volume.
   */
  v: number;
  /**
   * Number of trades.
   */
  n?: number;
  /**
   * Volume weighted average price.
   */
  vw?: number;
};

export enum BarExchange {
  FTXU = "FTXU",
  ERSX = "ERSX",
  CBSE = "CBSE",
}