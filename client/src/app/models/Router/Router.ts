import { CustomWindow } from '../../interfaces/global.interface';
import { appRoutes } from '../../config/App.router';
import ERROR_404_TEMPLATE from '../../templates/Error404';
import { runGame } from '../../start';
import { SCRIPT_LOADER_KEY } from '../../templates/ScriptInjection';
import generateRegistrationTemplate from '../../templates/RegistrationPage';

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
        return generateRegistrationTemplate();
      default:
        return ERROR_404_TEMPLATE;
    }
  };

  static go = (to = '', force?: boolean): void => {
    const pathname = to ? to : Router.parseLocation();

    window.history.pushState({}, window.location.pathname, `${window.location.origin}${pathname}`);

    if (force) {
      window.location.assign(pathname);

      return;
    }

    const page = Router.loadPage(pathname);

    if (page) {
      document.getElementById('app').innerHTML = '';
    }

    if (pathname === appRoutes.PLAY || pathname === appRoutes.MAIN) {
      location.pathname = pathname === appRoutes.MAIN ? appRoutes.MAIN : appRoutes.PLAY;

      runGame();

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

    const loader = buffer.querySelector(`.${SCRIPT_LOADER_KEY}`);

    if (loader) {
      loader.remove();
    }

    if (!buffer) {
      return;
    }

    window.app.innerHTML = buffer.innerHTML;
  };

  public isCurrentPathname = (route: string): boolean => route === location.pathname;

  private subscribe(): void {
    window.onpopstate = Router.go.bind(this, true);
  }
}

export default Router;
