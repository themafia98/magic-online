import { Scene } from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';

export interface IUserInterfaceScene extends Scene {
  rexUI: UIPlugin;
}

export type anyInputEventHandler = (...arg: any[]) => void;

export interface IConfigApp {
  [key: string]: any;
}
