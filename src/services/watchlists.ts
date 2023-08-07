import type { UpdateWatchlistRequest } from "../entities/UpdateWatchlistRequest.js";
import type { Watchlist } from "../entities/Watchlist.js";

import type { CancelablePromise } from "../rest/CancelablePromise.js";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest.js";

/**
 * Watchlists
 * Returns the list of watchlists registered under the account.
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const getWatchlists = (
  httpRequest: BaseHttpRequest
): CancelablePromise<Array<Watchlist>> => {
  return httpRequest.request({
    method: "GET",
    url: "/v2/watchlists",
  });
};

/**
 * Watchlist
 * Create a new watchlist with initial set of assets.
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const postWatchlist = (
  httpRequest: BaseHttpRequest,
  {
    requestBody,
  }: {
    requestBody: UpdateWatchlistRequest;
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "POST",
    url: "/v2/watchlists",
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Get Watchlist by ID
 * Returns a watchlist identified by the ID.
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const getWatchlistById = (
  httpRequest: BaseHttpRequest,
  {
    watchlistId,
  }: {
    /**
     * watchlist id
     */
    watchlistId: string;
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "GET",
    url: "/v2/watchlists/{watchlist_id}",
    path: {
      watchlist_id: watchlistId,
    },
  });
};

/**
 * Update Watchlist By Id
 * Update the name and/or content of watchlist
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const updateWatchlistByI = (
  httpRequest: BaseHttpRequest,
  {
    watchlistId,
    requestBody,
  }: {
    /**
     * watchlist id
     */
    watchlistId: string;
    requestBody?: UpdateWatchlistRequest;
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "PUT",
    url: "/v2/watchlists/{watchlist_id}",
    path: {
      watchlist_id: watchlistId,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Add Asset to Watchlist
 * Append an asset for the symbol to the end of watchlist asset list
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const addAssetToWatchlist = (
  httpRequest: BaseHttpRequest,
  {
    watchlistId,
    requestBody,
  }: {
    /**
     * watchlist id
     */
    watchlistId: string;
    requestBody?: {
      /**
       * the symbol name to add to the watchlist
       */
      symbol?: string;
    };
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "POST",
    url: "/v2/watchlists/{watchlist_id}",
    path: {
      watchlist_id: watchlistId,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete Watchlist By Id
 * Delete a watchlist. This is a permanent deletion.
 * @returns void
 * @throws ApiError
 */
export const deleteWatchlistById = (
  httpRequest: BaseHttpRequest,
  {
    watchlistId,
  }: {
    /**
     * watchlist id
     */
    watchlistId: string;
  }
): CancelablePromise<void> => {
  return httpRequest.request({
    method: "DELETE",
    url: "/v2/watchlists/{watchlist_id}",
    path: {
      watchlist_id: watchlistId,
    },
    errors: {
      404: `Watchlist not found`,
    },
  });
};

/**
 * Get Watchlist by Name
 * You can also call GET, PUT, POST and DELETE with watchlist name with another endpoint /v2/watchlists:by_name and query parameter name=<watchlist_name>, instead of /v2/watchlists/{watchlist_id} endpoints
 *
 * Returns a watchlist by name
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const getWatchlistByName = (
  httpRequest: BaseHttpRequest,
  {
    name,
  }: {
    /**
     * name of the watchlist
     */
    name: string;
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "GET",
    url: "/v2/watchlists:by_name",
    query: {
      name: name,
    },
  });
};

/**
 * Update Watchlist By Name
 * Update the name and/or content of watchlist
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const updateWatchlistByName = (
  httpRequest: BaseHttpRequest,
  {
    name,
    requestBody,
  }: {
    /**
     * name of the watchlist
     */
    name: string;
    requestBody?: UpdateWatchlistRequest;
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "PUT",
    url: "/v2/watchlists:by_name",
    query: {
      name: name,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Add Asset to Watchlist By Name
 * Append an asset for the symbol to the end of watchlist asset list
 * @returns Watchlist Successful response
 * @throws ApiError
 */
export const addAssetToWatchlistByName = (
  httpRequest: BaseHttpRequest,
  {
    name,
    requestBody,
  }: {
    /**
     * name of the watchlist
     */
    name: string;
    requestBody?: {
      /**
       * the symbol name to add to the watchlist
       */
      symbol?: string;
    };
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "POST",
    url: "/v2/watchlists:by_name",
    query: {
      name: name,
    },
    body: requestBody,
    mediaType: "application/json",
  });
};

/**
 * Delete Watchlist By Name
 * Delete a watchlist. This is a permanent deletion.
 * @returns void
 * @throws ApiError
 */
export const deleteWatchlistByName = (
  httpRequest: BaseHttpRequest,
  {
    name,
  }: {
    /**
     * name of the watchlist
     */
    name: string;
  }
): CancelablePromise<void> => {
  return httpRequest.request({
    method: "DELETE",
    url: "/v2/watchlists:by_name",
    query: {
      name: name,
    },
  });
};

/**
 * Symbol from Watchlist
 * Delete one entry for an asset by symbol name
 * @returns Watchlist Returns the updated watchlist
 * @throws ApiError
 */
export const removeAssetFromWatchlist = (
  httpRequest: BaseHttpRequest,
  {
    watchlistId,
    symbol,
  }: {
    /**
     * Watchlist ID
     */
    watchlistId: string;
    /**
     * symbol name to remove from the watchlist content
     */
    symbol: string;
  }
): CancelablePromise<Watchlist> => {
  return httpRequest.request({
    method: "DELETE",
    url: "/v2/watchlists/{watchlist_id}/{symbol}",
    path: {
      watchlist_id: watchlistId,
      symbol: symbol,
    },
  });
};
