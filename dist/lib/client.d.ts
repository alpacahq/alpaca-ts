import { Account, Order, Position, Asset, Watchlist, Calendar, Clock, AccountConfigurations, TradeActivity, NonTradeActivity, PortfolioHistory, Bar, LastTradeResponse, LastQuoteResponse, GetOrderParameters, GetOrdersParameters, PlaceOrderParameters, ReplaceOrderParameters, CancelOrderParameters, GetPositionParameters, ClosePositionParameters, GetAssetParameters, GetAssetsParameters, GetWatchListParameters, CreateWatchListParameters, UpdateWatchListParameters, AddToWatchListParameters, RemoveFromWatchListParameters, DeleteWatchListParameters, GetCalendarParameters, UpdateAccountConfigurationsParameters, GetAccountActivitiesParameters, GetPortfolioHistoryParameters, GetBarsParameters, GetLastTradeParameters, GetLastQuoteParameters } from './entities';
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
