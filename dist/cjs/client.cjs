"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpacaClient = void 0;
const qs_1 = __importDefault(require("qs"));
const parse_js_1 = __importDefault(require("./parse.cjs"));
const isomorphic_unfetch_1 = __importDefault(require("isomorphic-unfetch"));
const endpoints_js_1 = __importDefault(require("./endpoints.cjs"));
const bottleneck_1 = __importDefault(require("bottleneck"));
const unifetch = typeof fetch !== 'undefined' ? fetch : isomorphic_unfetch_1.default;
class AlpacaClient {
    constructor(params) {
        this.params = params;
        this.baseURLs = endpoints_js_1.default;
        this.limiter = new bottleneck_1.default({
            reservoir: 200,
            reservoirRefreshAmount: 200,
            reservoirRefreshInterval: 60 * 1000,
            // also use maxConcurrent and/or minTime for safety
            maxConcurrent: 1,
            minTime: 200,
        });
        // override endpoints if custom provided
        if ('endpoints' in params) {
            this.baseURLs = Object.assign(endpoints_js_1.default, params.endpoints);
        }
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
    async isAuthenticated() {
        try {
            await this.getAccount();
            return true;
        }
        catch {
            return false;
        }
    }
    async getAccount() {
        return parse_js_1.default.account(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/account`,
        }));
    }
    async getOrder(params) {
        return parse_js_1.default.order(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/orders/${params.order_id || params.client_order_id}`,
            data: { nested: params.nested },
        }));
    }
    async getOrders(params = {}) {
        return parse_js_1.default.orders(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/orders`,
            data: {
                ...params,
                symbols: params.symbols ? params.symbols.join(',') : undefined,
            },
        }));
    }
    async placeOrder(params) {
        return parse_js_1.default.order(await this.request({
            method: 'POST',
            url: `${this.baseURLs.rest.account}/orders`,
            data: params,
        }));
    }
    async replaceOrder(params) {
        return parse_js_1.default.order(await this.request({
            method: 'PATCH',
            url: `${this.baseURLs.rest.account}/orders/${params.order_id}`,
            data: params,
        }));
    }
    cancelOrder(params) {
        return this.request({
            method: 'DELETE',
            url: `${this.baseURLs.rest.account}/orders/${params.order_id}`,
            isJSON: false,
        });
    }
    async cancelOrders() {
        return parse_js_1.default.canceled_orders(await this.request({
            method: 'DELETE',
            url: `${this.baseURLs.rest.account}/orders`,
        }));
    }
    async getPosition(params) {
        return parse_js_1.default.position(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/positions/${params.symbol}`,
        }));
    }
    async getPositions() {
        return parse_js_1.default.positions(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/positions`,
        }));
    }
    async closePosition(params) {
        return parse_js_1.default.order(await this.request({
            method: 'DELETE',
            url: `${this.baseURLs.rest.account}/positions/${params.symbol}`,
            data: params,
        }));
    }
    async closePositions(params) {
        return parse_js_1.default.orders(await this.request({
            method: 'DELETE',
            url: `${this.baseURLs.rest.account}/positions?cancel_orders=${JSON.stringify(params.cancel_orders ?? false)}`,
        }));
    }
    getAsset(params) {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/assets/${params.asset_id_or_symbol}`,
        });
    }
    getAssets(params) {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/assets`,
            data: params,
        });
    }
    getWatchlist(params) {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
        });
    }
    getWatchlists() {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/watchlists`,
        });
    }
    createWatchlist(params) {
        return this.request({
            method: 'POST',
            url: `${this.baseURLs.rest.account}/watchlists`,
            data: params,
        });
    }
    updateWatchlist(params) {
        return this.request({
            method: 'PUT',
            url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
            data: params,
        });
    }
    addToWatchlist(params) {
        return this.request({
            method: 'POST',
            url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
            data: params,
        });
    }
    removeFromWatchlist(params) {
        return this.request({
            method: 'DELETE',
            url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}/${params.symbol}`,
        });
    }
    deleteWatchlist(params) {
        return this.request({
            method: 'DELETE',
            url: `${this.baseURLs.rest.account}/watchlists/${params.uuid}`,
        });
    }
    getCalendar(params) {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/calendar`,
            data: params,
        });
    }
    getNews(params) {
        // transform symbols if necessary
        if ('symbols' in params && Array.isArray(params.symbols)) {
            params.symbols = params.symbols.join(',');
        }
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.beta}/news`,
            data: params,
        });
    }
    async getClock() {
        return parse_js_1.default.clock(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/clock`,
        }));
    }
    getAccountConfigurations() {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/account/configurations`,
        });
    }
    updateAccountConfigurations(params) {
        return this.request({
            method: 'PATCH',
            url: `${this.baseURLs.rest.account}/account/configurations`,
            data: params,
        });
    }
    async getAccountActivities(params) {
        if (params.activity_types && Array.isArray(params.activity_types)) {
            params.activity_types = params.activity_types.join(',');
        }
        return parse_js_1.default.activities(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/account/activities${params.activity_type ? '/'.concat(params.activity_type) : ''}`,
            data: { ...params, activity_type: undefined },
        }));
    }
    getPortfolioHistory(params) {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/account/portfolio/history`,
            data: params,
        });
    }
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    async getBars_v1(params) {
        const transformed = {
            ...params,
            symbols: params.symbols.join(','),
        };
        return await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v1}/bars/${params.timeframe}`,
            data: transformed,
        });
    }
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    async getLastTrade_v1(params) {
        return await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v1}/last/stocks/${params.symbol}`,
        });
    }
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    async getLastQuote_v1(params) {
        return await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v1}/last_quote/stocks/${params.symbol}`,
        });
    }
    async getTrades(params) {
        return parse_js_1.default.pageOfTrades(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/trades`,
            data: { ...params, symbol: undefined },
        }));
    }
    async getQuotes(params) {
        return parse_js_1.default.pageOfQuotes(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/quotes`,
            data: { ...params, symbol: undefined },
        }));
    }
    async getBars(params) {
        return parse_js_1.default.pageOfBars(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/bars`,
            data: { ...params, symbol: undefined },
        }));
    }
    async getLatestTrade({ symbol, feed, limit, }) {
        let query = '';
        if (feed || limit) {
            query = '?'.concat(qs_1.default.stringify({ feed, limit }));
        }
        return parse_js_1.default.latestTrade(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v2}/stocks/${symbol}/trades/latest`.concat(query),
        }));
    }
    async getSnapshot(params) {
        return parse_js_1.default.snapshot(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/snapshot`,
        }));
    }
    async getSnapshots(params) {
        return parse_js_1.default.snapshots(await this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.market_data_v2}/stocks/snapshots?symbols=${params.symbols.join(',')}`,
        }));
    }
    async request(params) {
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
            resp = await func();
            if (!(params.isJSON == undefined ? true : params.isJSON)) {
                return resp.ok;
            }
            result = await resp.json();
        }
        catch (e) {
            console.error(e);
            throw result;
        }
        if ('code' in result || 'message' in result) {
            throw result;
        }
        return result;
    }
}
exports.AlpacaClient = AlpacaClient;
