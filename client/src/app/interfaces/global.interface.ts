import { Game } from 'phaser';

export interface CustomWindow extends Window {
  game: Game;
  app: HTMLElement;
}

export interface ILoginRequestBody {
  username: string;
  password: string;
}

export interface ITokenResponse {
  accessToken: string;
}

export interface ISocketClientUser {
  id: string;
  x: number;
  y: number;
}

export type TCharacterValues = ISocketClientUser[];
