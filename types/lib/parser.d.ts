import { Account, RawAccount } from './entities';
export declare class Parser {
    parseAccount(rawAccount: RawAccount): Account;
    private parseNumber;
}
