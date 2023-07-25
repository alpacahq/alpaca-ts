/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Clock } from "../models/Clock.js";

import type { CancelablePromise } from "../core/CancelablePromise.js";
import type { BaseHttpRequest } from "../core/BaseHttpRequest.js";

export class ClockService {
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
