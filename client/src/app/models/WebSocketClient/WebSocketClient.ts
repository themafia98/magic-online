import io, { Socket } from 'socket.io-client';
import { Method } from 'axios';
import { WS_EVENTS_CLIENT, WS_EVENTS_SERVER } from './WebSocketClient.constant';
import Domain from '../Domain/Domain';
import { DOMAIN_TYPE } from '../Domain/Domain.constant';
import webSocketEventsRegister from './WebSocketClient.utils';

export interface IWebSocket {
  socket: Socket;
  send: <T = null>(eventName: WS_EVENTS_SERVER, data: T, callback?: (arg: any) => void) => void;
  connect: () => Socket;
}

class WebSocketClient implements IWebSocket {
  private transports = ['websocket'];

  private readonly domain: Domain;

  private socketEntity: Socket;

  constructor() {
    this.domain = new Domain(DOMAIN_TYPE.WS);
  }

  get socket() {
    return this.socketEntity;
  }

  public connect = (): Socket => {
    this.socketEntity = io(this.domain.api, {
      transports: this.transports,
    });

    this.subscribe();

    this.socketEntity.connect();

    return this.socketEntity;
  };

  public send = <T = null>(eventName: WS_EVENTS_SERVER, data?: T, callback?: (arg: any) => void): void => {
    this.socket.emit(eventName, data ? this.createPayloadJsonString<T>(data) : undefined, callback);
  };

  public on(eventName: WS_EVENTS_CLIENT, callback: (...args: any[]) => void) {
    this.socket.on(eventName, callback);
  }

  private createPayloadJsonString = <T = null>(data: T, messageMethodType?: Method): string => {
    const message = {
      type: messageMethodType,
      payload: data,
    };

    return JSON.stringify(message);
  };

  private subscribe = (): void => {
    webSocketEventsRegister(this.socket);
  };
}

export default WebSocketClient;
