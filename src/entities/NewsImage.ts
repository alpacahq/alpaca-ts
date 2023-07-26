/**
 * A model representing images for news article. simply a url to the image along with a size parameter suggesting the display size of the image
 */
export type NewsImage = {
  /**
   * Possible values for size are thumb, small and large.
   */
  readonly size: NewsImage.size;
  /**
   * url to image from news article
   */
  readonly url: string;
};

export namespace NewsImage {
  /**
   * Possible values for size are thumb, small and large.
   */
  export enum size {
    THUMB = "thumb",
    SMALL = "small",
    LARGE = "large",
  }
}
