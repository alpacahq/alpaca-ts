/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Order } from "./Order";

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
