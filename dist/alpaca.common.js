/*! 
 * ALPACA library 3.7.0
 *
 * Released under the ISC license
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Bottleneck = require('bottleneck');
var qs = require('qs');
var ky = require('ky-universal');
var WebSocket = require('isomorphic-ws');
var EventEmitter = require('eventemitter3');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Bottleneck__default = /*#__PURE__*/_interopDefaultLegacy(Bottleneck);
var qs__default = /*#__PURE__*/_interopDefaultLegacy(qs);
var ky__default = /*#__PURE__*/_interopDefaultLegacy(ky);
var WebSocket__default = /*#__PURE__*/_interopDefaultLegacy(WebSocket);
var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

var urls = {
    rest: {
        account: 'https://api.alpaca.markets/v2',
        market_data: 'https://data.alpaca.markets/v1',
    },
    websocket: {
        account: 'wss://api.alpaca.markets/stream',
        account_paper: 'wss://paper-api.alpaca.markets/stream',
        market_data: 'wss://data.alpaca.markets/stream',
    },
};

function account(rawAccount) {
    if (!rawAccount) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawAccount), { raw: function () { return rawAccount; }, buying_power: number(rawAccount.buying_power), regt_buying_power: number(rawAccount.regt_buying_power), daytrading_buying_power: number(rawAccount.daytrading_buying_power), cash: number(rawAccount.cash), created_at: new Date(rawAccount.created_at), portfolio_value: number(rawAccount.portfolio_value), multiplier: number(rawAccount.multiplier), equity: number(rawAccount.equity), last_equity: number(rawAccount.last_equity), long_market_value: number(rawAccount.long_market_value), short_market_value: number(rawAccount.short_market_value), initial_margin: number(rawAccount.initial_margin), maintenance_margin: number(rawAccount.maintenance_margin), last_maintenance_margin: number(rawAccount.last_maintenance_margin), sma: number(rawAccount.sma), status: rawAccount.status });
    }
    catch (err) {
        throw new Error("Account parsing failed. " + err.message);
    }
}
function clock(rawClock) {
    if (!rawClock) {
        return undefined;
    }
    try {
        return {
            raw: function () { return rawClock; },
            timestamp: new Date(rawClock.timestamp),
            is_open: rawClock.is_open,
            next_open: new Date(rawClock.next_open),
            next_close: new Date(rawClock.next_close),
        };
    }
    catch (err) {
        throw new Error("Order parsing failed. " + err.message);
    }
}
function order(rawOrder) {
    if (!rawOrder) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawOrder), { raw: function () { return rawOrder; }, created_at: new Date(rawOrder.created_at), updated_at: new Date(rawOrder.updated_at), submitted_at: new Date(rawOrder.submitted_at), filled_at: new Date(rawOrder.filled_at), expired_at: new Date(rawOrder.expired_at), canceled_at: new Date(rawOrder.canceled_at), failed_at: new Date(rawOrder.failed_at), replaced_at: new Date(rawOrder.replaced_at), qty: number(rawOrder.qty), filled_qty: number(rawOrder.filled_qty), type: rawOrder.type, side: rawOrder.side, time_in_force: rawOrder.time_in_force, limit_price: number(rawOrder.limit_price), stop_price: number(rawOrder.stop_price), filled_avg_price: number(rawOrder.filled_avg_price), status: rawOrder.status, legs: orders(rawOrder.legs), trail_price: number(rawOrder.trail_price), trail_percent: number(rawOrder.trail_percent), hwm: number(rawOrder.hwm) });
    }
    catch (err) {
        throw new Error("Order parsing failed. " + err.message);
    }
}
function orders(rawOrders) {
    return rawOrders ? rawOrders.map(function (value) { return order(value); }) : undefined;
}
function position(rawPosition) {
    if (!rawPosition) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawPosition), { raw: function () { return rawPosition; }, avg_entry_price: number(rawPosition.avg_entry_price), qty: number(rawPosition.qty), side: rawPosition.side, market_value: number(rawPosition.market_value), cost_basis: number(rawPosition.cost_basis), unrealized_pl: number(rawPosition.unrealized_pl), unrealized_plpc: number(rawPosition.unrealized_plpc), unrealized_intraday_pl: number(rawPosition.unrealized_intraday_pl), unrealized_intraday_plpc: number(rawPosition.unrealized_intraday_plpc), current_price: number(rawPosition.current_price), lastday_price: number(rawPosition.lastday_price), change_today: number(rawPosition.change_today) });
    }
    catch (err) {
        throw new Error("Position parsing failed. " + err.message);
    }
}
function positions(rawPositions) {
    return rawPositions ? rawPositions.map(function (pos) { return position(pos); }) : undefined;
}
function tradeActivity(rawTradeActivity) {
    if (!rawTradeActivity) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawTradeActivity), { raw: function () { return rawTradeActivity; }, cum_qty: number(rawTradeActivity.cum_qty), leaves_qty: number(rawTradeActivity.leaves_qty), price: number(rawTradeActivity.price), qty: number(rawTradeActivity.qty), side: rawTradeActivity.side, type: rawTradeActivity.type });
    }
    catch (err) {
        throw new Error("TradeActivity parsing failed. " + err.message);
    }
}
function nonTradeActivity(rawNonTradeActivity) {
    if (!rawNonTradeActivity) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawNonTradeActivity), { raw: function () { return rawNonTradeActivity; }, net_amount: number(rawNonTradeActivity.net_amount), qty: number(rawNonTradeActivity.qty), per_share_amount: number(rawNonTradeActivity.per_share_amount) });
    }
    catch (err) {
        throw new Error("NonTradeActivity parsing failed. " + err.message);
    }
}
function activities(rawActivities) {
    if (!rawActivities) {
        return undefined;
    }
    try {
        return rawActivities.map(function (rawActivity) {
            return rawActivity.activity_type === 'FILL'
                ? tradeActivity(rawActivity)
                : nonTradeActivity(rawActivity);
        });
    }
    catch (err) {
        throw new Error("Activity parsing failed. " + err.message);
    }
}
function number(numStr) {
    if (typeof numStr === 'undefined')
        return numStr;
    return parseFloat(numStr);
}
var parse = {
    account: account,
    activities: activities,
    clock: clock,
    nonTradeActivity: nonTradeActivity,
    order: order,
    orders: orders,
    position: position,
    positions: positions,
    tradeActivity: tradeActivity,
};

