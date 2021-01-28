/// <reference types="node" />
import { EventEmitter } from 'events';
import { AccountUpdate, AggregateMinute, DefaultCredentials, Quote, Trade, TradeUpdate } from './entities.js';
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
    trade: (data: Trade) => void;
    trade_updates: (data: TradeUpdate) => void;
    account_updates: (data: AccountUpdate) => void;
    quote: (data: Quote) => void;
    aggregate_minute: (data: AggregateMinute) => void;
}
export declare class AlpacaStream extends EventEmitter {
    protected params: {
        credentials: DefaultCredentials;
        stream: 'account' | 'market_data';
    };
    private host;
    private connection;
    private subscriptions;
    private authenticated;
    constructor(params: {
        credentials: DefaultCredentials;
        stream: 'account' | 'market_data';
    });
    send(message: any): this;
    subscribe(channels: string[]): this;
    unsubscribe(channels: string[]): this;
}
