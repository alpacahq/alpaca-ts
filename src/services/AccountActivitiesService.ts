/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NonTradeActivities } from "../models/NonTradeActivities.js";
import type { TradingActivities } from "../models/TradingActivities.js";

import type { CancelablePromise } from "../core/CancelablePromise.js";
import type { BaseHttpRequest } from "../core/BaseHttpRequest.js";

export class AccountActivitiesService {
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
}
