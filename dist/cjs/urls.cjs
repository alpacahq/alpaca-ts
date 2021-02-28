"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    rest: {
        account: 'https://api.alpaca.markets/v2',
        market_data: 'https://data.alpaca.markets/v2',
    },
    websocket: {
        account: 'wss://api.alpaca.markets/stream',
        market_data: (source = 'iex') => `wss://stream.data.alpaca.markets/v2/${source}`,
    },
};
