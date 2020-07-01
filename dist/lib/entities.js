"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketState;
(function (WebSocketState) {
    WebSocketState["NOT_CONNECTED"] = "not_connected";
    WebSocketState["PENDING_AUTHORIZATION"] = "pending_authorization";
    WebSocketState["CONNECTED"] = "connected";
    WebSocketState["CLOSED_PENDING_RECONNECT"] = "closed_pending_reconnect";
    WebSocketState["CLOSED_NO_RECONNECT"] = "closed_no_reconnect";
    WebSocketState["CLOSED"] = "closed";
})(WebSocketState = exports.WebSocketState || (exports.WebSocketState = {}));
