/// <reference types="node" />
import { EventEmitter } from 'events';
import { Credentials } from './entities.js';
export declare interface AlpacaStream {
    on<U extends keyof AlpacaStreamEvents>(event: U, listener: AlpacaStreamEvents[U]): this;
    emit<U extends keyof AlpacaStreamEvents>(event: U, ...args: Parameters<AlpacaStreamEvents[U]>): boolean;
}
export declare interface AlpacaStreamEvents {
    open: (connection: AlpacaStream) => void;
    close: (connection: AlpacaStream) => void;
    authenticated: (connection: AlpacaStream) => void;
    error: (error: Error) => void;
    message: (data: Object) => void;
    trade: (data: Object) => void;
    trade_updates: (data: Object) => void;
    account_updates: (data: Object) => void;
    quote: (data: Object) => void;
    aggregate_minute: (data: Object) => void;
}
export declare class AlpacaStream extends EventEmitter {
    protected params: {
        credentials: Credentials;
        stream: 'account' | 'market_data';
    };
    private host;
    private connection;
    private subscriptions;
    private authenticated;
    constructor(params: {
        credentials: Credentials;
        stream: 'account' | 'market_data';
    });
    send(message: any): this;
    subscribe(channels: string[]): this;
    unsubscribe(channels: string[]): this;
}
