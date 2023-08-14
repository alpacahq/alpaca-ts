import { Config } from "../Client.js";

import type { ApiRequestOptions } from "./ApiRequestOptions.js";
import type { CancelablePromise } from "./CancelablePromise.js";

export abstract class BaseHttpRequest {
  constructor(public readonly config: Config) {}

  public abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
