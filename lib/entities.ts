export interface Credentials {
  key: string
  secret: string
}

/**
 * The account information with unparsed types, exactly as Alpaca provides it.
 * We encourage you to use the Account interface, which has many of these fields parsed.
 */
export interface RawAccount {
  account_blocked: boolean
  account_number: string
  buying_power: string
  cash: string
  created_at: string
  currency: string
  daytrade_count: number
  daytrading_buying_power: string
  equity: string
  id: string
  initial_margin: string
  last_equity: string
  last_maintenance_margin: string
  long_market_value: string
  maintenance_margin: string
  multiplier: string
  pattern_day_trader: boolean
  portfolio_value: string
  regt_buying_power: string
  short_market_value: string
  shorting_enabled: boolean
  sma: string
  status: string
  trade_suspended_by_user: boolean
  trading_blocked: boolean
  transfers_blocked: boolean
}

/**
 * The following are the possible account status values. Most likely, the account status
 * is ACTIVE unless there is any problem. The account status may get in ACCOUNT_UPDATED
 * when personal information is being updated from the dashboard, in which case you may
 * not be allowed trading for a short period of time until the change is approved.
 */
export type AccountStatus =
  /**
   * The account is onboarding.
   */
  | 'ONBOARDING'
  /**
   * The account application submission failed for some reason.
   */
  | 'SUBMISSION_FAILED'
  /**
   * The account application has been submitted for review.
   */
  | 'SUBMITTED'
  /**
   * The account information is being updated.
   */
  | 'ACCOUNT_UPDATED'
  /**
   * The final account approval is pending.
   */
  | 'APPROVAL_PENDING'
  /**
   * The account is active for trading.
   */
  | 'ACTIVE'
  /**
   * The account application has been rejected.
   */
  | 'REJECTED'

/**
 * Information related to an Alpaca account, such as account status, funds, and various
 * flags relevant to an account's ability to trade.
 */
export interface Account {
  /**
   * Get the raw data, exactly as it came from Alpaca
   */
  raw(): RawAccount;

  /**
   * If true, the account activity by user is prohibited.
   */
  account_blocked: boolean

  /**
   * Account number.
   */
  account_number: string

  /**
   * Current available $ buying power; If multiplier = 4, this is your daytrade buying
   * power which is calculated as (last_equity - (last) maintenance_margin) * 4; If
   * multiplier = 2, buying_power = max(equity – initial_margin,0) * 2; If multiplier = 1,
   * buying_power = cash
   */
  buying_power: number

  /**
   * Cash balance
   */
  cash: number

  /**
   * Timestamp this account was created at
   */
  created_at: string

  /**
   * "USD"
   */
  currency: string

  /**
   * The current number of daytrades that have been made in the last 5 trading days
   * (inclusive of today)
   */
  daytrade_count: number

  /**
   * Your buying power for day trades (continuously updated value)
   */
  daytrading_buying_power: number

  /**
   * Cash + long_market_value + short_market_value
   */
  equity: number

  /**
   * Account ID.
   */
  id: string

  /**
   * Reg T initial margin requirement (continuously updated value)
   */
  initial_margin: number

  /**
   * Equity as of previous trading day at 16:00:00 ET
   */
  last_equity: number

  /**
   * Your maintenance margin requirement on the previous trading day
   */
  last_maintenance_margin: number

  /**
   * Real-time MtM value of all long positions held in the account
   */
  long_market_value: number

  /**
   * Maintenance margin requirement (continuously updated value)
   */
  maintenance_margin: number

  /**
   * Buying power multiplier that represents account margin classification; valid values 1
   * (standard limited margin account with 1x buying power), 2 (reg T margin account with
   * 2x intraday and overnight buying power; this is the default for all non-PDT accounts
   * with $2,000 or more equity), 4 (PDT account with 4x intraday buying power and 2x reg
   * T overnight buying power)
   */
  multiplier: number

  /**
   * Whether or not the account has been flagged as a pattern day trader
   */
  pattern_day_trader: boolean

  /**
   * Total value of cash + holding positions (This field is deprecated. It is equivalent
   * to the equity field.)
   */
  portfolio_value: number

  /**
   * Your buying power under Regulation T (your excess equity - equity minus margin
   * value - times your margin multiplier)
   */
  regt_buying_power: number

  /**
   * Real-time MtM value of all short positions held in the account
   */
  short_market_value: number

