/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The account configuration API provides custom configurations about your trading account settings. These configurations control various allow you to modify settings to suit your trading needs.
 */
export type AccountConfigurations = {
  /**
   * both, entry, or exit. Controls Day Trading Margin Call (DTMC) checks.
   */
  dtbp_check?: AccountConfigurations.dtbp_check;
  /**
   * all or none. If none, emails for order fills are not sent.
   */
  trade_confirm_email?: string;
  /**
   * If true, new orders are blocked.
   */
  suspend_trade?: boolean;
  /**
   * If true, account becomes long-only mode.
   */
  no_shorting?: boolean;
  /**
   * If true, account is able to participate in fractional trading
   */
  fractional_trading?: boolean;
  /**
   * Can be "1" or "2"
   */
  max_margin_multiplier?: string;
  /**
   * `both`, `entry`, or `exit`. If entry orders will be rejected on entering a position if it could result in PDT being set for the account. exit will reject exiting orders if they would result in PDT being set.
   */
  pdt_check?: string;
  /**
   * If set to true then Alpaca will accept orders for PTP symbols with no exception. Default is false.
   */
  ptp_no_exception_entry?: boolean;
};

export namespace AccountConfigurations {
  /**
   * both, entry, or exit. Controls Day Trading Margin Call (DTMC) checks.
   */
  export enum dtbp_check {
    BOTH = "both",
    ENTRY = "entry",
    EXIT = "exit",
  }
}
