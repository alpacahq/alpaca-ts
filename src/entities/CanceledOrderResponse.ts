/**
 * Represents the result of a request to cancel and order
 */
export type CanceledOrderResponse = {
  /**
   * orderId
   */
  id?: string;
  /**
   * http response code
   */
  status?: number;
};
