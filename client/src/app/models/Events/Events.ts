import Button from '../Button/Button.model';
import Router from '../Router/Router';
import { appRoutes } from '../../config/App.router';
import { runCallback } from '../../components/LoginDialog/LoginDialog';
import { SCENE_GAME_CORE_KEY } from '../../config/constants';

interface IEvents {
  handleClickMain: (name: string, start: runCallback) => void;
}

const Events: IEvents = {
  handleClickMain: (name: string, start: runCallback): void => {
    // eslint-disable-next-line no-debugger
    debugger;

    if (!name) {
      throw new Error('invalid event');
    }

    window.history.pushState({}, window.location.pathname, `${window.location.origin}${name}`);

    if (name === appRoutes.PLAY) {
      start(SCENE_GAME_CORE_KEY);
      return;
    }

    Router.go(true);
  },
};

export default Events;
