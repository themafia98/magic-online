import { Socket } from 'socket.io-client';
import { WS_EVENTS_CLIENT } from './WebSocketClient.constant';
import { socketDisconnectEvent, socketError, socketErrorEvent } from './WebSocketClient.events';

const webSocketEventsRegister = (socket: Socket) => {
  socket.on(WS_EVENTS_CLIENT.ERROR, socketErrorEvent);

  socket.on(WS_EVENTS_CLIENT.DISCONNECT, socketDisconnectEvent);

  socket.on(WS_EVENTS_CLIENT.CONNECT_ERROR, socketError);
};

export default webSocketEventsRegister;
