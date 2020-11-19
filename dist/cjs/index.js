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
var client_1 = require("./src/client");
__createBinding(exports, client_1, "AlpacaClient");
var stream_1 = require("./src/stream");
__createBinding(exports, stream_1, "AlpacaStream");
