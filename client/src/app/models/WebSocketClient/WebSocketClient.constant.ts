export enum WS_EVENTS_CLIENT {
  ERROR = 'error',
  DISCONNECT = 'disconnect',
  CONNECT_ERROR = 'connect_error',
  CONNECTION = 'connect',
  NEW_PLAYER_EVENT = 'NEW_PLAYER_CONNECTION',
  STEP_TICK_INFO_EVENT = 'STEP_TICK_INFO_EVENT',
  GAME_LOOP_PLAYERS = 'GAME_LOOP_PLAYERS',
}

export enum WS_EVENTS_SERVER {
  REFRESH_CHARACTER = 'refresh_character',
}
