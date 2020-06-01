> **WARNING** This project is brand-new! Only a few days old. Give me some time
> to make it production-ready. Right now there may be a few bugs I missed.

# alpaca-trade-api-ts

![](https://badgen.net/npm/v/repeat?color=0061FF)
![](https://badgen.net/badge/code%20style/prettier/ff51bc)

A TypeScript Node.js library for the Alpaca.markets API.

## Installation

```console
$ npm install 117/alpaca-trade-api-ts@latest
```

## Client

```typescript
import { Client } from 'alpaca-trade-api-ts'

const client = new Client({
  key: 'yourKeyGoesHere', // optional
  secret: 'yourKeyGoesHere', // optional
})
```

You can also use environment variables which will be automatically applied to
every new client.

```console
$ APCA_API_KEY_ID=yourKeyGoesHere
$ APCA_API_SECRET_KEY=yourKeyGoesHere
```

## Stream

Your API key allows 1 simultaneous connection to each server.

| Server             | URL                                | Enum                   |
| :----------------- | :--------------------------------- | :--------------------- |
| `AccountStream`    | `wss://api.alpaca.markets/stream`  | `URL.AccountStream`    |
| `MarketDataStream` | `wss://data.alpaca.markets/stream` | `URL.MarketDataStream` |

Connecting to these servers is easy.

```typescript
import { Stream, URL } from 'alpaca-trade-api-ts'

const stream = new Stream(client, { host: URL.MarketDataStream })

// to see subscription success notifications use .onMessage()
stream.subscribe(['T.SPY'])

// will get called on each new trade event for SPY
stream.onTrade((trade) => {
  console.log(trade)
})
```

## Methods

These are all the methods supported by the package.

| Type     | Method                         | Example                                     |
| :------- | :----------------------------- | :------------------------------------------ |
| `Client` | `getAccount`                   | [See Example](#getAccount)                  |
| `Client` | `getOrder`                     | [See Example](#getOrder)                    |
| `Client` | `getOrders`                    | [See Example](#getOrders)                   |
| `Client` | `placeOrder`                   | [See Example](#placeOrder)                  |
| `Client` | `replaceOrder`                 | [See Example](#replaceOrder)                |
| `Client` | `cancelOrder`                  | [See Example](#cancelOrder)                 |
| `Client` | `cancelOrders`                 | [See Example](#cancelOrders)                |
| `Client` | `getPosition`                  | [See Example](#getPosition)                 |
| `Client` | `getPositions`                 | [See Example](#getPositions)                |
| `Client` | `closePosition`                | [See Example](#closePosition)               |
| `Client` | `closePositions`               | [See Example](#closePositions)              |
| `Client` | `getAsset`                     | [See Example](#getAsset)                    |
| `Client` | `getAssets`                    | [See Example](#getAssets)                   |
| `Client` | `getWatchlist`                 | [See Example](#getWatchlist)                |
| `Client` | `getWatchlists`                | [See Example](#getWatchlists)               |
| `Client` | `createWatchlist`              | [See Example](#createWatchlist)             |
| `Client` | `updateWatchlist`              | [See Example](#updateWatchlist)             |
| `Client` | `addToWatchlist`               | [See Example](#addToWatchlist)              |
| `Client` | `removeFromWatchlist`          | [See Example](#removeFromWatchlist)         |
| `Client` | `deleteWatchlist`              | [See Example](#deleteWatchlist)             |
| `Client` | `getCalendar`                  | [See Example](#getCalendar)                 |
| `Client` | `getClock`                     | [See Example](#getClock)                    |
| `Client` | `getAccountConfigurations`     | [See Example](#getAccountConfigurations)    |
| `Client` | `updateAccountConfigurations`  | [See Example](#updateAccountConfigurations) |
| `Client` | `getAccountActivities`         | [See Example](#getAccountActivities)        |
| `Client` | `getPortfolioHistory`          | [See Example](#getPortfolioHistory)         |
| `Client` | `getBars`                      | [See Example](#getBars)                     |
| `Client` | `getLastTrade`                 | [See Example](#getLastTrade)                |
| `Client` | `getLastQuote`                 | [See Example](#getLastQuote)                |
|          | ...and more, working on README |                                             |

### getAccount [(docs reference)](https://alpaca.markets/docs/api-documentation/api-v2/account/)

Returns the account associated with the credentials provided.

```typescript
client
  .getAccount()
  .then((account) => {
    console.log(`You have $${account.cash} in cash.`)
    console.log(`You have $${account.buying_power} in buying power.`)
  })
  .catch((error) => console.log(error))
```

### getOrder [(docs reference)](https://alpaca.markets/docs/api-documentation/api-v2/orders/)

Retrieves a single order for the given order_id.

```typescript
client
  .getOrder({
    order_id: '6187635d-04e5-485b-8a94-7ce398b2b81c',
  })
  .then((order) => {
    console.log(
      `Order ${order.side} ${order.qty} ${order.symbol} @ $${order.filled_avg_price}.`
    )
  })
  .catch((error) => console.log(error))
```

More examples are coming soon... give me some time or feel free to contribute.
