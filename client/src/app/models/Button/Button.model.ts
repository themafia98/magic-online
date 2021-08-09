import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components';
import { Scene } from 'phaser';
import { anyInputEventHandler, IUserInterfaceScene } from '../../interfaces/ui.interface';
import Label from 'phaser3-rex-plugins/templates/ui/label/Label';
import { loginButtonStyle } from '../../theme/style/ui.style';

interface IButton extends Buttons {
  buttonValue: string;
  link?: string;
  subscribe(eventName: string, event: anyInputEventHandler): void;
  addNewButton(button: Label): void;
  draw(config?: Label.IConfig, text?: string): Label;
}

class Button extends Buttons implements IButton {
  public buttonValue: string;
  public link: string | undefined;

  constructor(scene: Scene, value: string, config: Buttons.IConfig, link?: string) {
    super(scene, config);

    this.buttonValue = value;
    this.link = link;

    this.subscribe('button.click', (button): void => {
      console.log(button);
    });

    this.space = { left: 0, right: 0, top: 0, bottom: 0, item: 10 };

    this.scene.add.existing(this);
  }

  public addNewButton(button: Label): void {
    this.addButton(button);
  }

  public draw = (config?: Label.IConfig, text?: string): Label =>
    (this.scene as IUserInterfaceScene).rexUI.add.label(
      config || {
        ...loginButtonStyle(this.scene as IUserInterfaceScene, this.buttonValue || text),
        name: this.link,
      }
    );

  public subscribe = (eventName: string, event: anyInputEventHandler): void => {
    this.on(eventName, event, this);
  };
}

export default Button;
