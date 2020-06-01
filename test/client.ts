import ava from 'ava'

import { Client } from '../lib/client'

const client = new Client({
  key: process.env.APCA_API_KEY_ID,
  secret: process.env.APCA_API_SECRET_KEY,
})

// todo: improve tests

ava('getAccount', async (test) => {
  await client
    .getAccount()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getOrders', async (test) => {
  await client
    .getOrders()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getOrder', async (test) => {
  await client
    .getOrder({
      order_id: 'some order id here',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('placeOrder', async (test) => {
  await client
    .placeOrder({
      symbol: 'SPY',
      qty: 1,
      side: 'buy',
      type: 'market',
      time_in_force: 'day',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('replaceOrder', async (test) => {
  await client
    .replaceOrder({
      order_id: 'some order id here',
      qty: 2,
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('cancelOrder', async (test) => {
  await client
    .cancelOrder({ order_id: 'an order id here' })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('cancelOrders', async (test) => {
  await client
    .cancelOrders()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getPosition', async (test) => {
  await client
    .getPosition({ symbol: 'SPY' })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getPositions', async (test) => {
  await client
    .getPositions()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('closePosition', async (test) => {
  await client
    .closePosition({ symbol: 'SPY' })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('closePositions', async (test) => {
  await client
    .closePositions()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getAssets', async (test) => {
  await client
    .getAssets({ status: 'active' })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getAsset', async (test) => {
  await client
    .getAsset({ asset_id_or_symbol: 'SPY' })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getWatchlist', async (test) => {
  await client
    .getWatchlist({
      watchlist_id: 'test',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getWatchlists', async (test) => {
  await client
    .getWatchlists()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('createWatchlist', async (test) => {
  await client
    .createWatchlist({
      name: 'test',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('updateWatchlist', async (test) => {
  await client
    .updateWatchlist({
      watchlist_id: 'test',
      name: 'test',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('addToWatchlist', async (test) => {
  await client
    .addToWatchlist({
      watchlist_id: 'test',
      symbol: 'SPY',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('removeFromWatchlist', async (test) => {
  await client
    .removeFromWatchlist({
      watchlist_id: 'test',
      symbol: 'SPY',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('deleteWatchlist', async (test) => {
  await client
    .deleteWatchlist({
      watchlist_id: 'test',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getCalendar', async (test) => {
  await client
    .getCalendar()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getAccountConfigurations', async (test) => {
  await client
    .getAccountConfigurations()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('updateAccountConfigurations', async (test) => {
  await client
    .updateAccountConfigurations({})
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getAccountActivities', async (test) => {
  await client
    .getAccountActivities({
      activity_type: 'FILL',
    })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getPortfolioHistory', async (test) => {
  await client
    .getPortfolioHistory()
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getBars', async (test) => {
  await client
    .getBars({ symbols: ['SPY'] })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getLastTrade', async (test) => {
  await client
    .getLastTrade({ symbol: 'SPY' })
    .then(() => test.pass())
    .catch(test.fail)
})

ava('getLastQuote', async (test) => {
  await client
    .getLastQuote({ symbol: 'SPY' })
    .then(() => test.pass())
    .catch(test.fail)
})
