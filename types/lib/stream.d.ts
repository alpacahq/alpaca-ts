/// <reference types="node" />
import { EventEmitter } from 'events';
import { Credentials } from './entities';
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
