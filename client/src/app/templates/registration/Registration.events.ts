import Request from '../../models/Request/Request';
import { API_ENDPOINTS } from '../../models/Domain/Domain.constant';
import Router from '../../models/Router/Router';
import { appRoutes } from '../../config/App.router';

export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('[name="regForm"]');
    const returnButton = document.querySelector('[data-id="return"]');

    if (!form || !returnButton) {
      return;
    }

    returnButton.addEventListener('click', () => {
      debugger;
      Router.go(appRoutes.MAIN);
    });

    form.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const request = new Request();

      const formDataMap = {};

      new FormData(event.currentTarget as HTMLFormElement).forEach((value, key) => {
        formDataMap[key] = value;
      });

      request
        .send(API_ENDPOINTS.CREATE_USER, 'PUT', formDataMap)
        .then((response) => {})
        .catch((error) => {});
    });
  });
};
