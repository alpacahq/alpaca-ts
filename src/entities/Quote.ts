/**
 * The Quotes API provides NBBO quotes for a given ticker symbol at a specified date.
 *
 */
export type Quote = {
  /**
   * Timestamp in RFC-3339 format with nanosecond precision
   */
  t: string;
  /**
   * ask exchange (Stock quote only)
   */
  ax?: string;
  /**
   * ask price
   *
   */
  ap?: number;
  /**
   * ask size
   *
   */
  as?: number;
  /**
   * bid exchange (Stock quote only)
   */
  bx?: string;
  /**
   * bid price
   *
   */
  bp?: number;
  /**
   * bid size
   */
  bs?: number;
  /**
   * quote conditions (Stock quotes only)
   */
  c?: Array<string>;
  /**
   * Exchange (Crypto quote Only)
   */
  x?: string;
  /**
   * Tape (Stock quote only)
   */
  z?: string;
};
