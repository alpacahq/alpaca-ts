import type { Order } from "../entities/Order.js";
import type { Position } from "../entities/Position.js";
import type { PositionClosedReponse } from "../entities/PositionClosedReponse.js";

import type { CancelablePromise } from "../rest/CancelablePromise.js";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest.js";

/**
 * All Open Positions
 * The positions API provides information about an account’s current open positions. The response will include information such as cost basis, shares traded, and market value, which will be updated live as price information is updated. Once a position is closed, it will no longer be queryable through this API
 *
 * Retrieves a list of the account’s open positions
 * @returns Position Successful response
 * @throws ApiError
 */
export const getAllOpenPositions = (
  httpRequest: BaseHttpRequest
): CancelablePromise<Array<Position>> => {
  return httpRequest.request({
    method: "GET",
    url: "/v2/positions",
  });
};

/**
 * All Positions
 * Closes (liquidates) all of the account’s open long and short positions. A response will be provided for each order that is attempted to be cancelled. If an order is no longer cancelable, the server will respond with status 500 and reject the request.
 * @returns PositionClosedReponse Multi-Status with body.
 *
 * an array of PositionClosed responses
 * @throws ApiError
 */
export const deleteAllOpenPositions = (
  httpRequest: BaseHttpRequest,
  {
    cancelOrders,
  }: {
    /**
     * If true is specified, cancel all open orders before liquidating all positions.
     */
    cancelOrders?: boolean;
  }
): CancelablePromise<Array<PositionClosedReponse>> => {
  return httpRequest.request({
    method: "DELETE",
    url: "/v2/positions",
    query: {
      cancel_orders: cancelOrders,
    },
    errors: {
      500: `Failed to liquidate`,
    },
  });
};

/**
 * Open Position
 * Retrieves the account’s open position for the given symbol or assetId.
 * @returns Position Successful response
 * @throws ApiError
 */
export const getOpenPosition = (
  httpRequest: BaseHttpRequest,
  {
    symbolOrAssetId,
  }: {
    /**
     * symbol or assetId
     */
    symbolOrAssetId: string;
  }
): CancelablePromise<Position> => {
  return httpRequest.request({
    method: "GET",
    url: "/v2/positions/{symbol_or_asset_id}",
    path: {
      symbol_or_asset_id: symbolOrAssetId,
    },
  });
};

/**
 * Position
 * Closes (liquidates) the account’s open position for the given symbol. Works for both long and short positions.
 * @returns Order Successful response
 *
 * Returns the order created to close out this position
 * @throws ApiError
 */
export const deleteOpenPosition = (
  httpRequest: BaseHttpRequest,
  {
    symbolOrAssetId,
    qty,
    percentage,
  }: {
    /**
     * symbol or assetId
     */
    symbolOrAssetId: string;
    /**
     * the number of shares to liquidate. Can accept up to 9 decimal points. Cannot work with percentage
     */
    qty?: number;
    /**
     * percentage of position to liquidate. Must be between 0 and 100. Would only sell fractional if position is originally fractional. Can accept up to 9 decimal points. Cannot work with qty
     */
    percentage?: number;
  }
): CancelablePromise<Order> => {
  return httpRequest.request({
    method: "DELETE",
    url: "/v2/positions/{symbol_or_asset_id}",
    path: {
      symbol_or_asset_id: symbolOrAssetId,
    },
    query: {
      qty: qty,
      percentage: percentage,
    },
  });
};
