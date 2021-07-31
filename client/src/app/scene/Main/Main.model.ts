import { Scene } from 'phaser';
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import { IUserInterfaceScene } from '../../interfaces/ui.interface';
import { createLoginDialog } from '../../utils/ui.utils';
import { APP_NAME } from '../../config/App.config';

class Main extends Scene implements IUserInterfaceScene {
  rexUI: UIPlugin | null = null;
  constructor() {
    super({
      key: 'main',
    });
  }

  preload() {}

  create() {
    const print = this.add.text(0, 0, '');

    const loginDialog = createLoginDialog(this, {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: window.innerWidth / 2,
      height: window.innerHeight / 1.3,
      title: APP_NAME,
      fields: {
        username: '',
        password: '',
      },
    });

    if (loginDialog) {
      loginDialog.on('login', (username: string, password: string) => {
        print.text += `${username}:${password}\n`;
      });
    }
  }

  update() {}
}

export default Main;
