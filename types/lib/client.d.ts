import * as entities from './entities';
import * as params from './params';
export declare class Client {
    protected params?: {
        credentials?: {
            key: string;
            secret: string;
        };
        paper?: boolean;
        rate_limit?: boolean;
    };
    private limiter;
    constructor(params?: {
        credentials?: {
            key: string;
            secret: string;
        };
        paper?: boolean;
        rate_limit?: boolean;
    });
    isAuthenticated(): Promise<boolean>;
    getAccount(): Promise<entities.Account>;
    getOrder(params: params.GetOrder): Promise<entities.Order>;
    getOrders(params?: params.GetOrders): Promise<entities.Order[]>;
    placeOrder(params: params.PlaceOrder): Promise<entities.Order>;
    replaceOrder(params: params.ReplaceOrder): Promise<entities.Order>;
    cancelOrder(params: params.CancelOrder): Promise<entities.Order>;
    cancelOrders(): Promise<entities.Order[]>;
    getPosition(params: params.GetPosition): Promise<entities.Position>;
    getPositions(): Promise<entities.Position[]>;
    closePosition(params: params.ClosePosition): Promise<entities.Order>;
    closePositions(): Promise<entities.Order[]>;
    getAsset(params: params.GetAsset): Promise<entities.Asset>;
    getAssets(params?: params.GetAssets): Promise<entities.Asset[]>;
    getWatchlist(params: params.GetWatchList): Promise<entities.Watchlist>;
    getWatchlists(): Promise<entities.Watchlist[]>;
    createWatchlist(params: params.CreateWatchList): Promise<entities.Watchlist[]>;
    updateWatchlist(params: params.UpdateWatchList): Promise<entities.Watchlist>;
    addToWatchlist(params: params.AddToWatchList): Promise<entities.Watchlist>;
    removeFromWatchlist(params: params.RemoveFromWatchList): Promise<void>;
    deleteWatchlist(params: params.DeleteWatchList): Promise<void>;
    getCalendar(params?: params.GetCalendar): Promise<entities.Calendar[]>;
    getClock(): Promise<entities.Clock>;
    getAccountConfigurations(): Promise<entities.AccountConfigurations>;
    updateAccountConfigurations(params: params.UpdateAccountConfigurations): Promise<entities.AccountConfigurations>;
    getAccountActivities(params: params.GetAccountActivities): Promise<Array<entities.NonTradeActivity | entities.TradeActivity>[]>;
    getPortfolioHistory(params?: params.GetPortfolioHistory): Promise<entities.PortfolioHistory>;
    getBars(params: params.GetBars): Promise<Map<String, entities.Bar[]>>;
    getLastTrade(params: params.GetLastTrade): Promise<entities.LastTrade>;
    getLastQuote(params: params.GetLastQuote): Promise<entities.LastQuote>;
    private request;
}
