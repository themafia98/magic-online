export type websocketType = 'ws';

export type httpType = 'http';

export type channelType = websocketType | httpType;

export const DOMAIN_TYPE: Readonly<Record<string, channelType>> = {
  WS: 'ws',
  HTTP: 'http',
};

export enum API_ENDPOINTS {
  ME = '/auth/me',
  LOGIN = '/auth/login',
  CREATE_USER = '/users/create',
}

export enum GAME_CORE_API_ENDPOINTS {
  PLAYER_SPRITE = '/PUBLIC/sprite/player',
  MAP_SPRITE = '/public/sprite/map',
  MASTER_MAP = '/map/master',
  MAP_CHUNK = '/map/chunk',
}
