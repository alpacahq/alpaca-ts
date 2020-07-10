"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const http_method_enum_1 = __importDefault(require("http-method-enum"));
const qs_1 = __importDefault(require("qs"));
const limiter_1 = require("limiter");
const url_1 = require("./url");
class Client {
    constructor(params) {
        this.params = params;
        this.limiter = new limiter_1.RateLimiter(199, 'minute');
        // default undefined if not provided
        if (!('credentials' in params)) {
            params.credentials = { key: undefined, secret: undefined };
        }
        // if the alpaca key hasn't been provided, try env var
        if (!this.params.credentials.key) {
            this.params.credentials.key = process.env.APCA_API_KEY_ID;
        }
        // if the alpaca secret hasn't been provided, try env var
        if (!this.params.credentials.secret) {
            this.params.credentials.secret = process.env.APCA_API_SECRET_KEY;
        }
        // if url has been set as an env var, check if it's for paper
        if (process.env.APCA_PAPER && process.env.APCA_PAPER == 'true') {
            this.params.paper = true;
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
    getAccount() {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, 'account');
    }
    getOrder(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `orders/${params.order_id || params.client_order_id}?${qs_1.default.stringify({
            nested: params.nested,
        })}`);
    }
    getOrders(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `orders?${qs_1.default.stringify(params)}`);
    }
    placeOrder(params) {
        return this.request(http_method_enum_1.default.POST, url_1.URL.REST_ACCOUNT, `orders`, params);
    }
    replaceOrder(params) {
        return this.request(http_method_enum_1.default.PATCH, url_1.URL.REST_ACCOUNT, `orders/${params.order_id}`, params);
    }
    cancelOrder(params) {
        return this.request(http_method_enum_1.default.DELETE, url_1.URL.REST_ACCOUNT, `orders/${params.order_id}`);
    }
    cancelOrders() {
        return this.request(http_method_enum_1.default.DELETE, url_1.URL.REST_ACCOUNT, `orders`);
    }
    getPosition(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `positions/${params.symbol}`);
    }
    getPositions() {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `positions`);
    }
    closePosition(params) {
        return this.request(http_method_enum_1.default.DELETE, url_1.URL.REST_ACCOUNT, `positions/${params.symbol}`);
    }
    closePositions() {
        return this.request(http_method_enum_1.default.DELETE, url_1.URL.REST_ACCOUNT, `positions`);
    }
    getAsset(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `assets/${params.asset_id_or_symbol}`);
    }
    getAssets(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `assets?${qs_1.default.stringify(params)}`);
    }
    getWatchlist(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `watchlists/${params.uuid}`);
    }
    getWatchlists() {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `watchlists`);
    }
    createWatchlist(params) {
        return this.request(http_method_enum_1.default.POST, url_1.URL.REST_ACCOUNT, `watchlists`, params);
    }
    updateWatchlist(params) {
        return this.request(http_method_enum_1.default.PUT, url_1.URL.REST_ACCOUNT, `watchlists/${params.uuid}`, params);
    }
    addToWatchlist(params) {
        return this.request(http_method_enum_1.default.POST, url_1.URL.REST_ACCOUNT, `watchlists/${params.uuid}`, params);
    }
    removeFromWatchlist(params) {
        return this.request(http_method_enum_1.default.DELETE, url_1.URL.REST_ACCOUNT, `watchlists/${params.uuid}/${params.symbol}`);
    }
    deleteWatchlist(params) {
        return this.request(http_method_enum_1.default.DELETE, url_1.URL.REST_ACCOUNT, `watchlists/${params.uuid}`);
    }
    getCalendar(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `calendar?${qs_1.default.stringify(params)}`);
    }
    getClock() {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `clock`);
    }
    getAccountConfigurations() {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `account/configurations`);
    }
    updateAccountConfigurations(params) {
        return this.request(http_method_enum_1.default.PATCH, url_1.URL.REST_ACCOUNT, `account/configurations`, params);
    }
    getAccountActivities(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `account/activities/${params.activity_type}?${qs_1.default.stringify(params)}`);
    }
    getPortfolioHistory(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_ACCOUNT, `account/portfolio/history?${qs_1.default.stringify(params)}`);
    }
    getBars(params) {
        var transformed = {};
        // join the symbols into a comma-delimited string
        transformed = params;
        transformed['symbols'] = params.symbols.join(',');
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_MARKET_DATA, `bars/${params.timeframe}?${qs_1.default.stringify(params)}`);
    }
    getLastTrade(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_MARKET_DATA, `last/stocks/${params.symbol}`);
    }
    getLastQuote(params) {
        return this.request(http_method_enum_1.default.GET, url_1.URL.REST_MARKET_DATA, `last_quote/stocks/${params.symbol}`);
    }
    request(method, url, endpoint, data) {
        // modify the base url if paper is true
        if (this.params.paper && url == url_1.URL.REST_ACCOUNT) {
            url = url_1.URL.REST_ACCOUNT.replace('api.', 'paper-api.');
        }
        // convert any dates to ISO 8601 for Alpaca
        if (data) {
            for (let [key, value] of Object.entries(data)) {
                if (value instanceof Date) {
                    data[key] = value.toISOString();
                }
            }
        }
        return new Promise(async (resolve, reject) => {
            // do rate limiting
            if (this.params.rate_limit) {
                await new Promise((resolve) => this.limiter.removeTokens(1, resolve));
            }
            await node_fetch_1.default(`${url}/${endpoint}`, {
                method: method,
                headers: {
                    'APCA-API-KEY-ID': this.params.credentials.key,
                    'APCA-API-SECRET-KEY': this.params.credentials.secret,
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((response) => 
            // is it an alpaca error response?
            'code' in response && 'message' in response
                ? reject(response)
                : resolve(response))
                .catch(reject);
        });
    }
}
exports.Client = Client;
