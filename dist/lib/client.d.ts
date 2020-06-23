import { Account, Order, Position, Asset, Watchlist, Calendar, Clock, AccountConfigurations, TradeActivity, NonTradeActivity, PortfolioHistory, Bar, LastTradeResponse, LastQuoteResponse } from './entities';
export declare class Client {
    options?: {
        key?: string;
        secret?: string;
        paper?: boolean;
        rate_limit?: boolean;
    };
    private limiter;
    private pendingPromises;
    constructor(options?: {
        key?: string;
        secret?: string;
        paper?: boolean;
        rate_limit?: boolean;
    });
    getAccount(): Promise<Account>;
    getOrder(parameters: {
        order_id?: string;
        client_order_id?: string;
        nested?: boolean;
    }): Promise<Order>;
    getOrders(parameters?: {
        status?: string;
        limit?: number;
        after?: Date;
        until?: Date;
        direction?: string;
        nested?: boolean;
    }): Promise<Order[]>;
    placeOrder(parameters: {
        symbol: string;
        qty: number;
        side: 'buy' | 'sell';
        type: 'market' | 'limit' | 'stop' | 'stop_limit';
        time_in_force: 'day' | 'gtc' | 'opg' | 'cls' | 'ioc' | 'fok';
        limit_price?: number;
        stop_price?: number;
        extended_hours?: boolean;
        client_order_id?: string;
        order_class?: 'simple' | 'bracket' | 'oco' | 'oto';
        take_profit?: {
            limit_price: number;
        };
        stop_loss?: {
            stop_price: number;
            limit_price?: number;
        };
    }): Promise<Order>;
    replaceOrder(parameters: {
        order_id: string;
        qty?: number;
        time_in_force?: string;
        limit_price?: number;
        stop_price?: number;
        client_order_id?: string;
    }): Promise<Order>;
    cancelOrder(parameters: {
        order_id: string;
    }): Promise<Order>;
    cancelOrders(): Promise<Order[]>;
    getPosition(parameters: {
        symbol: string;
    }): Promise<Position>;
    getPositions(): Promise<Position[]>;
    closePosition(parameters: {
        symbol: string;
    }): Promise<Order>;
    closePositions(): Promise<Order[]>;
    getAsset(parameters: {
        asset_id_or_symbol: string;
    }): Promise<Asset>;
    getAssets(parameters?: {
        status?: 'active' | 'inactive';
        asset_class?: string;
    }): Promise<Asset[]>;
    getWatchlist(parameters: {
        uuid: string;
    }): Promise<Watchlist>;
    getWatchlists(): Promise<Watchlist[]>;
    createWatchlist(parameters: {
        name: string;
        symbols?: string[];
    }): Promise<Watchlist[]>;
    updateWatchlist(parameters: {
        uuid: string;
        name?: string;
        symbols?: string[];
    }): Promise<Watchlist>;
    addToWatchlist(parameters: {
        uuid: string;
        symbol: string;
    }): Promise<Watchlist>;
    removeFromWatchlist(parameters: {
        uuid: string;
        symbol: string;
    }): Promise<void>;
    deleteWatchlist(parameters: {
        uuid: string;
    }): Promise<void>;
    getCalendar(parameters?: {
        start?: Date;
        end?: Date;
    }): Promise<Calendar[]>;
    getClock(): Promise<Clock>;
    getAccountConfigurations(): Promise<AccountConfigurations>;
    updateAccountConfigurations(parameters: {
        dtbp_check?: string;
        no_shorting?: boolean;
        suspend_trade?: boolean;
        trade_confirm_email?: string;
    }): Promise<AccountConfigurations>;
    getAccountActivities(parameters: {
        activity_type: string;
        date?: Date;
        until?: Date;
        after?: Date;
        direction?: 'asc' | 'desc';
        page_size?: number;
        page_token?: string;
    }): Promise<Array<NonTradeActivity | TradeActivity>[]>;
    getPortfolioHistory(parameters?: {
        period?: string;
        timeframe?: string;
        date_end?: Date;
        extended_hours?: boolean;
    }): Promise<PortfolioHistory>;
    getBars(parameters: {
        timeframe?: string;
        symbols: string[];
        limit?: number;
        start?: Date;
        end?: Date;
        after?: Date;
        until?: Date;
    }): Promise<Map<String, Bar[]>>;
    getLastTrade(parameters: {
        symbol: string;
    }): Promise<LastTradeResponse>;
    getLastQuote(parameters: {
        symbol: string;
    }): Promise<LastQuoteResponse>;
    close(): Promise<void>;
    private request;
}
