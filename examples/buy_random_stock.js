let { AlpacaClient } = require('@master-chief/alpaca')

// wrap async to make use of await
;(async () => {
  // build the alpaca client
  const client = new AlpacaClient({
    credentials: {
      key: '***',
      secret: '******',
    },
    rate_limit: true,
  })

  // get the active asset list
  let assets = await client.getAssets({
      status: 'active',
    }),
    // pick a stock randomly
    stock = assets[Math.floor(Math.random() * assets.length)].symbol

  // buy the stock
  client
    .placeOrder({
      symbol: stock.symbol,
      side: 'buy',
      type: 'market',
      time_in_force: 'day',
      qty: 1,
    })
    .catch((error) => console.log(error))
})()
