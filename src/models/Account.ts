/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AccountStatus } from "./AccountStatus";

/**
 * The account API serves important information related to an account, including account status, funds available for trade, funds available for withdrawal, and various flags relevant to an account’s ability to trade. An account maybe be blocked for just for trades (trades_blocked flag) or for both trades and transfers (account_blocked flag) if Alpaca identifies the account to engaging in any suspicious activity. Also, in accordance with FINRA’s pattern day trading rule, an account may be flagged for pattern day trading (pattern_day_trader flag), which would inhibit an account from placing any further day-trades. Please note that cryptocurrencies are not eligible assets to be used as collateral for margin accounts and will require the asset be traded using cash only.
 *
 */
export type Account = {
  /**
   * Account Id.
   *
   */
  id: string;
  /**
   * Account number.
   */
  account_number?: string;
  status: AccountStatus;
  /**
   * USD
   *
   */
  currency?: string;
  /**
   * Cash Balance
   *
   */
  cash?: string;
  /**
   * Total value of cash + holding positions (This field is deprecated. It is equivalent to the equity field.)
   */
  portfolio_value?: string;
  /**
   * Current available non-margin dollar buying power
   */
  non_marginable_buying_power?: string;
  /**
   * The fees collected.
   */
  accrued_fees?: string;
  /**
   * Cash pending transfer in.
   */
  pending_transfer_in?: string;
  /**
   * Cash pending transfer out.
   */
  pending_transfer_out?: string;
  /**
   * Whether or not the account has been flagged as a pattern day trader
   */
  pattern_day_trader?: boolean;
  /**
   * User setting. If true, the account is not allowed to place orders.
   */
  trade_suspended_by_user?: boolean;
  /**
   * If true, the account is not allowed to place orders.
   *
   */
  trading_blocked?: boolean;
  /**
   * If true, the account is not allowed to request money transfers.
   */
  transfers_blocked?: boolean;
  /**
   * If true, the account activity by user is prohibited.
   */
  account_blocked?: boolean;
  /**
   * Timestamp this account was created at
   *
   */
  created_at?: string;
  /**
   * Flag to denote whether or not the account is permitted to short
   */
  shorting_enabled?: boolean;
  /**
   * Real-time MtM value of all long positions held in the account
   *
   */
  long_market_value?: string;
  /**
   * Real-time MtM value of all short positions held in the account
   */
  short_market_value?: string;
  /**
   * Cash + long_market_value + short_market_value
   */
  equity?: string;
  /**
   * Equity as of previous trading day at 16:00:00 ET
   */
  last_equity?: string;
  /**
   * Buying power multiplier that represents account margin classification; valid values 1 (standard limited margin account with 1x buying power), 2 (reg T margin account with 2x intraday and overnight buying power; this is the default for all non-PDT accounts with $2,000 or more equity), 4 (PDT account with 4x intraday buying power and 2x reg T overnight buying power)
   */
  multiplier?: string;
  /**
   * Current available $ buying power; If multiplier = 4, this is your daytrade buying power which is calculated as (last_equity - (last) maintenance_margin) * 4; If multiplier = 2, buying_power = max(equity – initial_margin,0) * 2; If multiplier = 1, buying_power = cash
   */
  buying_power?: string;
  /**
   * Reg T initial margin requirement (continuously updated value)
   */
  initial_margin?: string;
  /**
   * Maintenance margin requirement (continuously updated value)
   */
  maintenance_margin?: string;
  /**
   * Value of special memorandum account (will be used at a later date to provide additional buying_power)
   */
  sma?: string;
  /**
   * The current number of daytrades that have been made in the last 5 trading days (inclusive of today)
   */
  daytrade_count?: number;
  /**
   * Your maintenance margin requirement on the previous trading day
   */
  last_maintenance_margin?: string;
  /**
   * Your buying power for day trades (continuously updated value)
   */
  daytrading_buying_power?: string;
  /**
   * Your buying power under Regulation T (your excess equity - equity minus margin value - times your margin multiplier)
   *
   */
  regt_buying_power?: string;
};
