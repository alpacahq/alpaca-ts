"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.AlpacaStream = exports.AlpacaClient = void 0;
var client_js_1 = require("./client.js");
__createBinding(exports, client_js_1, "AlpacaClient");
var stream_js_1 = require("./stream.js");
__createBinding(exports, stream_js_1, "AlpacaStream");
var client_js_2 = require("./client.js");
var stream_js_2 = require("./stream.js");
exports["default"] = {
    AlpacaClient: client_js_2.AlpacaClient,
    AlpacaStream: stream_js_2.AlpacaStream
};
