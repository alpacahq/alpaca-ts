/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from "../models/Account";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AccountService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Get account
   * Returns the account associated with the API key.
   * @returns Account OK
   * @throws ApiError
   */
  public getAccount(): CancelablePromise<Account> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/account",
    });
  }
}
