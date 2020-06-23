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
    private connection;
    private state;
    private messageQueue;
    private subscriptions;
    private _onMessage;
    private _onTrade;
    private _onQuote;
    private _onAggregateMinute;
    private _onAccountUpdate;
    private _onTradeUpdate;
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
