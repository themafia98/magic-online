import { IConfigApp } from '../interfaces/ui.interface';

const globalConfig: IConfigApp = {
  APP_NAME: 'Magic online',
};

export const JWT_TOKEN_KEY: Readonly<string> = 'token';

export default globalConfig;