  /**
   * Flag to denote whether or not the account is permitted to short
   */
  shorting_enabled: boolean

  /**
   * Value of special memorandum account (will be used at a later date to provide
   * additional buying_power)
   */
  sma: number

  /**
   * The following are the possible account status values. Most likely, the account status
   * is ACTIVE unless there is any problem. The account status may get in ACCOUNT_UPDATED
   * when personal information is being updated from the dashboard, in which case you may
   * not be allowed trading for a short period of time until the change is approved.
   */
  status: AccountStatus

  /**
   * User setting. If true, the account is not allowed to place orders.
   */
  trade_suspended_by_user: boolean

  /**
   * If true, the account is not allowed to place orders.
   */
  trading_blocked: boolean

  /**
   * If true, the account is not allowed to request money transfers.
   */
  transfers_blocked: boolean
}

export interface AccountConfigurations {
  dtbp_check: string
  no_shorting: boolean
  suspend_trade: boolean
  trade_confirm_email: string
}

export interface AccountUpdate {
  id: string
  created_at: string
  updated_at: string
  deleted_at: any
  status: string
  currency: string
  cash: string
  cash_withdrawable: string
}

export interface AggregateMinute {
  ev: string
  T: string
  v: number
  av: number
  op: number
  vw: number
  o: number
  c: number
  h: number
  l: number
  a: number
  s: number
  e: number
}

export interface Asset {
  id: string
  class: string
  exchange: string
  symbol: string
  status: string
  tradable: boolean
  marginable: boolean
  shortable: boolean
  easy_to_borrow: boolean
}

export interface Bar {
  t: number
  o: number
  h: number
  l: number
  c: number
  v: number
}

export interface Calendar {
  date: string
  open: string
  close: string
}

export interface Clock {
  timestamp: string
  is_open: boolean
  next_open: string
  next_close: string
}

export interface LastQuote {
  status: string
  symbol: string
  last: {
    askprice: number
    asksize: number
    askexchange: number
    bidprice: number
    bidsize: number
    bidexchange: number
    timestamp: number
  }
}

export interface LastTrade {
  status: string
  symbol: string
  last: {
    price: number
    size: number
    exchange: number
    cond1: number
    cond2: number
    cond3: number
    cond4: number
    timestamp: number
  }
}

/**
 * The order entity with unparsed fields, exactly as Alpaca provides it.
 * We encourage you to use the Order interface, which has many of these fields parsed.
 */
export interface RawOrder {
  id: string
  client_order_id: string
  created_at: string
  updated_at: string
  submitted_at: string
  filled_at: string
  expired_at: string
  canceled_at: string
  failed_at: string
  replaced_at: string
  replaced_by: string
  replaces: string
  asset_id: string
  symbol: string
  asset_class: string
  qty: string
  filled_qty: string
  type: string
  side: string
  time_in_force: string
  limit_price: string
  stop_price: string
  filled_avg_price: string
  status: string
  extended_hours: boolean
  legs: RawOrder[]
  trail_price: string
  trail_percent: string
  hwm: string
}

export type OrderType = 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop'

export type OrderSide = 'buy' | 'sell'

export type OrderTimeInForce =
  /**
   * A day order is eligible for execution only on the day it is live. By default, the
   * order is only valid during Regular Trading Hours (9:30am - 4:00pm ET). If unfilled
   * after the closing auction, it is automatically canceled. If submitted after the
   * close, it is queued and submitted the following trading day. However, if marked as
   * eligible for extended hours, the order can also execute during supported extended
   * hours.
   */
  'day' |

  /**
   * The order is good until canceled. Non-marketable GTC limit orders are subject to
   * price adjustments to offset corporate actions affecting the issue. We do not
   * currently support Do Not Reduce(DNR) orders to opt out of such price adjustments.
   */
  'gtc' |

  /**
   * Use this TIF with a market/limit order type to submit "market on open" (MOO) and
   * "limit on open" (LOO) orders. This order is eligible to execute only in the market
   * opening auction. Any unfilled orders after the open will be cancelled. OPG orders
   * submitted after 9:28am but before 7:00pm ET will be rejected. OPG orders submitted
   * after 7:00pm will be queued and routed to the following day's opening auction. On
   * open/on close orders are routed to the primary exchange. Such orders do not
   * necessarily execute exactly at 9:30am / 4:00pm ET but execute per the exchange's
   * auction rules.
   */
  'opg' |

  /**
   * Use this TIF with a market/limit order type to submit "market on close" (MOC) and
   * "limit on close" (LOC) orders. This order is eligible to execute only in the market
   * closing auction. Any unfilled orders after the close will be cancelled. CLS orders
   * submitted after 3:50pm but before 7:00pm ET will be rejected. CLS orders submitted
   * after 7:00pm will be queued and routed to the following day's closing auction. Only
   * available with API v2.
   */
  'cls' |

  /**
   * An Immediate Or Cancel (IOC) order requires all or part of the order to be executed
   * immediately. Any unfilled portion of the order is canceled. Only available with API
   * v2.
   */
  'ioc' |

  /**
   * A Fill or Kill (FOK) order is only executed if the entire order quantity can be
   * filled, otherwise the order is canceled. Only available with API v2.
   */
  'fok';


