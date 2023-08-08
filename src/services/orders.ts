import type { CanceledOrderResponse } from "../entities/CanceledOrderResponse.js";
import type { Order } from "../entities/Order.js";
import type { PatchOrderRequest } from "../entities/PatchOrderRequest.js";

import type { CancelablePromise } from "../rest/CancelablePromise.js";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest.js";

/**
 * Order
 * Places a new order for the given account. An order request may be rejected if the account is not authorized for trading, or if the tradable balance is insufficient to fill the order..
 * @returns Order Successful response
 * @throws ApiError
 */
export const postOrder = (
  httpRequest: BaseHttpRequest,
  {
    requestBody,
  }: {
    requestBody: string;
  }
): CancelablePromise<Order> => {
  return httpRequest.request({
    method: "POST",
    url: "/v2/orders",
    body: requestBody,
    mediaType: "application/json",
    errors: {
      403: `Forbidden

                Buying power or shares is not sufficient.`,
      422: `Unprocessable

                Input parameters are not recognized.`,
    },
  });
};

/**
 * All Orders
 * Retrieves a list of orders for the account, filtered by the supplied query parameters.
 * @returns Order Successful response
 *
 * An array of Order objects
 * @throws ApiError
 */
export const getOrders = (
  httpRequest: BaseHttpRequest,
  {
    status,
    limit,
    after,
    until,
    direction,
    nested,
    symbols,
    side,
  }: {
    /**
     * Order status to be queried. open, closed or all. Defaults to open.
     */
    status?: "open" | "closed" | "all";
    /**
     * The maximum number of orders in response. Defaults to 50 and max is 500.
     */
    limit?: number;
    /**
     * The response will include only ones submitted after this timestamp (exclusive.)
     */
    after?: string;
    /**
     * The response will include only ones submitted until this timestamp (exclusive.)
     */
    until?: string;
    /**
     * The chronological order of response based on the submission time. asc or desc. Defaults to desc.
     */
    direction?: "asc" | "desc";
    /**
     * If true, the result will roll up multi-leg orders under the legs field of primary order.
     */
    nested?: boolean;
    /**
     * A comma-separated list of symbols to filter by (ex. “AAPL,TSLA,MSFT”). A currency pair is required for crypto orders (ex. “BTCUSD,BCHUSD,LTCUSD,ETCUSD”).
     */
    symbols?: string;
    /**
     * Filters down to orders that have a matching side field set.
     */
    side?: string;
  }
): CancelablePromise<Array<Order>> => {
  return httpRequest.request({
    method: "GET",
    url: "/v2/orders",
    query: {
      status: status,
      limit: limit,
      after: after,
      until: until,
      direction: direction,
      nested: nested,
      symbols: symbols,
      side: side,
    },
  });
};

/**
 * All Orders
 * Attempts to cancel all open orders. A response will be provided for each order that is attempted to be cancelled. If an order is no longer cancelable, the server will respond with status 500 and reject the request.
 * @returns CanceledOrderResponse Multi-Status with body.
 *
 * an array of objects that include the order id and http status code for each status request.
 * @throws ApiError
 */
export const deleteAllOrders = (
  httpRequest: BaseHttpRequest
): CancelablePromise<Array<CanceledOrderResponse>> => {
  return httpRequest.request({
    method: "DELETE",
    url: "/v2/orders",
    errors: {
      500: `Failed to cancel order.`,
    },
  });
};

/**
 * Order by Order ID
 * Retrieves a single order for the given order_id.
 * @returns Order Successful response
 * @throws ApiError
 */
export const getOrderByOrderId = (
  httpRequest: BaseHttpRequest,
  {
    orderId,
    nested,
  }: {
    /**
     * order id
     */
    orderId: string;
    /**
     * If true, the result will roll up multi-leg orders under the legs field of primary order.
     */
    nested?: boolean;
  }
): CancelablePromise<Order> => {
  return httpRequest.request({
    method: "GET",
    url: "/v2/orders/{order_id}",
    path: {
      order_id: orderId,
    },
    query: {
      nested: nested,
    },
  });
};

/**
 * Order
 * Replaces a single order with updated parameters. Each parameter overrides the corresponding attribute of the existing order. The other attributes remain the same as the existing order.
 *
 * A success return code from a replaced order does NOT guarantee the existing open order has been replaced. If the existing open order is filled before the replacing (new) order reaches the execution venue, the replacing (new) order is rejected, and these events are sent in the trade_updates stream channel.
 *
 * While an order is being replaced, buying power is reduced by the larger of the two orders that have been placed (the old order being replaced, and the newly placed order to replace it). If you are replacing a buy entry order with a higher limit price than the original order, the buying power is calculated based on the newly placed order. If you are replacing it with a lower limit price, the buying power is calculated based on the old order.
 *
 * @returns Order Successful response
 *
 * The new Order object with the new order ID.
 * @throws ApiError
 */
export const patchOrderByOrderId = (
  httpRequest: BaseHttpRequest,
  {
    orderId,
    requestBody,
  }: {
    /**
     * order id
     */
    orderId: string;
    requestBody: PatchOrderRequest;
  }
): CancelablePromise<Order> => {
  return httpRequest.request({
    method: "PATCH",
    url: "/v2/orders/{order_id}",
    path: {
      order_id: orderId,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Order by Order ID
 * Attempts to cancel an Open Order. If the order is no longer cancelable, the request will be rejected with status 422; otherwise accepted with return status 204.
 * @returns void
 * @throws ApiError
 */
export const deleteOrderByOrderId = (
  httpRequest: BaseHttpRequest,
  {
    orderId,
  }: {
    /**
     * order id
     */
    orderId: string;
  }
): CancelablePromise<void> => {
  return httpRequest.request({
    method: "DELETE",
    url: "/v2/orders/{order_id}",
    path: {
      order_id: orderId,
    },
    errors: {
      422: `The order status is not cancelable.`,
    },
  });
};
