import Router from '../Router/Router';
import { appRoutes } from '../../config/App.router';
import { runCallback } from '../../components/LoginDialog/LoginDialog';
import { PRE_LOAD_GAME_KEY } from '../../config/constants';
import Request from '../Request/Request';
import { API_ENDPOINTS } from '../Domain/Domain.constant';
import Input from '../Input/Input.model';
import { ILoginRequestBody, ITokenResponse } from '../../interfaces/global.interface';
import { JWT_TOKEN_KEY } from '../../config/App.config';

interface IMainPayload {
  start: runCallback;
  passwordInput: Input;
  usernameInput: Input;
}

interface IEvents {
  handleClickMain: (name: string, eventPayload: IMainPayload) => void;
}

const Events: IEvents = {
  handleClickMain: (name: string, eventPayload: IMainPayload) => {
    if (!name) {
      throw new Error('invalid event');
    }
    // eslint-disable-next-line no-debugger
    debugger;
    if (name === appRoutes.PLAY) {
      const { data: dataUsernameInput } = eventPayload.usernameInput;
      const { data: dataPasswordInput } = eventPayload.passwordInput;

      const { value: username } = dataUsernameInput?.list || {};
      const { value: password } = dataPasswordInput?.list || {};

      if (!username || !password) {
        return;
      }

      const request = new Request();
      request
        .send<ILoginRequestBody, ITokenResponse>(API_ENDPOINTS.LOGIN, 'POST', {
          username,
          password,
        })
        .then((response) => {
          if ([200, 201].some((code) => response.status === code)) {
            return response.data;
          }

          throw new Error('Invalid login');
        })
        .then((data) => {
          localStorage.setItem(JWT_TOKEN_KEY, data.accessToken);
        })
        .then(() => {
          eventPayload.start(PRE_LOAD_GAME_KEY);
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }

    Router.go(name);
  },
};

export default Events;
