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
const common_1 = require("./common");
class Client {
    constructor(options) {
        this.options = options;
        this.limiter = new limiter_1.RateLimiter(199, 'minute');
        this.pendingPromises = [];
        // if the alpaca key hasn't been provided, try env var
        if (!this.options.key) {
            this.options.key = process.env.APCA_API_KEY_ID;
        }
        // if the alpaca secret hasn't been provided, try env var
        if (!this.options.secret) {
            this.options.secret = process.env.APCA_API_SECRET_KEY;
        }
        // if url has been set as an env var, check if it's for paper
        if (process.env.APCA_PAPER && process.env.APCA_PAPER == 'true') {
            this.options.paper = true;
        }
    }
    async isAuthenticated() {
        return await this.getAccount()
            .then(() => true)
            .catch(() => false);
    }
    getAccount() {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, 'account');
    }
    getOrder(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `orders/${parameters.order_id || parameters.client_order_id}?${qs_1.default.stringify({
            nested: parameters.nested,
        })}`);
    }
    getOrders(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `orders?${qs_1.default.stringify(parameters)}`);
    }
    placeOrder(parameters) {
        let transaction = this.request(http_method_enum_1.default.POST, common_1.BaseURL.Account, `orders`, parameters).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    replaceOrder(parameters) {
        let transaction = this.request(http_method_enum_1.default.PATCH, common_1.BaseURL.Account, `orders/${parameters.order_id}`, parameters).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    cancelOrder(parameters) {
        let transaction = this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `orders/${parameters.order_id}`).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    cancelOrders() {
        let transaction = this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `orders`).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getPosition(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `positions/${parameters.symbol}`);
    }
    getPositions() {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `positions`);
    }
    closePosition(parameters) {
        let transaction = this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `positions/${parameters.symbol}`).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    closePositions() {
        let transaction = this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `positions`).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getAsset(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `assets/${parameters.asset_id_or_symbol}`);
    }
    getAssets(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `assets?${qs_1.default.stringify(parameters)}`);
    }
    getWatchlist(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`);
    }
    getWatchlists() {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `watchlists`);
    }
    createWatchlist(parameters) {
        let transaction = this.request(http_method_enum_1.default.POST, common_1.BaseURL.Account, `watchlists`, parameters).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    updateWatchlist(parameters) {
        let transaction = this.request(http_method_enum_1.default.PUT, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`, parameters).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    addToWatchlist(parameters) {
        let transaction = this.request(http_method_enum_1.default.POST, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`, parameters).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    removeFromWatchlist(parameters) {
        let transaction = this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `watchlists/${parameters.uuid}/${parameters.symbol}`).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    deleteWatchlist(parameters) {
        let transaction = this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getCalendar(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `calendar?${qs_1.default.stringify(parameters)}`);
    }
    getClock() {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `clock`);
    }
    getAccountConfigurations() {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `account/configurations`);
    }
    updateAccountConfigurations(parameters) {
        let transaction = this.request(http_method_enum_1.default.PATCH, common_1.BaseURL.Account, `account/configurations`, parameters).finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        });
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getAccountActivities(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `account/activities/${parameters.activity_type}?${qs_1.default.stringify(parameters)}`);
    }
    getPortfolioHistory(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `account/portfolio/history?${qs_1.default.stringify(parameters)}`);
    }
    getBars(parameters) {
        var transformed = {};
        // join the symbols into a comma-delimited string
        transformed = parameters;
        transformed['symbols'] = parameters.symbols.join(',');
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.MarketData, `bars/${parameters.timeframe}?${qs_1.default.stringify(parameters)}`);
    }
    getLastTrade(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.MarketData, `last/stocks/${parameters.symbol}`);
    }
    getLastQuote(parameters) {
        return this.request(http_method_enum_1.default.GET, common_1.BaseURL.MarketData, `last_quote/stocks/${parameters.symbol}`);
    }
    // allow all promises to complete
    async close() {
        return Promise.all(this.pendingPromises).then(() => { });
    }
    request(method, url, endpoint, data) {
        // modify the base url if paper is true
        if (this.options.paper && url == common_1.BaseURL.Account) {
            url = common_1.BaseURL.Account.replace('api.', 'paper-api.');
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
            if (this.options.rate_limit) {
                await new Promise((resolve) => this.limiter.removeTokens(1, resolve));
            }
            await node_fetch_1.default(`${url}/${endpoint}`, {
                method: method,
                headers: {
                    'APCA-API-KEY-ID': this.options.key,
                    'APCA-API-SECRET-KEY': this.options.secret,
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
