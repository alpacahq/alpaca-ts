# alpaca

![version](https://img.shields.io/github/package-json/v/117/alpaca?color=196DFF&style=flat-square)
![code](https://img.shields.io/github/languages/code-size/117/alpaca?color=F1A42E&style=flat-square&label=size)
![build](https://img.shields.io/github/workflow/status/117/alpaca/test?style=flat-square)
![prettier](https://img.shields.io/static/v1?label=style&message=prettier&color=ff51bc&style=flat-square)

A TypeScript Node.js library for the https://alpaca.markets REST API and
WebSocket streams.

## Contents

- [Features](#features)
- [Install](#install)
- [Client](#client)
- [Stream](#stream)
- [Common Issues](#common-issues)
- [Examples](#examples)
- [Contributing](#contributing)

## Features

- [x] Fully typed.
- [x] Fully asynchronous promise based API.
- [x] Extensible `AlpacaClient` and `AlpacaStream` classes.
- [x] Built-in rate limiting.
- [x] Built-in number and date parsing.
- [x] A 1:1 mapping of the official Alpaca [docs](https://docs.alpaca.markets/).
- [x] Auto-transpiled modern ESM alternative.
- [x] OAuth integration support.
- [x] Minified and non-minified bundles.
- [x] Various bundles provided:
  - `alpaca.js` - ESM bundle (for node)
  - `alpaca.bundle.js` - ESM bundle with dependencies (for node)
  - `alpaca.browser.js` - UMD bundle (for browser)
  - `alpaca.browser.modern.js` - ESM modern bundle (for browser)

## Install

From NPM:

```cmd
> npm i @master-chief/alpaca
```

From GitHub:

- [CommonJS](./dist/cjs)
- [Typescript](./src)
- [ES](./dist/mjs)
- [ES bundled ](./dist/alpaca.js)
- [ES bundled with dependencies](./dist/alpaca.bundle.js)
- [ES6 + UMD (classic)](./dist/alpaca.browser.js)
- [ES6 + ESM (modern) ](./dist/alpaca.browser.modern.js)

From these popular CDNs:

- [UNPKG](https://unpkg.com/browse/@master-chief/alpaca/)
- [JSDelivr](https://cdn.jsdelivr.net/npm/@master-chief/alpaca/)
- [SkyPack](https://cdn.skypack.dev/@master-chief/alpaca)

## Import

Import with CommonJS:

```typescript
let { AlpacaClient, AlpacaStream } = require('@master-chief/alpaca')
```

Import with ESM:

```typescript
import { AlpacaClient, AlpacaStream } from '@master-chief/alpaca'
```

Import as script:

```html
<script src="https://unpkg.com/@master-chief/alpaca/dist/alpaca.browser.min.js"></script>
```

Import as module:

```html
<script type="module">
  import alpaca from 'alpaca.browser.modern.min.js'
</script>
```

## Client

### Creating a new client

If you wish to use env vars, populate these fields with `process.env` on your
own. Paper account key detection is automatic. Using OAuth? Simply pass an
`access_token` in the credentials object.

```typescript
const client = new AlpacaClient({
  credentials: {
    key: 'xxxxxx',
    secret: 'xxxxxxxxxxxx',
    // access_token: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    paper: true,
  },
  rate_limit: true,
})
```

### Built-in parsing

Alpaca provides numbers as strings. From
[their docs](https://alpaca.markets/docs/api-documentation/api-v2/#numbers):

> Decimal numbers are returned as strings to preserve full precision across
> platforms. When making a request, it is recommended that you also convert your
> numbers to strings to avoid truncation and precision errors.

This package provides numbers as `number` instead, and date strings as `Date`
objects which is what most developers want out of the box. If you want the
original data, as it came from Alpaca, you can call `raw()` on any entity.

```javascript
const account = await client.getAccount()

console.log(typeof account.buying_power) // number
console.log(typeof account.raw().buying_power) // string
```

### Methods

The following methods are available on the client.

#### Account

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

#### Market Data v1

- [getLastTrade_v1](#getLastTrade_v1)
- [getLastQuote_v1](#getLastQuote_v1)
- [getBars_v1](#getBars_v1)

#### Market Data v2

- [getTrades](#getTrades)
- [getQuotes](#getQuotes)
- [getBars](#getBars)
- [getSnapshot](#getSnapshot)
- [getSnapshots](#getSnapshots)

#### isAuthenticated

```typescript
await client.isAuthenticated()
```

#### getAccount

```typescript
await client.getAccount()
```

#### getOrder

```typescript
await client.getOrder({ order_id: '6187635d-04e5-485b-8a94-7ce398b2b81c' })
```

#### getOrders

```typescript
await client.getOrders({ limit: 25, status: 'all' })
```

#### placeOrder

```typescript
await client.placeOrder({
  symbol: 'SPY',
  qty: 1,
  // or
  // notional: 100,
  side: 'buy',
  type: 'market',
  time_in_force: 'day',
})
```

#### replaceOrder

```typescript
await client.replaceOrder({
  order_id: '69a3db8b-cc63-44da-a26a-e3cca9490308',
  limit_price: 9.74,
})
```

#### cancelOrder

```typescript
await client.cancelOrder({ order_id: '69a3db8b-cc63-44da-a26a-e3cca9490308' })
```

#### cancelOrders

```typescript
await client.cancelOrders()
```

#### getPosition

```typescript
await client.getPosition({ symbol: 'SPY' })
```

#### getPositions

```typescript
await client.getPositions()
```

#### closePosition

```typescript
await client.closePosition({ symbol: 'SPY' })
```

#### closePositions

```typescript
await client.closePositions()
```

#### getAsset

```typescript
await client.getAsset({ asset_id_or_symbol: 'SPY' })
```

#### getAssets

```typescript
await client.getAssets({ status: 'active' })
```

#### getWatchlist

```typescript
await client.getWatchlist({ uuid: '2000e463-6f87-41c0-a8ba-3e40cbf67128' })
```

#### getWatchlists

```typescript
await client.getWatchlists()
```

#### createWatchlist

```typescript
await client.createWatchlist({
  name: 'my watchlist',
  symbols: ['SPY', 'DIA', 'EEM', 'XLF'],
})
```

#### updateWatchlist

```typescript
await client.updateWatchlist({
  uuid: '2000e463-6f87-41c0-a8ba-3e40cbf67128',
  name: 'new watchlist name',
  symbols: ['TSLA', 'AAPL'],
})
```

#### addToWatchlist

```typescript
await client.addToWatchlist({
  uuid: '2000e463-6f87-41c0-a8ba-3e40cbf67128',
  symbol: 'F',
})
```

#### removeFromWatchlist

```typescript
await client.removeFromWatchlist({
  uuid: '2000e463-6f87-41c0-a8ba-3e40cbf67128',
  symbol: 'F',
})
```

#### deleteWatchlist

```typescript
await client.deleteWatchlist({ uuid: '2000e463-6f87-41c0-a8ba-3e40cbf67128' })
```

#### getCalendar

```typescript
await client.getCalendar({ start: new Date(), end: new Date() })
```

#### getClock

```typescript
await client.getClock()
```

#### getAccountConfigurations

```typescript
await client.getAccountConfigurations()
```

#### updateAccountConfigurations

```typescript
await client.updateAccountConfigurations({
  no_shorting: true,
  suspend_trade: true,
})
```

#### getAccountActivities

```typescript
await client.getAccountActivities({ activity_type: 'FILL' })
```

#### getPortfolioHistory

```typescript
await client.getPortfolioHistory({ period: '1D', timeframe: '1Min' })
```

#### getLastTrade_v1

```typescript
await client.getLastTrade_v1({ symbol: 'SPY' })
```

#### getLastQuote_v1

```typescript
await client.getLastQuote_v1({ symbol: 'SPY' })
```

#### getBars_v1

```typescript
await client.getBars_v1({ symbols: ['SPY', 'DIA', 'XLF'], timeframe: '1Min' })
```

#### getTrades

##### Basic

```typescript
await client.getTrades({
  symbol: 'SPY',
  start: new Date('2021-02-26T14:30:00.007Z'),
  end: new Date('2021-02-26T14:35:00.007Z'),
})
```

##### Paginated

```typescript
let trades = []
let page_token = ''

// until the next token we receive is null
while (page_token != null) {
  let resp = await client.getTrades({ ..., page_token })
  trades.push(...resp.trades)
  page_token = resp.next_page_token
}

// wooh! we have collected trades from multiple pages
console.log(trades.length)
```

#### getQuotes

##### Basic

```typescript
await client.getQuotes({
  symbol: 'SPY',
  start: new Date('2021-02-26T14:30:00.007Z'),
  end: new Date('2021-02-26T14:35:00.007Z'),
})
```

##### Paginated

```typescript
let quotes = []
let page_token = ''

// until the next token we receive is null
while (page_token != null) {
  let resp = await client.getQuotes({ ..., page_token })
  quotes.push(...resp.quotes)
  page_token = resp.next_page_token
}

// wooh! we have collected quotes from multiple pages
console.log(quotes.length)
```

#### getBars

##### Basic

```typescript
await client.getBars({
  symbol: 'SPY',
  start: new Date('2021-02-26T14:30:00.007Z'),
  end: new Date('2021-02-26T14:35:00.007Z'),
  timeframe: '1Min',
  // page_token: "MjAyMS0wMi0wNlQxMzowOTo0Mlo7MQ=="
})
```

##### Paginated

```typescript
let bars = []
let page_token = ''

// until the next token we receive is null
while (page_token != null) {
  let resp = await client.getBars({ ..., page_token })
  bars.push(...resp.bars)
  page_token = resp.next_page_token
}

// wooh! we have collected bars from multiple pages
console.log(bars.length)
```

#### getSnapshot

```typescript
await client.getSnapshot({ symbol: 'SPY' })
```

#### getSnapshots

```typescript
await client.getSnapshots({ symbols: ['SPY', 'DIA'] })
```

## Stream

### Creating a new stream

If you wish to use env vars, populate these fields with `process.env` on your
own.

```typescript
import { AlpacaStream } from '@master-chief/alpaca'

const stream = new AlpacaStream({
  credentials: {
    key: 'xxxxxx',
    secret: 'xxxxxxxxxxxx',
    paper: true,
  },
  type: 'market_data', // or "account"
  source: 'iex', // or "sip" depending on your subscription
})
```

### Methods

The following methods are available on the stream.

- [subscribe](#subscribe)
- [unsubscribe](#unsubscribe)
- [on](#on)
- [getConnection](#getConnection)

### Channels

| Channel         | Type          |
| :-------------- | :------------ |
| `trade_updates` | `account`     |
| `trades`        | `market_data` |
| `quotes`        | `market_data` |
| `bars`          | `market_data` |

#### subscribe

```typescript
stream.once('authenticated', () =>
  stream.subscribe('bars', ['SPY', 'AAPL', 'TSLA']),
)
```

#### unsubscribe

```typescript
stream.unsubscribe('bars', ['SPY'])
```

#### on

```typescript
stream.on('message', (message) => console.log(message))
stream.on('trade', (trade) => console.log(trade))
stream.on('bar', (bar) => console.log(bar))
stream.on('quote', (quote) => console.log(quote))
stream.on('trade_updates', (update) => console.log(update))
stream.on('error', (error) => console.warn(error))
```

#### getConnection
```typescript
stream.getConnection()
```

## Common Issues

If you are having difficulty getting Jest to work with this library, add this to your configuration:

```js
moduleNameMapper: {
  '@master-chief/alpaca': '<rootDir>/node_modules/@master-chief/alpaca/dist/cjs/index.cjs',
},
```

Credit to [@calvintwr](https://github.com/calvintwr) and [@wailinkyaww](https://github.com/wailinkyaww) for finding this solution.

## Examples

Don't know where to start? Check out our community-made examples
[here](./example).

## Contributing

Feel free to contribute and PR to your 💖's content.
