import { Scene } from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { PRE_LOAD_GAME_KEY, SCENE_MAIN_KEY } from '../../config/constants';
import { IUserInterfaceScene } from '../../interfaces/ui.interface';
import LoginDialog from '../../components/LoginDialog/LoginDialog';
import Router from '../../models/Router/Router';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import { appRoutes } from '../../config/App.router';

class MainMenu extends Scene implements IUserInterfaceScene {
  dialog: UIPlugin.Sizer | null = null;
  rexUI: RexUIPlugin;

  constructor() {
    super({
      key: SCENE_MAIN_KEY,
    });
  }

  create(): void {
    this.dialog = new LoginDialog(this.scene.scene, this.scene.start.bind(this.scene)).view as UIPlugin.Sizer;
  }

  update() {
    if (Router.parseLocation() === appRoutes.PLAY) {
      this.scene.start(PRE_LOAD_GAME_KEY);
    }
  }
}

export default MainMenu;
