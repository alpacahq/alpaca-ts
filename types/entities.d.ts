/**
 * Your Alpaca key id and secret.
 * Can be passed to the AlpacaClient and AlpacaStream.
 */
export interface DefaultCredentials {
    key: string;
    secret: string;
}
/**
 * Client ID for Oauth requests on behalf of users.
 * Can be passed to the AlpacaClient.
 */
export interface OAuthCredentials {
    access_token: String;
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
'ONBOARDING'
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
 | 'REJECTED';
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
    created_at: Date;
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
    /**
     * both, entry, or exit. Controls Day Trading Margin Call (DTMC) checks.
     */
    dtbp_check: 'both' | 'entry' | 'exit';
    /**
     * If true, account becomes long-only mode.
     */
    no_shorting: boolean;
    /**
     * If true, new orders are blocked.
     */
    suspend_trade: boolean;
    /**
     * all or none. If none, emails for order fills are not sent.
     */
    trade_confirm_email: 'all' | 'none';
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
export declare type AssetExchange = 'AMEX' | 'ARCA' | 'BATS' | 'NYSE' | 'NASDAQ' | 'NYSEARCA';
export declare type AssetStatus = 'active' | 'inactive';
/**
 * The assets API serves as the master list of assets available for trade and data
 * consumption from Alpaca. Assets are sorted by asset class, exchange and symbol. Some
 * assets are only available for data consumption via Polygon, and are not tradable with
 * Alpaca. These assets will be marked with the flag tradable=false.
 */
export interface Asset {
    /**
     * Asset ID
     */
    id: string;
    /**
     * "us_equity"
     */
    class: string;
    /**
     * AMEX, ARCA, BATS, NYSE, NASDAQ or NYSEARCA
     */
    exchange: AssetExchange;
    /**
     * Asset symbol
     */
    symbol: string;
    /**
     * active or inactive
     */
    status: AssetStatus;
    /**
     * Asset is tradable on Alpaca or not
     */
    tradable: boolean;
    /**
     * Asset is marginable or not
     */
    marginable: boolean;
    /**
     * Asset is shortable or not
     */
    shortable: boolean;
    /**
     * Asset is easy-to-borrow or not (filtering for easy_to_borrow = True is the best way
     * to check whether the name is currently available to short at Alpaca).
     */
    easy_to_borrow: boolean;
}
/**
 * Price and volume data during a particular time interval
 */
export interface Bar {
    /**
     * the beginning time of this bar as a Unix epoch in seconds
     */
    t: number;
    /**
     * open price
     */
    o: number;
    /**
     * high price
     */
    h: number;
    /**
     * low price
     */
    l: number;
    /**
     * close price
     */
    c: number;
    /**
     * volume
     */
    v: number;
}
/**
 * Contains the time of open and close for a market on a particular day from 1970 to 2029
 */
export interface Calendar {
    /**
     * Date string in YYYY-MM-DD format
     */
    date: string;
    /**
     * The time the market opens at on this date in HH:MM format
     */
    open: string;
    /**
     * The time the market closes at on this date in HH:MM format
     */
    close: string;
}
export interface RawClock {
    timestamp: string;
    is_open: boolean;
    next_open: string;
    next_close: string;
}
/**
 * The clock API serves the current market timestamp, whether or not the market is
 * currently open, as well as the times of the next market open and close.
 */
export interface Clock {
    /**
     * Get the raw data, exactly as it came from Alpaca
     */
    raw(): RawClock;
    /**
     * Current timestamp
     */
    timestamp: Date;
    /**
     * Whether or not the market is open
     */
    is_open: boolean;
    /**
     * Next market open timestamp
     */
    next_open: Date;
    /**
     * Next market close timestamp
     */
    next_close: Date;
}
/**
 * Last quote details for a symbol
 */
export interface LastQuote {
    status: string;
    symbol: string;
    last: {
        /**
         * the current ask price
         */
        askprice: number;
        /**
         * the current ask size
         */
        asksize: number;
        /**
         * the exchange code of the ask quote
         */
        askexchange: number;
        /**
         * the current bid price
         */
        bidprice: number;
        /**
         * the current bid size
         */
        bidsize: number;
        /**
         * the exchange code of the bid quote
         */
        bidexchange: number;
        /**
         * epoch timestamp in nanoseconds
         */
        timestamp: number;
    };
}
/**
 * Last trade details for a symbol
 */
export interface LastTrade {
    status: string;
    symbol: string;
    last: {
        /**
         * last trade price
         */
        price: number;
        /**
         * last trade volume size
         */
        size: number;
        /**
         * exchange code where the last trade was made
         */
        exchange: number;
        /**
         * condition flag 1
         */
        cond1: number;
        /**
         * condition flag 2
         */
        cond2: number;
        /**
         * condition flag 3
         */
        cond3: number;
        /**
         * condition flag 4
         */
        cond4: number;
        /**
         * epoch timestamp in nanoseconds
         */
        timestamp: number;
    };
}
/**
 * The order entity with unparsed fields, exactly as Alpaca provides it.
 * We encourage you to use the Order interface, which has many of these fields parsed.
 */
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
}
export declare type OrderType = 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop';
export declare type OrderSide = 'buy' | 'sell';
export declare type OrderTimeInForce = 
/**
 * A day order is eligible for execution only on the day it is live. By default, the
 * order is only valid during Regular Trading Hours (9:30am - 4:00pm ET). If unfilled
 * after the closing auction, it is automatically canceled. If submitted after the
 * close, it is queued and submitted the following trading day. However, if marked as
 * eligible for extended hours, the order can also execute during supported extended
 * hours.
 */
