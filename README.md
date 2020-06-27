# alpaca-trade-api-ts

![](https://img.shields.io/github/package-json/v/117/alpaca-trade-api-ts?color=196DFF&style=flat-square)
![](https://img.shields.io/github/languages/code-size/117/alpaca-trade-api-ts?color=F1A42E&style=flat-square)
![](https://img.shields.io/maintenance/yes/2020?style=flat-square)
![](https://img.shields.io/static/v1?label=code%20style&message=prettier&color=ff51bc&style=flat-square)

A TypeScript Node.js library for the https://alpaca.markets REST API and
WebSocket streams.

- [Client](#Client)
- [Stream](#Stream)
- [Methods](#Methods)

## Installation

```console
$ npm i 117/alpaca-trade-api-ts
```

## Client

```typescript
import * as alpaca from 'alpaca-trade-api-ts'

const client = new alpaca.Client({
  key: '...',
  secret: '...',
  paper: true,
  rate_limit: true,
})
```

You can also use environment variables which will be applied to
every new client.

```console
$ APCA_API_KEY_ID=yourKeyGoesHere
$ APCA_API_SECRET_KEY=yourKeyGoesHere
$ APCA_PAPER=true
```

Due to the asynchronous nature of the client we recommended you listen
for interrupts.

```typescript
// allow pending promises to resolve before exiting the process.
process.on('SIGTERM', async () => await client.close())
```

## Stream

An API key is allowed 1 simultaneous connection to each server.

| URL                                | Enum                       |
| :--------------------------------- | :------------------------- |
| `wss://api.alpaca.markets/stream`  | `BaseURL.AccountStream`    |
| `wss://data.alpaca.markets/stream` | `BaseURL.MarketDataStream` |

Connecting to them is easy.

```typescript
import * as alpaca from 'alpaca-trade-api-ts'

const stream = new alpaca.Stream(client, {
  host: alpaca.BaseURL.MarketDataStream,
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
- [replaceOrder](#replaceOrder)
- [cancelOrder](#cancelOrder)
- [cancelOrders](#cancelOrders)
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

### replaceOrder

```typescript
client
  .replaceOrder({
    order_id: '69a3db8b-cc63-44da-a26a-e3cca9490308',
    limit_price: 9.74,
  })
  .then((order) => console.log(`Order with ID ${order.id} has been replaced.`))
  .catch((error) => console.log(error))
```

### cancelOrder

```typescript
client
  .cancelOrder({
    order_id: '69a3db8b-cc63-44da-a26a-e3cca9490308',
  })
  .then((order) => console.log(`Order with ID ${order.id} has been cancelled.`))
  .catch((error) => console.log(error))
```

### cancelOrders

```typescript
client
  .cancelOrders()
  .then((orders) =>
    orders.forEach((order) =>
      console.log(`Order with ID ${order.id} has been cancelled.`)
    )
  )
  .catch((error) => console.log(error))
```

More examples are coming soon... give me some time or feel free to contribute.

## Contribute

Pull requests are encouraged. 😁
