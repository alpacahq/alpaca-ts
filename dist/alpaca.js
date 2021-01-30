/*! 
 * ALPACA library 4.0.0
 *
 * Released under the ISC license
 */

import Bottleneck from 'bottleneck';
import qs from 'qs';
import fetch from 'node-fetch';
import WebSocket from 'isomorphic-ws';
import EventEmitter from 'eventemitter3';

var urls = {
    rest: {
        account: 'https://api.alpaca.markets/v2',
        market_data: 'https://data.alpaca.markets/v1',
    },
    websocket: {
        account: 'wss://api.alpaca.markets/stream',
        account_paper: 'wss://paper-api.alpaca.markets/stream',
        market_data: 'wss://data.alpaca.markets/stream',
    },
};

function account(rawAccount) {
    if (!rawAccount) {
        return undefined;
    }
    try {
        return {
            ...rawAccount,
            raw: () => rawAccount,
            buying_power: number(rawAccount.buying_power),
            regt_buying_power: number(rawAccount.regt_buying_power),
            daytrading_buying_power: number(rawAccount.daytrading_buying_power),
            cash: number(rawAccount.cash),
            created_at: new Date(rawAccount.created_at),
            portfolio_value: number(rawAccount.portfolio_value),
            multiplier: number(rawAccount.multiplier),
            equity: number(rawAccount.equity),
            last_equity: number(rawAccount.last_equity),
            long_market_value: number(rawAccount.long_market_value),
            short_market_value: number(rawAccount.short_market_value),
            initial_margin: number(rawAccount.initial_margin),
            maintenance_margin: number(rawAccount.maintenance_margin),
            last_maintenance_margin: number(rawAccount.last_maintenance_margin),
            sma: number(rawAccount.sma),
            status: rawAccount.status,
        };
    }
    catch (err) {
        throw new Error(`Account parsing failed. ${err.message}`);
    }
}
function clock(rawClock) {
    if (!rawClock) {
        return undefined;
    }
    try {
        return {
            raw: () => rawClock,
            timestamp: new Date(rawClock.timestamp),
            is_open: rawClock.is_open,
            next_open: new Date(rawClock.next_open),
            next_close: new Date(rawClock.next_close),
        };
    }
    catch (err) {
        throw new Error(`Order parsing failed. ${err.message}`);
    }
}
function order(rawOrder) {
    if (!rawOrder) {
        return undefined;
    }
    try {
        return {
            ...rawOrder,
            raw: () => rawOrder,
            created_at: new Date(rawOrder.created_at),
            updated_at: new Date(rawOrder.updated_at),
            submitted_at: new Date(rawOrder.submitted_at),
            filled_at: new Date(rawOrder.filled_at),
            expired_at: new Date(rawOrder.expired_at),
            canceled_at: new Date(rawOrder.canceled_at),
            failed_at: new Date(rawOrder.failed_at),
            replaced_at: new Date(rawOrder.replaced_at),
            qty: number(rawOrder.qty),
            filled_qty: number(rawOrder.filled_qty),
            type: rawOrder.type,
            side: rawOrder.side,
            time_in_force: rawOrder.time_in_force,
            limit_price: number(rawOrder.limit_price),
            stop_price: number(rawOrder.stop_price),
            filled_avg_price: number(rawOrder.filled_avg_price),
            status: rawOrder.status,
            legs: orders(rawOrder.legs),
            trail_price: number(rawOrder.trail_price),
            trail_percent: number(rawOrder.trail_percent),
            hwm: number(rawOrder.hwm),
        };
    }
    catch (err) {
        throw new Error(`Order parsing failed. ${err.message}`);
    }
}
function orders(rawOrders) {
    return rawOrders ? rawOrders.map((value) => order(value)) : undefined;
}
function position(rawPosition) {
    if (!rawPosition) {
        return undefined;
    }
    try {
        return {
            ...rawPosition,
            raw: () => rawPosition,
            avg_entry_price: number(rawPosition.avg_entry_price),
            qty: number(rawPosition.qty),
            side: rawPosition.side,
            market_value: number(rawPosition.market_value),
            cost_basis: number(rawPosition.cost_basis),
            unrealized_pl: number(rawPosition.unrealized_pl),
            unrealized_plpc: number(rawPosition.unrealized_plpc),
            unrealized_intraday_pl: number(rawPosition.unrealized_intraday_pl),
            unrealized_intraday_plpc: number(rawPosition.unrealized_intraday_plpc),
            current_price: number(rawPosition.current_price),
            lastday_price: number(rawPosition.lastday_price),
            change_today: number(rawPosition.change_today),
        };
    }
    catch (err) {
        throw new Error(`Position parsing failed. ${err.message}`);
    }
}
function positions(rawPositions) {
    return rawPositions ? rawPositions.map((pos) => position(pos)) : undefined;
}
function tradeActivity(rawTradeActivity) {
    if (!rawTradeActivity) {
        return undefined;
    }
    try {
        return {
            ...rawTradeActivity,
            raw: () => rawTradeActivity,
            cum_qty: number(rawTradeActivity.cum_qty),
            leaves_qty: number(rawTradeActivity.leaves_qty),
            price: number(rawTradeActivity.price),
            qty: number(rawTradeActivity.qty),
            side: rawTradeActivity.side,
            type: rawTradeActivity.type,
        };
    }
    catch (err) {
        throw new Error(`TradeActivity parsing failed. ${err.message}`);
    }
}
function nonTradeActivity(rawNonTradeActivity) {
    if (!rawNonTradeActivity) {
        return undefined;
    }
    try {
        return {
            ...rawNonTradeActivity,
            raw: () => rawNonTradeActivity,
            net_amount: number(rawNonTradeActivity.net_amount),
            qty: number(rawNonTradeActivity.qty),
            per_share_amount: number(rawNonTradeActivity.per_share_amount),
        };
    }
    catch (err) {
        throw new Error(`NonTradeActivity parsing failed. ${err.message}`);
    }
}
function activities(rawActivities) {
    if (!rawActivities) {
        return undefined;
    }
    try {
        return rawActivities.map((rawActivity) => rawActivity.activity_type === 'FILL'
            ? tradeActivity(rawActivity)
            : nonTradeActivity(rawActivity));
    }
    catch (err) {
        throw new Error(`Activity parsing failed. ${err.message}`);
    }
}
function number(numStr) {
    if (typeof numStr === 'undefined')
        return numStr;
    return parseFloat(numStr);
}
var parse = {
    account,
    activities,
    clock,
    nonTradeActivity,
    order,
    orders,
    position,
    positions,
    tradeActivity,
};