'day'
/**
 * The order is good until canceled. Non-marketable GTC limit orders are subject to
 * price adjustments to offset corporate actions affecting the issue. We do not
 * currently support Do Not Reduce(DNR) orders to opt out of such price adjustments.
 */
 | 'gtc'
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
 | 'opg'
/**
 * Use this TIF with a market/limit order type to submit "market on close" (MOC) and
 * "limit on close" (LOC) orders. This order is eligible to execute only in the market
 * closing auction. Any unfilled orders after the close will be cancelled. CLS orders
 * submitted after 3:50pm but before 7:00pm ET will be rejected. CLS orders submitted
 * after 7:00pm will be queued and routed to the following day's closing auction. Only
 * available with API v2.
 */
 | 'cls'
/**
 * An Immediate Or Cancel (IOC) order requires all or part of the order to be executed
 * immediately. Any unfilled portion of the order is canceled. Only available with API
 * v2.
 */
 | 'ioc'
/**
 * A Fill or Kill (FOK) order is only executed if the entire order quantity can be
 * filled, otherwise the order is canceled. Only available with API v2.
 */
 | 'fok';
export declare type OrderStatus = 
/**
 * The order has been received by Alpaca, and routed to exchanges for execution. This
 * is the usual initial state of an order.
 */
'new'
/**
 * The order has been partially filled.
 */
 | 'partially_filled'
/**
 * The order has been filled, and no further updates will occur for the order.
 */
 | 'filled'
/**
 * The order is done executing for the day, and will not receive further updates until
 * the next trading day.
 */
 | 'done_for_day'
/**
 * The order has been canceled, and no further updates will occur for the order. This
 * can be either due to a cancel request by the user, or the order has been canceled by
 * the exchanges due to its time-in-force.
 */
 | 'canceled'
/**
 * The order has expired, and no further updates will occur for the order.
 */
 | 'expired'
/**
 * The order was replaced by another order, or was updated due to a market event such
 * as corporate action.
 */
 | 'replaced'
/**
 * The order is waiting to be canceled.
 */
 | 'pending_cancel'
/**
 * The order is waiting to be replaced by another order. The order will reject cancel
 * request while in this state.
 */
 | 'pending_replace'
/**
 * (Uncommon) The order has been received by Alpaca, but hasn't yet been routed to the
 * execution venue. This could be seen often out side of trading session hours.
 */
 | 'accepted'
/**
 * (Uncommon) The order has been received by Alpaca, and routed to the exchanges, but
 * has not yet been accepted for execution. This state only occurs on rare occasions.
 */
 | 'pending_new'
/**
 * (Uncommon) The order has been received by exchanges, and is evaluated for pricing.
 * This state only occurs on rare occasions.
 */
 | 'accepted_for_bidding'
/**
 * (Uncommon) The order has been stopped, and a trade is guaranteed for the order,
 * usually at a stated price or better, but has not yet occurred. This state only
 * occurs on rare occasions.
 */
 | 'stopped'
/**
 * (Uncommon) The order has been rejected, and no further updates will occur for the
 * order. This state occurs on rare occasions and may occur based on various conditions
 * decided by the exchanges.
 */
 | 'rejected'
/**
 * (Uncommon) The order has been suspended, and is not eligible for trading. This state
 * only occurs on rare occasions.
 */
 | 'suspended'
