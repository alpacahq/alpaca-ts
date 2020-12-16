import WebSocket from 'ws'
import urls from './urls.js'

import { EventEmitter } from 'events'
import {
  AccountUpdate,
  AggregateMinute,
  DefaultCredentials,
  Quote,
  Trade,
  TradeUpdate,
} from './entities.js'

export declare interface AlpacaStream {
  on<U extends keyof AlpacaStreamEvents>(
    event: U,
    listener: AlpacaStreamEvents[U],
  ): this
  emit<U extends keyof AlpacaStreamEvents>(
    event: U,
    ...args: Parameters<AlpacaStreamEvents[U]>
  ): boolean
}

export declare interface AlpacaStreamEvents {
  open: (connection: AlpacaStream) => void
  close: (connection: AlpacaStream) => void
  authenticated: (connection: AlpacaStream) => void
  error: (error: Error) => void
  message: (data: Object) => void
  trade: (data: Trade) => void
  trade_updates: (data: TradeUpdate) => void
  account_updates: (data: AccountUpdate) => void
  quote: (data: Quote) => void
  aggregate_minute: (data: AggregateMinute) => void
}

export class AlpacaStream extends EventEmitter {
  private host: string
  private connection: WebSocket
  private subscriptions: string[] = []
  private authenticated: boolean = false

  constructor(
    protected params: {
      credentials: DefaultCredentials
      stream: 'account' | 'market_data'
    },
  ) {
    // construct EventEmitter
    super()

    // assign the host we will connect to
    switch (params.stream) {
      case 'account':
        this.host = params.credentials.key.startsWith('PK')
          ? urls.websocket.account_paper
          : urls.websocket.account
        break
      case 'market_data':
        this.host = urls.websocket.market_data
        break
      default:
        this.host = 'unknown'
    }

    this.connection = new WebSocket(this.host)
      .once('open', () => {
        // if we are not authenticated yet send a request now
        if (!this.authenticated) {
          this.connection.send(
            JSON.stringify({
              action: 'authenticate',
              data: {
                key_id: params.credentials.key,
                secret_key: params.credentials.secret,
              },
            }),
          )
        }

        // pass the open
        this.emit('open', this)
      })
      // pass the close
      .once('close', () => this.emit('close', this))
      .on('message', (message) => {
        // parse the incoming message
        const object = JSON.parse(message.toString())

        // if the message is an authorization response
        if ('stream' in object && object.stream == 'authorization') {
          if (object.data.status == 'authorized') {
            this.authenticated = true
            this.emit('authenticated', this)
            console.log('Connected to the websocket.')
          } else {
            this.connection.close()
            throw new Error(
              'There was an error in authorizing your websocket connection. Object received: ' +
                JSON.stringify(object, null, 2),
            )
          }
        }

        // pass the message
        this.emit('message', object)

        // emit based on the stream
        if ('stream' in object) {
          this.emit(
            {
              trade_updates: 'trade_updates',
              account_updates: 'account_updates',
              T: 'trade',
              Q: 'quote',
              AM: 'aggregate_minute',
            }[(object.stream as String).split('.')[0]],
            object.data,
          )
        }
      })
      // pass the error
      .on('error', (err: Error) => this.emit('error', err))
  }

  send(message: any): this {
    // don't bother if we aren't authenticated yet
    if (!this.authenticated) {
      throw new Error("You can't send a message until you are authenticated!")
    }

    // if the message is in object form, stringify it for the user
    if (typeof message == 'object') {
      message = JSON.stringify(message)
    }

    // send it off
    this.connection.send(message)

    // chainable return
    return this
  }

  subscribe(channels: string[]): this {
    // add these channels internally
    this.subscriptions.push(...channels)

    // try to subscribe to them
    return this.send(
      JSON.stringify({
        action: 'listen',
        data: {
          streams: channels,
        },
      }),
    )
  }

  unsubscribe(channels: string[]): this {
    // remove these channels internally
    for (let i = 0, ln = this.subscriptions.length; i < ln; i++) {
      if (channels.includes(this.subscriptions[i])) {
        this.subscriptions.splice(i, 1)
      }
    }

    // try to unsubscribe from them
    return this.send(
      JSON.stringify({
        action: 'unlisten',
        data: {
          streams: channels,
        },
      }),
    )
  }
}