var AlpacaClient = (function () {
    function AlpacaClient(params) {
        this.params = params;
        this.limiter = new Bottleneck__default['default']({
            reservoir: 200,
            reservoirRefreshAmount: 200,
            reservoirRefreshInterval: 60 * 1000,
            maxConcurrent: 1,
            minTime: 200,
        });
        if ('access_token' in params.credentials &&
            ('key' in params.credentials || 'secret' in params.credentials)) {
            throw new Error("can't create client with both default and oauth credentials");
        }
    }
    AlpacaClient.prototype.isAuthenticated = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4, this.getAccount()];
                    case 1:
                        _b.sent();
                        return [2, true];
                    case 2:
                        _b.sent();
                        return [2, false];
                    case 3: return [2];
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
                        _b = (_a = parse).account;
                        return [4, this.request('GET', urls.rest.account, 'account')];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).order;
                        return [4, this.request('GET', urls.rest.account, "orders/" + (params.order_id || params.client_order_id) + "?" + qs__default['default'].stringify({
                                nested: params.nested,
                            }))];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).orders;
                        return [4, this.request('GET', urls.rest.account, "orders?" + qs__default['default'].stringify(params))];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).order;
                        return [4, this.request('POST', urls.rest.account, "orders", params)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).order;
                        return [4, this.request('PATCH', urls.rest.account, "orders/" + params.order_id, params)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).order;
                        return [4, this.request('DELETE', urls.rest.account, "orders/" + params.order_id)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).orders;
                        return [4, this.request('DELETE', urls.rest.account, "orders")];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).position;
                        return [4, this.request('GET', urls.rest.account, "positions/" + params.symbol)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).positions;
                        return [4, this.request('GET', urls.rest.account, "positions")];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).order;
                        return [4, this.request('DELETE', urls.rest.account, "positions/" + params.symbol)];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
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
                        _b = (_a = parse).orders;
                        return [4, this.request('DELETE', urls.rest.account, "positions")];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getAsset = function (params) {
        return this.request('GET', urls.rest.account, "assets/" + params.asset_id_or_symbol);
    };
    AlpacaClient.prototype.getAssets = function (params) {
        return this.request('GET', urls.rest.account, "assets?" + qs__default['default'].stringify(params));
    };
    AlpacaClient.prototype.getWatchlist = function (params) {
        return this.request('GET', urls.rest.account, "watchlists/" + params.uuid);
    };
    AlpacaClient.prototype.getWatchlists = function () {
        return this.request('GET', urls.rest.account, "watchlists");
    };
    AlpacaClient.prototype.createWatchlist = function (params) {
        return this.request('POST', urls.rest.account, "watchlists", params);
    };
    AlpacaClient.prototype.updateWatchlist = function (params) {
        return this.request('PUT', urls.rest.account, "watchlists/" + params.uuid, params);
    };
    AlpacaClient.prototype.addToWatchlist = function (params) {
        return this.request('POST', urls.rest.account, "watchlists/" + params.uuid, params);
    };
    AlpacaClient.prototype.removeFromWatchlist = function (params) {
        return this.request('DELETE', urls.rest.account, "watchlists/" + params.uuid + "/" + params.symbol);
    };
    AlpacaClient.prototype.deleteWatchlist = function (params) {
        return this.request('DELETE', urls.rest.account, "watchlists/" + params.uuid);
    };
    AlpacaClient.prototype.getCalendar = function (params) {
        return this.request('GET', urls.rest.account, "calendar?" + qs__default['default'].stringify(params));
    };
    AlpacaClient.prototype.getClock = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = parse).clock;
                        return [4, this.request('GET', urls.rest.account, "clock")];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getAccountConfigurations = function () {
        return this.request('GET', urls.rest.account, "account/configurations");
    };
    AlpacaClient.prototype.updateAccountConfigurations = function (params) {
        return this.request('PATCH', urls.rest.account, "account/configurations", params);
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
                        _b = (_a = parse).activities;
                        return [4, this.request('GET', urls.rest.account, "account/activities" + (params.activity_type ? '/'.concat(params.activity_type) : '') + "?" + qs__default['default'].stringify(params))];
                    case 1: return [2, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    AlpacaClient.prototype.getPortfolioHistory = function (params) {
        return this.request('GET', urls.rest.account, "account/portfolio/history?" + qs__default['default'].stringify(params));
    };
    AlpacaClient.prototype.getBars = function (params) {
        __assign(__assign({}, params), { symbols: params.symbols.join(',') });
        return this.request('GET', urls.rest.market_data, "bars/" + params.timeframe + "?" + qs__default['default'].stringify(params));
    };
    AlpacaClient.prototype.getLastTrade = function (params) {
        return this.request('GET', urls.rest.market_data, "last/stocks/" + params.symbol);
    };
    AlpacaClient.prototype.getLastQuote = function (params) {
        return this.request('GET', urls.rest.market_data, "last_quote/stocks/" + params.symbol);
    };
    AlpacaClient.prototype.request = function (method, url, endpoint, data) {
        var _this = this;
        var headers = {};
        if ('access_token' in this.params.credentials) {
            headers['Authorization'] = "Bearer " + this.params.credentials.access_token;
        }
        else {
            headers['APCA-API-KEY-ID'] = this.params.credentials.key;
            headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret;
            if (this.params.credentials.key.startsWith('PK') &&
                url == urls.rest.account) {
                url = urls.rest.account.replace('api.', 'paper-api.');
            }
        }
        if (data) {
            for (var _i = 0, _a = Object.entries(data); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                if (value instanceof Date) {
                    data[key] = value.toISOString();
                }
            }
        }
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var makeCall, func;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        makeCall = function () {
                            return ky__default['default'](url + "/" + endpoint, {
                                method: method,
                                headers: headers,
                                body: JSON.stringify(data),
                            });
                        };
                        func = this.params.rate_limit
                            ? function () { return _this.limiter.schedule(makeCall); }
                            : makeCall;
                        return [4, func()
                                .then(function (resp) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, resp.json().catch(function () { return false; })];
                                    case 1: return [2, (_a.sent()) || {}];
                                }
                            }); }); })
                                .then(function (resp) {
                                return 'code' in resp && 'message' in resp ? reject(resp) : resolve(resp);
                            })
                                .catch(reject)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    };
    return AlpacaClient;
}());

