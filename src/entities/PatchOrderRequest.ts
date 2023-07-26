import type { TimeInForce } from "./TimeInForce.js";

/**
 * Represents a request to patch an order.
 */
export type PatchOrderRequest = {
  /**
   * number of shares to trade
   */
  qty?: string;
  time_in_force?: TimeInForce;
  /**
   * required if original order type is limit or stop_limit
   */
  limit_price?: string;
  /**
   * required if original order type is limit or stop_limit
   */
  stop_price?: string;
  /**
   * the new value of the trail_price or trail_percent value (works only for type=“trailing_stop”)
   */
  trail?: string;
  /**
   * A unique identifier for the order. Automatically generated if not sent.
   */
  client_order_id?: string;
};
