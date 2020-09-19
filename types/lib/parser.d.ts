import { Account, RawAccount, RawOrder, Order, RawPosition, Position, RawTradeActivity, TradeActivity, RawNonTradeActivity, NonTradeActivity, RawActivity, Activity } from './entities';
export declare class Parser {
    parseAccount(rawAccount: RawAccount): Account;
    parseOrder(rawOrder: RawOrder): Order;
    parseOrders(rawOrders: RawOrder[]): Order[];
    parsePosition(rawPosition: RawPosition): Position;
    parsePositions(rawPositions: RawPosition[]): Position[];
    parseTradeActivity(rawTradeActivity: RawTradeActivity): TradeActivity;
    parseNonTradeActivity(rawNonTradeActivity: RawNonTradeActivity): NonTradeActivity;
    parseActivities(rawActivities: Array<RawActivity>): Array<Activity>;
    private isTradeActivity;
    private parseNumber;
}
