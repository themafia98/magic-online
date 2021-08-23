export type websocketType = 'ws';

export type httpType = 'http';

export type channelType = websocketType | httpType;

export const DOMAIN_TYPE: Readonly<Record<string, channelType>> = {
  WS: 'ws',
  HTTP: 'http',
};

export enum API_ENDPOINTS {
  CREATE_USER = '/users/create',
}
