import type { MarketMoversResponse } from "../entities/MarketMoversResponse.js";

import type { CancelablePromise } from "../rest/CancelablePromise";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest";

export class Screener {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get Top Market Movers by Market type
   * Returns top market movers for stocks. By default will return top 5 market gainers and losers.
   * @returns MarketMoversResponse OK
   * @throws ApiError
   */
  public getTopMoversByMarketType({
    marketType,
    top = 10,
  }: {
    /**
     * Screen specific market (stocks or crypto)
     */
    marketType: "stocks" | "crypto";
    /**
     * Number of top market movers to fetch (gainers and losers). Will return number top for each. By default 10 gainers and 10 losers.
     */
    top?: number;
  }): CancelablePromise<MarketMoversResponse> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v1beta1/screener/{market_type}/movers",
      path: {
        market_type: marketType,
      },
      query: {
        top: top,
      },
    });
  }
}
