const endpoints = {
    rest: {
        beta: 'https://data.alpaca.markets/v1beta1',
        account: 'https://api.alpaca.markets/v2',
        market_data_v2: 'https://data.alpaca.markets/v2',
        market_data_v1: 'https://data.alpaca.markets/v1',
    },
    websocket: {
        account: 'wss://api.alpaca.markets/stream',
        market_data: (source = 'iex') => `wss://stream.data.alpaca.markets/v2/${source}`,
    },
};
export default endpoints;
//# sourceMappingURL=endpoints.js.map