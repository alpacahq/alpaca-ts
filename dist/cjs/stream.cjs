"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpacaStream = void 0;
const isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
const urls_js_1 = __importDefault(require("./urls.cjs"));
const eventemitter3_1 = __importDefault(require("eventemitter3"));
class AlpacaStream extends eventemitter3_1.default {
    constructor(params) {
        // construct EventEmitter
        super();
        this.params = params;
        this.subscriptions = [];
        this.authenticated = false;
        // assign the host we will connect to
        switch (params.stream) {
            case 'account':
                this.host = params.credentials.key.startsWith('PK')
                    ? urls_js_1.default.websocket.account_paper
                    : urls_js_1.default.websocket.account;
                break;
            case 'market_data':
                this.host = urls_js_1.default.websocket.market_data;
                break;
            default:
                this.host = 'unknown';
        }
        this.connection = new isomorphic_ws_1.default(this.host);
        this.connection.onopen = () => {
            // if we are not authenticated yet send a request now
            if (!this.authenticated) {
                this.connection.send(JSON.stringify({
                    action: 'authenticate',
                    data: {
                        key_id: params.credentials.key,
                        secret_key: params.credentials.secret,
                    },
                }));
            }
            // pass the open
            this.emit('open', this);
        };
        // pass the close
        this.connection.onclose = () => this.emit('close', this);
        this.connection.onmessage = (message) => {
            // parse the incoming message
            const object = JSON.parse(message.data);
            // if the message is an authorization response
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
            // pass the message
            this.emit('message', object);
            // emit based on the stream
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
        };
        // pass the error
        this.connection.onerror = (err) => {
            this.emit('error', err);
        };
    }
    on(event, listener) {
        return super.on(event, listener);
    }
    send(message) {
        // don't bother if we aren't authenticated yet
        if (!this.authenticated) {
            throw new Error("You can't send a message until you are authenticated!");
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
    subscribe(channels) {
        // add these channels internally
        this.subscriptions.push(...channels);
        // try to subscribe to them
        return this.send(JSON.stringify({
            action: 'listen',
            data: {
                streams: channels,
            },
        }));
    }
    unsubscribe(channels) {
        // remove these channels internally
        for (let i = 0, ln = this.subscriptions.length; i < ln; i++) {
            if (channels.includes(this.subscriptions[i])) {
                this.subscriptions.splice(i, 1);
            }
        }
        // try to unsubscribe from them
        return this.send(JSON.stringify({
            action: 'unlisten',
            data: {
                streams: channels,
            },
        }));
    }
}
exports.AlpacaStream = AlpacaStream;
