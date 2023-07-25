/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountConfigurations } from "../models/AccountConfigurations";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AccountConfigurationsService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Account Configurations
   * gets the current account configuration values
   * @returns AccountConfigurations Successful response
   * @throws ApiError
   */
  public getAccountConfig(): CancelablePromise<AccountConfigurations> {
    return this.httpRequest.request({
      method: "GET",
      url: "/v2/account/configurations",
    });
  }

  /**
   * Account Configurations
   * Updates and returns the current account configuration values
   * @returns AccountConfigurations Successful response
   * @throws ApiError
   */
  public patchAccountConfig({
    requestBody,
  }: {
    requestBody?: AccountConfigurations;
  }): CancelablePromise<AccountConfigurations> {
    return this.httpRequest.request({
      method: "PATCH",
      url: "/v2/account/configurations",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
