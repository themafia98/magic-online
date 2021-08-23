import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private serverWs: Server;

  private logger: Logger = new Logger('EventsGateway');

  get server() {
    return this.serverWs;
  }

  afterInit(server: Server) {
    console.log('Websocket server started...');
    this.logger.log('Websocket server started...');
  }

  @SubscribeMessage('loaded')
  handleLoad(@MessageBody() data: Record<string, any>) {
    console.log(data);
    return { event: 'loaded', data: { done: true, data } };
  }

  handleConnection(client: Socket) {
    console.log('connection client:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect client:', client.id);
  }
}
