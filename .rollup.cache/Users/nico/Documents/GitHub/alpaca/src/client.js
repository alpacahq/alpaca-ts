import { __awaiter } from "tslib";
import qs from 'qs';
import parse from './parse.js';
import isofetch from 'isomorphic-unfetch';
import endpoints from './endpoints.js';
import Bottleneck from 'bottleneck';
const unifetch = typeof fetch !== 'undefined' ? fetch : isofetch;
export class AlpacaClient {
    constructor(params) {
        this.params = params;
        this.baseURLs = endpoints;
        this.limiter = new Bottleneck({
            reservoir: 200,
            reservoirRefreshAmount: 200,
            reservoirRefreshInterval: 60 * 1000,
            maxConcurrent: 1,
            minTime: 200,
        });
        if ('endpoints' in params) {
            this.baseURLs = Object.assign(endpoints, params.endpoints);
        }
        if (!('paper' in params.credentials) &&
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
            return parse.account(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.account}/account`,
            }));
        });
    }
    getOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.order(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.account}/orders/${params.order_id || params.client_order_id}`,
                data: { nested: params.nested },
            }));
        });
    }
    getOrders(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.orders(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.account}/orders`,
                data: Object.assign(Object.assign({}, params), { symbols: params.symbols ? params.symbols.join(',') : undefined }),
            }));
        });
    }
    placeOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.order(yield this.request({
                method: 'POST',
                url: `${this.baseURLs.rest.account}/orders`,
                data: params,
            }));
        });
    }
    replaceOrder(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.order(yield this.request({
                method: 'PATCH',
                url: `${this.baseURLs.rest.account}/orders/${params.order_id}`,
                data: params,
            }));
        });
    }
    cancelOrder(params) {
        return this.request({
            method: 'DELETE',
            url: `${this.baseURLs.rest.account}/orders/${params.order_id}`,
            isJSON: false,
        });
    }
    cancelOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.canceled_orders(yield this.request({
                method: 'DELETE',
                url: `${this.baseURLs.rest.account}/orders`,
            }));
        });
    }
    getPosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.position(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.account}/positions/${params.symbol}`,
            }));
        });
    }
    getPositions() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.positions(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.account}/positions`,
            }));
        });
    }
    closePosition(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.order(yield this.request({
                method: 'DELETE',
                url: `${this.baseURLs.rest.account}/positions/${params.symbol}`,
                data: params,
            }));
        });
    }
    closePositions(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return parse.orders(yield this.request({
                method: 'DELETE',
                url: `${this.baseURLs.rest.account}/positions?cancel_orders=${JSON.stringify((_a = params.cancel_orders) !== null && _a !== void 0 ? _a : false)}`,
            }));
        });
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
        if ('symbols' in params && Array.isArray(params.symbols)) {
            params.symbols = params.symbols.join(',');
        }
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.beta}/news`,
            data: params,
        });
    }
    getClock() {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.clock(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.account}/clock`,
            }));
        });
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
    getAccountActivities(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.activity_types && Array.isArray(params.activity_types)) {
                params.activity_types = params.activity_types.join(',');
            }
            return parse.activities(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.account}/account/activities${params.activity_type ? '/'.concat(params.activity_type) : ''}`,
                data: Object.assign(Object.assign({}, params), { activity_type: undefined }),
            }));
        });
    }
    getPortfolioHistory(params) {
        return this.request({
            method: 'GET',
            url: `${this.baseURLs.rest.account}/account/portfolio/history`,
            data: params,
        });
    }
    getBars_v1(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const transformed = Object.assign(Object.assign({}, params), { symbols: params.symbols.join(',') });
            return yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v1}/bars/${params.timeframe}`,
                data: transformed,
            });
        });
    }
    getLastTrade_v1(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v1}/last/stocks/${params.symbol}`,
            });
        });
    }
    getLastQuote_v1(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v1}/last_quote/stocks/${params.symbol}`,
            });
        });
    }
    getTrades(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.pageOfTrades(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/trades`,
                data: Object.assign(Object.assign({}, params), { symbol: undefined }),
            }));
        });
    }
    getQuotes(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.pageOfQuotes(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/quotes`,
                data: Object.assign(Object.assign({}, params), { symbol: undefined }),
            }));
        });
    }
    getBars(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.pageOfBars(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/bars`,
                data: Object.assign(Object.assign({}, params), { symbol: undefined }),
            }));
        });
    }
    getLatestTrade({ symbol, feed, limit, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = '';
            if (feed || limit) {
                query = '?'.concat(qs.stringify({ feed, limit }));
            }
            return parse.latestTrade(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v2}/stocks/${symbol}/trades/latest`.concat(query),
            }));
        });
    }
    getSnapshot(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.snapshot(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v2}/stocks/${params.symbol}/snapshot`,
            }));
        });
    }
    getSnapshots(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return parse.snapshots(yield this.request({
                method: 'GET',
                url: `${this.baseURLs.rest.market_data_v2}/stocks/snapshots?symbols=${params.symbols.join(',')}`,
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
                for (let [key, value] of Object.entries(params.data)) {
                    if (value instanceof Date) {
                        params.data[key] = value.toISOString();
                    }
                }
                if (!['POST', 'PATCH', 'PUT'].includes(params.method)) {
                    query = '?'.concat(qs.stringify(params.data));
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
//# sourceMappingURL=client.js.map