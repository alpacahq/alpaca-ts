import { Account, Order, Position, Asset, Watchlist, Calendar, Clock, AccountConfigurations, PortfolioHistory, Bar, LastQuote, LastTrade, Activity, DefaultCredentials, OAuthCredentials } from './entities.js';
import { GetOrder, GetOrders, PlaceOrder, ReplaceOrder, CancelOrder, GetPosition, ClosePosition, GetAsset, GetAssets, GetWatchList, CreateWatchList, UpdateWatchList, AddToWatchList, RemoveFromWatchList, DeleteWatchList, GetCalendar, UpdateAccountConfigurations, GetAccountActivities, GetPortfolioHistory, GetBars, GetLastTrade, GetLastQuote } from './params.js';
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
    cancelOrder(params: CancelOrder): Promise<Order>;
    cancelOrders(): Promise<Order[]>;
    getPosition(params: GetPosition): Promise<Position>;
    getPositions(): Promise<Position[]>;
    closePosition(params: ClosePosition): Promise<Order>;
    closePositions(): Promise<Order[]>;
    getAsset(params: GetAsset): Promise<Asset>;
    getAssets(params?: GetAssets): Promise<Asset[]>;
    getWatchlist(params: GetWatchList): Promise<Watchlist>;
    getWatchlists(): Promise<Watchlist[]>;
    createWatchlist(params: CreateWatchList): Promise<Watchlist[]>;
    updateWatchlist(params: UpdateWatchList): Promise<Watchlist>;
    addToWatchlist(params: AddToWatchList): Promise<Watchlist>;
    removeFromWatchlist(params: RemoveFromWatchList): Promise<void>;
    deleteWatchlist(params: DeleteWatchList): Promise<void>;
    getCalendar(params?: GetCalendar): Promise<Calendar[]>;
    getClock(): Promise<Clock>;
    getAccountConfigurations(): Promise<AccountConfigurations>;
    updateAccountConfigurations(params: UpdateAccountConfigurations): Promise<AccountConfigurations>;
    getAccountActivities(params: GetAccountActivities): Promise<Activity[]>;
    getPortfolioHistory(params?: GetPortfolioHistory): Promise<PortfolioHistory>;
    getBars(params: GetBars): Promise<{
        [symbol: string]: Bar[];
    }>;
    getLastTrade(params: GetLastTrade): Promise<LastTrade>;
    getLastQuote(params: GetLastQuote): Promise<LastQuote>;
    private request;
}
