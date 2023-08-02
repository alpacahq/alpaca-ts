import type { ApiRequestOptions } from "./ApiRequestOptions";
import type { CancelablePromise } from "./CancelablePromise";
import type { OpenAPIConfig } from "../Client";

export abstract class BaseHttpRequest {
  constructor(public readonly config: OpenAPIConfig) {
    this.config = config;
  }

  public abstract request<T>(options: ApiRequestOptions): CancelablePromise<T>;
}
