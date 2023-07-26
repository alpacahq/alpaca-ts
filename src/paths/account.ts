import type { NonTradeActivities } from "../entities/NonTradeActivities.js";
import type { TradingActivities } from "../entities/TradingActivities.js";

import type { CancelablePromise } from "../rest/CancelablePromise";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest";
import { AccountConfigurations } from "../entities/AccountConfigurations";
import { PortfolioHistory } from "../entities/PortfolioHistory";

export class Account {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get account activities of one type
   * Returns account activity entries for many types of activities.
   * @returns any returns an array of Account activities
   * @throws ApiError
   */
  public getAccountActivities({
    activityTypes,
  }: {
    /**
     * A comma-separated list of the activity types to include in the response. If unspecified, activities of all types will be returned. (Cannot be used with category)
     */
    activityTypes?: "trade_activity" | "non_trade_activity";
  }): CancelablePromise<Array<TradingActivities | NonTradeActivities>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/account/activities",
      query: {
        activity_types: activityTypes,
      },
    });
  }

  /**
   * Get account activities of one type
   * Returns account activity entries for a specific type of activity.
   * @returns any returns an array of Account activities
   * @throws ApiError
   */
  public getAccountActivitiesByActivityType({
    activityType,
    date,
    until,
    after,
    direction,
    pageSize,
    pageToken,
    category,
  }: {
    /**
     * The activity type you want to view entries for. A list of valid activity types can be found at the bottom of this page.
     */
    activityType: string;
    /**
     * The date for which you want to see activities.
     */
    date?: string;
    /**
     * The response will contain only activities submitted before this date. (Cannot be used with date.)
     */
    until?: string;
    /**
     * The response will contain only activities submitted after this date. (Cannot be used with date.)
     */
    after?: string;
    /**
     * asc or desc (default desc if unspecified.)
     */
    direction?: "asc" | "desc";
    /**
     * The maximum number of entries to return in the response. (See the section on paging above.)
     */
    pageSize?: number;
    /**
     * The ID of the end of your current page of results.
     */
    pageToken?: string;
    /**
     * trade_activity or non_trade_activity, to specify the kind of results the server should return. (Cannot be used with /{activity_type} or ?activity_types=...)
     */
    category?: string;
  }): CancelablePromise<Array<TradingActivities | NonTradeActivities>> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/account/activities/{activity_type}",
      path: {
        activity_type: activityType,
      },
      query: {
        date: date,
        until: until,
        after: after,
        direction: direction,
        page_size: pageSize,
        page_token: pageToken,
        category: category,
      },
    });
  }

  /**
   * Account Configurations
   * gets the current account configuration values
   * @returns AccountConfigurations Successful response
   * @throws ApiError
   */
  public getAccountConfig(): CancelablePromise<AccountConfigurations> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/account/configurations",
    });
  }

  /**
   * Account Configurations
   * Updates and returns the current account configuration values
   * @returns AccountConfigurations Successful response
   * @throws ApiError
   */
  public patchAccountConfig({
    requestBody,
  }: {
    requestBody?: AccountConfigurations;
  }): CancelablePromise<AccountConfigurations> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/v2/account/configurations",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Get account
   * Returns the account associated with the API key.
   * @returns Account OK
   * @throws ApiError
   */
  public getAccount(): CancelablePromise<Account> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/account",
    });
  }

  /**
   * Account Portfolio History
   * Returns timeseries data about equity and profit/loss (P/L) of the account in requested timespan.
   * @returns PortfolioHistory Successful response
   * @throws ApiError
   */
  public getAccountPortfolioHistory({
    period,
    timeframe,
    dateEnd,
    extendedHours,
  }: {
    /**
     * The duration of the data in <number> + <unit>, such as 1D, where <unit> can be D for day, W for week, M for month and A for year. Defaults to 1M.
     */
    period?: string;
    /**
     * The resolution of time window. 1Min, 5Min, 15Min, 1H, or 1D. If omitted, 1Min for less than 7 days period, 15Min for less than 30 days, or otherwise 1D.
     */
    timeframe?: string;
    /**
     * The date the data is returned up to, in “YYYY-MM-DD” format. Defaults to the current market date (rolls over at the market open if extended_hours is false, otherwise at 7am ET)
     */
    dateEnd?: string;
    /**
     * If true, include extended hours in the result. This is effective only for timeframe less than 1D.
     */
    extendedHours?: string;
  }): CancelablePromise<PortfolioHistory> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/account/portfolio/history",
      query: {
        period: period,
        timeframe: timeframe,
        date_end: dateEnd,
        extended_hours: extendedHours,
      },
    });
  }
}
