import WebSocket from 'ws';
import { EventEmitter } from "events";
import { Client } from './client';

import { WebSocketState } from './entities';

export class Stream extends EventEmitter {
  private connection: WebSocket
  private state: WebSocketState = WebSocketState.NOT_CONNECTED
  private messageQueue: string[] = []
  private subscriptions: string[] = []

  constructor(
    private client: Client,
    public options: {
      host: string
      reconnect?: boolean
      reconnectWarmupInSeconds?: number
      verbose?: boolean
    }
  ) {

    // Makes a new event emitter :D
    super();

    // Since host is required.
    if(!options.host)
      throw new Error("You need to provide a host url to connect to!\n(Don't forget you can only have 1 websocket per host ;)");

    // if pending a reconnection
    if (this.state == WebSocketState.CLOSED_PENDING_RECONNECT) {/// uhhhhh wth is this and what are you doing
      // warmup so we don't hit any rate limit
      // todo: add a back-off strategy with increasing delay
      const end = Date.now() + options.reconnectWarmupInSeconds * 1e3;
      while (Date.now() < end) true;
    }

    // do nothing, no reconnect was specified
    if (this.state == WebSocketState.CLOSED_NO_RECONNECT)
      return;

    // we don't bother if there is nothing in the message queue
    if (!this.messageQueue.length)
      return;

    // if we haven't made a connection, create one now
    if (!this.connection) {
      this.connection = new WebSocket(options.host).once(
        'open', () => (this.state = WebSocketState.PENDING_AUTHORIZATION)
      )

      // handle a close by terminating the connection
      this.connection.once('close', () => {
        // if no reconnect is specified, we use a special state
        if (!options.reconnect)
          return this.state = WebSocketState.CLOSED_NO_RECONNECT
        // we are now waiting for the next chance to reconnect
        this.state = WebSocketState.CLOSED_PENDING_RECONNECT
        // undefine the connection so it will be re-made on the next tick
        this.connection = undefined
      })

      // listen to incoming messages
      this.connection.on('message', (message) => {
        const object = JSON.parse(message.toString())
        // if the state is pending auth and this is an auth message, change the state
        // < {"stream":"authorization","data":{"action":"authenticate","status":"authorized"}}
        if (this.state == WebSocketState.PENDING_AUTHORIZATION && 'stream' in object && object['stream'] == 'authorization')
          if (object.data.status == 'authorized')
            // all good :D
            this.state = WebSocketState.CONNECTED
          else true;

        // callback regardless of whether or not we acted on the message above
        this.emit("message", object);

        // call any of the convenience methods that apply to this message
        if ('stream' in object)
          this.emit({
            trade_updates: "trade_updates",
            account_updates: "account_updates",
            T: "trade", Q: "quote", AM: "aggregate_minute"
          }[(object.stream as String).split('.')[0]], object.data);
      });

      // for now handle errors by just sending them to the callback
      // in the future we may need a strategy here
      this.connection.once('error', (err: Error) => this.emit("error", err))
    }

    // depending on the state, perform different actions
    switch (this.state) {
      case WebSocketState.PENDING_AUTHORIZATION:
        // here we attempt to authenticate
        this.connection.send(
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
        for (var i = 0; i < this.messageQueue.length; i++)
          this.connection.send(this.messageQueue.shift())
        break;
    }
  }

  send(message: any) {
    // convert it to a string if it's an object
    if (!(message instanceof String))
      message = JSON.stringify(message)
    // queue the message
    this.messageQueue.push(message)
  }

  subscribe(channels: string[]) {
    this.subscriptions.push(...channels)
    this.send({
      action: 'listen',
      data: {
        streams: channels,
      },
    })
  }

  unsubscribe(channels: string[]) {
    // remove these channels
    for(let i = 0, ln = this.subscriptions.length; i < ln; i ++)
      if(channels.includes(this.subscriptions[i]))
        this.subscriptions.splice(i, 1);

    // send the removal
    this.send({
      action: 'unlisten',
      data: {
        streams: channels,
      },
    })
  }
}
