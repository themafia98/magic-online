import { Scene, GameObjects } from 'phaser';
import { PRE_LOAD_SCENE_KEY, SCENE_MAIN_KEY } from '../../config/constants';

interface FileItem {
  key: string;
}

interface ICoreLoader extends Scene {
  percentage: number;
  graphics: GameObjects.Graphics;
  loadingText: GameObjects.Text;
  percentText: GameObjects.Text;
  assetText: GameObjects.Text;
  preload(): void;
}

class Loader extends Scene implements ICoreLoader {
  public percentage: number;

  public graphics: GameObjects.Graphics;

  public loadingText: GameObjects.Text;

  public percentText: GameObjects.Text;

  public assetText: GameObjects.Text;

  constructor() {
    super({
      key: PRE_LOAD_SCENE_KEY,
    });
  }

  preload(): void {
    this.graphics = this.add.graphics();

    this.graphics.fillStyle(0x222222, 0.8);
    this.graphics.fillRect(240, 270, 320, 50);

    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });

    this.loadingText.setOrigin(0.5, 0.5);

    this.percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });

    this.percentText.setOrigin(0.5, 0.5);

    this.assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });

    this.assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', this.updateProgress);

    this.load.on('fileprogress', this.updateFileProgress);

    this.load.on('complete', this.complete);

    this.load.image('dragon', '/public/images/dragon.jpeg');
    this.load.image('user', '/public/images/person.png');
    this.load.image('password', '/public/images/key.png');
  }

  private updateProgress = (percentageValue: number) => {
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    this.percentText.setText((percentageValue * 100).toFixed(0) + '%');

    this.graphics.clear();
    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRect(250, 280, 300 * percentageValue, 30);
  };

  private updateFileProgress = (file: FileItem) => {
    this.assetText.setText('Loading asset: ' + file.key);
  };

  private complete = () => {
    this.graphics.destroy();
    this.loadingText.destroy();
    this.percentText.destroy();
    this.assetText.destroy();

    this.scene.start(SCENE_MAIN_KEY);
  };
}

export default Loader;
