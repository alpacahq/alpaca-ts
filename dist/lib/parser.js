"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Parser = void 0;
class Parser {
  parseAccount(rawAccount) {
    if (!rawAccount) {
      return null;
    }
    try {
      return {
        ...rawAccount,
        raw: () => rawAccount,
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
    } catch (err) {
      throw new Error(`Account parsing failed. Error: ${err.message}`);
    }
  }
  parseOrder(rawOrder) {
    if (!rawOrder) {
      return null;
    }
    try {
      return {
        ...rawOrder,
        raw: () => rawOrder,
        qty: this.parseNumber(rawOrder.qty),
        filled_qty: this.parseNumber(rawOrder.filled_qty),
        type: rawOrder.type,
        side: rawOrder.side,
        time_in_force: rawOrder.time_in_force,
        limit_price: this.parseNumber(rawOrder.limit_price),
        stop_price: this.parseNumber(rawOrder.stop_price),
        filled_avg_price: this.parseNumber(rawOrder.filled_avg_price),
        status: rawOrder.status,
        legs: this.parseOrders(rawOrder.legs),
        trail_price: this.parseNumber(rawOrder.trail_price),
        trail_percent: this.parseNumber(rawOrder.trail_percent),
        hwm: this.parseNumber(rawOrder.hwm),
      };
    } catch (err) {
      throw new Error(`Order parsing failed. Error: ${err.message}`);
    }
  }
  parseOrders(rawOrders) {
    return rawOrders ? rawOrders.map((order) => this.parseOrder(order)) : null;
  }
  parsePosition(rawPosition) {
    if (!rawPosition) {
      return null;
    }
    try {
      return {
        ...rawPosition,
        raw: () => rawPosition,
        avg_entry_price: this.parseNumber(rawPosition.avg_entry_price),
        qty: this.parseNumber(rawPosition.qty),
        side: rawPosition.side,
        market_value: this.parseNumber(rawPosition.market_value),
        cost_basis: this.parseNumber(rawPosition.cost_basis),
        unrealized_pl: this.parseNumber(rawPosition.unrealized_pl),
        unrealized_plpc: this.parseNumber(rawPosition.unrealized_plpc),
        unrealized_intraday_pl: this.parseNumber(
          rawPosition.unrealized_intraday_pl
        ),
        unrealized_intraday_plpc: this.parseNumber(
          rawPosition.unrealized_intraday_plpc
        ),
        current_price: this.parseNumber(rawPosition.current_price),
        lastday_price: this.parseNumber(rawPosition.lastday_price),
        change_today: this.parseNumber(rawPosition.change_today),
      };
    } catch (err) {
      throw new Error(`Position parsing failed. Error: ${err.message}`);
    }
  }
  parsePositions(rawPositions) {
    return rawPositions
      ? rawPositions.map((pos) => this.parsePosition(pos))
      : null;
  }
  parseTradeActivity(rawTradeActivity) {
    if (!rawTradeActivity) {
      return null;
    }
    try {
      return {
        ...rawTradeActivity,
        raw: () => rawTradeActivity,
        cum_qty: this.parseNumber(rawTradeActivity.cum_qty),
        leaves_qty: this.parseNumber(rawTradeActivity.leaves_qty),
        price: this.parseNumber(rawTradeActivity.price),
        qty: this.parseNumber(rawTradeActivity.qty),
        side: rawTradeActivity.side,
        type: rawTradeActivity.type,
      };
    } catch (err) {
      throw new Error(`TradeActivity parsing failed. Error: ${err.message}`);
    }
  }
  parseNonTradeActivity(rawNonTradeActivity) {
    if (!rawNonTradeActivity) {
      return null;
    }
    try {
      return {
        ...rawNonTradeActivity,
        raw: () => rawNonTradeActivity,
        net_amount: this.parseNumber(rawNonTradeActivity.net_amount),
        qty: this.parseNumber(rawNonTradeActivity.qty),
        per_share_amount: this.parseNumber(
          rawNonTradeActivity.per_share_amount
        ),
      };
    } catch (err) {
      throw new Error(`NonTradeActivity parsing failed. Error: ${err.message}`);
    }
  }
  parseActivities(rawActivities) {
    if (!rawActivities) {
      return null;
    }
    try {
      return rawActivities.map((rawActivity) =>
        rawActivity.activity_type === "FILL"
          ? this.parseTradeActivity(rawActivity)
          : this.parseNonTradeActivity(rawActivity)
      );
    } catch (err) {
      throw new Error(`Activity parsing failed. Error: ${err.message}`);
    }
  }
  parseNumber(numStr) {
    return parseFloat(numStr);
  }
}
exports.Parser = Parser;
