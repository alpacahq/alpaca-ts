import { Account, Order, Position, Asset, Watchlist, Calendar, Clock, AccountConfigurations, TradeActivity, NonTradeActivity, PortfolioHistory, Bar, LastTradeResponse, LastQuoteResponse } from './entities';
export interface GetOrderOptions {
    order_id?: string;
    client_order_id?: string;
    nested?: boolean;
}
export interface GetOrdersOptions {
    status?: string;
    limit?: number;
    after?: Date;
    until?: Date;
    direction?: string;
    nested?: boolean;
}
export interface PlaceOrderOptions {
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
}
export interface ReplaceOrderOptions {
    order_id: string;
    qty?: number;
    time_in_force?: string;
    limit_price?: number;
    stop_price?: number;
    client_order_id?: string;
}
export interface CancelOrderOptions {
    order_id: string;
}
export interface GetPositionOptions {
    symbol: string;
}
export interface ClosePositionOptions {
    symbol: string;
}
export interface GetAssetOptions {
    asset_id_or_symbol: string;
}
export interface GetAssetsOptions {
    status?: 'active' | 'inactive';
    asset_class?: string;
}
export interface GetWatchListOptions {
    uuid: string;
}
export interface CreateWatchListOptions {
    name: string;
    symbols?: string[];
}
export interface UpdateWatchListOptions {
    uuid: string;
    name?: string;
    symbols?: string[];
}
export interface AddToWatchListOptions {
    uuid: string;
    symbol: string;
}
export interface RemoveFromWatchListOptions {
    uuid: string;
    symbol: string;
}
export interface DeleteWatchListOptions {
    uuid: string;
}
export interface GetCalendarOptions {
    start?: Date;
    end?: Date;
}
export interface UpdateAccountConfigurationsOptions {
    dtbp_check?: string;
    no_shorting?: boolean;
    suspend_trade?: boolean;
    trade_confirm_email?: string;
}
export interface GetAccountActivitiesOptions {
    activity_type: string;
    date?: Date;
    until?: Date;
    after?: Date;
    direction?: 'asc' | 'desc';
    page_size?: number;
    page_token?: string;
}
export interface GetPortfolioHistoryOptions {
    period?: string;
    timeframe?: string;
    date_end?: Date;
    extended_hours?: boolean;
}
export interface GetBarsOptions {
    timeframe?: string;
    symbols: string[];
    limit?: number;
    start?: Date;
    end?: Date;
    after?: Date;
    until?: Date;
}
export interface GetLastTradeOptions {
    symbol: string;
}
export interface GetLastQuoteOptions {
    symbol: string;
}
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
    getOrder(parameters: GetOrderOptions): Promise<Order>;
    getOrders(parameters?: GetOrdersOptions): Promise<Order[]>;
    placeOrder(parameters: PlaceOrderOptions): Promise<Order>;
    replaceOrder(parameters: ReplaceOrderOptions): Promise<Order>;
    cancelOrder(parameters: CancelOrderOptions): Promise<Order>;
    cancelOrders(): Promise<Order[]>;
    getPosition(parameters: GetPositionOptions): Promise<Position>;
    getPositions(): Promise<Position[]>;
    closePosition(parameters: ClosePositionOptions): Promise<Order>;
    closePositions(): Promise<Order[]>;
    getAsset(parameters: GetAssetOptions): Promise<Asset>;
    getAssets(parameters?: GetAssetsOptions): Promise<Asset[]>;
    getWatchlist(parameters: GetWatchListOptions): Promise<Watchlist>;
    getWatchlists(): Promise<Watchlist[]>;
    createWatchlist(parameters: CreateWatchListOptions): Promise<Watchlist[]>;
    updateWatchlist(parameters: UpdateWatchListOptions): Promise<Watchlist>;
    addToWatchlist(parameters: AddToWatchListOptions): Promise<Watchlist>;
    removeFromWatchlist(parameters: RemoveFromWatchListOptions): Promise<void>;
    deleteWatchlist(parameters: DeleteWatchListOptions): Promise<void>;
    getCalendar(parameters?: GetCalendarOptions): Promise<Calendar[]>;
    getClock(): Promise<Clock>;
    getAccountConfigurations(): Promise<AccountConfigurations>;
    updateAccountConfigurations(parameters: UpdateAccountConfigurationsOptions): Promise<AccountConfigurations>;
    getAccountActivities(parameters: GetAccountActivitiesOptions): Promise<Array<NonTradeActivity | TradeActivity>[]>;
    getPortfolioHistory(parameters?: GetPortfolioHistoryOptions): Promise<PortfolioHistory>;
    getBars(parameters: GetBarsOptions): Promise<Map<String, Bar[]>>;
    getLastTrade(parameters: GetLastTradeOptions): Promise<LastTradeResponse>;
    getLastQuote(parameters: GetLastQuoteOptions): Promise<LastQuoteResponse>;
    close(): Promise<void>;
    private request;
}
