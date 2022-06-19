import { OrderSide, OrderType, OrderTimeInForce, DataSource } from './entities.js';
export interface AddToWatchList {
    uuid: string;
    symbol: string;
}
export interface CancelOrder {
    order_id: string;
}
export interface ClosePosition {
    symbol: string;
    qty?: number;
    percentage?: number;
}
export interface ClosePositions {
    cancel_orders?: boolean;
}
export interface CreateWatchList {
    name: string;
    symbols?: string[];
}
export interface DeleteWatchList {
    uuid: string;
}
export interface GetAccountActivities {
    activity_type?: string;
    activity_types?: string | string[];
    date?: string;
    until?: string;
    after?: string;
    direction?: 'asc' | 'desc';
    page_size?: number;
    page_token?: string;
}
export interface GetAsset {
    asset_id_or_symbol: string;
}
export interface GetAssets {
    status?: 'active' | 'inactive';
    asset_class?: string;
}
export interface GetCalendar {
    start?: Date;
    end?: Date;
}
export interface GetTrades {
    symbol: string;
    start: Date;
    end: Date;
    limit?: number;
    page_token?: string;
}
export interface GetQuotes {
    symbol: string;
    start: Date;
    end: Date;
    limit?: number;
    page_token?: string;
}
export interface GetSnapshot {
    symbol: string;
}
export interface GetSnapshots {
    symbols: string[];
}
export interface GetBars {
    symbol: string;
    start: Date;
    end: Date;
    limit?: number;
    page_token?: string;
    timeframe: BarsTimeframe;
    adjustment?: 'all' | 'dividend' | 'raw' | 'split';
}
export interface GetBars_v1 {
    timeframe: BarsV1Timeframe;
    symbols: string[];
    limit?: number;
    start?: Date;
    end?: Date;
    after?: Date;
    until?: Date;
}
export interface GetLastQuote_v1 {
    symbol: string;
}
export interface GetLastTrade_v1 {
    symbol: string;
}
export interface GetOrder {
    order_id?: string;
    client_order_id?: string;
    nested?: boolean;
}
export interface GetOrders {
    status?: 'open' | 'closed' | 'all';
    limit?: number;
    after?: Date;
    until?: Date;
    direction?: 'asc' | 'desc';
    nested?: boolean;
    symbols?: string[];
}
export interface GetPortfolioHistory {
    period?: string;
    timeframe?: string;
    date_end?: Date;
    extended_hours?: boolean;
}
export interface GetPosition {
    symbol: string;
}
export interface GetWatchList {
    uuid: string;
}
export interface PlaceOrder {
    symbol: string;
    side: OrderSide;
    type: OrderType;
    time_in_force: OrderTimeInForce;
    qty?: number;
    notional?: number;
    limit_price?: number;
    stop_price?: number;
    extended_hours?: boolean;
    client_order_id?: string;
    trail_price?: number;
    trail_percent?: number;
    order_class?: 'simple' | 'bracket' | 'oco' | 'oto';
    take_profit?: {
        limit_price: number;
    };
    stop_loss?: {
        stop_price: number;
        limit_price?: number;
    };
}
export interface RemoveFromWatchList {
    uuid: string;
    symbol: string;
}
export interface ReplaceOrder {
    order_id: string;
    qty?: number;
    time_in_force?: OrderTimeInForce;
    limit_price?: number;
    stop_price?: number;
    client_order_id?: string;
}
export declare type BarsV1Timeframe = '1Min' | '5Min' | '15Min' | '1Day';
/** Also supports arbitrary minute, hour, and day values.  E.g., '37Min', '6Hour', '3Day'  */
export declare type BarsTimeframe = BarsV1Timeframe | '30Min' | '1Hour' | '2Hour' | '4Hour';
export interface UpdateAccountConfigurations {
    dtbp_check?: string;
    no_shorting?: boolean;
    suspend_trade?: boolean;
    trade_confirm_email?: string;
}
export interface GetLatestTrade {
    symbol: string;
    feed?: DataSource;
    limit?: number;
}
export interface UpdateWatchList {
    uuid: string;
    name?: string;
    symbols?: string[];
}
export interface GetNews {
    symbols?: string[] | string;
    start?: Date;
    end?: Date;
    limit?: number;
    sort?: 'ASC' | 'DESC';
    include_content?: boolean;
    exclude_contentless?: boolean;
    page_token?: string;
}
