import { Scene, GameObjects } from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { SCENE_GAME_CORE_KEY } from '../../config/constants';
import { IUserInterfaceScene } from '../../interfaces/ui.interface';

class Engine extends Scene implements IUserInterfaceScene {
  print: GameObjects.Text | null = null;
  rexUI: any;

  constructor() {
    super({
      key: SCENE_GAME_CORE_KEY,
    });
  }

  preload(): void {
    this.print = this.add.text(0, 0, 'dsd');
  }

  create(): void {
    this.scene.scene.add.text(0, 0, 'dasd');
  }
}

export default Engine;
