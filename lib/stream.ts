import WebSocket from 'ws'

import { Client } from './client'

import {
  Message,
  WebSocketState,
  TradeUpdate,
  AccountUpdate,
  AggregateMinute,
  Quote,
  Trade,
} from './entities'

export class Stream {
  private __connection: WebSocket
  private __state: WebSocketState = WebSocketState.NOT_CONNECTED
  private __message_queue: string[] = []
  private __subscriptions: string[] = []

  private __on_message: (message: Message) => void = () => null
  private __on_trade: (event: Trade) => void = () => null
  private __on_quote: (event: Quote) => void = () => null
  private __on_aggregate_minute: (event: AggregateMinute) => void = () => null
  private __on_account_update: (event: AccountUpdate) => void = () => null
  private __on_trade_update: (event: TradeUpdate) => void = () => null

  constructor(
    private client: Client,
    public options: {
      host: string
      reconnect?: boolean
      reconnectWarmupInSeconds?: number
      verbose?: boolean
    }
  ) {
    // bind our provided options to the defaults
    this.options = Object.bind(
      {
        host: options.host,
        reconnect: true,
        // did not write a back-off strategy because 30 seconds has always worked well for me
        reconnectWarmupInSeconds: 30,
        verbose: true,
      },
      options
    )

    // connection management task
    setInterval(async () => {
      // if pending a reconnection
      if (this.__state == WebSocketState.CLOSED_PENDING_RECONNECT) {
        // warmup so we don't hit any rate limit
        // todo: add a back-off strategy with increasing delay
        await new Promise((resolve) =>
          setTimeout(resolve, options.reconnectWarmupInSeconds * 1e3)
        )
      }

      // do nothing, no reconnect was specified
      if (this.__state == WebSocketState.CLOSED_NO_RECONNECT) {
        return
      }

      // we don't bother if there is nothing in the message queue
      if (!this.__message_queue.length) {
        return
      }

      // if we haven't made a connection, create one now
      if (!this.__connection) {
        this.__connection = new WebSocket(options.host)
        this.__connection.once(
          'open',
          () => (this.__state = WebSocketState.PENDING_AUTHORIZATION)
        )

        // handle a close by terminating the connection
        this.__connection.once('close', () => {
          // if no reconnect is specified, we use a special state
          if (!options.reconnect) {
            this.__state = WebSocketState.CLOSED_NO_RECONNECT
          }
          // we are now waiting for the next chance to reconnect
          this.__state = WebSocketState.CLOSED_PENDING_RECONNECT
          // undefine the connection so it will be re-made on the next tick
          this.__connection = undefined
        })

        // listen to incoming messages
        this.__connection.on('message', (message) => {
          const object = JSON.parse(message.toString())
          // if the state is pending auth and this is an auth message, change the state
          if (this.__state == WebSocketState.PENDING_AUTHORIZATION) {
            // < {"stream":"authorization","data":{"action":"authenticate","status":"authorized"}}
            if ('stream' in object && object['stream'] == 'authorization') {
              if (object['data']['status'] == 'authorized') {
                // all good :D
                this.__state = WebSocketState.CONNECTED
              } else {
                // decide how to handle failed authorizations? idk yet
              }
            }
          }

          // callback regardless of whether or not we acted on the message above
          this.__on_message(object)

          // call any of the convenience methods that apply to this message
          if ('stream' in object) {
            switch ((object['stream'] as String).split('.')[0]) {
              case 'trade_updates':
                this.__on_trade_update(object['data'])
                break
              case 'account_updates':
                this.__on_account_update(object['data'])
                break
              case 'T':
                this.__on_trade(object['data'])
                break
              case 'Q':
                this.__on_quote(object['data'])
                break
              case 'AM':
                this.__on_aggregate_minute(object['data'])
                break
            }
          }
        })

        // for now handle errors by just sending them to the callback
        // in the future we may need a strategy here
        this.__connection.once('error', () => this.__on_message)
      }

      // depending on the state, perform different actions
      switch (this.__state) {
        case WebSocketState.PENDING_AUTHORIZATION:
          // here we attempt to authenticate
          this.__connection.send(
            JSON.stringify({
              action: 'authenticate',
              data: {
                key_id: client.options.key,
                secret_key: client.options.secret,
              },
            })
          )
          break
        case WebSocketState.CONNECTED:
          // we are connected and authenticated at this point
          // attempt to clear the message queue
          for (var i = 0; i < this.__message_queue.length; i++) {
            this.__connection.send(this.__message_queue.shift())
          }
          break
      }
    }, 1000)
  }

  send(message: any) {
    // convert it to a string if it's an object
    if (!(message instanceof String)) {
      message = JSON.stringify(message)
    }
    // queue the message
    this.__message_queue.push(message)
  }

  subscribe(channels: string[]) {
    this.__subscriptions.push(...channels)
    this.send({
      action: 'listen',
      data: {
        streams: channels,
      },
    })
  }

  unsubscribe(channels: string[]) {
    // remove these channels
    this.__subscriptions = this.__subscriptions.filter(
      (channel) => !channels.includes(channel)
    )

    // send the removal
    this.send({
      action: 'unlisten',
      data: {
        streams: channels,
      },
    })
  }

  onTrade(callback: (event: Trade) => void) {
    this.__on_trade = callback
  }

  onQuote(callback: (event: Quote) => void) {
    this.__on_quote = callback
  }

  onAggregateMinute(callback: (event: AggregateMinute) => void) {
    this.__on_aggregate_minute = callback
  }

  onTradeUpdate(callback: (event: TradeUpdate) => void) {
    this.__on_trade_update = callback
  }

  onAccountUpdate(callback: (event: AccountUpdate) => void) {
    this.__on_account_update = callback
  }

  onMessage(callback: (message: Message) => void) {
    this.__on_message = callback
  }
}
