/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from "./ApiRequestOptions.js";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  HEADERS?: Headers | Resolver<Headers> | undefined;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: "https://paper-api.alpaca.markets",
  HEADERS: undefined,
};
