/**
 * Represents the types of orders Alpaca currently supports
 *
 * - market
 * - limit
 * - stop
 * - stop_limit
 * - trailing_stop
 */
export enum OrderType {
  MARKET = "market",
  LIMIT = "limit",
  STOP = "stop",
  STOP_LIMIT = "stop_limit",
  TRAILING_STOP = "trailing_stop",
}
