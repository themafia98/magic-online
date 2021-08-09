import { Scene, GameObjects } from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { SCENE_GAME_CORE_KEY, SCENE_MAIN_KEY } from '../../config/constants';
import { IUserInterfaceScene } from '../../interfaces/ui.interface';
import LoginDialog from '../../components/LoginDialog/LoginDialog';
import Router from '../../models/Router/Router';
import { appRoutes } from '../../config/App.router';

class Main extends Scene implements IUserInterfaceScene {
  dialog: UIPlugin.Sizer | null = null;
  print: GameObjects.Text | null = null;
  rexUI: any;

  constructor() {
    super({
      key: SCENE_MAIN_KEY,
    });
  }

  preload(): void {
    this.load.image('dragon', '/public/images/dragon.jpeg');
    this.load.image('user', '/public/images/person.png');
    this.load.image('password', '/public/images/key.png');

    this.print = this.add.text(0, 0, '');
  }

  create(): void {
    this.dialog = new LoginDialog(this.scene.scene, this.scene.start.bind(this.scene)).view as UIPlugin.Sizer;
  }

  update(time: number, delta: number) {
    if (Router.parseLocation() === appRoutes.PLAY) {
      this.scene.start(SCENE_GAME_CORE_KEY);
    }
  }
}

export default Main;
