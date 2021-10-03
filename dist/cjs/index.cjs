"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpacaStream = exports.AlpacaClient = void 0;
var client_1 = require("./client");
Object.defineProperty(exports, "AlpacaClient", { enumerable: true, get: function () { return client_1.AlpacaClient; } });
var stream_1 = require("./stream");
Object.defineProperty(exports, "AlpacaStream", { enumerable: true, get: function () { return stream_1.AlpacaStream; } });
const client_2 = require("./client");
const stream_2 = require("./stream");
exports.default = {
    AlpacaClient: client_2.AlpacaClient,
    AlpacaStream: stream_2.AlpacaStream,
};
