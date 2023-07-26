import type { News } from "./News.js";

export type GetNewsResponse = {
  news?: Array<News>;
  /**
   * Pagination token for next page
   */
  next_page_token?: string;
};
