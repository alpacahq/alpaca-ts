import type { Bar } from "./Bar.js";

/**
 * A model representing the result of hitting one of the Latest Bar api endpoints.
 *
 * Represents a single Bar that should be the latest Bar data for a given ticker symbol
 */
export type LatestBarResponse = {
  symbol: string;
  bar: Bar;
};
