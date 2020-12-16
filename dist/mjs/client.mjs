import qs from 'qs';
import fetch from 'node-fetch';
import urls from './urls.mjs';
import limiter from 'limiter';
import { Parser } from './parser.mjs';
export class AlpacaClient {
    constructor(options) {
        this.options = options;
        this.limiter = new limiter.RateLimiter(200, 'minute');
        this.parser = new Parser();
        if (this.options.credentials && this.options.oauth)
            throw new Error('Attempted to create AlpacaClient with both standard and oauth credentials');
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
        return this.parser.parseAccount(await this.request('GET', urls.rest.account, 'account'));
    }
    async getOrder(params) {
        return this.parser.parseOrder(await this.request('GET', urls.rest.account, `orders/${params.order_id || params.client_order_id}?${qs.stringify({
            nested: params.nested,
        })}`));
    }
    async getOrders(params) {
        return this.parser.parseOrders(await this.request('GET', urls.rest.account, `orders?${qs.stringify(params)}`));
    }
    async placeOrder(params) {
        return this.parser.parseOrder(await this.request('POST', urls.rest.account, `orders`, params));
    }
    async replaceOrder(params) {
        return this.parser.parseOrder(await this.request('PATCH', urls.rest.account, `orders/${params.order_id}`, params));
    }
    async cancelOrder(params) {
        return this.parser.parseOrder(await this.request('DELETE', urls.rest.account, `orders/${params.order_id}`));
    }
    async cancelOrders() {
        return this.parser.parseOrders(await this.request('DELETE', urls.rest.account, `orders`));
    }
    async getPosition(params) {
        return this.parser.parsePosition(await this.request('GET', urls.rest.account, `positions/${params.symbol}`));
    }
    async getPositions() {
        return this.parser.parsePositions(await this.request('GET', urls.rest.account, `positions`));
    }
    async closePosition(params) {
        return this.parser.parseOrder(await this.request('DELETE', urls.rest.account, `positions/${params.symbol}`));
    }
    async closePositions() {
        return this.parser.parseOrders(await this.request('DELETE', urls.rest.account, `positions`));
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
    async getClock() {
        return this.parser.parseClock(await this.request('GET', urls.rest.account, `clock`));
    }
    getAccountConfigurations() {
        return this.request('GET', urls.rest.account, `account/configurations`);
    }
    updateAccountConfigurations(params) {
        return this.request('PATCH', urls.rest.account, `account/configurations`, params);
    }
    async getAccountActivities(params) {
        if (params.activity_types && Array.isArray(params.activity_types)) {
            params.activity_types = params.activity_types.join(',');
        }
        return this.parser.parseActivities(await this.request('GET', urls.rest.account, `account/activities${params.activity_type ? '/'.concat(params.activity_type) : ''}?${qs.stringify(params)}`));
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
        let headers = {}, isOauth = Boolean(this.options.oauth);
        if (isOauth) {
            headers['Authorization'] = `Bearer ${this.options.oauth.client_id}`;
            url == urls.rest.account;
        }
        else {
            headers['APCA-API-KEY-ID'] = this.options.credentials.key;
            headers['APCA-API-SECRET-KEY'] = this.options.credentials.secret;
            if (this.options.credentials.key.startsWith('PK') &&
                url == urls.rest.account) {
                url = urls.rest.account.replace('api.', 'paper-api.');
            }
        }
        // modify the base url if paper key
        // convert any dates to ISO 8601 for Alpaca
        if (data) {
            for (let [key, value] of Object.entries(data)) {
                if (value instanceof Date) {
                    data[key] = value.toISOString();
                }
            }
        }
        return new Promise(async (resolve, reject) => {
            if (this.options.rate_limit) {
                await new Promise((resolve) => this.limiter.removeTokens(1, resolve));
            }
            await fetch(`${url}/${endpoint}`, {
                method: method,
                headers,
                body: JSON.stringify(data),
            })
                // if json parse fails we default to an empty object
                .then(async (resp) => (await resp.json().catch(() => false)) || {})
                .then((resp) => 'code' in resp && 'message' in resp ? reject(resp) : resolve(resp))
                .catch(reject);
        });
    }
}
