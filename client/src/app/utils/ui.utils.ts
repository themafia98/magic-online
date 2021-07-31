import { IUserInterfaceScene } from '../interfaces/ui.interface';
import GetValue = Phaser.Utils.Objects.GetValue;
import { APP_NAME } from '../config/App.config';
import { COLOR_PRIMARY } from '../theme/colors';
import { IConfigOpen } from 'phaser3-rex-plugins/plugins/behaviors/textedit/TextEdit';
import { loginButtonStyle, passwordLabelStyle, usernameLabelStyle } from '../theme/style/ui.style';
import { setTextMask } from './utils.global';

interface Fields {
  [key: string]: string | number;
}

interface DialogConfig {
  x: number;
  y: number;
  width?: number;
  height?: number;
  title: string;
  fields: Fields;
}

export const createLoginDialog = (scene: IUserInterfaceScene, config: DialogConfig) => {
  if (!scene || !scene.rexUI) {
    return null;
  }

  let username = GetValue(config.fields, 'username', '');
  let password = GetValue(config.fields, 'password', '');

  const title = GetValue(config, 'title', APP_NAME);

  const x = GetValue(config, 'x', 0);
  const y = GetValue(config, 'y', 0);

  const width = GetValue(config, 'width', 300);
  const height = GetValue(config, 'height', 400);

  const background = scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);

  const titleField = scene.add.text(0, 0, title);

  const usernameField = scene.rexUI.add
    .label(usernameLabelStyle(scene, username))
    .setInteractive()
    .on('pointerdown', () => {
      const textElement = usernameField.getElement('text');

      const textElementConfig: IConfigOpen = {
        onTextChanged: (textObject, value) => {
          username = value;
          (textObject as unknown as Record<string, string>).text = value;
        },
      };

      if (textElement && scene.rexUI) {
        scene.rexUI.edit(textElement, textElementConfig);
      }
    });

  const passwordField = scene.rexUI.add
    .label(passwordLabelStyle(scene, password))
    .setInteractive()
    .on('pointerdown', () => {
      const passwordTextField = passwordField.getElement('text');

      if (scene.rexUI && passwordTextField) {
        scene.rexUI.edit(passwordTextField, {
          type: 'password',
          text: password,
          onTextChanged: (textObject, text) => {
            password = text;
            (textObject as unknown as Record<string, string>).text = setTextMask(text);
          },
        });
      }
    });

  const loginButton = scene.rexUI.add
    .label(loginButtonStyle(scene))
    .setInteractive()
    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
    .on('pointerdown', function () {
      loginDialog.emit('login', username, password);
    });

  const windowConfig: Record<string, any> = {
    orientation: 'y',
    x,
    y,
    width,
    height,
  };

  const loginDialog = scene.rexUI.add
    .sizer(windowConfig)
    .addBackground(background)
    .add(titleField, 0, 'center', { top: 10, bottom: 10, left: 10, right: 10 }, false)
    .add(usernameField, 0, 'left', { bottom: 10, left: 10, right: 10 }, true)
    .add(passwordField, 0, 'left', { bottom: 10, left: 10, right: 10 }, true)
    .add(loginButton, 0, 'center', { bottom: 10, left: 10, right: 10 }, false)
    .layout();

  return loginDialog;
};