/**
 * (Uncommon) The order has been completed for the day (either filled or done for day),
 * but remaining settlement calculations are still pending. This state only occurs on
 * rare occasions.
 */
 | 'calculated';
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
    id: string;
    /**
     * Client unique order id
     */
    client_order_id: string;
    /**
     * When the order was created
     */
    created_at: Date;
    /**
     * When the order was last updated
     */
    updated_at: Date;
    /**
     * When the order was submitted
     */
    submitted_at: Date;
    /**
     * When the order was filled
     */
    filled_at: Date;
    /**
     * When the order expired
     */
    expired_at: Date;
    /**
     * When the order was canceled
     */
    canceled_at: Date;
    /**
     * When the order failed
     */
    failed_at: Date;
    /**
     * When the order was last replaced
     */
    replaced_at: Date;
    /**
     * The order ID that this order was replaced by
     */
    replaced_by: string;
    /**
     * The order ID that this order replaces
     */
    replaces: string;
    /**
     * Asset ID
     */
    asset_id: string;
    /**
     * Asset symbol
     */
    symbol: string;
    /**
     * Asset class
     */
    asset_class: string;
    /**
     * Ordered quantity
     */
    qty: number;
    /**
     * Filled quantity
     */
    filled_qty: number;
    /**
     * Order type (market, limit, stop, stop_limit, trailing_stop)
     */
    type: OrderType;
    /**
     * Buy or sell
     */
    side: OrderSide;
    /**
     * Order Time in Force
     */
    time_in_force: OrderTimeInForce;
    /**
     * Limit price
     */
    limit_price: number;
    /**
     * Stop price
     */
    stop_price: number;
    /**
     * Filled average price
     */
    filled_avg_price: number;
    /**
     * The status of the order
     */
    status: OrderStatus;
    /**
     * If true, eligible for execution outside regular trading hours.
     */
    extended_hours: boolean;
    /**
     * When querying non-simple order_class orders in a nested style, an array of Order
     * entities associated with this order. Otherwise, null.
     */
    legs: Order[];
    /**
     * The dollar value away from the high water mark for trailing stop orders.
     */
    trail_price: number;
    /**
     * The percent value away from the high water mark for trailing stop orders.
     */
    trail_percent: number;
    /**
     * The highest (lowest) market price seen since the trailing stop order was submitted.
     */
    hwm: number;
}
/**
 * Timeseries data for equity and profit loss information of the account
 */
export interface PortfolioHistory {
    /**
     * time of each data element, left-labeled (the beginning of time window)
     */
    timestamp: number[];
    /**
     * equity value of the account in dollar amount as of the end of each time window
     */
    equity: number[];
    /**
     * profit/loss in dollar from the base value
     */
    profit_loss: number[];
    /**
     * profit/loss in percentage from the base value
     */
    profit_loss_pct: number[];
    /**
     * basis in dollar of the profit loss calculation
     */
    base_value: number;
    /**
     * time window size of each data element
     */
    timeframe: string;
}
/**
 * A position with unparsed fields, exactly as Alpaca provides it.
 * We encourage you to use the Position interface, which has many of these fields parsed.
 */
