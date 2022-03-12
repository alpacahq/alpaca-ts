import { Account, Order, Position, Asset, Watchlist, Calendar, Clock, AccountConfigurations, PortfolioHistory, Activity, DefaultCredentials, OAuthCredentials, OrderCancelation, PageOfTrades, PageOfQuotes, PageOfBars, Bar_v1, LastQuote_v1, LastTrade_v1, Snapshot } from './entities.js';
import { GetOrder, GetOrders, PlaceOrder, ReplaceOrder, CancelOrder, GetPosition, ClosePosition, GetAsset, GetAssets, GetWatchList, CreateWatchList, UpdateWatchList, AddToWatchList, RemoveFromWatchList, DeleteWatchList, GetCalendar, UpdateAccountConfigurations, GetAccountActivities, GetPortfolioHistory, GetBars, GetBars_v1, GetTrades, GetQuotes, GetLastTrade_v1, GetLastQuote_v1, GetSnapshot, GetSnapshots, ClosePositions } from './params.js';
export declare class AlpacaClient {
    params: {
        credentials?: DefaultCredentials | OAuthCredentials;
        rate_limit?: boolean;
    };
    private limiter;
    constructor(params: {
        credentials?: DefaultCredentials | OAuthCredentials;
        rate_limit?: boolean;
    });
    isAuthenticated(): Promise<boolean>;
    getAccount(): Promise<Account>;
    getOrder(params: GetOrder): Promise<Order>;
    getOrders(params?: GetOrders): Promise<Order[]>;
    placeOrder(params: PlaceOrder): Promise<Order>;
    replaceOrder(params: ReplaceOrder): Promise<Order>;
    cancelOrder(params: CancelOrder): Promise<boolean>;
    cancelOrders(): Promise<OrderCancelation[]>;
    getPosition(params: GetPosition): Promise<Position>;
    getPositions(): Promise<Position[]>;
    closePosition(params: ClosePosition): Promise<Order>;
    closePositions(params: ClosePositions): Promise<Order[]>;
    getAsset(params: GetAsset): Promise<Asset>;
    getAssets(params?: GetAssets): Promise<Asset[]>;
    getWatchlist(params: GetWatchList): Promise<Watchlist>;
    getWatchlists(): Promise<Watchlist[]>;
    createWatchlist(params: CreateWatchList): Promise<Watchlist[]>;
    updateWatchlist(params: UpdateWatchList): Promise<Watchlist>;
    addToWatchlist(params: AddToWatchList): Promise<Watchlist>;
    removeFromWatchlist(params: RemoveFromWatchList): Promise<boolean>;
    deleteWatchlist(params: DeleteWatchList): Promise<boolean>;
    getCalendar(params?: GetCalendar): Promise<Calendar[]>;
    getClock(): Promise<Clock>;
    getAccountConfigurations(): Promise<AccountConfigurations>;
    updateAccountConfigurations(params: UpdateAccountConfigurations): Promise<AccountConfigurations>;
    getAccountActivities(params: GetAccountActivities): Promise<Activity[]>;
    getPortfolioHistory(params?: GetPortfolioHistory): Promise<PortfolioHistory>;
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    getBars_v1(params: GetBars_v1): Promise<{
        [symbol: string]: Bar_v1[];
    }>;
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    getLastTrade_v1(params: GetLastTrade_v1): Promise<LastTrade_v1>;
    /** @deprecated Alpaca Data API v2 is currently in public beta. */
    getLastQuote_v1(params: GetLastQuote_v1): Promise<LastQuote_v1>;
    getTrades(params: GetTrades): Promise<PageOfTrades>;
    getQuotes(params: GetQuotes): Promise<PageOfQuotes>;
    getBars(params: GetBars): Promise<PageOfBars>;
    getSnapshot(params: GetSnapshot): Promise<Snapshot>;
    getSnapshots(params: GetSnapshots): Promise<{
        [key: string]: Snapshot;
    }>;
    private request;
}
