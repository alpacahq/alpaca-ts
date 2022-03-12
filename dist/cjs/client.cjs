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
            return parse_js_1.default.account(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.account}/account`,
            }));
        });
    }
    getOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.account}/orders/${params.order_id || params.client_order_id}`,
                data: { nested: params.nested },
            }));
        });
    }
    getOrders(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.orders(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.account}/orders`,
                data: Object.assign(Object.assign({}, params), { symbols: params.symbols ? params.symbols.join(',') : undefined }),
            }));
        });
    }
    placeOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request({
                method: 'POST',
                url: `${urls_js_1.default.rest.account}/orders`,
                data: params,
            }));
        });
    }
    replaceOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request({
                method: 'PATCH',
                url: `${urls_js_1.default.rest.account}/orders/${params.order_id}`,
                data: params,
            }));
        });
    }
    cancelOrder(params) {
        return this.request({
            method: 'DELETE',
            url: `${urls_js_1.default.rest.account}/orders/${params.order_id}`,
            isJSON: false,
        });
    }
    cancelOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.canceled_orders(yield this.request({
                method: 'DELETE',
                url: `${urls_js_1.default.rest.account}/orders`,
            }));
        });
    }
    getPosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.position(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.account}/positions/${params.symbol}`,
            }));
        });
    }
    getPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.positions(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.account}/positions`,
            }));
        });
    }
    closePosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.order(yield this.request({
                method: 'DELETE',
                url: `${urls_js_1.default.rest.account}/positions/${params.symbol}`,
                data: params,
            }));
        });
    }
    closePositions(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.orders(yield this.request({
                method: 'DELETE',
                url: `${urls_js_1.default.rest.account}/positions?cancel_orders=${JSON.stringify((_a = params.cancel_orders) !== null && _a !== void 0 ? _a : false)}`,
            }));
        });
    }
    getAsset(params) {
        return this.request({
            method: 'GET',
            url: `${urls_js_1.default.rest.account}/assets/${params.asset_id_or_symbol}`,
        });
    }
    getAssets(params) {
        return this.request({
            method: 'GET',
            url: `${urls_js_1.default.rest.account}/assets`,
            data: params,
        });
    }
    getWatchlist(params) {
        return this.request({
            method: 'GET',
            url: `${urls_js_1.default.rest.account}/watchlists/${params.uuid}`,
        });
    }
    getWatchlists() {
        return this.request({
            method: 'GET',
            url: `${urls_js_1.default.rest.account}/watchlists`,
        });
    }
    createWatchlist(params) {
        return this.request({
            method: 'POST',
            url: `${urls_js_1.default.rest.account}/watchlists`,
            data: params,
        });
    }
    updateWatchlist(params) {
        return this.request({
            method: 'PUT',
            url: `${urls_js_1.default.rest.account}/watchlists/${params.uuid}`,
            data: params,
        });
    }
    addToWatchlist(params) {
        return this.request({
            method: 'POST',
            url: `${urls_js_1.default.rest.account}/watchlists/${params.uuid}`,
            data: params,
        });
    }
    removeFromWatchlist(params) {
        return this.request({
            method: 'DELETE',
            url: `${urls_js_1.default.rest.account}/watchlists/${params.uuid}/${params.symbol}`,
        });
    }
    deleteWatchlist(params) {
        return this.request({
            method: 'DELETE',
            url: `${urls_js_1.default.rest.account}/watchlists/${params.uuid}`,
        });
    }
    getCalendar(params) {
        return this.request({
            method: 'GET',
            url: `${urls_js_1.default.rest.account}/calendar`,
            data: params,
        });
    }
    getClock() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.clock(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.account}/clock`,
            }));
        });
    }
    getAccountConfigurations() {
        return this.request({
            method: 'GET',
            url: `${urls_js_1.default.rest.account}/account/configurations`,
        });
    }
    updateAccountConfigurations(params) {
        return this.request({
            method: 'PATCH',
            url: `${urls_js_1.default.rest.account}/account/configurations`,
            data: params,
        });
    }
    getAccountActivities(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.activity_types && Array.isArray(params.activity_types)) {
                params.activity_types = params.activity_types.join(',');
            }
            return parse_js_1.default.activities(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.account}/account/activities${params.activity_type ? '/'.concat(params.activity_type) : ''}`,
                data: Object.assign(Object.assign({}, params), { activity_type: undefined }),
            }));
        });
    }
    getPortfolioHistory(params) {
        return this.request({
            method: 'GET',
            url: `${urls_js_1.default.rest.account}/account/portfolio/history`,
            data: params,
        });
    }
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    getBars_v1(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const transformed = Object.assign(Object.assign({}, params), { symbols: params.symbols.join(',') });
            return yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v1}/bars/${params.timeframe}`,
                data: transformed,
            });
        });
    }
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    getLastTrade_v1(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v1}/last/stocks/${params.symbol}`,
            });
        });
    }
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    getLastQuote_v1(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v1}/last_quote/stocks/${params.symbol}`,
            });
        });
    }
    getTrades(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.pageOfTrades(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v2}/stocks/${params.symbol}/trades`,
                data: Object.assign(Object.assign({}, params), { symbol: undefined }),
            }));
        });
    }
    getQuotes(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.pageOfQuotes(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v2}/stocks/${params.symbol}/quotes`,
                data: Object.assign(Object.assign({}, params), { symbol: undefined }),
            }));
        });
    }
    getBars(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.pageOfBars(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v2}/stocks/${params.symbol}/bars`,
                data: Object.assign(Object.assign({}, params), { symbol: undefined }),
            }));
        });
    }
    getSnapshot(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.snapshot(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v2}/stocks/${params.symbol}/snapshot`,
            }));
        });
    }
    getSnapshots(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse_js_1.default.snapshots(yield this.request({
                method: 'GET',
                url: `${urls_js_1.default.rest.market_data_v2}/stocks/snapshots?symbols=${params.symbols.join(',')}`,
            }));
        });
    }
    request(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {};
            if ('access_token' in this.params.credentials) {
                headers['Authorization'] = `Bearer ${this.params.credentials.access_token}`;
            }
            else {
                headers['APCA-API-KEY-ID'] = this.params.credentials.key;
                headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret;
            }
            if (this.params.credentials.paper) {
                params.url = params.url.replace('api.', 'paper-api.');
            }
            let query = '';
            if (params.data) {
                // translate dates to ISO strings
                for (let [key, value] of Object.entries(params.data)) {
                    if (value instanceof Date) {
                        params.data[key] = value.toISOString();
                    }
                }
                // build query
                if (!['POST', 'PATCH', 'PUT'].includes(params.method)) {
                    query = '?'.concat(qs_1.default.stringify(params.data));
                    params.data = undefined;
                }
            }
            const makeCall = () => unifetch(params.url.concat(query), {
                method: params.method,
                headers,
                body: JSON.stringify(params.data),
            }), func = this.params.rate_limit
                ? () => this.limiter.schedule(makeCall)
                : makeCall;
            let resp, result = {};
            try {
                resp = yield func();
                if (!(params.isJSON == undefined ? true : params.isJSON)) {
                    return resp.ok;
                }
                result = yield resp.json();
            }
            catch (e) {
                console.error(e);
                throw result;
            }
            if ('code' in result || 'message' in result) {
                throw result;
            }
            return result;
        });
    }
}
exports.AlpacaClient = AlpacaClient;
