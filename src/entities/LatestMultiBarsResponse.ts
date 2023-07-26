import type { Bar } from "./Bar.js";

/**
 * A model representing the result of hitting the Latest Multi Bars api; represents the latest Bars for multiple symbols.
 *
 */
export type LatestMultiBarsResponse = {
  bars: Record<string, Bar>;
};
