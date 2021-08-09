import { Game } from 'phaser';
import gameConfig from './config/gameConfig';
import Router from './models/Router/Router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import './app.scss';
import { CustomWindow } from './interfaces/global.interface';
import { appRoutes } from './config/App.router';
import { SCENE_GAME_CORE_KEY, SCENE_MAIN_KEY } from './config/constants';
import Main from './scene/Main/Main.model';
import GameCore from './scene/GameCore/GameCore';

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

  if (!router.isCurrentPathname(appRoutes.REGISTRATION)) {
    runGame();

    return;
  }

  Router.go();
};

export default bootstrap;
