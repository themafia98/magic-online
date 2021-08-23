import { Scene, GameObjects } from 'phaser';
import { PRE_LOAD_GAME_KEY, SCENE_GAME_CORE_KEY } from '../../config/constants';
import context from '../../app.context';
import { WS_EVENTS_CLIENT } from '../../models/WebSocketClient/WebSocketClient.constant';

interface IGameLoader extends Scene {
  percentage: number;
  loadingText: GameObjects.Text;
  preload(): void;
}

class GameLoader extends Scene implements IGameLoader {
  public percentage: number;

  public loadingText: GameObjects.Text;

  constructor() {
    super({
      key: PRE_LOAD_GAME_KEY,
    });
  }

  preload(): void {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });

    this.loadingText.setOrigin(0.5, 0.5);

    const socket = context.ws.connect();

    socket.on(WS_EVENTS_CLIENT.CONNECTION, () => {
      setTimeout(() => {
        this.complete();
      }, 1000);
    });
  }

  private complete = () => {
    this.loadingText.destroy();

    this.scene.start(SCENE_GAME_CORE_KEY);
  };
}

export default GameLoader;
