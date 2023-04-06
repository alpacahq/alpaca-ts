import { DataSource } from "./index";

export interface CancelOrder {
  order_id: string;
}

export interface ClosePosition {
  symbol: string;
  qty?: number;
  percentage?: number;
}

export interface ClosePositions {
  cancel_orders?: boolean;
}

export interface CreateWatchList {
  name: string;
  symbols?: string[];
}

export interface DeleteWatchList {
  uuid: string;
}

export interface GetAccountActivities {
  activity_type?: string;
  activity_types?: string | string[];
  date?: string;
  until?: string;
  after?: string;
  direction?: "asc" | "desc";
  page_size?: number;
  page_token?: string;
}

export interface GetAsset {
  asset_id_or_symbol: string;
}

export interface GetAssets {
  status?: "active" | "inactive";
  asset_class?: string; // i don't know where to find all asset classes
}

export interface GetCalendar {
  start?: Date;
  end?: Date;
}

export interface GetTrades {
  symbol: string;
  start: Date;
  end: Date;
  limit?: number;
  page_token?: string;
}

export interface GetQuotes {
  symbol: string;
  start: Date;
  end: Date;
  limit?: number;
  page_token?: string;
}

export interface GetSnapshot {
  symbol: string;
}

export interface GetSnapshots {
  symbols: string[];
}

export interface GetBars {
  symbol: string;
  start: Date;
  end: Date;
  limit?: number;
  page_token?: string;
  timeframe: BarsTimeframe;
  adjustment?: "all" | "dividend" | "raw" | "split";
}

export interface GetBars_v1 {
  timeframe: BarsV1Timeframe;
  symbols: string[];
  limit?: number;
  start?: Date;
  end?: Date;
  after?: Date;
  until?: Date;
}

export interface GetLastQuote_v1 {
  symbol: string;
}

export interface GetLastTrade_v1 {
  symbol: string;
}

export interface GetOrders {
  status?: "open" | "closed" | "all";
  limit?: number;
  after?: Date;
  until?: Date;
  direction?: "asc" | "desc";
  nested?: boolean;
  symbols?: string[];
}

export interface GetPortfolioHistory {
  period?: string;
  timeframe?: string;
  date_end?: Date;
  extended_hours?: boolean;
}

export interface GetPosition {
  symbol: string;
}

export interface GetWatchList {
  uuid: string;
}

export interface PlaceOrder {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  time_in_force: OrderTimeInForce;
  qty?: number;
  notional?: number;
  limit_price?: number;
  stop_price?: number;
  extended_hours?: boolean;
  client_order_id?: string;
  trail_price?: number;
  trail_percent?: number;
  order_class?: "simple" | "bracket" | "oco" | "oto";
  take_profit?: {
    limit_price: number;
  };
  stop_loss?: {
    stop_price: number;
    limit_price?: number;
  };
}

export interface RemoveFromWatchList {
  uuid: string;
  symbol: string;
}

export interface ReplaceOrder {
  order_id: string;
  qty?: number;
  time_in_force?: OrderTimeInForce;
  limit_price?: number;
  stop_price?: number;
  client_order_id?: string;
}

export type BarsV1Timeframe = "1Min" | "5Min" | "15Min" | "1Day";

/** Also supports arbitrary minute, hour, and day values.  E.g., '37Min', '6Hour', '3Day'  */
export type BarsTimeframe =
  | BarsV1Timeframe
  | "30Min"
  | "1Hour"
  | "2Hour"
  | "4Hour";

export interface UpdateAccountConfigurations {
  dtbp_check?: string;
  no_shorting?: boolean;
  suspend_trade?: boolean;
  trade_confirm_email?: string;
}

export interface GetLatestTrade {
  symbol: string;
  feed?: DataSource;
  limit?: number;
}

export interface UpdateWatchList {
  uuid: string;
  name?: string;
  symbols?: string[];
}

export interface GetNews {
  symbols?: string[] | string;
  start?: Date;
  end?: Date;
  limit?: number;
  sort?: "ASC" | "DESC";
  include_content?: boolean;
  exclude_contentless?: boolean;
  page_token?: string;
}

export interface GetCryptoTrades {
  symbols: string;
  start: Date;
  end: Date;
  limit?: number;
  page_token?: string;
}

