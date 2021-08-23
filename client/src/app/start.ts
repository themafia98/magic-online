import { Game } from 'phaser';
import gameConfig from './config/gameConfig';
import Router from './models/Router/Router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import './app.scss';
import { CustomWindow } from './interfaces/global.interface';
import { appRoutes } from './config/App.router';
import Request from './models/Request/Request';

declare const window: CustomWindow;

export const runGame = (): void => {
  if (window.game) {
    window.game.renderer.destroy();
    window.game.loop.destroy();
    window.game.canvas.remove();
    window.game.destroy(true);
  }

  const instanceGame = new Game(gameConfig);

  window.game = instanceGame;
};

const bootstrap = (): void => {
  window.app = document.getElementById('app');

  if (!window.app) {
    throw new Error('Error app bootstrapped');
  }

  const router = new Router();
  const token = Request.getToken();

  if (!router.isCurrentPathname(appRoutes.REGISTRATION)) {
    if (token && appRoutes.PLAY !== Router.parseLocation()) {
      Router.go(appRoutes.PLAY);

      return;
    }

    runGame();

    return;
  }

  Router.go(token ? appRoutes.PLAY : '');
};

export default bootstrap;
