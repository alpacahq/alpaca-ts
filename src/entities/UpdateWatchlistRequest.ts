/**
 * Request format used for creating a new watchlist or updating an existing watchlist with a set of assets and name.
 */
export type UpdateWatchlistRequest = {
  name: string;
  symbols?: Array<string | null>;
};