export interface RawPosition {
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
export declare type PositionSide = 'long' | 'short';
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
    asset_id: string;
    /**
     * Symbol name of the asset
     */
    symbol: string;
    /**
     * Exchange name of the asset
     */
    exchange: string;
    /**
     * Asset class name
     */
    asset_class: string;
    /**
     * Average entry price of the position
     */
    avg_entry_price: number;
    /**
     * The number of shares
     */
    qty: number;
    /**
     * long or short
     */
    side: PositionSide;
    /**
     * Total dollar amount of the position
     */
    market_value: number;
    /**
     * Total cost basis in dollar
     */
    cost_basis: number;
    /**
     * Unrealized profit/loss in dollars
     */
    unrealized_pl: number;
    /**
     * Unrealized profit/loss percent (by a factor of 1)
     */
    unrealized_plpc: number;
    /**
     * Unrealized profit/loss in dollars for the day
     */
    unrealized_intraday_pl: number;
    /**
     * Unrealized profit/loss percent (by a factor of 1)
     */
    unrealized_intraday_plpc: number;
    /**
     * Current asset price per share
     */
    current_price: number;
    /**
     * Last day's asset price per share based on the closing value of the last trading day
     */
    lastday_price: number;
    /**
     * Percent change from last day price (by a factor of 1)
     */
    change_today: number;
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
export declare type ActivityType = 
/**
 * Order fills (both partial and full fills)
 */
'FILL'
/**
 * Cash transactions (both CSD and CSR)
 */
 | 'TRANS'
/**
 * Miscellaneous or rarely used activity types (All types except those in TRANS, DIV,
 * or FILL)
 */
 | 'MISC'
/**
 * ACATS IN/OUT (Cash)
 */
 | 'ACATC'
/**
 * ACATS IN/OUT (Securities)
 */
 | 'ACATS'
/**
 * Cash disbursement(+)
 */
 | 'CSD'
/**
 * Cash receipt(-)
 */
 | 'CSR'
/**
 * Dividends
 */
 | 'DIV'
/**
 * Dividend (capital gain long term)
 */
 | 'DIVCGL'
/**
 * Dividend (capital gain short term)
 */
 | 'DIVCGS'
/**
 * Dividend fee
 */
 | 'DIVFEE'
/**
 * Dividend adjusted (Foreign Tax Withheld)
 */
 | 'DIVFT'
/**
 * Dividend adjusted (NRA Withheld)
 */
 | 'DIVNRA'
/**
 * Dividend return of capital
 */
 | 'DIVROC'
/**
 * Dividend adjusted (Tefra Withheld)
 */
 | 'DIVTW'
/**
 * Dividend (tax exempt)
 */
 | 'DIVTXEX'
/**
 * Interest (credit/margin)
 */
 | 'INT'
/**
 * Interest adjusted (NRA Withheld)
 */
 | 'INTNRA'
/**
 * Interest adjusted (Tefra Withheld)
 */
 | 'INTTW'
/**
 * Journal entry
 */
 | 'JNL'
/**
 * Journal entry (cash)
 */
 | 'JNLC'
/**
 * Journal entry (stock)
 */
 | 'JNLS'
/**
 * Merger/Acquisition
 */
 | 'MA'
/**
 * Name change
 */
 | 'NC'
/**
 * Option assignment
 */
 | 'OPASN'
/**
 * Option expiration
 */
 | 'OPEXP'
/**
 * Option exercise
 */
 | 'OPXRC'
/**
 * Pass Thru Charge
 */
 | 'PTC'
/**
 * Pass Thru Rebate
 */
 | 'PTR'
/**
 * Reorg CA
 */
 | 'REORG'
/**
 * Symbol change
 */
 | 'SC'
/**
 * Stock spinoff
 */
 | 'SSO'
/**
 * Stock split
 */
 | 'SSP';
export interface RawTradeActivity {
    activity_type: Extract<ActivityType, 'FILL'>;
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
    activity_type: Exclude<ActivityType, 'FILL'>;
    id: string;
    date: string;
    net_amount: string;
    symbol: string;
    qty: string;
    per_share_amount: string;
}
export declare type TradeActivityType = 'fill' | 'partial_fill';
export declare type TradeActivitySide = 'buy' | 'sell';
export interface TradeActivity {
    /**
     * Get the raw data, exactly as it came from Alpaca
     */
    raw(): RawTradeActivity;
    /**
     * FILL
     */
    activity_type: Extract<ActivityType, 'FILL'>;
    /**
     * The cumulative quantity of shares involved in the execution.
     */
    cum_qty: number;
    /**
     * An id for the activity. Always in "::" format. Can be sent as page_token in requests
     * to facilitate the paging of results.
     */
    id: string;
    /**
     * For partially_filled orders, the quantity of shares that are left to be filled.
     */
    leaves_qty: number;
    /**
     * The per-share price that the trade was executed at.
     */
    price: number;
    /**
     * The number of shares involved in the trade execution.
     */
    qty: number;
    /**
     * buy or sell
     */
    side: TradeActivitySide;
    /**
     * The symbol of the security being traded.
     */
    symbol: string;
    /**
     * The time at which the execution occurred.
     */
    transaction_time: string;
    /**
     * The id for the order that filled.
     */
    order_id: string;
    /**
     * fill or partial_fill
     */
    type: TradeActivityType;
}
export interface NonTradeActivity {
    /**
     * Get the raw data, exactly as it came from Alpaca
     */
    raw(): RawNonTradeActivity;
    /**
     * Activity type
     */
    activity_type: Exclude<ActivityType, 'FILL'>;
    /**
     * An ID for the activity, always in "::" format. Can be sent as page_token in requests
     * to facilitate the paging of results.
     */
    id: string;
    /**
     * The date on which the activity occurred or on which the transaction associated with
     * the activity settled.
     */
    date: string;
    /**
     * The net amount of money (positive or negative) associated with the activity.
     */
    net_amount: number;
    /**
     * The symbol of the security involved with the activity. Not present for all activity
     * types.
     */
    symbol: string;
    /**
     * For dividend activities, the number of shares that contributed to the payment. Not
     * present for other activity types.
     */
    qty: number;
    /**
     * For dividend activities, the average amount paid per share. Not present for other
     * activity types.
     */
    per_share_amount: number;
}
export declare type RawActivity = RawTradeActivity | RawNonTradeActivity;
export declare type Activity = TradeActivity | NonTradeActivity;
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
    /**
     * account ID
     */
    account_id: string;
    /**
     * the content of this watchlist, in the order as registered by the client
     */
    assets: Asset[];
    /**
     * When the watchlist was created
     */
    created_at: string;
    /**
     * watchlist id
     */
    id: string;
    /**
     * user-defined watchlist name (up to 64 characters)
     */
    name: string;
    /**
     * When the watchlist was last updated
     */
    updated_at: string;
}
