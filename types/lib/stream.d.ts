/// <reference types="node" />
import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { URL } from './url';
export declare interface Stream {
    on<U extends keyof StreamEvents>(event: U, listener: StreamEvents[U]): this;
    emit<U extends keyof StreamEvents>(event: U, ...args: Parameters<StreamEvents[U]>): boolean;
}
export declare interface StreamEvents {
    open: (connection: Stream) => void;
    close: (connection: Stream) => void;
    authenticated: (connection: Stream) => void;
    error: (error: Error) => void;
    message: (data: Object) => void;
    trade: (data: Object) => void;
    trade_updates: (data: Object) => void;
    account_updates: (data: Object) => void;
    quote: (data: Object) => void;
    aggregate_minute: (data: Object) => void;
}
export declare class Stream extends EventEmitter {
    protected params?: {
        credentials: {
            key: string;
            secret: string;
        };
        host: URL;
    };
    subscriptions: string[];
    connection: WebSocket;
    authenticated: boolean;
    constructor(params?: {
        credentials: {
            key: string;
            secret: string;
        };
        host: URL;
    });
    /**
     * Sends a message to the connected websocket.
     * @param message The message itself
     */
    send(message: any): this;
    /**
     * Subscribes to channels
     * @param channels The channels you want to subscribe to
     */
    subscribe(channels: string[]): this;
    /**
     * Unsubscribes from given channels
     * @param channels The channels you want to unsubscribe from
     */
    unsubscribe(channels: string[]): this;
}
