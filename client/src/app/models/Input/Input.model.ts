import InputText from 'phaser3-rex-plugins/plugins/inputtext';
import { Scene } from 'phaser';
import { setTextMask } from '../../utils/utils.global';
import { anyInputEventHandler } from '../../interfaces/ui.interface';

export type inputType = 'password' | 'text';

export type inputEvent = 'textchange' | 'focus' | 'blur' | 'click' | 'dblclick';

class Input extends InputText {
  constructor(
    type: inputType,
    scene: Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    config: InputText.IConfig
  ) {
    super(scene, x, y, width, height, config);

    scene.add.existing(this);

    this.type = type;
  }

  static onTextChanged = (input: Input, event: InputEvent) => {
    const { data: nextLatter } = event;

    let nextValue = input.text;

    if (input.type === 'password') {
      const values = input.text.length > 1 ? input.data.values.value : '';

      nextValue = nextLatter ? `${values}${nextLatter}`.trim() : values;
      input.text = setTextMask(input.text);
    }

    input.setData('value', nextValue);
  };

  public unsubscribe = (eventName: inputEvent, handler: anyInputEventHandler) => {
    this.off(eventName, handler, this);
  };

  public subscribe = (eventName: inputEvent, handler: anyInputEventHandler) => {
    this.on(eventName, handler, this);
  };
}

export default Input;
