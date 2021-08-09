import { CustomWindow } from '../../interfaces/global.interface';
import { appRoutes } from '../../config/App.router';
import REGISTRATION_TEMPLATE from '../../templates/registration';
import ERROR_404_TEMPLATE from '../../templates/Error404';
import { runGame } from '../../start';

export interface IRouterConfig {
  [key: string]: string;
}

declare const window: CustomWindow;

interface IRouter {
  isCurrentPathname: (route: string) => boolean;
}

class Router implements IRouter {
  constructor() {
    this.subscribe();
  }

  static parseLocation(): string {
    return location.pathname;
  }

  static loadPage = (page: string): string => {
    switch (page) {
      case appRoutes.MAIN:
        return appRoutes.MAIN;
      case appRoutes.REGISTRATION:
        return REGISTRATION_TEMPLATE;
      default:
        return ERROR_404_TEMPLATE;
    }
  };

  static go = (force?: boolean): void => {
    const pathname = Router.parseLocation();

    if (force) {
      window.location.assign(pathname);

      return;
    }

    const page = Router.loadPage(pathname);

    if (page === appRoutes.MAIN) {
      document.getElementById('app').innerHTML = '';

      setTimeout(() => {
        runGame();
      }, 1000);

      return;
    }

    if (window.game) {
      window.game.renderer.destroy();
      window.game.loop.destroy();
      window.game.canvas.remove();
      window.game.destroy(true);
      window.game = null;
    }

    const buffer = document.createElement('div');
    buffer.innerHTML = page;

    if (!buffer) {
      return;
    }

    window.app.innerHTML = page;
  };

  public isCurrentPathname = (route: string): boolean => route === location.pathname;

  private subscribe(): void {
    window.onpopstate = Router.go.bind(this, true);
  }
}

export default Router;
