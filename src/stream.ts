import isBlob from 'is-blob';
import parse from './parse.js';
import WebSocket from 'isomorphic-ws';
import endpoints from './endpoints.js';
import EventEmitter from 'eventemitter3';

import {
  Bar,
  Channel,
  DataSource,
  DefaultCredentials,
  Quote,
  Trade,
  TradeUpdate,
  Message,
  Endpoints,
} from './entities.js';

export declare interface Events {
  open: (stream: AlpacaStream) => void;
  close: (stream: AlpacaStream) => void;
  authenticated: (stream: AlpacaStream) => void;
  success: (message: Message) => void;
  error: (message: WebSocket.ErrorEvent) => void;
  subscription: (message: Message) => void;
  message: (message: Object) => void;
  trade_updates: (update: TradeUpdate) => void;
  trade: (trade: Trade) => void;
  quote: (quote: Quote) => void;
  bar: (bar: Bar) => void;
}

export declare interface AlpacaStream {
  on<U extends keyof Events>(event: U, listener: Events[U]): this;
  once<U extends keyof Events>(event: U, listener: Events[U]): this;
  emit<U extends keyof Events>(
    event: U,
    ...args: Parameters<Events[U]>
  ): boolean;
}

export class AlpacaStream extends EventEmitter<string | symbol | any> {
  private host: string;
  private connection: WebSocket;
  private authenticated: boolean;
  private baseURLs: Endpoints = endpoints;

  constructor(
    protected params: {
      credentials: DefaultCredentials;
      type: 'account' | 'market_data';
      source?: DataSource;
      endpoints?: Endpoints | Map<keyof Endpoints, any>;
    },
  ) {
    // construct EventEmitter
    super();

    // override endpoints if custom provided
    if ('endpoints' in params) {
      this.baseURLs = Object.assign(endpoints, params.endpoints);
    }

    if (
      // if not specified
      !('paper' in params.credentials) &&
      // and live key isn't already provided
      !('key' in params.credentials && params.credentials.key.startsWith('A'))
    ) {
      params.credentials['paper'] = true;
    }

    // assign the host we will connect to
    switch (params.type) {
      case 'account':
        this.host = params.credentials.paper
          ? this.baseURLs.websocket.account.replace('api.', 'paper-api.')
          : this.baseURLs.websocket.account;
        break;
      case 'market_data':
        this.host = this.baseURLs.websocket.market_data(this.params.source);
        break;
      default:
        this.host = 'unknown';
    }

    this.connection = new WebSocket(this.host);
    this.connection.onopen = () => {
      let message = {};

      switch (this.params.type) {
        case 'account':
          message = {
            action: 'authenticate',
            data: {
              key_id: params.credentials.key,
              secret_key: params.credentials.secret,
            },
          };
          break;
        case 'market_data':
          // {"action":"auth","key":"PK*****","secret":"*************"}
          message = { action: 'auth', ...params.credentials };
          break;
      }

      this.connection.send(JSON.stringify(message));

      // pass through
      this.emit('open', this);
    };

    // pass through
    this.connection.onclose = () => this.emit('close', this);

    this.connection.onmessage = async (event: any) => {
      let data = event.data;

      if (isBlob(data)) {
        data = await event.data.text();
      } else if (data instanceof ArrayBuffer) {
        data = String.fromCharCode(...new Uint8Array(event.data));
      }

      let parsed = JSON.parse(data),
        messages = this.params.type == 'account' ? [parsed] : parsed;

      messages.forEach((message: any) => {
        // pass the message
        this.emit('message', message);

        // pass authenticated event
        if ('T' in message && message.msg == 'authenticated') {
          this.authenticated = true;
          this.emit('authenticated', this);
        } else if ('stream' in message && message.stream == 'authorization') {
          if (message.data.status == 'authorized') {
            this.authenticated = true;
            this.emit('authenticated', this);
          }
        }

        // pass trade_updates event
        if ('stream' in message && message.stream == 'trade_updates') {
          this.emit('trade_updates', parse.trade_update(message.data));
        }

        // pass trade, quote, bar event
        const x: { [index: string]: keyof Events } = {
          success: 'success',
          subscription: 'subscription',
          error: 'error',
          t: 'trade',
          q: 'quote',
          b: 'bar',
        };

        if ('T' in message) {
          this.emit(x[message.T.split('.')[0]], message);
        }
      });
    };

    // pass the error
    this.connection.onerror = (err: WebSocket.ErrorEvent) => {
      this.emit('error', err);
    };
  }

  /**
   * Retrieve the underlying WebSocket connection AlpacaStream uses.
   * Now callers can read and modify properties of the web socket
   * i.e., close the websocket with AlpacaStream.getConnection().close().
   * @returns a WebSocket object
   */
  getConnection() {
    return this.connection;
  }

  /**
   * Subscribe to an account or data stream channel.
   * @param channel trades, quotes, bars, trade_updates
   * @param symbols only use with data stream ex. [ "AAPL", "TSLA", ... ]
   */
  subscribe(channel: Channel, symbols: string[] = []) {
    switch (this.params.type) {
      case 'account':
        // {"action":"listen","data":{"streams":["trade_updates"]}}
        this.send(
          JSON.stringify({ action: 'listen', data: { streams: [channel] } }),
        );
        break;
      case 'market_data':
        // {"action":"subscribe","trades":["AAPL"],"quotes":["AMD","CLDR"],"bars":["AAPL","VOO"]}
        let message: any = { action: 'subscribe' };
        message[channel] = symbols;
        this.send(JSON.stringify(message));
        break;
    }

    return this;
  }

  /**
   * Unsubscribe to an account or data stream channel.
   * @param channel trades, quotes, bars, trade_updates
   * @param symbols only use with data stream ex. [ "AAPL", "TSLA", ... ]
   */
  unsubscribe(channel: Channel, symbols: string[] = []) {
    switch (this.params.type) {
      case 'account':
        // {"action":"unlisten","data":{"streams":["trade_updates"]}}
        this.send(
          JSON.stringify({ action: 'unlisten', data: { streams: [channel] } }),
        );
        break;
      case 'market_data':
        // {"action":"unsubscribe","trades":["AAPL"],"quotes":["AMD","CLDR"],"bars":["AAPL","VOO"]}
        let message: any = { action: 'unsubscribe' };
        message[channel] = symbols;
        this.send(JSON.stringify(message));
        break;
    }

    return this;
  }

  private send(message: any) {
    // don't bother if we aren't authenticated
    if (!this.authenticated) {
      throw new Error('not authenticated');
    }

    // if the message is in object form, stringify it for the user
    if (typeof message == 'object') {
      message = JSON.stringify(message);
    }

    // send it off
    this.connection.send(message);

    // chainable return
    return this;
  }
}
