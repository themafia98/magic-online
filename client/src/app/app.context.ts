import WebSocketClient from './models/WebSocketClient/WebSocketClient';

interface IContext {
  ws: WebSocketClient;
}

const context: IContext = {
  ws: new WebSocketClient(),
};

export default context;
