/// <reference types="node" />
import WebSocket from 'ws';
import { EventEmitter } from "events";
import { Client } from './client';
export declare interface StreamEvents {
    /**
     * Emitted when the websocket finally connects. (Authentication message is automatically sent)
     */
    open: (connection: Stream) => void;
    /**
     * When the websocket closes, intentionally or unintentionally
     */
    close: (connection: Stream) => void;
    /**
     * Emitted on successful authentication
     */
    authenticated: (connection: Stream) => void;
    /**
     * Emitted for any error
     */
    error: (error: Error) => void;
    /**
     * Emitted for all messages
    */
    message: (data: Object) => void;
    /**
     * I'm to lazy to do these/don't know what they are for.
     */
    trade: (data: Object) => void;
    trade_updates: (data: Object) => void;
    account_updates: (data: Object) => void;
    quote: (data: Object) => void;
    aggregate_minute: (data: Object) => void;
}
export declare interface Stream {
    on<U extends keyof StreamEvents>(event: U, listener: StreamEvents[U]): this;
    emit<U extends keyof StreamEvents>(event: U, ...args: Parameters<StreamEvents[U]>): boolean;
}
export declare class Stream extends EventEmitter {
    private client;
    options: {
        host: string;
        verbose?: boolean;
    };
    subscriptions: string[];
    connection: WebSocket;
    authenticated: boolean;
    constructor(client: Client, options: {
        host: string;
        verbose?: boolean;
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
