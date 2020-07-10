export interface Account {
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
