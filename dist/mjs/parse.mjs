function account(input) {
    try {
        return {
            ...input,
            raw: () => input,
            buying_power: parseFloat(input.buying_power),
            regt_buying_power: parseFloat(input.regt_buying_power),
            daytrading_buying_power: parseFloat(input.daytrading_buying_power),
            cash: parseFloat(input.cash),
            created_at: new Date(input.created_at),
            portfolio_value: parseFloat(input.portfolio_value),
            multiplier: parseFloat(input.multiplier),
            equity: parseFloat(input.equity),
            last_equity: parseFloat(input.last_equity),
            long_market_value: parseFloat(input.long_market_value),
            short_market_value: parseFloat(input.short_market_value),
            initial_margin: parseFloat(input.initial_margin),
            maintenance_margin: parseFloat(input.maintenance_margin),
            last_maintenance_margin: parseFloat(input.last_maintenance_margin),
            sma: parseFloat(input.sma),
            status: input.status,
        };
    }
    catch (error) {
        throw new Error(`account parsing failed: ${error.message}`);
    }
}
function clock(input) {
    try {
        return {
            raw: () => input,
            timestamp: new Date(input.timestamp),
            is_open: input.is_open,
            next_open: new Date(input.next_open),
            next_close: new Date(input.next_close),
        };
    }
    catch (error) {
        throw new Error(`clock parsing failed: ${error.message}`);
    }
}
function order(input) {
    try {
        return {
            ...input,
            raw: () => input,
            created_at: new Date(input.created_at),
            updated_at: new Date(input.updated_at),
            submitted_at: new Date(input.submitted_at),
            filled_at: new Date(input.filled_at),
            expired_at: new Date(input.expired_at),
            canceled_at: new Date(input.canceled_at),
            failed_at: new Date(input.failed_at),
            replaced_at: new Date(input.replaced_at),
            qty: parseFloat(input.qty),
            filled_qty: parseFloat(input.filled_qty),
            type: input.type,
            side: input.side,
            time_in_force: input.time_in_force,
            limit_price: parseFloat(input.limit_price),
            stop_price: parseFloat(input.stop_price),
            filled_avg_price: parseFloat(input.filled_avg_price),
            status: input.status,
            legs: input.legs ? orders(input.legs) : [],
            trail_price: parseFloat(input.trail_price),
            trail_percent: parseFloat(input.trail_percent),
            hwm: parseFloat(input.hwm),
        };
    }
    catch (error) {
        throw new Error(`order parsing failed: ${error.message}`);
    }
}
function orders(input) {
    try {
        return input.map((value) => order(value));
    }
    catch (error) {
        throw new Error(`orders parsing failed: ${error.message}`);
    }
}
function position(rawPosition) {
    try {
        return {
            ...rawPosition,
            raw: () => rawPosition,
            avg_entry_price: parseFloat(rawPosition.avg_entry_price),
            qty: parseFloat(rawPosition.qty),
            side: rawPosition.side,
            market_value: parseFloat(rawPosition.market_value),
            cost_basis: parseFloat(rawPosition.cost_basis),
            unrealized_pl: parseFloat(rawPosition.unrealized_pl),
            unrealized_plpc: parseFloat(rawPosition.unrealized_plpc),
            unrealized_intraday_pl: parseFloat(rawPosition.unrealized_intraday_pl),
            unrealized_intraday_plpc: parseFloat(rawPosition.unrealized_intraday_plpc),
            current_price: parseFloat(rawPosition.current_price),
            lastday_price: parseFloat(rawPosition.lastday_price),
            change_today: parseFloat(rawPosition.change_today),
        };
    }
    catch (error) {
        throw new Error(`position parsing failed: ${error.message}`);
    }
}
function positions(input) {
    try {
        return input.map((pos) => position(pos));
    }
    catch (error) {
        throw new Error(`positions parsing failed: ${error.message}`);
    }
}
function tradeActivity(input) {
    try {
        return {
            ...input,
            raw: () => input,
            cum_qty: parseFloat(input.cum_qty),
            leaves_qty: parseFloat(input.leaves_qty),
            price: parseFloat(input.price),
            qty: parseFloat(input.qty),
            side: input.side,
            type: input.type,
        };
    }
    catch (error) {
        throw new Error(`trade activity parsing failed: Error: ${error.message}`);
    }
}
function nonTradeActivity(input) {
    try {
        return {
            ...input,
            raw: () => input,
            net_amount: parseFloat(input.net_amount),
            qty: parseFloat(input.qty),
            per_share_amount: parseFloat(input.per_share_amount),
        };
    }
    catch (err) {
        throw new Error(`non-trade activity parsing failed: ${err.message}`);
    }
}
function activities(input) {
    try {
        return input
            .map((value) => value.activity_type === 'FILL'
            ? tradeActivity(value)
            : nonTradeActivity(value))
            .filter(Boolean);
    }
    catch (error) {
        throw new Error(`activity parsing failed: ${error.message}`);
    }
}
export default {
    account,
    clock,
    order,
    orders,
    position,
    positions,
    tradeActivity,
    nonTradeActivity,
    activities,
};
