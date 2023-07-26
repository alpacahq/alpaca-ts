import type { NewsImage } from "./NewsImage.js";

/**
 * Model representing a news article from the Alpaca Market Data API
 */
export type News = {
  /**
   * News article ID
   */
  id: number;
  /**
   * Headline or title of the article
   */
  headline: string;
  /**
   * Original author of news article
   */
  author: string;
  /**
   * Date article was created (RFC 3339)
   */
  created_at: string;
  /**
   * Date article was updated (RFC 3339)
   */
  updated_at: string;
  /**
   * Summary text for the article (may be first sentence of content)
   */
  summary: string;
  /**
   * Content of the news article (might contain HTML)
   */
  content: string;
  /**
   * URL of article (if applicable)
   */
  url?: string | null;
  /**
   * List of images (URLs) related to given article (may be empty)
   */
  images: Array<NewsImage>;
  /**
   * List of related or mentioned symbols
   */
  symbols: Array<string>;
  /**
   * Source where the news originated from (e.g. Benzinga)
   */
  source: string;
};
