/// <reference types="ws" />
import WebSocket from 'isomorphic-ws';
import EventEmitter from 'eventemitter3';
import { Bar, Channel, DataSource, DefaultCredentials, Quote, Trade, TradeUpdate, Message } from './entities.js';
export declare interface Events {
    open: (connection: AlpacaStream) => void;
    close: (connection: AlpacaStream) => void;
    authenticated: (connection: AlpacaStream) => void;
    success: (message: Message) => void;
    error: (message: WebSocket.ErrorEvent | Message) => void;
    subscription: (message: Message) => void;
    message: (data: Object) => void;
    trade_updates: (data: TradeUpdate) => void;
    trade: (data: Trade) => void;
    quote: (data: Quote) => void;
    bar: (data: Bar) => void;
}
export declare class AlpacaStream extends EventEmitter {
    protected params: {
        credentials: DefaultCredentials;
        type: 'account' | 'market_data';
        source?: DataSource;
    };
    private host;
    private connection;
    private authenticated;
    constructor(params: {
        credentials: DefaultCredentials;
        type: 'account' | 'market_data';
        source?: DataSource;
    });
    /**
     * Subscribe to an account or data stream channel.
     * @param channel trades, quotes, bars, trade_updates
     * @param symbols only use with data stream ex. [ "AAPL", "TSLA", ... ]
     */
    subscribe(channel: Channel, symbols?: string[]): this;
    /**
     * Unsubscribe to an account or data stream channel.
     * @param channel trades, quotes, bars, trade_updates
     * @param symbols only use with data stream ex. [ "AAPL", "TSLA", ... ]
     */
    unsubscribe(channel: Channel, symbols?: string[]): this;
    private send;
}