export interface DefaultCredentials {
  key: string;
  secret: string;
  paper?: boolean;
}
export interface OAuthCredentials {
  access_token: String;
  paper?: boolean;
}
export interface RawAccount {
  account_blocked: boolean;
  account_number: string;
  buying_power: string;
  cash: string;
  created_at: string;
  currency: string;
  daytrade_count: number;
  daytrading_buying_power: string;
  equity: string;
  id: string;
  initial_margin: string;
  last_equity: string;
  last_maintenance_margin: string;
  long_market_value: string;
  maintenance_margin: string;
  multiplier: string;
  pattern_day_trader: boolean;
  portfolio_value: string;
  regt_buying_power: string;
  short_market_value: string;
  shorting_enabled: boolean;
  sma: string;
  status: string;
  trade_suspended_by_user: boolean;
  trading_blocked: boolean;
  transfers_blocked: boolean;
}
export type AccountStatus =
  | "ONBOARDING"
  | "SUBMISSION_FAILED"
  | "SUBMITTED"
  | "ACCOUNT_UPDATED"
  | "APPROVAL_PENDING"
  | "ACTIVE"
  | "REJECTED";
export interface Account {
  account_blocked: boolean;
  account_number: string;
  buying_power: number;
  cash: number;
  created_at: Date;
  currency: string;
  daytrade_count: number;
  daytrading_buying_power: number;
  equity: number;
  id: string;
  initial_margin: number;
  last_equity: number;
  last_maintenance_margin: number;
  long_market_value: number;
  maintenance_margin: number;
  multiplier: number;
  pattern_day_trader: boolean;
  portfolio_value: number;
  regt_buying_power: number;
  short_market_value: number;
  shorting_enabled: boolean;
  sma: number;
  status: AccountStatus;
  trade_suspended_by_user: boolean;
  trading_blocked: boolean;
  transfers_blocked: boolean;
}

export interface AccountConfigurations {
  dtbp_check: "both" | "entry" | "exit";
  no_shorting: boolean;
  suspend_trade: boolean;
  trade_confirm_email: "all" | "none";
}

export interface AccountUpdate {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  status: string;
  currency: string;
  cash: string;
  cash_withdrawable: string;
}

export interface AggregateMinute {
  ev: string;
  T: string;
  v: number;
  av: number;
  op: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  a: number;
  s: number;
  e: number;
}

export type AssetExchange =
  | "AMEX"
  | "ARCA"
  | "BATS"
  | "NYSE"
  | "NASDAQ"
  | "NYSEARCA";

export type AssetStatus = "active" | "inactive";
export interface Asset {
  id: string;
  class: string;
  exchange: AssetExchange;
  symbol: string;
  status: AssetStatus;
  tradable: boolean;
  marginable: boolean;
  shortable: boolean;
  easy_to_borrow: boolean;
  fractionable: boolean;
}
export interface Calendar {
  date: string;
  open: string;
  close: string;
}

export interface RawClock {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
}
export interface Clock {
  raw(): RawClock;
  timestamp: Date;
  is_open: boolean;
  next_open: Date;
  next_close: Date;
}
export interface RawTrade {
  S: string;
  t: string;
  x: string;
  p: number;
  s: number;
  c: string[];
  i: number;
  z: string;
}
export interface RawPageOfTrades {
  trades: RawTrade[];
  symbol: string;
  next_page_token: string;
}
export interface Trade {
  raw(): RawTrade;
  S: string;
  t: Date;
  x: string;
  p: number;
  s: number;
  c: string[];
  i: number;
  z: string;
}
export interface PageOfTrades {
  raw(): RawPageOfTrades;
  trades: Trade[];
  symbol: string;
  next_page_token: string;
}
export interface CryptoTrade {
  raw(): RawCryptoTrade;
  t: Date;
  p: number;
  s: number;
  tks: string;
  i: number;
}

export interface RawCryptoTrade {
  t: string;
  p: number;
  s: number;
  tks: string;
  i: number;
}
export interface PageOfCryptoTrades {
  raw(): RawPageOfTrades;
  trades: Trade[];
  symbol: string;
  next_page_token: string;
}
export interface RawQuote {
  S: string;
  t: string;
  ax: string;
  ap: number;
  as: number;
  bx: string;
  bp: number;
  bs: number;
  c: string[];
}
export interface RawPageOfQuotes {
  quotes: RawQuote[];
  symbol: string;
  next_page_token: string;
}
export interface Quote {
  raw(): RawQuote;
  S: string;
  t: Date;
  ax: string;
  ap: number;
  as: number;
  bx: string;
  bp: number;
  bs: number;
  c: string[];
}
export interface PageOfQuotes {
  raw(): RawPageOfQuotes;
  quotes: Quote[];
  symbol: string;
  next_page_token: string;
}
export interface RawBar {
  S: string;
  t: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}
export interface RawPageOfBars {
  bars: RawBar[];
  symbol: string;
  next_page_token: string;
}
export interface Bar {
  raw(): RawBar;
  S: string;
  t: Date;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}
