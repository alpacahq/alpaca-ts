"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AlpacaClient = void 0;
var qs_1 = __importDefault(require("qs"));
var node_fetch_1 = __importDefault(require("node-fetch"));
var urls_js_1 = __importDefault(require("./urls.cjs"));
var limiter_1 = __importDefault(require("limiter"));
var parse_js_1 = __importDefault(require("./parse.cjs"));
var AlpacaClient = /** @class */ (function () {
    function AlpacaClient(params) {
        this.params = params;
        this.limiter = new limiter_1["default"].RateLimiter(200, 'minute');
        if ('access_token' in params.credentials &&
            ('key' in params.credentials || 'secret' in params.credentials)) {
            throw new Error("can't create client with both default and oauth credentials");
        }
    }
    AlpacaClient.prototype.isAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getAccount()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 2:
                        _a = _b.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AlpacaClient.prototype.getAccount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).account;
                        return [4 /*yield*/, this.request('GET', urls_js_1["default"].rest.account, 'account')];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getOrder = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).order;
                        return [4 /*yield*/, this.request('GET', urls_js_1["default"].rest.account, "orders/" + (params.order_id || params.client_order_id) + "?" + qs_1["default"].stringify({
                                nested: params.nested
                            }))];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getOrders = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).orders;
                        return [4 /*yield*/, this.request('GET', urls_js_1["default"].rest.account, "orders?" + qs_1["default"].stringify(params))];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.placeOrder = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).order;
                        return [4 /*yield*/, this.request('POST', urls_js_1["default"].rest.account, "orders", params)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.replaceOrder = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).order;
                        return [4 /*yield*/, this.request('PATCH', urls_js_1["default"].rest.account, "orders/" + params.order_id, params)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.cancelOrder = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).order;
                        return [4 /*yield*/, this.request('DELETE', urls_js_1["default"].rest.account, "orders/" + params.order_id)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.cancelOrders = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).orders;
                        return [4 /*yield*/, this.request('DELETE', urls_js_1["default"].rest.account, "orders")];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getPosition = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).position;
                        return [4 /*yield*/, this.request('GET', urls_js_1["default"].rest.account, "positions/" + params.symbol)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getPositions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).positions;
                        return [4 /*yield*/, this.request('GET', urls_js_1["default"].rest.account, "positions")];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.closePosition = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).order;
                        return [4 /*yield*/, this.request('DELETE', urls_js_1["default"].rest.account, "positions/" + params.symbol)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.closePositions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).orders;
                        return [4 /*yield*/, this.request('DELETE', urls_js_1["default"].rest.account, "positions")];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getAsset = function (params) {
        return this.request('GET', urls_js_1["default"].rest.account, "assets/" + params.asset_id_or_symbol);
    };
    AlpacaClient.prototype.getAssets = function (params) {
        return this.request('GET', urls_js_1["default"].rest.account, "assets?" + qs_1["default"].stringify(params));
    };
    AlpacaClient.prototype.getWatchlist = function (params) {
        return this.request('GET', urls_js_1["default"].rest.account, "watchlists/" + params.uuid);
    };
    AlpacaClient.prototype.getWatchlists = function () {
        return this.request('GET', urls_js_1["default"].rest.account, "watchlists");
    };
    AlpacaClient.prototype.createWatchlist = function (params) {
        return this.request('POST', urls_js_1["default"].rest.account, "watchlists", params);
    };
    AlpacaClient.prototype.updateWatchlist = function (params) {
        return this.request('PUT', urls_js_1["default"].rest.account, "watchlists/" + params.uuid, params);
    };
    AlpacaClient.prototype.addToWatchlist = function (params) {
        return this.request('POST', urls_js_1["default"].rest.account, "watchlists/" + params.uuid, params);
    };
    AlpacaClient.prototype.removeFromWatchlist = function (params) {
        return this.request('DELETE', urls_js_1["default"].rest.account, "watchlists/" + params.uuid + "/" + params.symbol);
    };
    AlpacaClient.prototype.deleteWatchlist = function (params) {
        return this.request('DELETE', urls_js_1["default"].rest.account, "watchlists/" + params.uuid);
    };
    AlpacaClient.prototype.getCalendar = function (params) {
        return this.request('GET', urls_js_1["default"].rest.account, "calendar?" + qs_1["default"].stringify(params));
    };
    AlpacaClient.prototype.getClock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse_js_1["default"]).clock;
                        return [4 /*yield*/, this.request('GET', urls_js_1["default"].rest.account, "clock")];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getAccountConfigurations = function () {
        return this.request('GET', urls_js_1["default"].rest.account, "account/configurations");
    };
    AlpacaClient.prototype.updateAccountConfigurations = function (params) {
        return this.request('PATCH', urls_js_1["default"].rest.account, "account/configurations", params);
    };
    AlpacaClient.prototype.getAccountActivities = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (params.activity_types && Array.isArray(params.activity_types)) {
                            params.activity_types = params.activity_types.join(',');
                        }
                        _b = (_a = parse_js_1["default"]).activities;
                        return [4 /*yield*/, this.request('GET', urls_js_1["default"].rest.account, "account/activities" + (params.activity_type ? '/'.concat(params.activity_type) : '') + "?" + qs_1["default"].stringify(params))];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getPortfolioHistory = function (params) {
        return this.request('GET', urls_js_1["default"].rest.account, "account/portfolio/history?" + qs_1["default"].stringify(params));
    };
    AlpacaClient.prototype.getBars = function (params) {
        var transformed = {};
        // join the symbols into a comma-delimited string
        transformed = params;
        transformed['symbols'] = params.symbols.join(',');
        return this.request('GET', urls_js_1["default"].rest.market_data, "bars/" + params.timeframe + "?" + qs_1["default"].stringify(params));
    };
    AlpacaClient.prototype.getLastTrade = function (params) {
        return this.request('GET', urls_js_1["default"].rest.market_data, "last/stocks/" + params.symbol);
    };
    AlpacaClient.prototype.getLastQuote = function (params) {
        return this.request('GET', urls_js_1["default"].rest.market_data, "last_quote/stocks/" + params.symbol);
    };
    AlpacaClient.prototype.request = function (method, url, endpoint, data) {
        var _this = this;
        var headers = {};
        if ('access_token' in this.params.credentials) {
            headers['Authorization'] = "Bearer " + this.params.credentials.access_token;
            url == urls_js_1["default"].rest.account;
        }
        else {
            headers['APCA-API-KEY-ID'] = this.params.credentials.key;
            headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret;
            if (this.params.credentials.key.startsWith('PK') &&
                url == urls_js_1["default"].rest.account) {
                url = urls_js_1["default"].rest.account.replace('api.', 'paper-api.');
            }
        }
        // modify the base url if paper key
        // convert any dates to ISO 8601 for Alpaca
        if (data) {
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (value instanceof Date) {
                    data[key] = value.toISOString();
                }
            }
        }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.params.rate_limit) return [3 /*break*/, 2];
                        return [4 /*yield*/, new Promise(function (resolve) { return _this.limiter.removeTokens(1, resolve); })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, node_fetch_1["default"](url + "/" + endpoint, {
                            method: method,
                            headers: headers,
                            body: JSON.stringify(data)
                        })
                            // if json parse fails we default to an empty object
                            .then(function (resp) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, resp.json()["catch"](function () { return false; })];
                                case 1: return [2 /*return*/, (_a.sent()) || {}];
                            }
                        }); }); })
                            .then(function (resp) {
                            return 'code' in resp && 'message' in resp ? reject(resp) : resolve(resp);
                        })["catch"](reject)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return AlpacaClient;
}());
exports.AlpacaClient = AlpacaClient;
