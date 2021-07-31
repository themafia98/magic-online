import { COLOR_LIGHT } from '../colors';
import { IUserInterfaceScene } from '../../interfaces/ui.interface';
import { setTextMask } from '../../utils/utils.global';

export const loginButtonStyle = (scene: IUserInterfaceScene): Record<string, any> => {
  if (!scene.rexUI) {
    return {};
  }

  return {
    orientation: 'x',
    background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10, COLOR_LIGHT),
    text: scene.add.text(0, 0, 'Login'),
    space: { top: 8, bottom: 8, left: 8, right: 8 },
  };
};

export const passwordLabelStyle = (scene: IUserInterfaceScene, value: string): Record<string, any> => {
  if (!scene.rexUI) {
    return {};
  }

  return {
    orientation: 'x',
    background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
    icon: scene.add.image(0, 0, 'password'),
    text: scene.rexUI.add.BBCodeText(0, 0, setTextMask(value), { fixedWidth: 150, fixedHeight: 36, valign: 'center' }),
    space: { top: 5, bottom: 5, left: 5, right: 5, icon: 10 },
  };
};

export const usernameLabelStyle = (scene: IUserInterfaceScene, value: string): Record<string, any> => {
  if (!scene.rexUI) {
    return {};
  }

  return {
    orientation: 'x',
    background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 10).setStrokeStyle(2, COLOR_LIGHT),
    icon: scene.add.image(0, 0, 'user'),
    text: scene.rexUI.add.BBCodeText(0, 0, setTextMask(value), { fixedWidth: 150, fixedHeight: 36, valign: 'center' }),
    space: { top: 5, bottom: 5, left: 5, right: 5, icon: 10 },
  };
};
