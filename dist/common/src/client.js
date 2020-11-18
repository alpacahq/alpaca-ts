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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpacaClient = void 0;
const qs_1 = __importDefault(require("qs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const urls_js_1 = __importDefault(require("./urls.js"));
const limiter_1 = __importDefault(require("limiter"));
const parser_js_1 = require("./parser.js");
class AlpacaClient {
    constructor(options) {
        this.options = options;
        this.limiter = new limiter_1.default.RateLimiter(200, 'minute');
        this.parser = new parser_js_1.Parser();
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getAccount();
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    getAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseAccount(yield this.request('GET', urls_js_1.default.rest.account, 'account'));
        });
    }
    getOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrder(yield this.request('GET', urls_js_1.default.rest.account, `orders/${params.order_id || params.client_order_id}?${qs_1.default.stringify({
                nested: params.nested,
            })}`));
        });
    }
    getOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrders(yield this.request('GET', urls_js_1.default.rest.account, `orders?${qs_1.default.stringify(params)}`));
        });
    }
    placeOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrder(yield this.request('POST', urls_js_1.default.rest.account, `orders`, params));
        });
    }
    replaceOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrder(yield this.request('PATCH', urls_js_1.default.rest.account, `orders/${params.order_id}`, params));
        });
    }
    cancelOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrder(yield this.request('DELETE', urls_js_1.default.rest.account, `orders/${params.order_id}`));
        });
    }
    cancelOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrders(yield this.request('DELETE', urls_js_1.default.rest.account, `orders`));
        });
    }
    getPosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parsePosition(yield this.request('GET', urls_js_1.default.rest.account, `positions/${params.symbol}`));
        });
    }
    getPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parsePositions(yield this.request('GET', urls_js_1.default.rest.account, `positions`));
        });
    }
    closePosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrder(yield this.request('DELETE', urls_js_1.default.rest.account, `positions/${params.symbol}`));
        });
    }
    closePositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseOrders(yield this.request('DELETE', urls_js_1.default.rest.account, `positions`));
        });
    }
    getAsset(params) {
        return this.request('GET', urls_js_1.default.rest.account, `assets/${params.asset_id_or_symbol}`);
    }
    getAssets(params) {
        return this.request('GET', urls_js_1.default.rest.account, `assets?${qs_1.default.stringify(params)}`);
    }
    getWatchlist(params) {
        return this.request('GET', urls_js_1.default.rest.account, `watchlists/${params.uuid}`);
    }
    getWatchlists() {
        return this.request('GET', urls_js_1.default.rest.account, `watchlists`);
    }
    createWatchlist(params) {
        return this.request('POST', urls_js_1.default.rest.account, `watchlists`, params);
    }
    updateWatchlist(params) {
        return this.request('PUT', urls_js_1.default.rest.account, `watchlists/${params.uuid}`, params);
    }
    addToWatchlist(params) {
        return this.request('POST', urls_js_1.default.rest.account, `watchlists/${params.uuid}`, params);
    }
    removeFromWatchlist(params) {
        return this.request('DELETE', urls_js_1.default.rest.account, `watchlists/${params.uuid}/${params.symbol}`);
    }
    deleteWatchlist(params) {
        return this.request('DELETE', urls_js_1.default.rest.account, `watchlists/${params.uuid}`);
    }
    getCalendar(params) {
        return this.request('GET', urls_js_1.default.rest.account, `calendar?${qs_1.default.stringify(params)}`);
    }
    getClock() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseClock(yield this.request('GET', urls_js_1.default.rest.account, `clock`));
        });
    }
    getAccountConfigurations() {
        return this.request('GET', urls_js_1.default.rest.account, `account/configurations`);
    }
    updateAccountConfigurations(params) {
        return this.request('PATCH', urls_js_1.default.rest.account, `account/configurations`, params);
    }
    getAccountActivities(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.parser.parseActivities(yield this.request('GET', urls_js_1.default.rest.account, `account/activities/${params.activity_type}?${qs_1.default.stringify(params)}`));
        });
    }
    getPortfolioHistory(params) {
        return this.request('GET', urls_js_1.default.rest.account, `account/portfolio/history?${qs_1.default.stringify(params)}`);
    }
    getBars(params) {
        var transformed = {};
        // join the symbols into a comma-delimited string
        transformed = params;
        transformed['symbols'] = params.symbols.join(',');
        return this.request('GET', urls_js_1.default.rest.market_data, `bars/${params.timeframe}?${qs_1.default.stringify(params)}`);
    }
    getLastTrade(params) {
        return this.request('GET', urls_js_1.default.rest.market_data, `last/stocks/${params.symbol}`);
    }
    getLastQuote(params) {
        return this.request('GET', urls_js_1.default.rest.market_data, `last_quote/stocks/${params.symbol}`);
    }
    request(method, url, endpoint, data) {
        // modify the base url if paper is true
        if (this.options.paper && url == urls_js_1.default.rest.account) {
            url = urls_js_1.default.rest.account.replace('api.', 'paper-api.');
        }
        // convert any dates to ISO 8601 for Alpaca
        if (data) {
            for (let [key, value] of Object.entries(data)) {
                if (value instanceof Date) {
                    data[key] = value.toISOString();
                }
            }
        }
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (this.options.rate_limit) {
                yield new Promise((resolve) => this.limiter.removeTokens(1, resolve));
            }
            yield node_fetch_1.default(`${url}/${endpoint}`, {
                method: method,
                headers: {
                    'APCA-API-KEY-ID': this.options.credentials.key,
                    'APCA-API-SECRET-KEY': this.options.credentials.secret,
                },
                body: JSON.stringify(data),
            })
                // if json parse fails we default to an empty object
                .then((resp) => __awaiter(this, void 0, void 0, function* () { return (yield resp.json().catch(() => false)) || {}; }))
                .then((resp) => 'code' in resp && 'message' in resp ? reject(resp) : resolve(resp))
                .catch(reject);
        }));
    }
}
exports.AlpacaClient = AlpacaClient;
