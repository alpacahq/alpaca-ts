import fetch from 'node-fetch';
import qs from 'qs';
import limiter from 'limiter';
import urls from './urls.js';
export class Client {
    constructor(options) {
        this.options = options;
        this.limiter = new limiter.RateLimiter(199, 'minute');
    }
    async isAuthenticated() {
        try {
            await this.getAccount();
            return true;
        }
        catch {
            throw new Error('not authenticated');
        }
    }
    getAccount() {
        return this.request('GET', urls.rest.account, 'account');
    }
    getOrder(params) {
        return this.request('GET', urls.rest.account, `orders/${params.order_id || params.client_order_id}?${qs.stringify({
            nested: params.nested,
        })}`);
    }
    getOrders(params) {
        return this.request('GET', urls.rest.account, `orders?${qs.stringify(params)}`);
    }
    placeOrder(params) {
        return this.request('POST', urls.rest.account, `orders`, params);
    }
    replaceOrder(params) {
        return this.request('PATCH', urls.rest.account, `orders/${params.order_id}`, params);
    }
    cancelOrder(params) {
        return this.request('DELETE', urls.rest.account, `orders/${params.order_id}`);
    }
    cancelOrders() {
        return this.request('DELETE', urls.rest.account, `orders`);
    }
    getPosition(params) {
        return this.request('GET', urls.rest.account, `positions/${params.symbol}`);
    }
    getPositions() {
        return this.request('GET', urls.rest.account, `positions`);
    }
    closePosition(params) {
        return this.request('DELETE', urls.rest.account, `positions/${params.symbol}`);
    }
    closePositions() {
        return this.request('DELETE', urls.rest.account, `positions`);
    }
    getAsset(params) {
        return this.request('GET', urls.rest.account, `assets/${params.asset_id_or_symbol}`);
    }
    getAssets(params) {
        return this.request('GET', urls.rest.account, `assets?${qs.stringify(params)}`);
    }
    getWatchlist(params) {
        return this.request('GET', urls.rest.account, `watchlists/${params.uuid}`);
    }
    getWatchlists() {
        return this.request('GET', urls.rest.account, `watchlists`);
    }
    createWatchlist(params) {
        return this.request('POST', urls.rest.account, `watchlists`, params);
    }
    updateWatchlist(params) {
        return this.request('PUT', urls.rest.account, `watchlists/${params.uuid}`, params);
    }
    addToWatchlist(params) {
        return this.request('POST', urls.rest.account, `watchlists/${params.uuid}`, params);
    }
    removeFromWatchlist(params) {
        return this.request('DELETE', urls.rest.account, `watchlists/${params.uuid}/${params.symbol}`);
    }
    deleteWatchlist(params) {
        return this.request('DELETE', urls.rest.account, `watchlists/${params.uuid}`);
    }
    getCalendar(params) {
        return this.request('GET', urls.rest.account, `calendar?${qs.stringify(params)}`);
    }
    getClock() {
        return this.request('GET', urls.rest.account, `clock`);
    }
    getAccountConfigurations() {
        return this.request('GET', urls.rest.account, `account/configurations`);
    }
    updateAccountConfigurations(params) {
        return this.request('PATCH', urls.rest.account, `account/configurations`, params);
    }
    getAccountActivities(params) {
        return this.request('GET', urls.rest.account, `account/activities/${params.activity_type}?${qs.stringify(params)}`);
    }
    getPortfolioHistory(params) {
        return this.request('GET', urls.rest.account, `account/portfolio/history?${qs.stringify(params)}`);
    }
    getBars(params) {
        var transformed = {};
        // join the symbols into a comma-delimited string
        transformed = params;
        transformed['symbols'] = params.symbols.join(',');
        return this.request('GET', urls.rest.market_data, `bars/${params.timeframe}?${qs.stringify(params)}`);
    }
    getLastTrade(params) {
        return this.request('GET', urls.rest.market_data, `last/stocks/${params.symbol}`);
    }
    getLastQuote(params) {
        return this.request('GET', urls.rest.market_data, `last_quote/stocks/${params.symbol}`);
    }
    request(method, url, endpoint, data) {
        // modify the base url if paper is true
        if (this.options.paper && url == urls.rest.account) {
            url = urls.rest.account.replace('api.', 'paper-api.');
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
            await fetch(`${url}/${endpoint}`, {
                method: method,
                headers: {
                    'APCA-API-KEY-ID': this.options.credentials.key,
                    'APCA-API-SECRET-KEY': this.options.credentials.secret,
                },
                body: data ? JSON.stringify(data) : undefined,
            })
                .then(
            // if json parse fails we default to an empty object
            async (response) => (await response.json().catch(() => false)) || {})
                .then((json) => 'code' in json && 'message' in json ? reject(json) : resolve(json))
                .catch(reject);
        });
    }
}