var AlpacaStream = (function (_super) {
    __extends(AlpacaStream, _super);
    function AlpacaStream(params) {
        var _this = _super.call(this) || this;
        _this.params = params;
        _this.subscriptions = [];
        _this.authenticated = false;
        switch (params.stream) {
            case 'account':
                _this.host = params.credentials.key.startsWith('PK')
                    ? urls.websocket.account_paper
                    : urls.websocket.account;
                break;
            case 'market_data':
                _this.host = urls.websocket.market_data;
                break;
            default:
                _this.host = 'unknown';
        }
        _this.connection = new WebSocket__default['default'](_this.host)
            .once('open', function () {
            if (!_this.authenticated) {
                _this.connection.send(JSON.stringify({
                    action: 'authenticate',
                    data: {
                        key_id: params.credentials.key,
                        secret_key: params.credentials.secret,
                    },
                }));
            }
            _this.emit('open', _this);
        })
            .once('close', function () { return _this.emit('close', _this); })
            .on('message', function (message) {
            var object = JSON.parse(message.toString());
            if ('stream' in object && object.stream == 'authorization') {
                if (object.data.status == 'authorized') {
                    _this.authenticated = true;
                    _this.emit('authenticated', _this);
                    console.log('Connected to the websocket.');
                }
                else {
                    _this.connection.close();
                    throw new Error('There was an error in authorizing your websocket connection. Object received: ' +
                        JSON.stringify(object, null, 2));
                }
            }
            _this.emit('message', object);
            if ('stream' in object) {
                var x = {
                    trade_updates: 'trade_updates',
                    account_updates: 'account_updates',
                    T: 'trade',
                    Q: 'quote',
                    AM: 'aggregate_minute',
                };
                _this.emit(x[object.stream.split('.')[0]], object.data);
            }
        })
            .on('error', function (err) { return _this.emit('error', err); });
        return _this;
    }
    AlpacaStream.prototype.send = function (message) {
        if (!this.authenticated) {
            throw new Error("You can't send a message until you are authenticated!");
        }
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        this.connection.send(message);
        return this;
    };
    AlpacaStream.prototype.subscribe = function (channels) {
        var _a;
        (_a = this.subscriptions).push.apply(_a, channels);
        return this.send(JSON.stringify({
            action: 'listen',
            data: {
                streams: channels,
            },
        }));
    };
    AlpacaStream.prototype.unsubscribe = function (channels) {
        for (var i = 0, ln = this.subscriptions.length; i < ln; i++) {
            if (channels.includes(this.subscriptions[i])) {
                this.subscriptions.splice(i, 1);
            }
        }
        return this.send(JSON.stringify({
            action: 'unlisten',
            data: {
                streams: channels,
            },
        }));
    };
    return AlpacaStream;
}(EventEmitter__default['default']));

var index = {
    AlpacaClient: AlpacaClient,
    AlpacaStream: AlpacaStream,
};

exports.AlpacaClient = AlpacaClient;
exports.AlpacaStream = AlpacaStream;
exports.default = index;
//# sourceMappingURL=alpaca.common.js.map
