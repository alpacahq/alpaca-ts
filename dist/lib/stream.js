"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const entities_1 = require("./entities");
class Stream {
    constructor(client, options) {
        this.client = client;
        this.options = options;
        this.state = entities_1.WebSocketState.NOT_CONNECTED;
        this.messageQueue = [];
        this.subscriptions = [];
        this._onMessage = () => null;
        this._onTrade = () => null;
        this._onQuote = () => null;
        this._onAggregateMinute = () => null;
        this._onAccountUpdate = () => null;
        this._onTradeUpdate = () => null;
        // bind our provided options to the defaults
        this.options = Object.bind({
            host: options.host,
            reconnect: true,
            // did not write a back-off strategy because 30 seconds has always worked well for me
            reconnectWarmupInSeconds: 30,
            verbose: true,
        }, options);
        // connection management task
        setInterval(async () => {
            // if pending a reconnection
            if (this.state == entities_1.WebSocketState.CLOSED_PENDING_RECONNECT) {
                // warmup so we don't hit any rate limit
                // todo: add a back-off strategy with increasing delay
                await new Promise((resolve) => setTimeout(resolve, options.reconnectWarmupInSeconds * 1e3));
            }
            // do nothing, no reconnect was specified
            if (this.state == entities_1.WebSocketState.CLOSED_NO_RECONNECT) {
                return;
            }
            // we don't bother if there is nothing in the message queue
            if (!this.messageQueue.length) {
                return;
            }
            // if we haven't made a connection, create one now
            if (!this.connection) {
                this.connection = new ws_1.default(options.host);
                this.connection.once('open', () => (this.state = entities_1.WebSocketState.PENDING_AUTHORIZATION));
                // handle a close by terminating the connection
                this.connection.once('close', () => {
                    // if no reconnect is specified, we use a special state
                    if (!options.reconnect) {
                        this.state = entities_1.WebSocketState.CLOSED_NO_RECONNECT;
                    }
                    // we are now waiting for the next chance to reconnect
                    this.state = entities_1.WebSocketState.CLOSED_PENDING_RECONNECT;
                    // undefine the connection so it will be re-made on the next tick
                    this.connection = undefined;
                });
                // listen to incoming messages
                this.connection.on('message', (message) => {
                    const object = JSON.parse(message.toString());
                    // if the state is pending auth and this is an auth message, change the state
                    if (this.state == entities_1.WebSocketState.PENDING_AUTHORIZATION) {
                        // < {"stream":"authorization","data":{"action":"authenticate","status":"authorized"}}
                        if ('stream' in object && object['stream'] == 'authorization') {
                            if (object['data']['status'] == 'authorized') {
                                // all good :D
                                this.state = entities_1.WebSocketState.CONNECTED;
                            }
                            else {
                                // decide how to handle failed authorizations? idk yet
                            }
                        }
                    }
                    // callback regardless of whether or not we acted on the message above
                    this._onMessage(object);
                    // call any of the convenience methods that apply to this message
                    if ('stream' in object) {
                        switch (object['stream'].split('.')[0]) {
                            case 'trade_updates':
                                this._onTradeUpdate(object['data']);
                                break;
                            case 'account_updates':
                                this._onAccountUpdate(object['data']);
                                break;
                            case 'T':
                                this._onTrade(object['data']);
                                break;
                            case 'Q':
                                this._onQuote(object['data']);
                                break;
                            case 'AM':
                                this._onAggregateMinute(object['data']);
                                break;
                        }
                    }
                });
                // for now handle errors by just sending them to the callback
                // in the future we may need a strategy here
                this.connection.once('error', () => this._onMessage);
            }
            // depending on the state, perform different actions
            switch (this.state) {
                case entities_1.WebSocketState.PENDING_AUTHORIZATION:
                    // here we attempt to authenticate
                    this.connection.send(JSON.stringify({
                        action: 'authenticate',
                        data: {
                            key_id: client.options.key,
                            secret_key: client.options.secret,
                        },
                    }));
                    break;
                case entities_1.WebSocketState.CONNECTED:
                    // we are connected and authenticated at this point
                    // attempt to clear the message queue
                    for (var i = 0; i < this.messageQueue.length; i++) {
                        this.connection.send(this.messageQueue.shift());
                    }
                    break;
            }
        }, 1000);
    }
    send(message) {
        // convert it to a string if it's an object
        if (!(message instanceof String)) {
            message = JSON.stringify(message);
        }
        // queue the message
        this.messageQueue.push(message);
    }
    subscribe(channels) {
        this.subscriptions.push(...channels);
        this.send({
            action: 'listen',
            data: {
                streams: channels,
            },
        });
    }
    unsubscribe(channels) {
        // remove these channels
        this.subscriptions = this.subscriptions.filter((channel) => !channels.includes(channel));
        // send the removal
        this.send({
            action: 'unlisten',
            data: {
                streams: channels,
            },
        });
    }
    onTrade(callback) {
        this._onTrade = callback;
    }
    onQuote(callback) {
        this._onQuote = callback;
    }
    onAggregateMinute(callback) {
        this._onAggregateMinute = callback;
    }
    onTradeUpdate(callback) {
        this._onTradeUpdate = callback;
    }
    onAccountUpdate(callback) {
        this._onAccountUpdate = callback;
    }
    onMessage(callback) {
        this._onMessage = callback;
    }
}
exports.Stream = Stream;
