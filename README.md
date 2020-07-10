# alpaca

![Version](https://img.shields.io/github/package-json/v/117/alpaca?color=196DFF&style=flat-square)
![Language](https://img.shields.io/github/languages/code-size/117/alpaca?color=F1A42E&style=flat-square)
![Maintenance](https://img.shields.io/maintenance/yes/2020?style=flat-square)
![Prettier(idk)](https://img.shields.io/static/v1?label=code%20style&message=prettier&color=ff51bc&style=flat-square)

A TypeScript Node.js library for the <https://alpaca.markets> REST API and
WebSocket streams.

## Contents

- [Install](#install)
- [Client](#client)
- [Stream](#stream)
- [Contribute](#contribute)

## Install

From NPM:

```cmd
> npm i @master-chief/alpaca
```

From GitHub:

```cmd
> npm i 117/alpaca
```

## Client

```typescript
import * as alpaca from "@master-chief/alpaca";

let client = new alpaca.Client({
  credentials: {
    key: "mykey",
    secret: "mysecret",
  },
  paper: true,
  rate_limit: true,
});
```

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

### isAuthenticated

```typescript
await client.isAuthenticated();
```

### getAccount

```typescript
await client.getAccount();
```

### getOrder

```typescript
await client.getOrder({
  order_id: "6187635d-04e5-485b-8a94-7ce398b2b81c",
});
```

### getOrders

```typescript
await client.getOrders({
  limit: 25,
  status: "all",
});
```

### placeOrder

```typescript
await client.placeOrder({
  symbol: "SPY",
  qty: 1,
  side: "buy",
  type: "market",
  time_in_force: "day",
});
```

### replaceOrder

```typescript
await client.replaceOrder({
  order_id: "69a3db8b-cc63-44da-a26a-e3cca9490308",
  limit_price: 9.74,
});
```

### cancelOrder

```typescript
await client.cancelOrder({
  order_id: "69a3db8b-cc63-44da-a26a-e3cca9490308",
});
```

### cancelOrders

```typescript
await client.cancelOrders();
```

### getPosition

```typescript
await client.getPosition({ symbol: "SPY" });
```

### getPositions

```typescript
await client.getPositions();
```

### closePosition

```typescript
await client.closePosition({ symbol: "SPY" });
```

### closePositions

```typescript
await client.closePositions();
```

### getAsset

```typescript
await client.getAsset({ asset_id_or_symbol: "SPY" });
```

### getAssets

```typescript
await client.getAssets({ status: "active" });
```

### getWatchlist

```typescript
await client.getWatchlist({ uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128" });
```

### getWatchlists

```typescript
await client.getWatchlists();
```

### createWatchlist

```typescript
await client.createWatchlist({
  name: "my watchlist",
  symbols: ["SPY", "DIA", "EEM", "XLF"],
});
```

### updateWatchlist

```typescript
await client.updateWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
  name: "new watchlist name",
  symbols: ["TSLA", "AAPL"],
});
```

### addToWatchlist

```typescript
await client.addToWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
  symbol: "F",
});
```

### removeFromWatchlist

```typescript
await client.removeFromWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
  symbol: "F",
});
```

### deleteWatchlist

```typescript
await client.deleteWatchlist({
  uuid: "2000e463-6f87-41c0-a8ba-3e40cbf67128",
});
```

### getCalender

```typescript
await client.getCalendar({ start: new Date(), end: new Date() });
```

### getClock

```typescript
await client.getClock();
```

### getAccountConfigurations

```typescript
await client.getAccountConfigurations();
```

### updateAccountConfigurations

```typescript
await client.updateAccountConfigurations({
  no_shorting: true,
  suspend_trade: true,
});
```

### getAccountActivities

```typescript
await client.getAccountActivities({
  activity_type: "FILL",
});
```

### getPortfolioHistory

```typescript
await client.getPortfolioHistory({
  period: "1D",
  timeframe: "1Min",
});
```

### getBars

```typescript
await client.getBars({
  symbols: ["SPY", "DIA", "XLF"],
});
```

### getLastTrade

```typescript
await client.getLastTrade({
  symbol: "SPY",
});
```

### getLastQuote

```typescript
await client.getLastQuote({
  symbol: "SPY",
});
```

## Stream

> Note: Each key is allowed only 1 simultaneous connection to each host.

```typescript
import * as alpaca from "@master-chief/alpaca";

let stream = new alpaca.Stream({
  credentials: {
    key: "mykey",
    secret: "mysecret",
  },
  host: alpaca.URL.WSS_MARKET_DATA,
});
```

The following events are available on the market data stream.

- [aggregate_minute](#aggregate_minute)
- [quote](#quote)
- [trade](#trade)

### aggregate_minute

```typescript
stream.on("authenticated", () => stream.subscribe(["AM.SPY"]));
stream.on("aggregate_minute", console.log);
```

### quote

```typescript
stream.on("authenticated", () => stream.subscribe(["Q.SPY"]));
stream.on("quote", console.log);
```

### trade

```typescript
stream.on("authenticated", () => stream.subscribe(["T.SPY"]));
stream.on("trade", console.log);
```

### trade

```typescript
stream.on("authenticated", () => stream.subscribe(["T.SPY"]));
stream.on("trade", console.log);
```

The following events are available on the account stream.

- [trade_updates](#trade_updates)
- [account_updates](#account_updates)

### trade_updates

```typescript
stream.on("authenticated", () => stream.subscribe(["trade_updates"]));
stream.on("trade_updates", console.log);
```

### account_updates

```typescript
stream.on("authenticated", () => stream.subscribe(["account_updates"]));
stream.on("account_updates", console.log);
```

## Contribute

Pull requests are encouraged. 😁
