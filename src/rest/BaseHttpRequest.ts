import type { ApiRequestOptions } from "./ApiRequestOptions.js";
import type { CancelablePromise } from "./CancelablePromise.js";
import { Config } from "../Client.js";

export abstract class BaseHttpRequest {
  constructor(public readonly config: Config) {}

  public abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
