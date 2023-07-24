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

export interface OrderCancellation {
  id: string;
  status: number;
  order: Order;
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

export interface UpdateAccountConfigurations {
  dtbp_check?: string;
  no_shorting?: boolean;
  suspend_trade?: boolean;
  trade_confirm_email?: string;
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

export interface DefaultCredentials {
  key: string;
  secret: string;
  paper?: boolean;
}
export interface OAuthCredentials {
  access_token: String;
  paper?: boolean;
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

export interface Clock {
  timestamp: Date;
  is_open: boolean;
  next_open: Date;
  next_close: Date;
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

export interface Order {
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

export type PositionSide = "long" | "short";
export interface Position {
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

export type TradeActivityType = "fill" | "partial_fill";
export type TradeActivitySide = "buy" | "sell";

export interface TradeActivity {
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
  activity_type: Exclude<ActivityType, "FILL">;
  id: string;
  date: string;
  net_amount: number;
  symbol: string;
  qty: number;
  per_share_amount: number;
}

export type Activity = TradeActivity | NonTradeActivity;

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

export interface AddToWatchList {
  uuid: string;
  symbol: string;
}

export interface GetOrder {
  order_id?: string;
  client_order_id?: string;
  nested?: boolean;
}