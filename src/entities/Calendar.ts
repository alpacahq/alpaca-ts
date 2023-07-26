export type Calendar = {
  /**
   * Date string in “%Y-%m-%d” format
   */
  date: string;
  /**
   * The time the market opens at on this date in “%H:%M” format
   */
  open: string;
  /**
   * The time the market closes at on this date in “%H:%M” format
   */
  close: string;
  /**
   * Date string in “%Y-%m-%d” format. representing the settlement date for the trade date.
   */
  settlement_date: string;
};
