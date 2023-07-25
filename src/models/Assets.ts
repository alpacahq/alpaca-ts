/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetClass } from "./AssetClass";
import type { Exchange } from "./Exchange";

/**
 * The assets API serves as the master list of assets available for trade and data consumption from Alpaca. Assets are sorted by asset class, exchange and symbol. Some assets are only available for data consumption via Polygon, and are not tradable with Alpaca. These assets will be marked with the flag tradable=false.
 *
 */
export type Assets = {
  /**
   * Asset ID
   */
  id: string;
  class: AssetClass;
  exchange: Exchange;
  /**
   * The symbol of the asset
   */
  symbol: string;
  /**
   * The official name of the asset
   */
  name: string;
  /**
   * active or inactive
   */
  status: Assets.status;
  /**
   * Asset is tradable on Alpaca or not
   */
  tradable: boolean;
  /**
   * Asset is marginable or not
   */
  marginable: boolean;
  /**
   * Asset is shortable or not
   */
  shortable: boolean;
  /**
   * Asset is easy-to-borrow or not (filtering for easy_to_borrow = True is the best way to check whether the name is currently available to short at Alpaca).
   */
  easy_to_borrow: boolean;
  /**
   * Asset is fractionable or not
   */
  fractionable: boolean;
  /**
   * Shows the % margin requirement for the asset (equities only).
   */
  maintenance_margin_requirement?: string;
  /**
   * One of ptp_no_exception or ptp_with_exception. We will include unique characteristics of the asset here.
   */
  attributes?: Array<any>;
};

export namespace Assets {
  /**
   * active or inactive
   */
  export enum status {
    ACTIVE = "active",
    INACTIVE = "inactive",
  }
}