class AlpacaClient {
    constructor(params) {
        this.params = params;
        this.limiter = new Bottleneck({
            reservoir: 200,
            reservoirRefreshAmount: 200,
            reservoirRefreshInterval: 60 * 1000,
            maxConcurrent: 1,
            minTime: 200,
        });
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
        return parse.account(await this.request('GET', urls.rest.account, 'account'));
    }
    async getOrder(params) {
        return parse.order(await this.request('GET', urls.rest.account, `orders/${params.order_id || params.client_order_id}?${qs.stringify({
            nested: params.nested,
        })}`));
    }
    async getOrders(params) {
        return parse.orders(await this.request('GET', urls.rest.account, `orders?${qs.stringify(params)}`));
    }
    async placeOrder(params) {
        return parse.order(await this.request('POST', urls.rest.account, `orders`, params));
    }
    async replaceOrder(params) {
        return parse.order(await this.request('PATCH', urls.rest.account, `orders/${params.order_id}`, params));
    }
    async cancelOrder(params) {
        return parse.order(await this.request('DELETE', urls.rest.account, `orders/${params.order_id}`));
    }
    async cancelOrders() {
        return parse.orders(await this.request('DELETE', urls.rest.account, `orders`));
    }
    async getPosition(params) {
        return parse.position(await this.request('GET', urls.rest.account, `positions/${params.symbol}`));
    }
    async getPositions() {
        return parse.positions(await this.request('GET', urls.rest.account, `positions`));
    }
    async closePosition(params) {
        return parse.order(await this.request('DELETE', urls.rest.account, `positions/${params.symbol}`));
    }
    async closePositions() {
        return parse.orders(await this.request('DELETE', urls.rest.account, `positions`));
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
        return parse.clock(await this.request('GET', urls.rest.account, `clock`));
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
        return parse.activities(await this.request('GET', urls.rest.account, `account/activities${params.activity_type ? '/'.concat(params.activity_type) : ''}?${qs.stringify(params)}`));
    }
    getPortfolioHistory(params) {
        return this.request('GET', urls.rest.account, `account/portfolio/history?${qs.stringify(params)}`);
    }
    getBars(params) {
        const transformed = {
            ...params,
            symbols: params.symbols.join(','),
        };
        return this.request('GET', urls.rest.market_data, `bars/${params.timeframe}?${qs.stringify(transformed)}`);
    }
    getLastTrade(params) {
        return this.request('GET', urls.rest.market_data, `last/stocks/${params.symbol}`);
    }
    getLastQuote(params) {
        return this.request('GET', urls.rest.market_data, `last_quote/stocks/${params.symbol}`);
    }
    request(method, url, endpoint, data) {
        let headers = {};
        if ('access_token' in this.params.credentials) {
            headers['Authorization'] = `Bearer ${this.params.credentials.access_token}`;
        }
        else {
            headers['APCA-API-KEY-ID'] = this.params.credentials.key;
            headers['APCA-API-SECRET-KEY'] = this.params.credentials.secret;
            if (this.params.credentials.key.startsWith('PK') &&
                url == urls.rest.account) {
                url = urls.rest.account.replace('api.', 'paper-api.');
            }
        }
        if (data) {
            for (let [key, value] of Object.entries(data)) {
                if (value instanceof Date) {
                    data[key] = value.toISOString();
                }
            }
        }
        return new Promise(async (resolve, reject) => {
            const makeCall = () => fetch(`${url}/${endpoint}`, {
                method: method,
                headers,
                body: JSON.stringify(data),
            });
            const func = this.params.rate_limit
                ? () => this.limiter.schedule(makeCall)
                : makeCall;
            await func()
                .then(async (resp) => (await resp.json().catch(() => false)) || {})
                .then((resp) => 'code' in resp && 'message' in resp ? reject(resp) : resolve(resp))
                .catch(reject);
        });
    }
}