export interface PageOfBars {
  raw(): RawPageOfBars;
  bars: Bar[];
  symbol: string;
  next_page_token: string;
}
export interface OrderCancelation {
  id: string;
  status: number;
  order: Order;
}
export interface RawOrderCancelation {
  id: string;
  status: number;
  body: RawOrder;
}
export interface RawOrder {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at: string;
  submitted_at: string;
  filled_at: string;
  expired_at: string;
  canceled_at: string;
  failed_at: string;
  replaced_at: string;
  replaced_by: string;
  replaces: string;
  asset_id: string;
  symbol: string;
  asset_class: string;
  qty: string;
  filled_qty: string;
  type: string;
  side: string;
  time_in_force: string;
  limit_price: string;
  stop_price: string;
  filled_avg_price: string;
  status: string;
  extended_hours: boolean;
  legs: RawOrder[];
  trail_price: string;
  trail_percent: string;
  hwm: string;
  order_class?: OrderClass;
}
export interface Bar_v1 {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
}
export interface LastQuote_v1 {
  status: string;
  symbol: string;
  last: {
    askprice: number;
    asksize: number;
    askexchange: number;
    bidprice: number;
    bidsize: number;
    bidexchange: number;
    timestamp: number;
  };
}
export interface LastTrade_v1 {
  status: string;
  symbol: string;
  last: {
    price: number;
    size: number;
    exchange: number;
    cond1: number;
    cond2: number;
    cond3: number;
    cond4: number;
    timestamp: number;
  };
}

export interface RawSnapshot {
  symbol: string;
  latestTrade: {
    t: string;
    x: string;
    p: number;
    s: number;
    c?: string[] | null;
    i: number;
    z: string;
  };
  latestQuote: {
    t: string;
    ax: string;
    ap: number;
    as: number;
    bx: string;
    bp: number;
    bs: number;
    c?: string[] | null;
  };
  minuteBar: {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
  };
  dailyBar: {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
  };
  prevDailyBar: {
    t: string;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
  };
}

export interface Snapshot {
  raw(): RawSnapshot;
  symbol: string;
  latestTrade: {
    t: Date;
    x: string;
    p: number;
    s: number;
    c?: string[] | null;
    i: number;
    z: string;
  };
  latestQuote: {
    t: Date;
    ax: string;
    ap: number;
    as: number;
    bx: string;
    bp: number;
    bs: number;
    c?: string[] | null;
  };
  minuteBar: {
    t: Date;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
  };
  dailyBar: {
    t: Date;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
  };
  prevDailyBar: {
    t: Date;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
  };
}

export type OrderType =
  | "market"
  | "limit"
  | "stop"
  | "stop_limit"
  | "trailing_stop";

export type OrderClass = "simple" | "bracket" | "oto" | "oco";

export type OrderSide = "buy" | "sell";

export type OrderTimeInForce = "day" | "gtc" | "opg" | "cls" | "ioc" | "fok";

export type OrderStatus =
  | "new"
  | "partially_filled"
  | "filled"
  | "done_for_day"
  | "canceled"
  | "expired"
  | "replaced"
  | "pending_cancel"
  | "pending_replace"
  | "accepted"
  | "pending_new"
  | "accepted_for_bidding"
  | "stopped"
  | "rejected"
  | "suspended"
  | "calculated";

export interface RawLatestTrade {
  symbol: string;
  trade: {
    t: string;
    x: string;
    p: number;
    s: number;
    c: string[];
    i: number;
    z: string;
  };
}

export interface LatestTrade {
  raw(): RawLatestTrade;
  symbol: string;
  trade: {
    t: Date;
    x: string;
    p: number;
    s: number;
    c: string[];
    i: number;
    z: string;
  };
}
export interface Order {
  raw(): RawOrder;
  id: string;
  client_order_id: string;
  created_at: Date;
  updated_at: Date;
  submitted_at: Date;
  filled_at: Date;
  expired_at: Date;
  canceled_at: Date;
  failed_at: Date;
  replaced_at: Date;
  replaced_by: string;
  replaces: string;
  asset_id: string;
  symbol: string;
  asset_class: string;
  qty: number;
  filled_qty: number;
  type: OrderType;
  side: OrderSide;
  time_in_force: OrderTimeInForce;
  limit_price: number;
  stop_price: number;
  filled_avg_price: number;
  status: OrderStatus;
  extended_hours: boolean;
  legs: Order[];
  trail_price: number;
  trail_percent: number;
  hwm: number;
  order_class: OrderClass;
}
export interface PortfolioHistory {
  timestamp: number[];
  equity: number[];
  profit_loss: number[];
  profit_loss_pct: number[];
  base_value: number;
  timeframe: "1Min" | "5Min" | "15Min" | "1H" | "1D";
}
export interface RawPosition {
  asset_id: string;
  symbol: string;
  exchange: string;
  asset_class: string;
  avg_entry_price: string;
  qty: string;
  side: string;
  market_value: string | null;
  cost_basis: string;
  unrealized_pl: string | null;
  unrealized_plpc: string | null;
  unrealized_intraday_pl: string | null;
  unrealized_intraday_plpc: string | null;
  current_price: string | null;
  lastday_price: string | null;
  change_today: string | null;
}

