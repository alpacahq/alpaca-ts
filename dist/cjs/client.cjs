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
const bottleneck_1 = __importDefault(require("bottleneck"));
const qs_1 = __importDefault(require("qs"));
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
const urls_js_1 = __importDefault(require("./urls.cjs"));
const parse_js_1 = __importDefault(require("./parse.cjs"));
const unifetch = typeof fetch !== 'undefined' ? fetch : isomorphic_unfetch_1.default;
class AlpacaClient {
    constructor(params) {
        this.params = params;
        this.limiter = new bottleneck_1.default({
            reservoir: 200,
            reservoirRefreshAmount: 200,
            reservoirRefreshInterval: 60 * 1000,
            // also use maxConcurrent and/or minTime for safety
            maxConcurrent: 1,
            minTime: 200,
        });
        if (
        // if not specified
        !('paper' in params.credentials) &&
            // and live key isn't already provided
            !('key' in params.credentials && params.credentials.key.startsWith('A'))) {
            params.credentials['paper'] = true;
        }
        if ('access_token' in params.credentials &&
            ('key' in params.credentials || 'secret' in params.credentials)) {
            throw new Error("can't create client with both default and oauth credentials");
        }
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
            return parse_js_1.default.account(yield this.request('GET', urls_js_1.default.rest.account, 'account'));
        });
    }
    getOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request('GET', urls_js_1.default.rest.account, `orders/${params.order_id || params.client_order_id}`, undefined, { nested: params.nested }));
        });
    }
    getOrders(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.orders(yield this.request('GET', urls_js_1.default.rest.account, `orders`, undefined, params));
        });
    }
    placeOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request('POST', urls_js_1.default.rest.account, `orders`, params));
        });
    }
    replaceOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request('PATCH', urls_js_1.default.rest.account, `orders/${params.order_id}`, params));
        });
    }
    cancelOrder(params) {
        return this.request('DELETE', urls_js_1.default.rest.account, `orders/${params.order_id}`, undefined, undefined, false);
    }
    cancelOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.canceled_orders(yield this.request('DELETE', urls_js_1.default.rest.account, `orders`));
        });
    }
    getPosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.position(yield this.request('GET', urls_js_1.default.rest.account, `positions/${params.symbol}`));
        });
    }
    getPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.positions(yield this.request('GET', urls_js_1.default.rest.account, `positions`));
        });
    }
    closePosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request('DELETE', urls_js_1.default.rest.account, `positions/${params.symbol}`));
        });
    }
    closePositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.orders(yield this.request('DELETE', urls_js_1.default.rest.account, `positions`));
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
        return this.request('DELETE', urls_js_1.default.rest.account, `watchlists/${params.uuid}/${params.symbol}`, undefined, undefined, false);
    }
    deleteWatchlist(params) {
        return this.request('DELETE', urls_js_1.default.rest.account, `watchlists/${params.uuid}`, undefined, undefined, false);
    }
    getCalendar(params) {
        return this.request('GET', urls_js_1.default.rest.account, `calendar`, undefined, params);
    }
    getClock() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.clock(yield this.request('GET', urls_js_1.default.rest.account, `clock`));
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
            if (params.activity_types && Array.isArray(params.activity_types)) {
                params.activity_types = params.activity_types.join(',');
            }
            return parse_js_1.default.activities(yield this.request('GET', urls_js_1.default.rest.account, `account/activities${params.activity_type ? '/'.concat(params.activity_type) : ''}`, undefined, params));
        });
    }
    getPortfolioHistory(params) {
        return this.request('GET', urls_js_1.default.rest.account, `account/portfolio/history`, undefined, params);
    }
    getTrades(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.pageOfTrades(yield this.request('GET', urls_js_1.default.rest.market_data, `stocks/${params.symbol}/trades`, undefined, params));
        });
    }
    getQuotes(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.pageOfQuotes(yield this.request('GET', urls_js_1.default.rest.market_data, `stocks/${params.symbol}/quotes`, undefined, params));
        });
    }
    getBars(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.pageOfBars(yield this.request('GET', urls_js_1.default.rest.market_data, `stocks/${params.symbol}/bars`, undefined, params));
        });
    }
    request(method, url, endpoint, body, query, isJson = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {};
            if ('access_token' in this.params.credentials) {
                headers['Authorization'] = `Bearer ${this.params.credentials.access_token}`;
                url == urls_js_1.default.rest.account;
            }
            else {
                headers['APCA-API-KEY-ID'] = this.params.credentials.key;
                headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret;
                if (this.params.credentials.paper && url == urls_js_1.default.rest.account) {
                    url = urls_js_1.default.rest.account.replace('api.', 'paper-api.');
                }
            }
            if (query) {
                // translate dates to ISO strings
                for (let [key, value] of Object.entries(query)) {
                    if (value instanceof Date) {
                        query[key] = value.toISOString();
                    }
                }
            }
            const makeCall = () => unifetch(`${url}/${endpoint}${query ? '?'.concat(qs_1.default.stringify(query)) : ''}`, {
                method: method,
                headers,
                body: JSON.stringify(body),
            });
            const func = this.params.rate_limit
                ? () => this.limiter.schedule(makeCall)
                : makeCall;
            let resp;
            let result = {};
            try {
                resp = yield func();
                if (!isJson)
                    return resp.ok;
                result = yield resp.json();
            }
            catch (e) {
                console.error(e);
                throw result;
            }
            if ('code' in result || 'message' in result)
                throw result;
            return result;
        });
    }
}
exports.AlpacaClient = AlpacaClient;
