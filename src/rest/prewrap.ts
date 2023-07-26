import { BaseHttpRequest } from "./BaseHttpRequest";

type OmitFirstArg<F> = F extends (x: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : never;

type PreWrapped<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? OmitFirstArg<T[K]>
    : PreWrapped<T[K]>;
};

export function prewrap<T>(
  methods: T,
  httpRequest: BaseHttpRequest
): PreWrapped<T> {
  const wrappedMethods: any = {};

  for (let [key, method] of Object.entries(methods)) {
    if (typeof method === "function") {
      wrappedMethods[key] = (...args: any[]) => method(httpRequest, ...args);
    } else if (typeof method === "object") {
      wrappedMethods[key] = prewrap(method, httpRequest);
    }
  }

  return wrappedMethods;
}