class AlpacaStream extends EventEmitter {
    constructor(params) {
        super();
        this.params = params;
        this.subscriptions = [];
        this.authenticated = false;
        switch (params.stream) {
            case 'account':
                this.host = params.credentials.key.startsWith('PK')
                    ? urls.websocket.account_paper
                    : urls.websocket.account;
                break;
            case 'market_data':
                this.host = urls.websocket.market_data;
                break;
            default:
                this.host = 'unknown';
        }
        this.connection = new WebSocket(this.host)
            .once('open', () => {
            if (!this.authenticated) {
                this.connection.send(JSON.stringify({
                    action: 'authenticate',
                    data: {
                        key_id: params.credentials.key,
                        secret_key: params.credentials.secret,
                    },
                }));
            }
            this.emit('open', this);
        })
            .once('close', () => this.emit('close', this))
            .on('message', (message) => {
            const object = JSON.parse(message.toString());
            if ('stream' in object && object.stream == 'authorization') {
                if (object.data.status == 'authorized') {
                    this.authenticated = true;
                    this.emit('authenticated', this);
                    console.log('Connected to the websocket.');
                }
                else {
                    this.connection.close();
                    throw new Error('There was an error in authorizing your websocket connection. Object received: ' +
                        JSON.stringify(object, null, 2));
                }
            }
            this.emit('message', object);
            if ('stream' in object) {
                const x = {
                    trade_updates: 'trade_updates',
                    account_updates: 'account_updates',
                    T: 'trade',
                    Q: 'quote',
                    AM: 'aggregate_minute',
                };
                this.emit(x[object.stream.split('.')[0]], object.data);
            }
        })
            .on('error', (err) => this.emit('error', err));
    }
    send(message) {
        if (!this.authenticated) {
            throw new Error("You can't send a message until you are authenticated!");
        }
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        this.connection.send(message);
        return this;
    }
    subscribe(channels) {
        this.subscriptions.push(...channels);
        return this.send(JSON.stringify({
            action: 'listen',
            data: {
                streams: channels,
            },
        }));
    }
    unsubscribe(channels) {
        for (let i = 0, ln = this.subscriptions.length; i < ln; i++) {
            if (channels.includes(this.subscriptions[i])) {
                this.subscriptions.splice(i, 1);
            }
        }
        return this.send(JSON.stringify({
            action: 'unlisten',
            data: {
                streams: channels,
            },
        }));
    }
}

export { AlpacaClient, AlpacaStream };
//# sourceMappingURL=alpaca.js.map
