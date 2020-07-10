import WebSocket from 'ws'

import { EventEmitter } from 'events'
import { URL } from './url'

export declare interface Stream {
  on<U extends keyof StreamEvents>(event: U, listener: StreamEvents[U]): this
  emit<U extends keyof StreamEvents>(
    event: U,
    ...args: Parameters<StreamEvents[U]>
  ): boolean
}

export declare interface StreamEvents {
  open: (connection: Stream) => void
  close: (connection: Stream) => void
  authenticated: (connection: Stream) => void
  error: (error: Error) => void
  message: (data: Object) => void
  trade: (data: Object) => void
  trade_updates: (data: Object) => void
  account_updates: (data: Object) => void
  quote: (data: Object) => void
  aggregate_minute: (data: Object) => void
}

export class Stream extends EventEmitter {
  public subscriptions: string[] = []
  public connection: WebSocket
  public authenticated: boolean = false

  constructor(
    protected params: {
      credentials: {
        key: string
        secret: string
      }
      host: URL
    }
  ) {
    // Makes a new event emitter :D
    super()

    // if we haven't made a connection, create one now
    this.connection = new WebSocket(params.host)

      // Emits when the websocket is open
      .once('open', () => {
        // Sends an authentication request if you aren't authorized yet
        if (!this.authenticated)
          this.connection.send(
            JSON.stringify({
              action: 'authenticate',
              data: {
                key_id: params.credentials.key,
                secret_key: params.credentials.secret,
              },
            })
          )

        // Emits the open event
        this.emit('open', this)
      })

      // Emit a close event on websocket close.
      .once('close', () => this.emit('close', this))

      // listen to incoming messages
      .on('message', (message) => {
        // Parses the object
        const object = JSON.parse(message.toString())

        // if the state is pending auth and this is an auth message, change the state
        // < {"stream":"authorization","data":{"action":"authenticate","status":"authorized"}}
        if ('stream' in object && object.stream == 'authorization')
          if (object.data.status == 'authorized')
            // all good :D
            (this.authenticated = true),
              this.emit('authenticated', this),
              console.log('Connected to the websocket.')
          else {
            // Closes the connection
            this.connection.close()

            // Then throws an error
            throw new Error(
              'There was an error in authorizing your websocket connection. Object received: ' +
                JSON.stringify(object, null, 2)
            )
          }

        // callback regardless of whether or not we acted on the message above
        this.emit('message', object)

        // call any of the convenience methods that apply to this message
        if ('stream' in object)
          this.emit(
            {
              trade_updates: 'trade_updates',
              account_updates: 'account_updates',
              T: 'trade',
              Q: 'quote',
              AM: 'aggregate_minute',
            }[(object.stream as String).split('.')[0]],
            object.data
          )
      })

      // Emits an error event.
      .on('error', (err: Error) => this.emit('error', err))
  }

  /**
   * Sends a message to the connected websocket.
   * @param message The message itself
   */
  send(message: any): this {
    // You need to be authenticated to send further messages
    if (!this.authenticated) {
      throw new Error("You can't send a message until you are authenticated!")
    }

    // convert object to json
    if (typeof message == 'object') {
      message = JSON.stringify(message)
    }

    // Sends the message.
    this.connection.send(message)

    // Returns instance, making this chainable
    return this
  }

  /**
   * Subscribes to channels
   * @param channels The channels you want to subscribe to
   */
  subscribe(channels: string[]): this {
    // Adds a subscription
    this.subscriptions.push(...channels)

    // Sends a message specifying to subscribe.
    return this.send(
      JSON.stringify({
        action: 'listen',
        data: {
          streams: channels,
        },
      })
    )
  }

  /**
   * Unsubscribes from given channels
   * @param channels The channels you want to unsubscribe from
   */
  unsubscribe(channels: string[]): this {
    // Removes these channels
    for (let i = 0, ln = this.subscriptions.length; i < ln; i++)
      if (channels.includes(this.subscriptions[i]))
        this.subscriptions.splice(i, 1)

    // Send the removal to the websocket
    return this.send(
      JSON.stringify({
        action: 'unlisten',
        data: {
          streams: channels,
        },
      })
    )
  }
}
