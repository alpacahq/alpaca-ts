import type { Clock } from "../entities/Clock.js";
import type { CancelablePromise } from "../rest/CancelablePromise";

import { BaseHttpRequest } from "../rest/BaseHttpRequest";

/**
 * Get Market Clock info
 * The clock API serves the current market timestamp, whether the market is currently open, as well as the times of the next market open and close.
 *
 * Returns the market clock.
 * @returns Clock OK
 * @throws ApiError
 */
const get = (httpRequest: BaseHttpRequest): CancelablePromise<Clock> =>
  httpRequest.request({
    method: "GET",
    url: "/v2/clock",
  });

export default {
  get,
};
