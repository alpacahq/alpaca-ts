import type { CancelablePromise } from "../rest/CancelablePromise.js";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest.js";

/**
 * Get Logo for symbol
 * Returns logo image resource for provided symbol.
 * @returns binary Returns the requested logo as an image.
 * @throws ApiError
 */
export const getLogo = (
  httpRequest: BaseHttpRequest,
  {
    cryptoOrStockSymbol,
    placeholder = true,
  }: {
    /**
     * The crypto or stock symbol to query for. Note, currently all crypto symbols must be appended with "USD", ie "BTCUSD" would be how you query for BTC.
     */
    cryptoOrStockSymbol: string;
    /**
     * If true then the api will generate a placeholder image if no logo was found. Defaults to true
     */
    placeholder?: boolean;
  }
): CancelablePromise<Blob> => {
  return httpRequest.request({
    method: "GET",
    url: "/v1beta1/logos/{crypto_or_stock_symbol}",
    path: {
      crypto_or_stock_symbol: cryptoOrStockSymbol,
    },
    query: {
      placeholder: placeholder,
    },
    errors: {
      404: `No Logo was found for this symbol. This code will only be returned if you set \`placeholder\` to false. Otherwise we will generate a placeholder image for this symbol`,
    },
  });
};
