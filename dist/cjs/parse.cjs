"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
function account(rawAccount) {
    if (!rawAccount) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawAccount), { raw: function () { return rawAccount; }, buying_power: this.parseNumber(rawAccount.buying_power), regt_buying_power: this.parseNumber(rawAccount.regt_buying_power), daytrading_buying_power: this.parseNumber(rawAccount.daytrading_buying_power), cash: this.parseNumber(rawAccount.cash), created_at: new Date(rawAccount.created_at), portfolio_value: this.parseNumber(rawAccount.portfolio_value), multiplier: this.parseNumber(rawAccount.multiplier), equity: this.parseNumber(rawAccount.equity), last_equity: this.parseNumber(rawAccount.last_equity), long_market_value: this.parseNumber(rawAccount.long_market_value), short_market_value: this.parseNumber(rawAccount.short_market_value), initial_margin: this.parseNumber(rawAccount.initial_margin), maintenance_margin: this.parseNumber(rawAccount.maintenance_margin), last_maintenance_margin: this.parseNumber(rawAccount.last_maintenance_margin), sma: this.parseNumber(rawAccount.sma), status: rawAccount.status });
    }
    catch (err) {
        throw new Error("Account parsing failed. " + err.message);
    }
}
function clock(rawClock) {
    if (!rawClock) {
        return undefined;
    }
    try {
        return {
            raw: function () { return rawClock; },
            timestamp: new Date(rawClock.timestamp),
            is_open: rawClock.is_open,
            next_open: new Date(rawClock.next_open),
            next_close: new Date(rawClock.next_close)
        };
    }
    catch (err) {
        throw new Error("Order parsing failed. " + err.message);
    }
}
function order(rawOrder) {
    if (!rawOrder) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawOrder), { raw: function () { return rawOrder; }, created_at: new Date(rawOrder.created_at), updated_at: new Date(rawOrder.updated_at), submitted_at: new Date(rawOrder.submitted_at), filled_at: new Date(rawOrder.filled_at), expired_at: new Date(rawOrder.expired_at), canceled_at: new Date(rawOrder.canceled_at), failed_at: new Date(rawOrder.failed_at), replaced_at: new Date(rawOrder.replaced_at), qty: this.parseNumber(rawOrder.qty), filled_qty: this.parseNumber(rawOrder.filled_qty), type: rawOrder.type, side: rawOrder.side, time_in_force: rawOrder.time_in_force, limit_price: this.parseNumber(rawOrder.limit_price), stop_price: this.parseNumber(rawOrder.stop_price), filled_avg_price: this.parseNumber(rawOrder.filled_avg_price), status: rawOrder.status, legs: this.parseOrders(rawOrder.legs), trail_price: this.parseNumber(rawOrder.trail_price), trail_percent: this.parseNumber(rawOrder.trail_percent), hwm: this.parseNumber(rawOrder.hwm) });
    }
    catch (err) {
        throw new Error("Order parsing failed. " + err.message);
    }
}
function orders(rawOrders) {
    var _this = this;
    return rawOrders
        ? rawOrders.map(function (order) { return _this.parseOrder(order); })
        : undefined;
}
function position(rawPosition) {
    if (!rawPosition) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawPosition), { raw: function () { return rawPosition; }, avg_entry_price: this.parseNumber(rawPosition.avg_entry_price), qty: this.parseNumber(rawPosition.qty), side: rawPosition.side, market_value: this.parseNumber(rawPosition.market_value), cost_basis: this.parseNumber(rawPosition.cost_basis), unrealized_pl: this.parseNumber(rawPosition.unrealized_pl), unrealized_plpc: this.parseNumber(rawPosition.unrealized_plpc), unrealized_intraday_pl: this.parseNumber(rawPosition.unrealized_intraday_pl), unrealized_intraday_plpc: this.parseNumber(rawPosition.unrealized_intraday_plpc), current_price: this.parseNumber(rawPosition.current_price), lastday_price: this.parseNumber(rawPosition.lastday_price), change_today: this.parseNumber(rawPosition.change_today) });
    }
    catch (err) {
        throw new Error("Position parsing failed. " + err.message);
    }
}
function positions(rawPositions) {
    var _this = this;
    return rawPositions
        ? rawPositions.map(function (pos) { return _this.parsePosition(pos); })
        : undefined;
}
function tradeActivity(rawTradeActivity) {
    if (!rawTradeActivity) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawTradeActivity), { raw: function () { return rawTradeActivity; }, cum_qty: this.parseNumber(rawTradeActivity.cum_qty), leaves_qty: this.parseNumber(rawTradeActivity.leaves_qty), price: this.parseNumber(rawTradeActivity.price), qty: this.parseNumber(rawTradeActivity.qty), side: rawTradeActivity.side, type: rawTradeActivity.type });
    }
    catch (err) {
        throw new Error("TradeActivity parsing failed. " + err.message);
    }
}
function nonTradeActivity(rawNonTradeActivity) {
    if (!rawNonTradeActivity) {
        return undefined;
    }
    try {
        return __assign(__assign({}, rawNonTradeActivity), { raw: function () { return rawNonTradeActivity; }, net_amount: this.parseNumber(rawNonTradeActivity.net_amount), qty: this.parseNumber(rawNonTradeActivity.qty), per_share_amount: this.parseNumber(rawNonTradeActivity.per_share_amount) });
    }
    catch (err) {
        throw new Error("NonTradeActivity parsing failed. " + err.message);
    }
}
function activities(rawActivities) {
    var _this = this;
    if (!rawActivities) {
        return undefined;
    }
    try {
        return rawActivities.map(function (rawActivity) {
            return rawActivity.activity_type === 'FILL'
                ? _this.parseTradeActivity(rawActivity)
                : _this.parseNonTradeActivity(rawActivity);
        });
    }
    catch (err) {
        throw new Error("Activity parsing failed. " + err.message);
    }
}
exports["default"] = {
    account: account,
    activities: activities,
    clock: clock,
    nonTradeActivity: nonTradeActivity,
    order: order,
    orders: orders,
    position: position,
    positions: positions,
    tradeActivity: tradeActivity
};