export type OrderStatus =
  /**
   * The order has been received by Alpaca, and routed to exchanges for execution. This
   * is the usual initial state of an order.
   */
  'new' |

  /**
   * The order has been partially filled.
   */
  'partially_filled' |

  /**
   * The order has been filled, and no further updates will occur for the order.
   */
  'filled' |

  /**
   * The order is done executing for the day, and will not receive further updates until
   * the next trading day.
   */
  'done_for_day' |

  /**
   * The order has been canceled, and no further updates will occur for the order. This
   * can be either due to a cancel request by the user, or the order has been canceled by
   * the exchanges due to its time-in-force.
   */
  'canceled' |

  /**
   * The order has expired, and no further updates will occur for the order.
   */
  'expired' |

  /**
   * The order was replaced by another order, or was updated due to a market event such
   * as corporate action.
   */
  'replaced' |

  /**
   * The order is waiting to be canceled.
   */
  'pending_cancel' |

  /**
   * The order is waiting to be replaced by another order. The order will reject cancel
   * request while in this state.
   */
  'pending_replace' |

  /**
   * (Uncommon) The order has been received by Alpaca, but hasn't yet been routed to the
   * execution venue. This could be seen often out side of trading session hours.
   */
  'accepted' |

  /**
   * (Uncommon) The order has been received by Alpaca, and routed to the exchanges, but
   * has not yet been accepted for execution. This state only occurs on rare occasions.
   */
  'pending_new' |

  /**
   * (Uncommon) The order has been received by exchanges, and is evaluated for pricing.
   * This state only occurs on rare occasions.
   */
  'accepted_for_bidding' |

  /**
   * (Uncommon) The order has been stopped, and a trade is guaranteed for the order,
   * usually at a stated price or better, but has not yet occurred. This state only
   * occurs on rare occasions.
   */
  'stopped' |

  /**
   * (Uncommon) The order has been rejected, and no further updates will occur for the
   * order. This state occurs on rare occasions and may occur based on various conditions
   * decided by the exchanges.
   */
  'rejected' |

  /**
   * (Uncommon) The order has been suspended, and is not eligible for trading. This state
   * only occurs on rare occasions.
   */
  'suspended' |

  /**
   * (Uncommon) The order has been completed for the day (either filled or done for day),
   * but remaining settlement calculations are still pending. This state only occurs on
   * rare occasions.
   */
  'calculated';

/**
 * An Order in Alpaca
 */
export interface Order {
  /**
   * Get the raw data, exactly as it came from Alpaca
   */
  raw(): RawOrder;

  /**
   * Order id
   */
  id: string

  /**
   * Client unique order id
   */
  client_order_id: string

  /**
   * When the order was created
   */
  created_at: string

  /**
   * When the order was last updated
   */
  updated_at: string

  /**
   * When the order was submitted
   */
  submitted_at: string

  /**
   * When the order was filled
   */
  filled_at: string

  /**
   * When the order expired
   */
  expired_at: string

  /**
   * When the order was canceled
   */
  canceled_at: string

  /**
   * When the order failed
   */
  failed_at: string

  /**
   * When the order was last replaced
   */
  replaced_at: string

  /**
   * The order ID that this order was replaced by
   */
  replaced_by: string

  /**
   * The order ID that this order replaces
   */
  replaces: string

  /**
   * Asset ID
   */
  asset_id: string

  /**
   * Asset symbol
   */
  symbol: string

  /**
   * Asset class
   */
  asset_class: string

  /**
   * Ordered quantity
   */
  qty: number

