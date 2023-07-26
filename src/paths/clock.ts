import type { Clock } from "../entities/Clock.js";

import type { CancelablePromise } from "../rest/CancelablePromise";
import type { BaseHttpRequest } from "../rest/BaseHttpRequest";

export class Clock {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get Market Clock info
   * The clock API serves the current market timestamp, whether or not the market is currently open, as well as the times of the next market open and close.
   *
   * Returns the market clock.
   * @returns Clock OK
   * @throws ApiError
   */
  public getClock(): CancelablePromise<Clock> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/clock",
    });
  }
}
