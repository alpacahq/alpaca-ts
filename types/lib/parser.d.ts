import { Account, RawAccount, RawOrder, Order, RawPosition, Position } from './entities';
export declare class Parser {
    parseAccount(rawAccount: RawAccount): Account;
    parseOrder(rawOrder: RawOrder): Order;
    parseOrders(rawOrders: RawOrder[]): Order[];
    parsePosition(rawPosition: RawPosition): Position;
    parsePositions(rawPositions: RawPosition[]): Position[];
    private parseNumber;
}
