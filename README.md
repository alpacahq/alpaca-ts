# alpaca-trade-api-ts

![](https://img.shields.io/github/package-json/v/117/alpaca-trade-api-ts?color=196DFF&style=flat-square)
![](https://img.shields.io/maintenance/yes/2020?style=flat-square)
![](https://img.shields.io/static/v1?label=code%20style&message=prettier&color=ff51bc&style=flat-square)

A TypeScript Node.js library for the https://alpaca.markets REST API and WebSocket streams.

## Installation

```console
$ npm install 117/alpaca-trade-api-ts
```

## Client

> **New feature!** Built in rate-limiter, just pass `rate_limit: true` into client options.

```typescript
import { Client } from 'alpaca-trade-api-ts'

const client = new Client({
  key: 'yourKeyGoesHere',
  secret: 'yourKeyGoesHere',
  rate_limit: true,
})
```

You can also use environment variables which will be automatically applied to
every new client.

```console
$ APCA_API_KEY_ID=yourKeyGoesHere
$ APCA_API_SECRET_KEY=yourKeyGoesHere
$ APCA_PAPER=true
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

const stream = new Stream(client, {
  host: URL.MarketDataStream,
})

// to see all stream messages use .onMessage
stream.subscribe(['T.SPY'])

// will get called on each new trade event for SPY
stream.onTrade((trade) => {
  console.log(trade)
})
```

## Methods

These are all the methods supported by the package.

- [getAccount](#getAccount)  
- [getOrder](#getOrder)  
- [getOrders](#getOrders)  
- [placeOrder](#placeOrder)  
- ... and more

### getAccount

```typescript
client
  .getAccount()
  .then((account) => {
    console.log(`You have $${account.cash} in cash.`)
    console.log(`You have $${account.buying_power} in buying power.`)
  })
  .catch((error) => console.log(error))
```

### getOrder

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

### getOrders

```typescript
client
  .getOrders({
    limit: 25,
    status: 'all',
  })
  .then((orders) => console.log(`Found ${orders.length} order(s).`))
  .catch((error) => console.log(error))
```

### placeOrder

```typescript
client
  .placeOrder({
    symbol: 'SPY',
    qty: 1,
    side: 'buy',
    type: 'market',
    time_in_force: 'day',
  })
  .then((order) => console.log(`New order placed with ID ${order.id}.`))
  .catch((error) => console.log(error))
```

More examples are coming soon... give me some time or feel free to contribute.

## Contribute

Pull requests are encouraged. 😁
