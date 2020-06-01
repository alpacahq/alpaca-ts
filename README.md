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

| Server           | URL                                | Enum                   |
| :--------------- | :--------------------------------- | :--------------------- |
| AccountStream    | `wss://api.alpaca.markets/stream`  | `URL.AccountStream`    |
| MarketDataStream | `wss://data.alpaca.markets/stream` | `URL.MarketDataStream` |

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

| Type   | Method                        | Returns                          | Example                                     |
| :----- | :---------------------------- | :------------------------------- | :------------------------------------------ |
| Client | `getAccount`                  | `Promise<Account>`               | [See Example](#getAccount)                  |
| Client | `getOrder`                    | `Promise<Order>`                 | [See Example](#getOrder)                    |
| Client | `getOrders`                   | `Promise<Order[]>`               | [See Example](#getOrders)                   |
| Client | `placeOrder`                  | `Promise<Order>`                 | [See Example](#placeOrder)                  |
| Client | `replaceOrder`                | `Promise<Order>`                 | [See Example](#replaceOrder)                |
| Client | `cancelOrder`                 | `Promise<Order>`                 | [See Example](#cancelOrder)                 |
| Client | `cancelOrders`                | `Promise<void>`                  | [See Example](#cancelOrders)                |
| Client | `getPosition`                 | `Promise<Position>`              | [See Example](#getPosition)                 |
| Client | `getPositions`                | `Promise<Position[]>`            | [See Example](#getPositions)                |
| Client | `closePosition`               | `Promise<Order>`                 | [See Example](#closePosition)               |
| Client | `closePositions`              | `Promise<Order[]>`               | [See Example](#closePositions)              |
| Client | `getAsset`                    | `Promise<Asset>`                 | [See Example](#getAsset)                    |
| Client | `getAssets`                   | `Promise<Asset[]>`               | [See Example](#getAssets)                   |
| Client | `getWatchlist`                | `Promise<Watchlist>`             | [See Example](#getWatchlist)                |
| Client | `getWatchlists`               | `Promise<Watchlist[]>`           | [See Example](#getWatchlists)               |
| Client | `createWatchlist`             | `Promise<Watchlist[]>`           | [See Example](#createWatchlist)             |
| Client | `updateWatchlist`             | `Promise<Watchlist>`             | [See Example](#updateWatchlist)             |
| Client | `addToWatchlist`              | `Promise<Watchlist>`             | [See Example](#addToWatchlist)              |
| Client | `removeFromWatchlist`         | `Promise<void>`                  | [See Example](#removeFromWatchlist)         |
| Client | `deleteWatchlist`             | `Promise<void>`                  | [See Example](#deleteWatchlist)             |
| Client | `getCalendar`                 | `Promise<Calendar>`              | [See Example](#getCalendar)                 |
| Client | `getClock`                    | `Promise<Clock>`                 | [See Example](#getClock)                    |
| Client | `getAccountConfigurations`    | `Promise<AccountConfigurations>` | [See Example](#getAccountConfigurations)    |
| Client | `updateAccountConfigurations` | `Promise<AccountConfigurations>` | [See Example](#updateAccountConfigurations) |
| Client | `getAccountActivities`        | `Promise<Array<...>[]>`          | [See Example](#getAccountActivities)        |
| Client | `getPortfolioHistory`         | `Promise<PortfolioHistory>`      | [See Example](#getPortfolioHistory)         |
| Client | `getBars`                     | `Promise<Bars<Bar>>`             | [See Example](#getBars)                     |
| Client | `getLastTrade`                | `Promise<LastTradeResponse>`     | [See Example](#getLastTrade)                |
| Client | `getLastQuote`                | `Promise<LastQuoteResponse>`     | [See Example](#getLastQuote)                |

Examples are coming soon... give me the rest of the week. :)
