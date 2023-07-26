import type { Trade } from "./Trade.js";

export type LatestMultiTradesResponse = {
  trades: Record<string, Trade>;
};
