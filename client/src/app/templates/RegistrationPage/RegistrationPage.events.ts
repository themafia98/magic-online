import Request from '../../models/Request/Request';
import { API_ENDPOINTS } from '../../models/Domain/Domain.constant';
import Router from '../../models/Router/Router';
import { appRoutes } from '../../config/App.router';
import { subscribePage } from '../../utils/utils.global';

const handleRedirectToMain = () => {
  Router.go(appRoutes.MAIN);
};

const handleCreateUser: EventHandlerNonNull = (event) => {
  event.preventDefault();
  const errorBlock = document.querySelector('[data-id="error"]');
  const request = new Request();

  const formDataMap = {};
  const formData = new FormData(event.currentTarget as HTMLFormElement);

  if (errorBlock) {
    errorBlock.innerHTML = '';
  }

  formData.forEach((value, key) => {
    // eslint-disable-next-line security/detect-object-injection
    formDataMap[key] = value;
  });

  request
    .send(API_ENDPOINTS.CREATE_USER, 'PUT', formDataMap)
    .then(() => {
      Router.go(appRoutes.MAIN);
    })
    .catch((error) => {
      console.error(error);
      const { errorMessage = '' } = error.response.data || {};
      errorBlock.innerHTML = errorMessage;
    });
};

export default () => {
  const handleLoaded = () => {
    const form = document.querySelector('[name="regForm"]');
    const returnButton = document.querySelector('[data-id="return"]');

    if (!form || !returnButton) {
      return;
    }

    returnButton.removeEventListener('click', handleRedirectToMain);
    form.removeEventListener('submit', handleCreateUser);

    returnButton.addEventListener('click', handleRedirectToMain);
    form.addEventListener('submit', handleCreateUser);
  };

  subscribePage(handleLoaded);
};
