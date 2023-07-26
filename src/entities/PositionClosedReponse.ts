import type { Order } from "./Order.js";

/**
 * Represents the result of asking the api to close a position.
 */
export type PositionClosedReponse = {
  /**
   * Symbol name of the asset
   */
  symbol: string;
  /**
   * Http status code for the attempt to close this position
   */
  status: string;
  body?: Order;
};