export type PositionSide = "long" | "short";
export interface Position {
  raw(): RawPosition;
  asset_id: string;
  symbol: string;
  exchange: string;
  asset_class: string;
  avg_entry_price: number;
  qty: number;
  side: PositionSide;
  market_value: number | null;
  cost_basis: number;
  unrealized_pl: number | null;
  unrealized_plpc: number | null;
  unrealized_intraday_pl: number | null;
  unrealized_intraday_plpc: number | null;
  current_price: number | null;
  lastday_price: number | null;
  change_today: number | null;
}

export type ActivityType =
  | "FILL"
  | "TRANS"
  | "MISC"
  | "ACATC"
  | "ACATS"
  | "CSD"
  | "CSR"
  | "DIV"
  | "DIVCGL"
  | "DIVCGS"
  | "DIVFEE"
  | "DIVFT"
  | "DIVNRA"
  | "DIVROC"
  | "DIVTW"
  | "DIVTXEX"
  | "INT"
  | "INTNRA"
  | "INTTW"
  | "JNL"
  | "JNLC"
  | "JNLS"
  | "MA"
  | "NC"
  | "OPASN"
  | "OPEXP"
  | "OPXRC"
  | "PTC"
  | "PTR"
  | "REORG"
  | "SC"
  | "SSO"
  | "SSP";

export interface RawTradeActivity {
  activity_type: Extract<ActivityType, "FILL">;
  cum_qty: string;
  id: string;
  leaves_qty: string;
  price: string;
  qty: string;
  side: string;
  symbol: string;
  transaction_time: string;
  order_id: string;
  type: string;
}

export interface RawNonTradeActivity {
  activity_type: Exclude<ActivityType, "FILL">;
  id: string;
  date: string;
  net_amount: string;
  symbol: string;
  qty: string;
  per_share_amount: string;
}

export type TradeActivityType = "fill" | "partial_fill";
export type TradeActivitySide = "buy" | "sell";

export interface TradeActivity {
  raw(): RawTradeActivity;
  activity_type: Extract<ActivityType, "FILL">;
  cum_qty: number;
  id: string;
  leaves_qty: number;
  price: number;
  qty: number;
  side: TradeActivitySide;
  symbol: string;
  transaction_time: string;
  order_id: string;
  type: TradeActivityType;
}

export interface NonTradeActivity {
  raw(): RawNonTradeActivity;
  activity_type: Exclude<ActivityType, "FILL">;
  id: string;
  date: string;
  net_amount: number;
  symbol: string;
  qty: number;
  per_share_amount: number;
}

export type RawActivity = RawTradeActivity | RawNonTradeActivity;

export type Activity = TradeActivity | NonTradeActivity;
export type TradeUpdateEvent =
  | "new"
  | "fill"
  | "partial_fill"
  | "canceled"
  | "expired"
  | "done_for_day"
  | "replaced"
  | "rejected"
  | "pending_new"
  | "stopped"
  | "pending_cancel"
  | "pending_replace"
  | "calculated"
  | "suspended"
  | "order_replace_rejected"
  | "order_cancel_rejected";

export interface RawTradeUpdate {
  event: TradeUpdateEvent;
  execution_id: string;
  order: RawOrder;
  event_id?: string;
  at?: string;
  timestamp?: string;
  position_qty?: string;
  price?: string;
  qty?: string;
}

export interface TradeUpdate {
  raw: () => RawTradeUpdate;
  event: TradeUpdateEvent;
  execution_id: string;
  event_id?: number;
  order: Order;
  at?: Date;
  timestamp?: Date;
  position_qty?: number;
  price?: number;
  qty?: number;
}

export interface Watchlist {
  account_id: string;
  assets: Asset[];
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
}

export interface News {
  id: number;
  headline: string;
  author: string;
  created_at: Date;
  updated_at: Date;
  summary: string;
  url: string;
  images: any[];
  symbols: string[];
  source: string;
}

export interface NewsPage {
  news: News[];
  next_page_token: string;
}

export type Channel = "trades" | "quotes" | "bars" | "trade_updates";

export interface Message {
  T: "success" | "error" | "subscription";
  code?: number;
  msg: string;
  [key: string]: any;
}

export interface AddToWatchList {
  uuid: string;
  symbol: string;
}

export interface GetOrder {
  order_id?: string;
  client_order_id?: string;
  nested?: boolean;
}
