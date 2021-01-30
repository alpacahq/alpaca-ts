// buys a random stock

// To run:
// node sample.js

// You can use any of the following

// import { AlpacaClient } from '../dist/mjs/index.js'
// import { AlpacaClient } from '../dist/alpaca.js'
// import { AlpacaClient } from '../dist/alpaca.min.js'
// import { AlpacaClient } from '../dist/alpaca.bundle.js'
import { AlpacaClient } from '../dist/alpaca.bundle.min.js'

const client = new AlpacaClient({
  credentials: {
    key: 'xxxxxx',
    secret: 'xxxxxxxxxxxx',
  },
})

client
  .getAssets({
    status: 'active',
  })
  .then((assets) => console.log(assets))
//   client
//     .placeOrder({
//       symbol: assets[Math.floor(Math.random() * assets.length)].symbol,
//       side: 'buy',
//       type: 'market',
//       time_in_force: 'day',
//       qty: 1,
//     })
//     .catch((error) => console.error(error)),
// )
