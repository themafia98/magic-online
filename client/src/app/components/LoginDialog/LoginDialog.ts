import ViewComponent from '../../models/ViewComponent/ViewComponent';
import { COLOR_PRIMARY } from '../../theme/colors';
import Input from '../../models/Input/Input.model';
import { getLoginInputStyle } from '../../theme/style/ui.style';
import Button from '../../models/Button/Button.model';
import GetValue = Phaser.Utils.Objects.GetValue;
import { Scene } from 'phaser';
import { appRoutes } from '../../config/App.router';
import Events from '../../models/Events/Events';

interface Fields {
  [key: string]: string | number;
}

interface DialogState {
  x: number;
  y: number;
  width?: number;
  height?: number;
  title: string;
  image?: string;
  fields?: Fields;
  print: Record<string, string>;
}

export type runCallback = (key?: string | Scene, data?: Record<string, any>) => void;

class LoginDialog extends ViewComponent {
  private readonly start: null | runCallback;

  constructor(scene: unknown, starter?: (key?: string | Scene, data?: Record<string, any>) => void) {
    super(scene as Scene);

    this.start = starter || null;

    this.setState<DialogState>({
      title: GetValue(this.config, 'title', this.config.APP_NAME),
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: window.innerWidth / 2,
      height: window.innerHeight / 1.3,
      image: 'dragon',
      print: { text: '' },
      fields: {
        username: '',
        password: '',
      },
    });

    this.render();
  }

  getPadding(): Record<string, number> {
    return { top: 10, bottom: 10, left: 10, right: 10 };
  }

  render(): void {
    const background = this.builder.add.roundRectangle(0, 0, 10, 10, 10, COLOR_PRIMARY);

    const titleField = this.context.add.text(0, 0, this.state.title, {
      fontSize: '30px',
    });

    if (this.state.image) {
      const img = this.context.add.image(this.state.width, this.state.height / 1.9, this.state.image);
      img.scale = 0.5;
    }

    const usernameInput = new Input(
      'text',
      this.context,
      0,
      0,
      this.state.width / 2,
      50,
      getLoginInputStyle({
        placeholder: 'username',
      })
    );

    const passwordInput = new Input(
      'password',
      this.context,
      0,
      0,
      this.state.width / 2,
      50,
      getLoginInputStyle({
        placeholder: 'password',
      })
    );

    passwordInput.subscribe('textchange', Input.onTextChanged);
    usernameInput.subscribe('textchange', Input.onTextChanged);

    const emptyPlace = this.context.add.text(0, 0, '');

    const loginDialog = this.builder.add
      .sizer({
        orientation: 'y',
        x: this.state.x,
        y: this.state.y,
        width: this.state.width,
        height: this.state.height,
      })
      .addBackground(background)
      .add(titleField, 0, 'center', this.getPadding(), false)
      .add(emptyPlace, 1)
      .add(usernameInput, 0, 'center', this.getPadding())
      .add(passwordInput, 0, 'center', this.getPadding());

    const buttons = new Button(this.context, 'Login', {}, appRoutes.PLAY);
    const regButton = new Button(this.context, 'Registration', {}, appRoutes.REGISTRATION);

    const eventPayload = {
      start: this.start,
      passwordInput,
      usernameInput,
    };

    buttons.subscribe('button.click', ({ name }: Button) => Events.handleClickMain(name, eventPayload));

    buttons.addButton(buttons.draw());
    buttons.addButton(regButton.draw());

    loginDialog.add(buttons, 0, 'center', { bottom: 10, left: 10, right: 10 }, false).layout();

    this.setView(loginDialog);
  }
}

export default LoginDialog;
