# alpaca

![version](https://img.shields.io/github/package-json/v/117/alpaca?color=196DFF&style=flat-square)
![language](https://img.shields.io/github/languages/code-size/117/alpaca?color=F1A42E&style=flat-square)
![maintenance](https://img.shields.io/github/workflow/status/117/alpaca/continuous-integration?style=flat-square)
![prettier](https://img.shields.io/static/v1?label=code%20style&message=prettier&color=ff51bc&style=flat-square)

A TypeScript Node.js library for the https://alpaca.markets REST API and
WebSocket streams.

## Contents

- [Features](#features)
- [Install](#install)
- [Client](#client)
- [Stream](#stream)

## Features

- [x] Fully asynchronous API.
- [x] Extensible `Client` and `Stream` classes.
- [x] Built-in rate limiting.
- [x] A 1:1 mapping of the official Alpaca [docs](https://docs.alpaca.markets/).

## Install

From NPM:

```cmd
> npm i @master-chief/alpaca
```

### Client

#### Creating a new client

If you wish to use env vars, populate these fields with `process.env` on your
own.

```typescript
import { Client } from "@master-chief/alpaca"

const client = new Client({
  credentials: {
    key: "...",
    secret: "...",
  },
  paper: true,
  rate_limit: true,
});
```

#### Examples

The following methods are available on the client.

- [isAuthenticated](#isauthenticated)
- [getAccount](#getaccount)
- [getOrder](#getorder)
- [getOrders](#getorders)
- [placeOrder](#placeorder)
- [replaceOrder](#replaceorder)
- [cancelOrder](#cancelorder)
- [cancelOrders](#cancelorders)
- [getPosition](#getposition)
- [getPositions](#getpositions)
- [closePosition](#closePosition)
- [closePositions](#closePositions)
- [getAsset](#getasset)
- [getAssets](#getassets)
- [getWatchlist](#getwatchlist)
- [getWatchlists](#getwatchlists)
- [createWatchlist](#createwatchlist)
- [updateWatchlist](#updatewatchlist)
- [addToWatchlist](#addtowatchlist)
- [removeFromWatchlist](#removefromwatchlist)
- [deleteWatchlist](#deletewatchlist)
- [getCalendar](#getcalendar)
- [getClock](#getclock)
- [getAccountConfigurations](#getAccountConfigurations)
- [updateAccountConfigurations](#updateAccountConfigurations)
- [getAccountActivities](#getAccountActivities)
- [getPortfolioHistory](#getPortfolioHistory)
- [getBars](#getbars)
- [getLastTrade](#getlasttrade)
- [getLastQuote](#getlastquote)

##### isAuthenticated

```typescript
await client.isAuthenticated();
```

##### getAccount

```typescript
await client.getAccount();
```

##### getOrder

```typescript
await client.getOrder({
  order_id: "6187635d-04e5-485b-8a94-7ce398b2b81c",
});
```

##### getOrders

```typescript
await client.getOrders({
  limit: 25,
  status: "all",
});
```

##### placeOrder

```typescript
await client.placeOrder({
  symbol: "SPY",
  qty: 1,
  side: "buy",
  type: "market",
  time_in_force: "day",
});
```

##### replaceOrder

```typescript
await client.replaceOrder({
  order_id: "69a3db8b-cc63-44da-a26a-e3cca9490308",
  limit_price: 9.74,
});
```

##### cancelOrder

```typescript
await client.cancelOrder({
  order_id: "69a3db8b-cc63-44da-a26a-e3cca9490308",
});
```

##### cancelOrders

```typescript
await client.cancelOrders();
```

##### getPosition

```typescript
await client.getPosition({ symbol: "SPY" });
```

##### getPositions

```typescript
await client.getPositions();
```

##### closePosition

```typescript
await client.closePosition({ symbol: "SPY" });
```

##### closePositions

```typescript
await client.closePositions();
```

##### getAsset

```typescript
await client.getAsset({ asset_id_or_symbol: "SPY" });
```

##### getAssets

```typescript
await client.getAssets({ status: "active" });
```

##### getWatchlist

```typescript
await client.getWatchlist({ uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128" });
```

##### getWatchlists

```typescript
await client.getWatchlists();
```

##### createWatchlist

```typescript
await client.createWatchlist({
  name: "my watchlist",
  symbols: ["SPY", "DIA", "EEM", "XLF"],
});
```

##### updateWatchlist

```typescript
await client.updateWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
  name: "new watchlist name",
  symbols: ["TSLA", "AAPL"],
});
```

##### addToWatchlist

```typescript
await client.addToWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
  symbol: "F",
});
```

##### removeFromWatchlist

```typescript
await client.removeFromWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
  symbol: "F",
});
```

##### deleteWatchlist

```typescript
await client.deleteWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
});
```

##### getCalender

```typescript
await client.getCalendar({ start: new Date(), end: new Date() });
```

##### getClock

```typescript
await client.getClock();
```

##### getAccountConfigurations

```typescript
await client.getAccountConfigurations();
```

##### updateAccountConfigurations

```typescript
await client.updateAccountConfigurations({
  no_shorting: true,
  suspend_trade: true,
});
```

##### getAccountActivities

```typescript
await client.getAccountActivities({
  activity_type: "FILL",
});
```

##### getPortfolioHistory

```typescript
await client.getPortfolioHistory({
  period: "1D",
  timeframe: "1Min",
});
```

##### getBars

```typescript
await client.getBars({
  symbols: ["SPY", "DIA", "XLF"],
});
```

##### getLastTrade

```typescript
await client.getLastTrade({
  symbol: "SPY",
});
```

##### getLastQuote

```typescript
await client.getLastQuote({
  symbol: "SPY",
});
```

## Stream

#### Creating a new stream

If you wish to use env vars, populate these fields with `process.env` on your
own.

```typescript
import { Stream } from "@master-chief/alpaca"

const stream = new Stream({
  credentials: {
    key: "...",
    secret: "...",
  },
  stream: "market_data",
});
```

#### Events

| Event              | Stream        |
| :----------------- | :------------ |
| `aggregate_minute` | `market_data` |
| `quote`            | `market_data` |
| `trade`            | `market_data` |
| `trade_updates`    | `account`     |
| `account_updates`  | `account`     |

#### Examples

The following methods are available on the stream.

- [subscribe](#subscribe)
- [unsubscribe](#unsubscribe)
- [on](#on)

##### subscribe

```typescript
stream.subscribe(["AM.SPY"]);
```

##### unsubscribe

```typescript
stream.unsubscribe(["AM.SPY"]));
```

##### on

```typescript
stream.on("aggregate_minute", ...)
```

## Contributing

Pull requests are encouraged. 😁
