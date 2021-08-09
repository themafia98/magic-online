import { Game } from 'phaser';

export interface CustomWindow extends Window {
  game: Game;
  app: HTMLElement;
}
