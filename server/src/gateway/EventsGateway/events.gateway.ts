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
import { FPS, GAME_LOOP_PLAYERS, NEW_PLAYER_EVENT, STEP_TICK_INFO_EVENT } from "./events.constant";
import { setValueToMap, toObjectMap, toPayload } from "../../utils/utils.global";

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private serverWs: Server;

  private logger: Logger = new Logger('EventsGateway');

  static readonly pipe = process.env.CORE_CHANNEL || '';

  private playersMap: Map<string, ISocketUser> = new Map<string, ISocketUser>();

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

    client.to(EventsGateway.pipe).emit(NEW_PLAYER_EVENT, this.players.get(client.id));
  }

  @SubscribeMessage('tick')
  handleGameTickInfo(
    @MessageBody() data: [string],
    @ConnectedSocket() client: Socket
  ) {
    const { x, y } = toPayload<LoadedParams>(data[0]).payload;

    this.setPlayer(client, x, y);

    const playersMap: ISocketUserMap = toObjectMap(this.players);

    client.to(EventsGateway.pipe).emit(STEP_TICK_INFO_EVENT, playersMap);
  }

  handleConnection(client: Socket) {
    client.join(EventsGateway.pipe);
    console.log('connection client:', client.id);
    this.playersMap.delete(client.id);

    const playersMap: ISocketUserMap = toObjectMap(this.players);

    client.broadcast.to(EventsGateway.pipe).emit(STEP_TICK_INFO_EVENT, playersMap);

    setInterval(() => {
      const playersMap: ISocketUserMap = toObjectMap(this.players);

      client.to(EventsGateway.pipe).emit(GAME_LOOP_PLAYERS, playersMap);
    }, 1000 / FPS)
  }

  handleDisconnect(client: Socket) {
    this.playersMap.delete(client.id);
    client.leave(EventsGateway.pipe);
    console.log('disconnect client:', client.id);
  }
}
