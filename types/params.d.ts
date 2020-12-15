import { OrderSide, OrderType, OrderTimeInForce } from './entities.js';
export interface AddToWatchList {
    uuid: string;
    symbol: string;
}
export interface CancelOrder {
    order_id: string;
}
export interface ClosePosition {
    symbol: string;
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
export interface GetBars {
    timeframe: string;
    symbols: string[];
    limit?: number;
    start?: Date;
    end?: Date;
    after?: Date;
    until?: Date;
}
export interface GetCalendar {
    start?: Date;
    end?: Date;
}
export interface GetLastQuote {
    symbol: string;
}
export interface GetLastTrade {
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
    qty: number;
    side: OrderSide;
    type: OrderType;
    time_in_force: OrderTimeInForce;
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
export interface UpdateAccountConfigurations {
    dtbp_check?: string;
    no_shorting?: boolean;
    suspend_trade?: boolean;
    trade_confirm_email?: string;
}
export interface UpdateWatchList {
    uuid: string;
    name?: string;
    symbols?: string[];
}
