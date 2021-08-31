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
import { ISocketUser, ISocketUserMap, LoadedParams } from '../../interfaces/EventsModule.interface';
import { NEW_PLAYER_EVENT, TICK_INFO_EVENT } from "./events.constant";
import { setValueToMap, toObjectMap, toPayload } from "../../utils/utils.global";

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private serverWs: Server;

  private logger: Logger = new Logger('EventsGateway');

  private playersMap: Map<string, ISocketUser> = new Map<string, ISocketUser>()

  get players() {
    return this.playersMap;
  }

  get server() {
    return this.serverWs;
  }

  setPlayer(socket: Socket, x = 25, y = 25) {
    const value: ISocketUser = {
      id: socket.id,
      x,
      y
    } as ISocketUser;

    setValueToMap(value, socket.id, this.playersMap);
  }

  afterInit(server: Server) {
    console.log('Websocket server started...');
    this.logger.log('Websocket server started...');
  }

  @SubscribeMessage('refresh_character')
  onEvent(
    @MessageBody() data: [string],
    @ConnectedSocket() client: Socket
  ) {
    const { x, y } = toPayload<LoadedParams>(data[0]).payload;

    this.setPlayer(client, x, y);

    client.emit(NEW_PLAYER_EVENT, this.players.get(client.id));
  }

  @SubscribeMessage('tick')
  handleGameTickInfo(
    @MessageBody() data: [string],
    @ConnectedSocket() client: Socket
  ) {
    const { x, y } = toPayload<LoadedParams>(data[0]).payload;

    this.setPlayer(client, x, y);

    const playersMap: ISocketUserMap = toObjectMap(this.players);

    client.emit(TICK_INFO_EVENT, playersMap);
  }

  handleConnection(client: Socket) {
    console.log('connection client:', client.id);
    this.playersMap.delete(client.id);

    const playersMap: ISocketUserMap = toObjectMap(this.players);

    client.broadcast.emit(TICK_INFO_EVENT, playersMap);
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect client:', client.id);
  }
}
