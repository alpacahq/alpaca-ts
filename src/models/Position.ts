/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetClass } from "./AssetClass";
import type { Exchange } from "./Exchange";

/**
 * The positions API provides information about an account’s current open positions. The response will include information such as cost basis, shares traded, and market value, which will be updated live as price information is updated. Once a position is closed, it will no longer be queryable through this API.
 */
export type Position = {
  /**
   * Asset ID
   */
  asset_id: string;
  /**
   * Symbol name of the asset
   */
  symbol: string;
  exchange: Exchange;
  asset_class: AssetClass;
  /**
   * Average entry price of the position
   */
  avg_entry_price: string;
  /**
   * The number of shares
   */
  qty: string;
  /**
   * Total number of shares available minus open orders
   */
  qty_available?: string;
  /**
   * “long”
   */
  side: string;
  /**
   * Total dollar amount of the position
   */
  market_value: string;
  /**
   * Total cost basis in dollar
   */
  cost_basis: string;
  /**
   * Unrealized profit/loss in dollars
   */
  unrealized_pl: string;
  /**
   * Unrealized profit/loss percent (by a factor of 1)
   */
  unrealized_plpc: string;
  /**
   * Unrealized profit/loss in dollars for the day
   */
  unrealized_intraday_pl: string;
  /**
   * Unrealized profit/loss percent (by a factor of 1)
   */
  unrealized_intraday_plpc: string;
  /**
   * Current asset price per share
   */
  current_price: string;
  /**
   * Last day’s asset price per share based on the closing value of the last trading day
   */
  lastday_price: string;
  /**
   * Percent change from last day price (by a factor of 1)
   */
  change_today: string;
  asset_marginable: boolean;
};
