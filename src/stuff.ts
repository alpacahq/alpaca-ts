export type DataSource = "iex" | "sip";

export interface Endpoints {
  rest: {
    v1beta1: string;
    v2: string;
    data_v2: string;
    data_v1: string;
    data_v1beta3: string;
  };
  websocket: {
    api: string;
    data: (source: DataSource) => string;
  };
}

export const endpoints: Endpoints = {
  rest: {
    v1beta1: "https://data.alpaca.markets/v1beta1",
    v2: "https://api.alpaca.markets/v2",
    data_v2: "https://data.alpaca.markets/v2",
    data_v1: "https://data.alpaca.markets/v1",
    data_v1beta3: "https://data.alpaca.markets/v1beta3/crypto",
  },
  websocket: {
    api: "wss://api.alpaca.markets/stream",
    data: (source: DataSource = "iex") =>
      `wss://stream.data.alpaca.markets/v2/${source}`,
  },
};
