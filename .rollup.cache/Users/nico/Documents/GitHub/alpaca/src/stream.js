import { __awaiter } from "tslib";
import isBlob from 'is-blob';
import parse from './parse.js';
import WebSocket from 'isomorphic-ws';
import endpoints from './endpoints.js';
import EventEmitter from 'eventemitter3';
export class AlpacaStream extends EventEmitter {
    constructor(params) {
        super();
        this.params = params;
        this.baseURLs = endpoints;
        if ('endpoints' in params) {
            this.baseURLs = Object.assign(endpoints, params.endpoints);
        }
        if (!('paper' in params.credentials) &&
            !('key' in params.credentials && params.credentials.key.startsWith('A'))) {
            params.credentials['paper'] = true;
        }
        switch (params.type) {
            case 'account':
                this.host = params.credentials.paper
                    ? this.baseURLs.websocket.account.replace('api.', 'paper-api.')
                    : this.baseURLs.websocket.account;
                break;
            case 'market_data':
                this.host = this.baseURLs.websocket.market_data(this.params.source);
                break;
            default:
                this.host = 'unknown';
        }
        this.connection = new WebSocket(this.host);
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
                    message = Object.assign({ action: 'auth' }, params.credentials);
                    break;
            }
            this.connection.send(JSON.stringify(message));
            this.emit('open', this);
        };
        this.connection.onclose = () => this.emit('close', this);
        this.connection.onmessage = (event) => __awaiter(this, void 0, void 0, function* () {
            let data = event.data;
            if (isBlob(data)) {
                data = yield event.data.text();
            }
            else if (data instanceof ArrayBuffer) {
                data = String.fromCharCode(...new Uint8Array(event.data));
            }
            let parsed = JSON.parse(data), messages = this.params.type == 'account' ? [parsed] : parsed;
            messages.forEach((message) => {
                this.emit('message', message);
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
                if ('stream' in message && message.stream == 'trade_updates') {
                    this.emit('trade_updates', parse.trade_update(message.data));
                }
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
        });
        this.connection.onerror = (err) => {
            this.emit('error', err);
        };
    }
    getConnection() {
        return this.connection;
    }
    subscribe(channel, symbols = []) {
        switch (this.params.type) {
            case 'account':
                this.send(JSON.stringify({ action: 'listen', data: { streams: [channel] } }));
                break;
            case 'market_data':
                let message = { action: 'subscribe' };
                message[channel] = symbols;
                this.send(JSON.stringify(message));
                break;
        }
        return this;
    }
    unsubscribe(channel, symbols = []) {
        switch (this.params.type) {
            case 'account':
                this.send(JSON.stringify({ action: 'unlisten', data: { streams: [channel] } }));
                break;
            case 'market_data':
                let message = { action: 'unsubscribe' };
                message[channel] = symbols;
                this.send(JSON.stringify(message));
                break;
        }
        return this;
    }
    send(message) {
        if (!this.authenticated) {
            throw new Error('not authenticated');
        }
        if (typeof message == 'object') {
            message = JSON.stringify(message);
        }
        this.connection.send(message);
        return this;
    }
}
//# sourceMappingURL=stream.js.map