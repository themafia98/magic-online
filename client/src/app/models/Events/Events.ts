import Router from '../Router/Router';
import { appRoutes } from '../../config/App.router';
import { runCallback } from '../../components/LoginDialog/LoginDialog';
import { PRE_LOAD_GAME_KEY } from '../../config/constants';

interface IEvents {
  handleClickMain: (name: string, start: runCallback) => void;
}

const Events: IEvents = {
  handleClickMain: (name: string, start: runCallback): void => {
    if (!name) {
      throw new Error('invalid event');
    }

    window.history.pushState({}, window.location.pathname, `${window.location.origin}${name}`);

    if (name === appRoutes.PLAY) {
      start(PRE_LOAD_GAME_KEY);
      return;
    }

    Router.go('', true);
  },
};

export default Events;
