import { Scene, GameObjects } from 'phaser';
import { PRE_LOAD_GAME_KEY, SCENE_GAME_CORE_KEY } from '../../config/constants';
import context from '../../app.context';
import { WS_EVENTS_CLIENT } from '../../models/WebSocketClient/WebSocketClient.constant';
import State, { IState } from '../../models/State/State';
import Request from '../../models/Request/Request';
import { API_ENDPOINTS } from '../../models/Domain/Domain.constant';
import { appRoutes } from '../../config/App.router';

interface IGameLoader extends Scene {
  percentage: number;
  loadingText: GameObjects.Text;
  preload(): void;
}

interface IGameLoaderState {
  isStop: boolean;
  shouldRedirect: boolean;
  errorMessage: string;
  user?: null | Record<string, any>;
}

class GameLoader extends Scene implements IGameLoader {
  public percentage: number;

  public loadingText: GameObjects.Text;

  private readonly state: IState<IGameLoaderState>;

  private timeoutRef: ReturnType<typeof setTimeout>;

  constructor() {
    super({
      key: PRE_LOAD_GAME_KEY,
    });
    this.state = new State({
      isStop: false,
      shouldRedirect: false,
      errorMessage: '',
      user: null,
    });
  }

  public preload(): void {
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
    this.handleLoad();
  }

  public update(): void {
    const { errorMessage, isStop } = this.state.getState();

    if (!errorMessage) {
      return;
    }

    if (this.timeoutRef) {
      return;
    }

    if (this.loadingText.text !== errorMessage) {
      this.loadingText.setText(errorMessage);
    }

    if (isStop) {
      return;
    }

    this.timeoutRef = setTimeout(() => {
      window.location.assign(appRoutes.MAIN);
    }, 2000);
  }

  private handleStartWebsocket = () => {
    const socket = context.ws.connect();

    socket.on(WS_EVENTS_CLIENT.CONNECTION, () => {
      setTimeout(() => {
        this.complete();
      }, 1000);
    });
  };

  private handleLoad = () => {
    const { user } = this.state.getState();
    if (user) {
      this.state.setState({
        ...this.state.getState(),
        isStop: true,
        errorMessage: 'Something wrong, you should reload application.',
      });
      return;
    }

    const request = new Request(true);
    request
      .send<void, Record<string, any>>(API_ENDPOINTS.ME, 'GET')
      .then((response) => {
        if ([200, 201].some((code) => code === response.status)) {
          return response.data;
        }

        throw new Error('invalid load user');
      })
      .then((userData) => {
        this.state.setState({
          ...this.state.getState(),
          user: userData,
        });
        this.handleStartWebsocket();
      })
      .catch((error) => {
        const { errorMessage = error.message } = error.response.data || {};

        localStorage.clear();

        this.state.setState({
          ...this.state.getState(),
          errorMessage: `${errorMessage}. Wait for redirect...`,
        });
      });
  };

  private complete = () => {
    this.loadingText.destroy();

    const { user } = this.state.getState();

    this.scene.start(SCENE_GAME_CORE_KEY, user);
  };
}

export default GameLoader;
