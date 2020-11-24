"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AlpacaStream = void 0;
var ws_1 = __importDefault(require("ws"));
var urls_js_1 = __importDefault(require("./urls.cjs"));
var events_1 = require("events");
var AlpacaStream = /** @class */ (function (_super) {
    __extends(AlpacaStream, _super);
    function AlpacaStream(params) {
        var _this = 
        // construct EventEmitter
        _super.call(this) || this;
        _this.params = params;
        _this.subscriptions = [];
        _this.authenticated = false;
        // assign the host we will connect to
        switch (params.stream) {
            case 'account':
                _this.host = params.credentials.key.startsWith('PK')
                    ? urls_js_1["default"].websocket.account_paper
                    : urls_js_1["default"].websocket.account;
                break;
            case 'market_data':
                _this.host = urls_js_1["default"].websocket.market_data;
                break;
            default:
                _this.host = 'unknown';
        }
        _this.connection = new ws_1["default"](_this.host)
            .once('open', function () {
            // if we are not authenticated yet send a request now
            if (!_this.authenticated) {
                _this.connection.send(JSON.stringify({
                    action: 'authenticate',
                    data: {
                        key_id: params.credentials.key,
                        secret_key: params.credentials.secret
                    }
                }));
            }
            // pass the open
            _this.emit('open', _this);
        })
            // pass the close
            .once('close', function () { return _this.emit('close', _this); })
            .on('message', function (message) {
            // parse the incoming message
            var object = JSON.parse(message.toString());
            // if the message is an authorization response
            if ('stream' in object && object.stream == 'authorization') {
                if (object.data.status == 'authorized') {
                    _this.authenticated = true;
                    _this.emit('authenticated', _this);
                    console.log('Connected to the websocket.');
                }
                else {
                    _this.connection.close();
                    throw new Error('There was an error in authorizing your websocket connection. Object received: ' +
                        JSON.stringify(object, null, 2));
                }
            }
            // pass the message
            _this.emit('message', object);
            // emit based on the stream
            if ('stream' in object) {
                _this.emit({
                    trade_updates: 'trade_updates',
                    account_updates: 'account_updates',
                    T: 'trade',
                    Q: 'quote',
                    AM: 'aggregate_minute'
                }[object.stream.split('.')[0]], object.data);
            }
        })
            // pass the error
            .on('error', function (err) { return _this.emit('error', err); });
        return _this;
    }
    AlpacaStream.prototype.send = function (message) {
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
    };
    AlpacaStream.prototype.subscribe = function (channels) {
        var _a;
        // add these channels internally
        (_a = this.subscriptions).push.apply(_a, channels);
        // try to subscribe to them
        return this.send(JSON.stringify({
            action: 'listen',
            data: {
                streams: channels
            }
        }));
    };
    AlpacaStream.prototype.unsubscribe = function (channels) {
        // remove these channels internally
        for (var i = 0, ln = this.subscriptions.length; i < ln; i++) {
            if (channels.includes(this.subscriptions[i])) {
                this.subscriptions.splice(i, 1);
            }
        }
        // try to unsubscribe from them
        return this.send(JSON.stringify({
            action: 'unlisten',
            data: {
                streams: channels
            }
        }));
    };
    return AlpacaStream;
}(events_1.EventEmitter));
exports.AlpacaStream = AlpacaStream;
