// buys a random stock

// import { AlpacaClient } from '../dist/alpaca.esm.mjs'
import { AlpacaClient } from '../dist/mjs/index'
const client = new AlpacaClient({
  credentials: {
    key: 'PK2MPYPSYO0CEXQW0S1D',
    secret: 'k1oEGdu75wbEpccgevjdfEHrzZ6tg2hgvnqTLXnk',
    // key: 'xxxxxx',
    // secret: 'xxxxxxxxxxxx',
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
