import {
  Account,
  RawAccount,
  AccountStatus,
  RawOrder,
  OrderType,
  OrderSide,
  Order,
  OrderTimeInForce,
  OrderStatus,
  RawPosition,
  Position,
  PositionSide,
  RawTradeActivity,
  TradeActivity,
  TradeActivitySide,
  TradeActivityType,
  RawNonTradeActivity,
  NonTradeActivity,
  RawActivity,
  Activity,
  RawClock,
  Clock,
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
        created_at: new Date(rawAccount.created_at),
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
        status: rawAccount.status as AccountStatus,
      }
    } catch (err) {
      throw new Error(`Account parsing failed. Error: ${err.message}`)
    }
  }

  parseClock(rawClock: RawClock): Clock {
    if (!rawClock) {
      return null
    }

    try {
      return {
        raw: () => rawClock,
        timestamp: new Date(rawClock.timestamp),
        is_open: rawClock.is_open,
        next_open: new Date(rawClock.next_open),
        next_close: new Date(rawClock.next_close),
      }
    } catch (err) {
      throw new Error(`Order parsing failed. Error: ${err.message}`)
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
        created_at: new Date(rawOrder.created_at),
        updated_at: new Date(rawOrder.updated_at),
        submitted_at: new Date(rawOrder.submitted_at),
        filled_at: new Date(rawOrder.filled_at),
        expired_at: new Date(rawOrder.expired_at),
        canceled_at: new Date(rawOrder.canceled_at),
        failed_at: new Date(rawOrder.failed_at),
        replaced_at: new Date(rawOrder.replaced_at),
        qty: this.parseNumber(rawOrder.qty),
        filled_qty: this.parseNumber(rawOrder.filled_qty),
        type: rawOrder.type as OrderType,
        side: rawOrder.side as OrderSide,
        time_in_force: rawOrder.time_in_force as OrderTimeInForce,
        limit_price: this.parseNumber(rawOrder.limit_price),
        stop_price: this.parseNumber(rawOrder.stop_price),
        filled_avg_price: this.parseNumber(rawOrder.filled_avg_price),
        status: rawOrder.status as OrderStatus,
        legs: this.parseOrders(rawOrder.legs),
        trail_price: this.parseNumber(rawOrder.trail_price),
        trail_percent: this.parseNumber(rawOrder.trail_percent),
        hwm: this.parseNumber(rawOrder.hwm),
      }
    } catch (err) {
      throw new Error(`Order parsing failed. Error: ${err.message}`)
    }
  }

  parseOrders(rawOrders: RawOrder[]): Order[] {
    return rawOrders ? rawOrders.map((order) => this.parseOrder(order)) : null
  }

  parsePosition(rawPosition: RawPosition): Position {
    if (!rawPosition) {
      return null
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
        unrealized_intraday_pl: this.parseNumber(
          rawPosition.unrealized_intraday_pl
        ),
        unrealized_intraday_plpc: this.parseNumber(
          rawPosition.unrealized_intraday_plpc
        ),
        current_price: this.parseNumber(rawPosition.current_price),
        lastday_price: this.parseNumber(rawPosition.lastday_price),
        change_today: this.parseNumber(rawPosition.change_today),
      }
    } catch (err) {
      throw new Error(`Position parsing failed. Error: ${err.message}`)
    }
  }

  parsePositions(rawPositions: RawPosition[]): Position[] {
    return rawPositions
      ? rawPositions.map((pos) => this.parsePosition(pos))
      : null
  }

  parseTradeActivity(rawTradeActivity: RawTradeActivity): TradeActivity {
    if (!rawTradeActivity) {
      return null
    }

    try {
      return {
        ...rawTradeActivity,
        raw: () => rawTradeActivity,
        cum_qty: this.parseNumber(rawTradeActivity.cum_qty),
        leaves_qty: this.parseNumber(rawTradeActivity.leaves_qty),
        price: this.parseNumber(rawTradeActivity.price),
        qty: this.parseNumber(rawTradeActivity.qty),
        side: rawTradeActivity.side as TradeActivitySide,
        type: rawTradeActivity.type as TradeActivityType,
      }
    } catch (err) {
      throw new Error(`TradeActivity parsing failed. Error: ${err.message}`)
    }
  }

  parseNonTradeActivity(
    rawNonTradeActivity: RawNonTradeActivity
  ): NonTradeActivity {
    if (!rawNonTradeActivity) {
      return null
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
      }
    } catch (err) {
      throw new Error(`NonTradeActivity parsing failed. Error: ${err.message}`)
    }
  }

  parseActivities(rawActivities: Array<RawActivity>): Array<Activity> {
    if (!rawActivities) {
      return null
    }

    try {
      return rawActivities.map((rawActivity) =>
        rawActivity.activity_type === 'FILL'
          ? this.parseTradeActivity(rawActivity)
          : this.parseNonTradeActivity(rawActivity)
      )
    } catch (err) {
      throw new Error(`Activity parsing failed. Error: ${err.message}`)
    }
  }

  private parseNumber(numStr: string): number {
    return parseFloat(numStr)
  }
}
