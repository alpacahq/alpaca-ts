"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
    isAuthenticated() {
        return new Promise((resolve) => this.getAccount()
            .then(() => resolve(true))
            .catch(() => resolve(false)));
    }
    getAccount() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, 'account')
            .then(resolve)
            .catch(reject));
    }
    getOrder(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `orders/${parameters.order_id || parameters.client_order_id}?${qs_1.default.stringify({
            nested: parameters.nested,
        })}`)
            .then(resolve)
            .catch(reject));
    }
    getOrders(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `orders?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    placeOrder(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.POST, common_1.BaseURL.Account, `orders`, parameters)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    replaceOrder(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.PATCH, common_1.BaseURL.Account, `orders/${parameters.order_id}`, parameters)
            .then(resolve)
            .catch(reject));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    cancelOrder(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `orders/${parameters.order_id}`)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    cancelOrders() {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `orders`)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getPosition(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `positions/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    getPositions() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `positions`)
            .then(resolve)
            .catch(reject));
    }
    closePosition(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `positions/${parameters.symbol}`)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    closePositions() {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `positions`)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getAsset(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `assets/${parameters.asset_id_or_symbol}`)
            .then(resolve)
            .catch(reject));
    }
    getAssets(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `assets?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getWatchlist(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`)
            .then(resolve)
            .catch(reject));
    }
    getWatchlists() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `watchlists`)
            .then(resolve)
            .catch(reject));
    }
    createWatchlist(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.POST, common_1.BaseURL.Account, `watchlists`, parameters)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    updateWatchlist(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.PUT, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`, parameters)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    addToWatchlist(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.POST, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`, parameters)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    removeFromWatchlist(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `watchlists/${parameters.uuid}/${parameters.symbol}`)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    deleteWatchlist(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.BaseURL.Account, `watchlists/${parameters.uuid}`)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getCalendar(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `calendar?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getClock() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `clock`)
            .then(resolve)
            .catch(reject));
    }
    getAccountConfigurations() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `account/configurations`)
            .then(resolve)
            .catch(reject));
    }
    updateAccountConfigurations(parameters) {
        let transaction = new Promise((resolve, reject) => this.request(http_method_enum_1.default.PATCH, common_1.BaseURL.Account, `account/configurations`, parameters)
            .then(resolve)
            .catch(reject)
            .finally(() => {
            this.pendingPromises = this.pendingPromises.filter((p) => p !== transaction);
        }));
        this.pendingPromises.push(transaction);
        return transaction;
    }
    getAccountActivities(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `account/activities/${parameters.activity_type}?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getPortfolioHistory(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.Account, `account/portfolio/history?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getBars(parameters) {
        var transformed = {};
        // join the symbols into a comma-delimited string
        transformed = parameters;
        transformed['symbols'] = parameters.symbols.join(',');
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.MarketData, `bars/${parameters.timeframe}?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getLastTrade(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.MarketData, `last/stocks/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    getLastQuote(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.BaseURL.MarketData, `last_quote/stocks/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    // allow all promises to complete
    async close() {
        return await Promise.all(this.pendingPromises).then(() => { });
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
                .then((response) => {
                // is it an alpaca error response?
                if ('code' in response && 'message' in response) {
                    reject(response);
                }
                else {
                    resolve(response);
                }
            })
                .catch(reject);
        });
    }
}
exports.Client = Client;
