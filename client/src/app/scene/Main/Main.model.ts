import { Scene } from 'phaser';
import TextStyle = Phaser.Types.GameObjects.Text.TextStyle;
import Text = Phaser.GameObjects.Text;

class Main extends Scene {
  clickCountText: Text | undefined;
  constructor() {
    super({});
  }

  updateClickCountText(clickCount: number) {
    if (this.clickCountText) {
      this.clickCountText.setText(`Button has been clicked ${clickCount} times.`);
    }
  }

  preload() {}

  create() {
    let clickCount = 0;
    this.clickCountText = this.add.text(100, 200, '');

    this.add
      .text(window.innerWidth / 2.6, 10, 'Magic online', {
        font: '60px Courier',
        fill: '#00ff00',
      } as TextStyle)
      .setInteractive()
      .on('pointerdown', () => this.updateClickCountText(++clickCount));
  }

  update() {}
}

export default Main;
