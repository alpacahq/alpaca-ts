import { Account, Order, Position, Asset, Watchlist, Calendar, Clock, AccountConfigurations, TradeActivity, NonTradeActivity, PortfolioHistory, Bar, LastTradeResponse, LastQuoteResponse } from './entities';
export interface GetOrderParameters {
    order_id?: string;
    client_order_id?: string;
    nested?: boolean;
}
export interface GetOrdersParameters {
    status?: string;
    limit?: number;
    after?: Date;
    until?: Date;
    direction?: string;
    nested?: boolean;
}
export interface PlaceOrderParameters {
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
export interface ReplaceOrderParameters {
    order_id: string;
    qty?: number;
    time_in_force?: string;
    limit_price?: number;
    stop_price?: number;
    client_order_id?: string;
}
export interface CancelOrderParameters {
    order_id: string;
}
export interface GetPositionParameters {
    symbol: string;
}
export interface ClosePositionParameters {
    symbol: string;
}
export interface GetAssetParameters {
    asset_id_or_symbol: string;
}
export interface GetAssetsParameters {
    status?: 'active' | 'inactive';
    asset_class?: string;
}
export interface GetWatchListParameters {
    uuid: string;
}
export interface CreateWatchListParameters {
    name: string;
    symbols?: string[];
}
export interface UpdateWatchListParameters {
    uuid: string;
    name?: string;
    symbols?: string[];
}
export interface AddToWatchListParameters {
    uuid: string;
    symbol: string;
}
export interface RemoveFromWatchListParameters {
    uuid: string;
    symbol: string;
}
export interface DeleteWatchListParameters {
    uuid: string;
}
export interface GetCalendarParameters {
    start?: Date;
    end?: Date;
}
export interface UpdateAccountConfigurationsParameters {
    dtbp_check?: string;
    no_shorting?: boolean;
    suspend_trade?: boolean;
    trade_confirm_email?: string;
}
export interface GetAccountActivitiesParameters {
    activity_type: string;
    date?: Date;
    until?: Date;
    after?: Date;
    direction?: 'asc' | 'desc';
    page_size?: number;
    page_token?: string;
}
export interface GetPortfolioHistoryParameters {
    period?: string;
    timeframe?: string;
    date_end?: Date;
    extended_hours?: boolean;
}
export interface GetBarsParameters {
    timeframe?: string;
    symbols: string[];
    limit?: number;
    start?: Date;
    end?: Date;
    after?: Date;
    until?: Date;
}
export interface GetLastTradeParameters {
    symbol: string;
}
export interface GetLastQuoteParameters {
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
    isAuthenticated(): Promise<boolean>;
    getAccount(): Promise<Account>;
    getOrder(parameters: GetOrderParameters): Promise<Order>;
    getOrders(parameters?: GetOrdersParameters): Promise<Order[]>;
    placeOrder(parameters: PlaceOrderParameters): Promise<Order>;
    replaceOrder(parameters: ReplaceOrderParameters): Promise<Order>;
    cancelOrder(parameters: CancelOrderParameters): Promise<Order>;
    cancelOrders(): Promise<Order[]>;
    getPosition(parameters: GetPositionParameters): Promise<Position>;
    getPositions(): Promise<Position[]>;
    closePosition(parameters: ClosePositionParameters): Promise<Order>;
    closePositions(): Promise<Order[]>;
    getAsset(parameters: GetAssetParameters): Promise<Asset>;
    getAssets(parameters?: GetAssetsParameters): Promise<Asset[]>;
    getWatchlist(parameters: GetWatchListParameters): Promise<Watchlist>;
    getWatchlists(): Promise<Watchlist[]>;
    createWatchlist(parameters: CreateWatchListParameters): Promise<Watchlist[]>;
    updateWatchlist(parameters: UpdateWatchListParameters): Promise<Watchlist>;
    addToWatchlist(parameters: AddToWatchListParameters): Promise<Watchlist>;
    removeFromWatchlist(parameters: RemoveFromWatchListParameters): Promise<void>;
    deleteWatchlist(parameters: DeleteWatchListParameters): Promise<void>;
    getCalendar(parameters?: GetCalendarParameters): Promise<Calendar[]>;
    getClock(): Promise<Clock>;
    getAccountConfigurations(): Promise<AccountConfigurations>;
    updateAccountConfigurations(parameters: UpdateAccountConfigurationsParameters): Promise<AccountConfigurations>;
    getAccountActivities(parameters: GetAccountActivitiesParameters): Promise<Array<NonTradeActivity | TradeActivity>[]>;
    getPortfolioHistory(parameters?: GetPortfolioHistoryParameters): Promise<PortfolioHistory>;
    getBars(parameters: GetBarsParameters): Promise<Map<String, Bar[]>>;
    getLastTrade(parameters: GetLastTradeParameters): Promise<LastTradeResponse>;
    getLastQuote(parameters: GetLastQuoteParameters): Promise<LastQuoteResponse>;
    close(): Promise<void>;
    private request;
}
