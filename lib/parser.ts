import {
  Account, RawAccount, AccountStatus, RawOrder, OrderType, OrderSide, Order,
  OrderTimeInForce, OrderStatus, RawPosition, Position, PositionSide
} from './entities'

export class Parser {
  parseAccount(rawAccount: RawAccount): Account {
    if (!rawAccount) {
      return null
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
        status: rawAccount.status as AccountStatus
      }
    } catch (err) {
      throw new Error(`Account parsing failed. Error: ${err.message}`)
    }
  }

  parseOrder(rawOrder: RawOrder): Order {
    if (!rawOrder) {
      return null
    }

    try {
      return {
        ...rawOrder,
        raw: () => rawOrder,
        qty: this.parseNumber(rawOrder.qty),
        filled_qty: this.parseNumber(rawOrder.filled_qty),
        type: rawOrder.type as OrderType,
        side: rawOrder.side as OrderSide,
        time_in_force: rawOrder.time_in_force as OrderTimeInForce,
        limit_price: this.parseNumber(rawOrder.limit_price),
        stop_price: this.parseNumber(rawOrder.stop_price),
        filled_avg_price: this.parseNumber(rawOrder.filled_avg_price),
        status: rawOrder.status as OrderStatus,
        legs: rawOrder.legs && rawOrder.legs.length
          ? rawOrder.legs.map(this.parseOrder)
          : null,
        trail_price: this.parseNumber(rawOrder.trail_price),
        trail_percent: this.parseNumber(rawOrder.trail_percent),
        hwm: this.parseNumber(rawOrder.hwm)
      };
    } catch (err) {
      throw new Error(`Order parsing failed. Error: ${err.message}`)
    }
  }

  parseOrders(rawOrders: RawOrder[]): Order[] {
    return rawOrders
      ? rawOrders.map(this.parseOrder)
      : null;
  }

  parsePosition(rawPosition: RawPosition): Position {
    if (!rawPosition) {
      return null;
    }

    try {
      return {
        ...rawPosition,
        raw: () => rawPosition,
        avg_entry_price: this.parseNumber(rawPosition.avg_entry_price),
        qty: this.parseNumber(rawPosition.qty),
        side: rawPosition.side as PositionSide,
        market_value: this.parseNumber(rawPosition.market_value),
        cost_basis: this.parseNumber(rawPosition.cost_basis),
        unrealized_pl: this.parseNumber(rawPosition.unrealized_pl),
        unrealized_plpc: this.parseNumber(rawPosition.unrealized_plpc),
        unrealized_intraday_pl: this.parseNumber(rawPosition.unrealized_intraday_pl),
        unrealized_intraday_plpc: this.parseNumber(rawPosition.unrealized_intraday_plpc),
        current_price: this.parseNumber(rawPosition.current_price),
        lastday_price: this.parseNumber(rawPosition.lastday_price),
        change_today: this.parseNumber(rawPosition.change_today)
      }
    } catch (err) {
      throw new Error(`Position parsing failed. Error: ${err.message}`)
    }
  }

  parsePositions(rawPositions: RawPosition[]): Position[] {
    return rawPositions
      ? rawPositions.map(this.parsePosition)
      : null;
  }

  private parseNumber(numStr: string): number {
    return parseFloat(numStr)
  }
}
