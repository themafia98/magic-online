export enum WS_EVENTS_CLIENT {
  ERROR = 'error',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',
  CONNECTION = 'connect',
  NEW_PLAYER_EVENT = 'NEW_PLAYER_CONNECTION',
  TICK_INFO_EVENT = 'TICK_INFO_EVENT',
}

export enum WS_EVENTS_SERVER {
  REFRESH_CHARACTER = 'refresh_character',
  TICK = 'tick',
}
