"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpacaStream = void 0;
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const eventemitter3_1 = __importDefault(require("eventemitter3"));
const urls_js_1 = __importDefault(require("./urls.cjs"));
class AlpacaStream extends eventemitter3_1.default {
    constructor(params) {
        // construct EventEmitter
        super();
        this.params = params;
        if (
        // if not specified
        !('paper' in params.credentials) &&
            // and live key isn't already provided
            !('key' in params.credentials && params.credentials.key.startsWith('A'))) {
            params.credentials['paper'] = true;
        }
        // assign the host we will connect to
        switch (params.type) {
            case 'account':
                this.host = params.credentials.paper
                    ? urls_js_1.default.websocket.account.replace('api.', 'paper-api.')
                    : urls_js_1.default.websocket.account;
                break;
            case 'market_data':
                this.host = urls_js_1.default.websocket.market_data(this.params.source);
                break;
            default:
                this.host = 'unknown';
        }
        this.connection = new isomorphic_ws_1.default(this.host);
        this.connection.onopen = () => {
            let message = {};
            switch (this.params.type) {
                case 'account':
                    message = {
                        action: 'authenticate',
                        data: {
                            key_id: params.credentials.key,
                            secret_key: params.credentials.secret,
                        },
                    };
                    break;
                case 'market_data':
                    // {"action":"auth","key":"PK*****","secret":"*************"}
                    message = Object.assign({ action: 'auth' }, params.credentials);
                    break;
            }
            this.connection.send(JSON.stringify(message));
            // pass through
            this.emit('open', this);
        };
        // pass through
        this.connection.onclose = () => this.emit('close', this);
        this.connection.onmessage = (event) => {
            let parsed = JSON.parse(event.data), messages = this.params.type == 'account' ? [parsed] : parsed;
            messages.forEach((message) => {
                // pass the message
                this.emit('message', message);
                // pass authenticated event
                if ('T' in message && message.msg == 'authenticated') {
                    this.authenticated = true;
                    this.emit('authenticated', this);
                }
                else if ('stream' in message && message.stream == 'authorization') {
                    if (message.data.status == 'authorized') {
                        this.authenticated = true;
                        this.emit('authenticated', this);
                    }
                }
                // pass trade_updates event
                if ('stream' in message && message.stream == 'trade_updates') {
                    this.emit('trade_updates', message.data);
                }
                // pass trade, quote, bar event
                const x = {
                    success: 'success',
                    subscription: 'subscription',
                    error: 'error',
                    t: 'trade',
                    q: 'quote',
                    b: 'bar',
                };
                if ('T' in message) {
                    this.emit(x[message.T.split('.')[0]], message);
                }
            });
        };
        // pass the error
        this.connection.onerror = (err) => {
            this.emit('error', err);
        };
    }
    /**
     * Subscribe to an account or data stream channel.
     * @param channel trades, quotes, bars, trade_updates
     * @param symbols only use with data stream ex. [ "AAPL", "TSLA", ... ]
     */
    subscribe(channel, symbols = []) {
        switch (this.params.type) {
            case 'account':
                // {"action":"listen","data":{"streams":["trade_updates"]}}
                this.send(JSON.stringify({ action: 'listen', data: { streams: [channel] } }));
                break;
            case 'market_data':
                // {"action":"subscribe","trades":["AAPL"],"quotes":["AMD","CLDR"],"bars":["AAPL","VOO"]}
                let message = { action: 'subscribe' };
                message[channel] = symbols;
                this.send(JSON.stringify(message));
                break;
        }
        return this;
    }
    /**
     * Unsubscribe to an account or data stream channel.
     * @param channel trades, quotes, bars, trade_updates
     * @param symbols only use with data stream ex. [ "AAPL", "TSLA", ... ]
     */
    unsubscribe(channel, symbols = []) {
        switch (this.params.type) {
            case 'account':
                // {"action":"unlisten","data":{"streams":["trade_updates"]}}
                this.send(JSON.stringify({ action: 'unlisten', data: { streams: [channel] } }));
                break;
            case 'market_data':
                // {"action":"unsubscribe","trades":["AAPL"],"quotes":["AMD","CLDR"],"bars":["AAPL","VOO"]}
                let message = { action: 'unsubscribe' };
                message[channel] = symbols;
                this.send(JSON.stringify(message));
                break;
        }
        return this;
    }
    send(message) {
        // don't bother if we aren't authenticated
        if (!this.authenticated) {
            throw new Error('not authenticated');
        }
        // if the message is in object form, stringify it for the user
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        // send it off
        this.connection.send(message);
        // chainable return
        return this;
    }
}
exports.AlpacaStream = AlpacaStream;
