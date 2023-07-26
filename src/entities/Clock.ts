export type Clock = {
  /**
   * Current timestamp
   *
   */
  timestamp?: string;
  /**
   * Whether or not the market is open
   *
   */
  is_open?: boolean;
  /**
   * Next Market open timestamp
   */
  next_open?: string;
  /**
   * Next market close timestamp
   */
  next_close?: string;
};
