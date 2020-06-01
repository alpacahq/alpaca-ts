"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const http_method_enum_1 = __importDefault(require("http-method-enum"));
const qs_1 = __importDefault(require("qs"));
const common_1 = require("./common");
class Client {
    constructor(options) {
        this.options = options;
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
    getAccount() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, 'account')
            .then(resolve)
            .catch(reject));
    }
    getOrder(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `orders/${parameters.order_id || parameters.client_order_id}?${qs_1.default.stringify({
            nested: parameters.nested,
        })}`)
            .then(resolve)
            .catch(reject));
    }
    getOrders(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `orders?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    placeOrder(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.POST, common_1.URL.Account, `orders`, parameters)
            .then(resolve)
            .catch(reject));
    }
    replaceOrder(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.PATCH, common_1.URL.Account, `orders/${parameters.order_id}`, parameters)
            .then(resolve)
            .catch(reject));
    }
    cancelOrder(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.URL.Account, `orders/${parameters.order_id}`)
            .then(resolve)
            .catch(reject));
    }
    cancelOrders() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.URL.Account, `orders`)
            .then(resolve)
            .catch(reject));
    }
    getPosition(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `positions/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    getPositions() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `positions`)
            .then(resolve)
            .catch(reject));
    }
    closePosition(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.URL.Account, `positions/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    closePositions() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.URL.Account, `positions`)
            .then(resolve)
            .catch(reject));
    }
    getAsset(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `assets/${parameters.asset_id_or_symbol}`)
            .then(resolve)
            .catch(reject));
    }
    getAssets(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `assets?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getWatchlist(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `watchlists/${parameters.watchlist_id}`)
            .then(resolve)
            .catch(reject));
    }
    getWatchlists() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `watchlists`)
            .then(resolve)
            .catch(reject));
    }
    createWatchlist(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.POST, common_1.URL.Account, `watchlists`, parameters)
            .then(resolve)
            .catch(reject));
    }
    updateWatchlist(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.PUT, common_1.URL.Account, `watchlists/${parameters.watchlist_id}`, parameters)
            .then(resolve)
            .catch(reject));
    }
    addToWatchlist(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.POST, common_1.URL.Account, `watchlists/${parameters.watchlist_id}`, parameters)
            .then(resolve)
            .catch(reject));
    }
    removeFromWatchlist(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.URL.Account, `watchlists/${parameters.watchlist_id}/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    deleteWatchlist(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.DELETE, common_1.URL.Account, `watchlists/${parameters.watchlist_id}`)
            .then(resolve)
            .catch(reject));
    }
    getCalendar(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `calendar?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getClock() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `clock`).then(resolve).catch(reject));
    }
    getAccountConfigurations() {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `account/configurations`)
            .then(resolve)
            .catch(reject));
    }
    updateAccountConfigurations(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.PATCH, common_1.URL.Account, `account/configurations`, parameters)
            .then(resolve)
            .catch(reject));
    }
    getAccountActivities(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `account/activities/${parameters.activity_type}?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getPortfolioHistory(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.Account, `account/portfolio/history?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getBars(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.MarketData, `bars/${parameters.timeframe}?${qs_1.default.stringify(parameters)}`)
            .then(resolve)
            .catch(reject));
    }
    getLastTrade(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.MarketData, `last/stocks/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    getLastQuote(parameters) {
        return new Promise((resolve, reject) => this.request(http_method_enum_1.default.GET, common_1.URL.MarketData, `last_quote/stocks/${parameters.symbol}`)
            .then(resolve)
            .catch(reject));
    }
    request(method, url, endpoint, data) {
        // modify the base url if paper is true
        if (this.options.paper && url == common_1.URL.Account) {
            url = common_1.URL.Account.replace('api.', 'paper-api.');
        }
        return new Promise(async (resolve, reject) => {
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
