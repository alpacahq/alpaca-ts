"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
class Parser {
  parseAccount(rawAccount) {
    if (!rawAccount) {
      return null;
    }
    return {
      ...rawAccount,
      buying_power: this.parseNumber(rawAccount.buying_power),
      regt_buying_power: this.parseNumber(rawAccount.regt_buying_power),
      daytrading_buying_power: this.parseNumber(
        rawAccount.daytrading_buying_power
      ),
      cash: this.parseNumber(rawAccount.cash),
      portfolio_value: this.parseNumber(rawAccount.portfolio_value),
      multiplier: this.parseNumber(rawAccount.multiplier),
      equity: this.parseNumber(rawAccount.equity),
      last_equity: this.parseNumber(rawAccount.last_equity),
      long_market_value: this.parseNumber(rawAccount.long_market_value),
      short_market_value: this.parseNumber(rawAccount.short_market_value),
      initial_margin: this.parseNumber(rawAccount.initial_margin),
      maintenance_margin: this.parseNumber(rawAccount.maintenance_margin),
      last_maintenance_margin: this.parseNumber(
        rawAccount.last_maintenance_margin
      ),
      sma: this.parseNumber(rawAccount.sma),
      status: rawAccount.status,
    };
  }
  parseNumber(numStr) {
    return parseFloat(numStr);
  }
}
exports.Parser = Parser;
