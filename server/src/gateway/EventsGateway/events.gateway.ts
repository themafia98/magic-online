import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ISocketUser, ISocketUserMap } from "../../interfaces/EventsModule.interface";
import { NEW_PLAYER_EVENT } from "./events.constant";

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private serverWs: Server;

  private logger: Logger = new Logger('EventsGateway');

  private playersMap: ISocketUserMap = {}

  get players() {
    return this.playersMap;
  }

  get server() {
    return this.serverWs;
  }

  setPlayer(socket: Socket, x = 25, y = 25) {
    this.playersMap[socket.id] = {
      id: socket.id,
      x,
      y
    } as ISocketUser;
  }

  afterInit(server: Server) {
    console.log('Websocket server started...');
    this.logger.log('Websocket server started...');
  }

  @SubscribeMessage('loaded')
  onEvent(
    @MessageBody() data: { x: number, y: number, id: string },
    @ConnectedSocket() client: Socket
  ) {
    console.log("data", data);
    this.setPlayer(client, data.x, data.y);
    client.broadcast.emit(NEW_PLAYER_EVENT, this.players[client.id]);
  }

  handleConnection(client: Socket) {
    console.log('connection client:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect client:', client.id);
  }
}
