/// <reference types="ws" />
import WebSocket from 'isomorphic-ws';
import EventEmitter from 'eventemitter3';
import { Bar, Channel, DataSource, DefaultCredentials, Quote, Trade, TradeUpdate, Message, Endpoints } from './entities.js';
export declare interface Events {
    open: (stream: AlpacaStream) => void;
    close: (stream: AlpacaStream) => void;
    authenticated: (stream: AlpacaStream) => void;
    success: (message: Message) => void;
    error: (message: WebSocket.ErrorEvent) => void;
    subscription: (message: Message) => void;
    message: (message: Object) => void;
    trade_updates: (update: TradeUpdate) => void;
    trade: (trade: Trade) => void;
    quote: (quote: Quote) => void;
    bar: (bar: Bar) => void;
}
export declare interface AlpacaStream {
    on<U extends keyof Events>(event: U, listener: Events[U]): this;
    once<U extends keyof Events>(event: U, listener: Events[U]): this;
    emit<U extends keyof Events>(event: U, ...args: Parameters<Events[U]>): boolean;
}
export declare class AlpacaStream extends EventEmitter<string | symbol | any> {
    protected params: {
        credentials: DefaultCredentials;
        type: 'account' | 'market_data';
        source?: DataSource;
        endpoints?: Endpoints | Map<keyof Endpoints, any>;
    };
    private host;
    private connection;
    private authenticated;
    private baseURLs;
    constructor(params: {
        credentials: DefaultCredentials;
        type: 'account' | 'market_data';
        source?: DataSource;
        endpoints?: Endpoints | Map<keyof Endpoints, any>;
    });
    /**
     * Retrieve the underlying WebSocket connection AlpacaStream uses.
     * Now callers can read and modify properties of the web socket
     * i.e., close the websocket with AlpacaStream.getConnection().close().
     * @returns a WebSocket object
     */
    getConnection(): WebSocket;
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
