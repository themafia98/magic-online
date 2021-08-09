import { COLOR_LIGHT } from '../colors';
import { IUserInterfaceScene } from '../../interfaces/ui.interface';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
import Label from 'phaser3-rex-plugins/templates/ui/label/Label';

export const getLoginInputStyle = (config: InputText.IConfig) => ({
  borderColor: '#000',
  backgroundColor: '#392613',
  border: 1,
  placeholder: 'username',
  align: 'center',
  ...config,
});

export const loginButtonStyle = (scene: IUserInterfaceScene, textValue = ''): Label.IConfig => {
  if (!scene.rexUI) {
    return {};
  }

  return {
    orientation: 0,
    align: 'center',
    background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, 10, COLOR_LIGHT),
    space: {
      top: 15,
      bottom: 15,
      left: 15,
      right: 15,
    },
    text: scene.add.text(0, 0, textValue, {
      fontSize: '18px',
    }),
  };
};
