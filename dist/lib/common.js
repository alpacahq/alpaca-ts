"use strict";
// this file is for shared enums or constants
// (anything that has a value but isnt an interface)
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseURL = void 0;
var BaseURL;
(function (BaseURL) {
    BaseURL["Account"] = "https://api.alpaca.markets/v2";
    BaseURL["AccountStream"] = "wss://api.alpaca.markets/stream";
    BaseURL["MarketData"] = "https://data.alpaca.markets/v1";
    BaseURL["MarketDataStream"] = "wss://data.alpaca.markets/stream";
})(BaseURL = exports.BaseURL || (exports.BaseURL = {}));
