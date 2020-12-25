// buys a random stock

const alpaca = require('@master-chief/alpaca')
const client = new alpaca.AlpacaClient({
  credentials: {
    key: 'xxxxxx',
    secret: 'xxxxxxxxxxxx',
  },
})

client
  .getAssets({
    status: 'active',
  })
  .then((assets) =>
    client
      .placeOrder({
        symbol: assets[Math.floor(Math.random() * assets.length)].symbol,
        side: 'buy',
        type: 'market',
        time_in_force: 'day',
        qty: 1,
      })
      .catch((error) => console.error(error)),
  )
