/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Assets } from "./Assets.js";

/**
 * The watchlist API provides CRUD operation for the account’s watchlist. An account can have multiple watchlists and each is uniquely identified by id but can also be addressed by user-defined name. Each watchlist is an ordered list of assets.
 *
 */
export type Watchlist = {
  /**
   * watchlist id
   */
  id: string;
  /**
   * account ID
   */
  account_id: string;
  created_at: string;
  updated_at: string;
  /**
   * user-defined watchlist name (up to 64 characters)
   */
  name: string;
  /**
   * the content of this watchlist, in the order as registered by the client
   */
  assets?: Array<Assets>;
};
