import { Client } from './client';
import { Message, TradeUpdate, AccountUpdate, AggregateMinute, Quote, Trade } from './entities';
export declare class Stream {
    private client;
    options: {
        host: string;
        reconnect?: boolean;
        reconnectWarmupInSeconds?: number;
        verbose?: boolean;
    };
    private __connection;
    private __state;
    private __message_queue;
    private __subscriptions;
    private __on_message;
    private __on_trade;
    private __on_quote;
    private __on_aggregate_minute;
    private __on_account_update;
    private __on_trade_update;
    constructor(client: Client, options: {
        host: string;
        reconnect?: boolean;
        reconnectWarmupInSeconds?: number;
        verbose?: boolean;
    });
    send(message: any): void;
    subscribe(channels: string[]): void;
    unsubscribe(channels: string[]): void;
    onTrade(callback: (event: Trade) => void): void;
    onQuote(callback: (event: Quote) => void): void;
    onAggregateMinute(callback: (event: AggregateMinute) => void): void;
    onTradeUpdate(callback: (event: TradeUpdate) => void): void;
    onAccountUpdate(callback: (event: AccountUpdate) => void): void;
    onMessage(callback: (message: Message) => void): void;
}
