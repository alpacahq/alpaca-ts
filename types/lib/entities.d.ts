export interface Credentials {
    key: string;
    secret: string;
}
/**
 * The account information with unparsed types, exactly as Alpaca provides it.
 * We encourage you to use the Account interface, which has many of these fields parsed.
 */
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
/**
 * The following are the possible account status values. Most likely, the account status
 * is ACTIVE unless there is any problem. The account status may get in ACCOUNT_UPDATED
 * when personal information is being updated from the dashboard, in which case you may
 * not be allowed trading for a short period of time until the change is approved.
 */
export declare type AccountStatus = 
/**
 * The account is onboarding.
 */
'ONBOARDING' | 
/**
 * The account application submission failed for some reason.
 */
'SUBMISSION_FAILED' | 
/**
 * The account application has been submitted for review.
 */
'SUBMITTED' | 
/**
 * The account information is being updated.
 */
'ACCOUNT_UPDATED' | 
/**
 * The final account approval is pending.
 */
'APPROVAL_PENDING' | 
/**
 * The account is active for trading.
 */
'ACTIVE' | 
/**
 * The account application has been rejected.
 */
'REJECTED';
/**
 * Information related to an Alpaca account, such as account status, funds, and various
 * flags relevant to an account’s ability to trade.
 */
export interface Account {
    /**
     * If true, the account activity by user is prohibited.
     */
    account_blocked: boolean;
    /**
     * Account number.
     */
    account_number: string;
    /**
     * Current available $ buying power; If multiplier = 4, this is your daytrade buying
     * power which is calculated as (last_equity - (last) maintenance_margin) * 4; If
     * multiplier = 2, buying_power = max(equity – initial_margin,0) * 2; If multiplier = 1,
     * buying_power = cash
     */
    buying_power: number;
    /**
     * Cash balance
     */
    cash: number;
    /**
     * Timestamp this account was created at
     */
    created_at: string;
    /**
     * "USD"
     */
    currency: string;
    /**
     * The current number of daytrades that have been made in the last 5 trading days
     * (inclusive of today)
     */
    daytrade_count: number;
    /**
     * Your buying power for day trades (continuously updated value)
     */
    daytrading_buying_power: number;
    /**
     * Cash + long_market_value + short_market_value
     */
    equity: number;
    /**
     * Account ID.
     */
    id: string;
    /**
     * Reg T initial margin requirement (continuously updated value)
     */
    initial_margin: number;
    /**
     * Equity as of previous trading day at 16:00:00 ET
     */
    last_equity: number;
    /**
     * Your maintenance margin requirement on the previous trading day
     */
    last_maintenance_margin: number;
    /**
     * Real-time MtM value of all long positions held in the account
     */
    long_market_value: number;
    /**
     * Maintenance margin requirement (continuously updated value)
     */
    maintenance_margin: number;
    /**
     * Buying power multiplier that represents account margin classification; valid values 1
     * (standard limited margin account with 1x buying power), 2 (reg T margin account with
     * 2x intraday and overnight buying power; this is the default for all non-PDT accounts
     * with $2,000 or more equity), 4 (PDT account with 4x intraday buying power and 2x reg
     * T overnight buying power)
     */
    multiplier: number;
    /**
     * Whether or not the account has been flagged as a pattern day trader
     */
    pattern_day_trader: boolean;
    /**
     * Total value of cash + holding positions (This field is deprecated. It is equivalent
     * to the equity field.)
     */
    portfolio_value: number;
    /**
     * Your buying power under Regulation T (your excess equity - equity minus margin
     * value - times your margin multiplier)
     */
    regt_buying_power: number;
    /**
     * Real-time MtM value of all short positions held in the account
     */
    short_market_value: number;
    /**
     * Flag to denote whether or not the account is permitted to short
     */
    shorting_enabled: boolean;
    /**
     * Value of special memorandum account (will be used at a later date to provide
     * additional buying_power)
     */
    sma: number;
    /**
     * The following are the possible account status values. Most likely, the account status
     * is ACTIVE unless there is any problem. The account status may get in ACCOUNT_UPDATED
     * when personal information is being updated from the dashboard, in which case you may
     * not be allowed trading for a short period of time until the change is approved.
     */
    status: AccountStatus;
    /**
     * User setting. If true, the account is not allowed to place orders.
     */
    trade_suspended_by_user: boolean;
    /**
     * If true, the account is not allowed to place orders.
     */
    trading_blocked: boolean;
    /**
     * If true, the account is not allowed to request money transfers.
     */
    transfers_blocked: boolean;
}
export interface AccountConfigurations {
    dtbp_check: string;
    no_shorting: boolean;
    suspend_trade: boolean;
    trade_confirm_email: string;
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
export interface Asset {
    id: string;
    class: string;
    exchange: string;
    symbol: string;
    status: string;
    tradable: boolean;
    marginable: boolean;
    shortable: boolean;
    easy_to_borrow: boolean;
}
export interface Bar {
    t: number;
    o: number;
    h: number;
    l: number;
    c: number;
    v: number;
}
export interface Calendar {
    date: string;
    open: string;
    close: string;
}
export interface Clock {
    timestamp: string;
    is_open: boolean;
    next_open: string;
    next_close: string;
}
export interface LastQuote {
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
export interface LastTrade {
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
export interface Order {
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
    replaces: any;
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
    legs: any;
}
export interface PortfolioHistory {
    timestamp: number[];
    equity: number[];
    profit_loss: number[];
    profit_loss_pct: number[];
    base_value: number;
    timeframe: string;
}
export interface Position {
    asset_id: string;
    symbol: string;
    exchange: string;
    asset_class: string;
    avg_entry_price: string;
    qty: string;
    side: string;
    market_value: string;
    cost_basis: string;
    unrealized_pl: string;
    unrealized_plpc: string;
    unrealized_intraday_pl: string;
    unrealized_intraday_plpc: string;
    current_price: string;
    lastday_price: string;
    change_today: string;
}
export interface Quote {
    ev: string;
    T: string;
    x: number;
    p: number;
    s: number;
    X: number;
    P: number;
    S: number;
    c: number[];
    t: number;
}
export interface Trade {
    ev: string;
    T: string;
    i: number;
    x: number;
    p: number;
    s: number;
    t: number;
    c: number[];
    z: number;
}
export interface TradeActivity {
    activity_type: string;
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
export interface NonTradeActivity {
    activity_type: string;
    id: string;
    date: string;
    net_amount: string;
    symbol: string;
    qty: string;
    per_share_amount: string;
}
export interface TradeUpdate {
    event: string;
    price: string;
    timestamp: string;
    position_qty: string;
    order: {
        id: string;
        client_order_id: string;
        asset_id: string;
        symbol: string;
        exchange: string;
        asset_class: string;
        side: string;
    };
}
export interface Watchlist {
    account_id: string;
    assets: Asset[];
    created_at: string;
    id: string;
    name: string;
    updated_at: string;
}
