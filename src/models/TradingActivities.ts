/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ActivityType } from "./ActivityType";
import type { OrderStatus } from "./OrderStatus";

export type TradingActivities = {
  activity_type?: ActivityType;
  /**
   * An id for the activity. Always in “::” format. Can be sent as page_token in requests to facilitate the paging of results.
   */
  id?: string;
  /**
   * The cumulative quantity of shares involved in the execution.
   */
  cum_qty?: string;
  /**
   * For partially_filled orders, the quantity of shares that are left to be filled.
   *
   */
  leaves_qty?: string;
  /**
   * The per-share price that the trade was executed at.
   */
  price?: string;
  /**
   * The number of shares involved in the trade execution.
   */
  qty?: string;
  /**
   * buy or sell
   */
  side?: string;
  /**
   * The symbol of the security being traded.
   */
  symbol?: string;
  /**
   * The time at which the execution occurred.
   */
  transaction_time?: string;
  /**
   * The id for the order that filled.
   */
  order_id?: string;
  /**
   * fill or partial_fill
   */
  type?: TradingActivities.type;
  order_status?: OrderStatus;
};

export namespace TradingActivities {
  /**
   * fill or partial_fill
   */
  export enum type {
    FILL = "fill",
    PARTIAL_FILL = "partial_fill",
  }
}
