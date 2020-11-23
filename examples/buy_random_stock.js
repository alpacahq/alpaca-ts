let { AlpacaClient } = require('@master-chief/alpaca')

const client = new AlpacaClient({
  credentials: {
    key: '***',
    secret: '******',
  },
  rate_limit: true,
})

async function run() {
  let assets = await client.getAssets({
      status: 'active',
    }),
    random = assets[Math.floor(Math.random() * assets.length)]

  client
    .placeOrder({
      symbol: random.symbol,
      side: 'buy',
      type: 'market',
      time_in_force: 'day',
      qty: 1,
    })
    .catch((error) => console.log(error))
}

run()
