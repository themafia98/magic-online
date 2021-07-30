import { AUTO } from 'phaser';
import GameConfig = Phaser.Types.Core.GameConfig;
import Main from '../scene/Main/Main.model';

const gameConfig: GameConfig = {
  type: AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [Main],
};

export default gameConfig;