  /**
   * Filled quantity
   */
  filled_qty: number

  /**
   * Order type (market, limit, stop, stop_limit, trailing_stop)
   */
  type: OrderType

  /**
   * Buy or sell
   */
  side: OrderSide

  /**
   * Order Time in Force
   */
  time_in_force: OrderTimeInForce

  /**
   * Limit price
   */
  limit_price: number

  /**
   * Stop price
   */
  stop_price: number

  /**
   * Filled average price
   */
  filled_avg_price: number

  /**
   * The status of the order
   */
  status: OrderStatus

  /**
   * If true, eligible for execution outside regular trading hours.
   */
  extended_hours: boolean

  /**
   * When querying non-simple order_class orders in a nested style, an array of Order
   * entities associated with this order. Otherwise, null.
   */
  legs: Order[]

  /**
   * The dollar value away from the high water mark for trailing stop orders.
   */
  trail_price: number

  /**
   * The percent value away from the high water mark for trailing stop orders.
   */
  trail_percent: number

  /**
   * The highest (lowest) market price seen since the trailing stop order was submitted.
   */
  hwm: number
}

export interface PortfolioHistory {
  timestamp: number[]
  equity: number[]
  profit_loss: number[]
  profit_loss_pct: number[]
  base_value: number
  timeframe: string
}

/**
 * A position with unparsed fields, exactly as Alpaca provides it.
 * We encourage you to use the Position interface, which has many of these fields parsed.
 */
export interface RawPosition {
  asset_id: string
  symbol: string
  exchange: string
  asset_class: string
  avg_entry_price: string
  qty: string
  side: string
  market_value: string
  cost_basis: string
  unrealized_pl: string
  unrealized_plpc: string
  unrealized_intraday_pl: string
  unrealized_intraday_plpc: string
  current_price: string
  lastday_price: string
  change_today: string
}

export type PositionSide = 'long' | 'short'

/**
 * A position in Alpaca
 */
export interface Position {
  /**
   * Get the raw data, exactly as it came from Alpaca
   */
  raw(): RawPosition;

  /**
   * Asset ID
   */
  asset_id: string

  /**
   * Symbol name of the asset
   */
  symbol: string

  /**
   * Exchange name of the asset
   */
  exchange: string

  /**
   * Asset class name
   */
  asset_class: string

  /**
   * Average entry price of the position
   */
  avg_entry_price: number

  /**
   * The number of shares
   */
  qty: number

  /**
   * long or short
   */
  side: PositionSide

  /**
   * Total dollar amount of the position
   */
  market_value: number

  /**
   * Total cost basis in dollar
   */
  cost_basis: number

  /**
   * Unrealized profit/loss in dollars
   */
  unrealized_pl: number

  /**
   * Unrealized profit/loss percent (by a factor of 1)
   */
  unrealized_plpc: number

  /**
   * Unrealized profit/loss in dollars for the day
   */
  unrealized_intraday_pl: number

  /**
   * Unrealized profit/loss percent (by a factor of 1)
   */
  unrealized_intraday_plpc: number

  /**
   * Current asset price per share
   */
  current_price: number

  /**
   * Last day's asset price per share based on the closing value of the last trading day
   */
  lastday_price: number

  /**
   * Percent change from last day price (by a factor of 1)
   */
  change_today: number
}

export interface Quote {
  ev: string
  T: string
  x: number
  p: number
  s: number
  X: number
  P: number
  S: number
  c: number[]
  t: number
}

export interface Trade {
  ev: string
  T: string
  i: number
  x: number
  p: number
  s: number
  t: number
  c: number[]
  z: number
}

export interface TradeActivity {
  activity_type: string
  cum_qty: string
  id: string
  leaves_qty: string
  price: string
  qty: string
  side: string
  symbol: string
  transaction_time: string
  order_id: string
  type: string
}

export interface NonTradeActivity {
  activity_type: string
  id: string
  date: string
  net_amount: string
  symbol: string
  qty: string
  per_share_amount: string
}

export interface TradeUpdate {
  event: string
  price: string
  timestamp: string
  position_qty: string
  order: {
    id: string
    client_order_id: string
    asset_id: string
    symbol: string
    exchange: string
    asset_class: string
    side: string
  }
}

export interface Watchlist {
  account_id: string
  assets: Asset[]
  created_at: string
  id: string
  name: string
  updated_at: string
}
