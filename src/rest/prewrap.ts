import { BaseHttpRequest } from "./BaseHttpRequest.js";

type OmitFirstArg<F> = F extends (x: any, ...args: infer A) => infer R
  ? (...args: A) => R
  : never;

type PreWrapped<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? OmitFirstArg<T[K]>
    : PreWrapped<T[K]>;
};

/**
 * The `prewrap` function takes an object containing methods and a BaseHttpRequest instance, and returns a new object with the same structure but with the methods "wrapped" to include the BaseHttpRequest as their first argument. Essentially, it's transforming the methods so that they automatically include the given httpRequest when called.
 *
 * This function makes it convenient to bind a specific HTTP request object to a set of methods, so that the methods can easily access it without having to include it as a parameter every time.
 *
 * The implementation involves recursion, which allows this wrapping to be applied to methods that are deeply nested within objects.
 *
 * @param methods - An object containing methods (functions) that need to be wrapped.
 * @param httpRequest - The BaseHttpRequest instance that should be the first argument of all the methods.
 * @returns A new object with the same structure as the input, but with the methods wrapped to include `httpRequest` as their first argument.
 *
 * @template T - The type of the object containing the methods to be wrapped.
 *
 * @example
 * const apiMethods = {
 *   getUser: (request, userId) => request.get(`/user/${userId}`),
 *   posts: {
 *     getPost: (request, postId) => request.get(`/post/${postId}`),
 *   },
 * };
 * const wrappedMethods = prewrap(apiMethods, myHttpRequest);
 * wrappedMethods.getUser(userId); // myHttpRequest is automatically included
 * wrappedMethods.posts.getPost(postId); // myHttpRequest is automatically included
 */

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
