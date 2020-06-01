"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const client_1 = require("../lib/client");
const client = new client_1.Client({
    key: process.env.APCA_API_KEY_ID,
    secret: process.env.APCA_API_SECRET_KEY,
});
// todo: improve tests
ava_1.default('getAccount', async (test) => {
    await client
        .getAccount()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getOrders', async (test) => {
    await client
        .getOrders()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getOrder', async (test) => {
    await client
        .getOrder({
        order_id: 'some order id here',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('placeOrder', async (test) => {
    await client
        .placeOrder({
        symbol: 'SPY',
        qty: 1,
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('replaceOrder', async (test) => {
    await client
        .replaceOrder({
        order_id: 'some order id here',
        qty: 2,
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('cancelOrder', async (test) => {
    await client
        .cancelOrder({ order_id: 'an order id here' })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('cancelOrders', async (test) => {
    await client
        .cancelOrders()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getPosition', async (test) => {
    await client
        .getPosition({ symbol: 'SPY' })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getPositions', async (test) => {
    await client
        .getPositions()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('closePosition', async (test) => {
    await client
        .closePosition({ symbol: 'SPY' })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('closePositions', async (test) => {
    await client
        .closePositions()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getAssets', async (test) => {
    await client
        .getAssets({ status: 'active' })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getAsset', async (test) => {
    await client
        .getAsset({ asset_id_or_symbol: 'SPY' })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getWatchlist', async (test) => {
    await client
        .getWatchlist({
        watchlist_id: 'test',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getWatchlists', async (test) => {
    await client
        .getWatchlists()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('createWatchlist', async (test) => {
    await client
        .createWatchlist({
        name: 'test',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('updateWatchlist', async (test) => {
    await client
        .updateWatchlist({
        watchlist_id: 'test',
        name: 'test',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('addToWatchlist', async (test) => {
    await client
        .addToWatchlist({
        watchlist_id: 'test',
        symbol: 'SPY',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('removeFromWatchlist', async (test) => {
    await client
        .removeFromWatchlist({
        watchlist_id: 'test',
        symbol: 'SPY',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('deleteWatchlist', async (test) => {
    await client
        .deleteWatchlist({
        watchlist_id: 'test',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getCalendar', async (test) => {
    await client
        .getCalendar()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getAccountConfigurations', async (test) => {
    await client
        .getAccountConfigurations()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('updateAccountConfigurations', async (test) => {
    await client
        .updateAccountConfigurations({})
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getAccountActivities', async (test) => {
    await client
        .getAccountActivities({
        activity_type: 'FILL',
    })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getPortfolioHistory', async (test) => {
    await client
        .getPortfolioHistory()
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getBars', async (test) => {
    await client
        .getBars({ symbols: ['SPY'] })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getLastTrade', async (test) => {
    await client
        .getLastTrade({ symbol: 'SPY' })
        .then(() => test.pass())
        .catch(test.fail);
});
ava_1.default('getLastQuote', async (test) => {
    await client
        .getLastQuote({ symbol: 'SPY' })
        .then(() => test.pass())
        .catch(test.fail);
});
