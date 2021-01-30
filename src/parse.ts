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
} from './entities.js'

function account(rawAccount: RawAccount): Account {
  if (!rawAccount) {
    return undefined
  }

  try {
    return {
      ...rawAccount,
      raw: () => rawAccount,
      buying_power: number(rawAccount.buying_power),
      regt_buying_power: number(rawAccount.regt_buying_power),
      daytrading_buying_power: number(rawAccount.daytrading_buying_power),
      cash: number(rawAccount.cash),
      created_at: new Date(rawAccount.created_at),
      portfolio_value: number(rawAccount.portfolio_value),
      multiplier: number(rawAccount.multiplier),
      equity: number(rawAccount.equity),
      last_equity: number(rawAccount.last_equity),
      long_market_value: number(rawAccount.long_market_value),
      short_market_value: number(rawAccount.short_market_value),
      initial_margin: number(rawAccount.initial_margin),
      maintenance_margin: number(rawAccount.maintenance_margin),
      last_maintenance_margin: number(rawAccount.last_maintenance_margin),
      sma: number(rawAccount.sma),
      status: rawAccount.status as AccountStatus,
    }
  } catch (err) {
    throw new Error(`Account parsing failed. ${err.message}`)
  }
}

function clock(rawClock: RawClock): Clock {
  if (!rawClock) {
    return undefined
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
    throw new Error(`Order parsing failed. ${err.message}`)
  }
}

function order(rawOrder: RawOrder): Order {
  if (!rawOrder) {
    return undefined
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
      qty: number(rawOrder.qty),
      filled_qty: number(rawOrder.filled_qty),
      type: rawOrder.type as OrderType,
      side: rawOrder.side as OrderSide,
      time_in_force: rawOrder.time_in_force as OrderTimeInForce,
      limit_price: number(rawOrder.limit_price),
      stop_price: number(rawOrder.stop_price),
      filled_avg_price: number(rawOrder.filled_avg_price),
      status: rawOrder.status as OrderStatus,
      legs: orders(rawOrder.legs),
      trail_price: number(rawOrder.trail_price),
      trail_percent: number(rawOrder.trail_percent),
      hwm: number(rawOrder.hwm),
    }
  } catch (err) {
    throw new Error(`Order parsing failed. ${err.message}`)
  }
}

function orders(rawOrders: RawOrder[]): Order[] {
  return rawOrders ? rawOrders.map((value) => order(value)) : undefined
}

function position(rawPosition: RawPosition): Position {
  if (!rawPosition) {
    return undefined
  }

  try {
    return {
      ...rawPosition,
      raw: () => rawPosition,
      avg_entry_price: number(rawPosition.avg_entry_price),
      qty: number(rawPosition.qty),
      side: rawPosition.side as PositionSide,
      market_value: number(rawPosition.market_value),
      cost_basis: number(rawPosition.cost_basis),
      unrealized_pl: number(rawPosition.unrealized_pl),
      unrealized_plpc: number(rawPosition.unrealized_plpc),
      unrealized_intraday_pl: number(rawPosition.unrealized_intraday_pl),
      unrealized_intraday_plpc: number(rawPosition.unrealized_intraday_plpc),
      current_price: number(rawPosition.current_price),
      lastday_price: number(rawPosition.lastday_price),
      change_today: number(rawPosition.change_today),
    }
  } catch (err) {
    throw new Error(`Position parsing failed. ${err.message}`)
  }
}

function positions(rawPositions: RawPosition[]): Position[] {
  return rawPositions ? rawPositions.map((pos) => position(pos)) : undefined
}

function tradeActivity(rawTradeActivity: RawTradeActivity): TradeActivity {
  if (!rawTradeActivity) {
    return undefined
  }

  try {
    return {
      ...rawTradeActivity,
      raw: () => rawTradeActivity,
      cum_qty: number(rawTradeActivity.cum_qty),
      leaves_qty: number(rawTradeActivity.leaves_qty),
      price: number(rawTradeActivity.price),
      qty: number(rawTradeActivity.qty),
      side: rawTradeActivity.side as TradeActivitySide,
      type: rawTradeActivity.type as TradeActivityType,
    }
  } catch (err) {
    throw new Error(`TradeActivity parsing failed. ${err.message}`)
  }
}

function nonTradeActivity(
  rawNonTradeActivity: RawNonTradeActivity,
): NonTradeActivity {
  if (!rawNonTradeActivity) {
    return undefined
  }

  try {
    return {
      ...rawNonTradeActivity,
      raw: () => rawNonTradeActivity,
      net_amount: number(rawNonTradeActivity.net_amount),
      qty: number(rawNonTradeActivity.qty),
      per_share_amount: number(rawNonTradeActivity.per_share_amount),
    }
  } catch (err) {
    throw new Error(`NonTradeActivity parsing failed. ${err.message}`)
  }
}

function activities(rawActivities: Array<RawActivity>): Array<Activity> {
  if (!rawActivities) {
    return undefined
  }

  try {
    return rawActivities.map((rawActivity) =>
      rawActivity.activity_type === 'FILL'
        ? tradeActivity(rawActivity)
        : nonTradeActivity(rawActivity),
    )
  } catch (err) {
    throw new Error(`Activity parsing failed. ${err.message}`)
  }
}

function number(numStr: string): number {
  if (typeof numStr === 'undefined') return numStr
  return parseFloat(numStr)
}

export default {
  account,
  activities,
  clock,
  nonTradeActivity,
  order,
  orders,
  position,
  positions,
  tradeActivity,
}
