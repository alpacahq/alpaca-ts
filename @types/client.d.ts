import { Account, Order, Position, Asset, Watchlist, Calendar, Clock, AccountConfigurations, PortfolioHistory, Activity, DefaultCredentials, OAuthCredentials, OrderCancelation, PageOfTrades, PageOfQuotes, PageOfBars } from './entities.js';
import { GetOrder, GetOrders, PlaceOrder, ReplaceOrder, CancelOrder, GetPosition, ClosePosition, GetAsset, GetAssets, GetWatchList, CreateWatchList, UpdateWatchList, AddToWatchList, RemoveFromWatchList, DeleteWatchList, GetCalendar, UpdateAccountConfigurations, GetAccountActivities, GetPortfolioHistory, GetBars, GetTrades, GetQuotes } from './params.js';
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
    cancelOrder(params: CancelOrder): Promise<Boolean>;
    cancelOrders(): Promise<OrderCancelation[]>;
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
    removeFromWatchlist(params: RemoveFromWatchList): Promise<Boolean>;
    deleteWatchlist(params: DeleteWatchList): Promise<Boolean>;
    getCalendar(params?: GetCalendar): Promise<Calendar[]>;
    getClock(): Promise<Clock>;
    getAccountConfigurations(): Promise<AccountConfigurations>;
    updateAccountConfigurations(params: UpdateAccountConfigurations): Promise<AccountConfigurations>;
    getAccountActivities(params: GetAccountActivities): Promise<Activity[]>;
    getPortfolioHistory(params?: GetPortfolioHistory): Promise<PortfolioHistory>;
    getTrades(params: GetTrades): Promise<PageOfTrades>;
    getQuotes(params: GetQuotes): Promise<PageOfQuotes>;
    getBars(params: GetBars): Promise<PageOfBars>;
    private request;
}
