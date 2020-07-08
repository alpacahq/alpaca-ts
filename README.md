
# alpaca-trade-api-ts

![Version](https://img.shields.io/github/package-json/v/117/alpaca-trade-api-ts?color=196DFF&style=flat-square)
![Language](https://img.shields.io/github/languages/code-size/117/alpaca-trade-api-ts?color=F1A42E&style=flat-square)
![Maintenance](https://img.shields.io/maintenance/yes/2020?style=flat-square)
![Prettier(idk)](https://img.shields.io/static/v1?label=code%20style&message=prettier&color=ff51bc&style=flat-square)

A TypeScript Node.js library for the <https://alpaca.markets> REST API and
WebSocket streams.

**Table of Contents**

- [Installation](#installation)
- [Client](#alpacaclient)
  - [Initialization](#client)
  - [Methods](#methods)
    - [isAuthenticated](#isauthenticated)
    - [getAccount](#getaccount)
    - [getOrder](#getorder)
    - [getOrders](#getorders)
    - [placeOrder](#placeorder)
    - [replaceOrder](#replaceorder)
    - [cancelOrder](#cancelorder)
    - [cancelOrders](#cancelorders)
- [Stream](#stream)
  - [Initialization](#stream)
- [BaseURL](#baseurl)
- [Contribute](#contribute)

## Installation

```cmd
> npm i 117/alpaca-trade-api-ts
```

## Client

A client for handling all account based requests.

### Initialization

The standard way to initialize the client.

```typescript
// Import the Client
import { Client } from 'alpaca-trade-api-ts'

// The actual initialization
const client = new Client({
  key: '...',
  secret: '...',
  paper: true,
  rate_limit: true,
})
```

You can also use environment variables which will be applied to every new
client.

```cmd
> set APCA_API_KEY_ID=yourKeyGoesHere
> set APCA_API_SECRET_KEY=yourKeyGoesHere
> set APCA_PAPER=true
```

Due to the asynchronous nature of the client we recommended you listen for
interrupts.

```typescript
// Allow pending promises to resolve before exiting the process.
process.on('SIGINT', async () => {

  // Properly closes the client.
  await alpacaClient.close()

  // Then exits the process
  process.exit(0)
})
```

### Methods

All Client instance methods.

#### isAuthenticated

Checks if the client is authenticated.

```typescript
await client.isAuthenticated()
```

#### getAccount

Connects to an Alpaca account.

```typescript
await client.getAccount()
```

#### getOrder

Gets a specific order.

```typescript
await client.getOrder({
  order_id: '6187635d-04e5-485b-8a94-7ce398b2b81c',
})
```

#### getOrders

Gets all orders made by the client.

```typescript
await client.getOrders({
  limit: 25,
  status: 'all',
})
```

#### placeOrder

Places an order using your account.

```typescript
await client.placeOrder({
  symbol: 'SPY',
  qty: 1,
  side: 'buy',
  type: 'market',
  time_in_force: 'day',
})
```

#### replaceOrder

Re-places an order(to change some details maybe).

```typescript
await client.replaceOrder({
  order_id: '69a3db8b-cc63-44da-a26a-e3cca9490308',
  limit_price: 9.74,
})
```

#### cancelOrder

Cancels an order.

```typescript
await client.cancelOrder({
  order_id: '69a3db8b-cc63-44da-a26a-e3cca9490308',
})
```

#### cancelOrders

Cancels every single order(be sure to not make a typo here!)

```typescript
await client.cancelOrders()
```

> More examples are coming soon... give me some time or feel free to contribute.

## Stream

An Alpaca websocket API for streamlining the exchange of requests and data to and from the Alpaca servers.

### Initialization

An API key is allowed 1 simultaneous connection to each server. Connecting to them is easy:

```typescript
// Imports the Alpaca websocket stream API
import * as alpaca from 'alpaca-trade-api-ts';

const stream = new alpaca.Stream(alpacaClient, {
  host: alpaca.BaseURL.MarketDataStream,
})

// wait for authentication
stream.on('authenticated', () => {
  // subscribe to a channel
  stream.send({
    action: 'listen',
    data: {
      streams: ['AM.SPY'],
    },
  })

  // receive the messages
  stream.on('aggregate_minute', (message) => {
    console.log(message)
  })
})
```

## BaseURL

Contains 2 properties used for securing a connection to an Alpaca websocket:

| URL                                | Enum                       |
| :--------------------------------- | :------------------------- |
| `wss://api.alpaca.markets/stream`  | `BaseURL.AccountStream`    |
| `wss://data.alpaca.markets/stream` | `BaseURL.MarketDataStream` |

## Contribute

Pull requests are encouraged. 😁
