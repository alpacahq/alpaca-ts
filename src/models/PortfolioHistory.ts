/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PortfolioHistory = {
  /**
   * time of each data element, left-labeled (the beginning of time window)
   */
  timestamp?: Array<number>;
  /**
   * equity value of the account in dollar amount as of the end of each time window
   */
  equity?: Array<number>;
  /**
   * profit/loss in dollar from the base value
   */
  profit_loss?: Array<number>;
  /**
   * profit/loss in percentage from the base value
   */
  profit_loss_pct?: Array<number>;
  /**
   * basis in dollar of the profit loss calculation
   */
  base_value?: number;
  /**
   * time window size of each data element
   */
  timeframe?: string;
};
