/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { News } from "./News";

export type GetNewsResponse = {
  news?: Array<News>;
  /**
   * Pagination token for next page
   */
  next_page_token?: string;
};
