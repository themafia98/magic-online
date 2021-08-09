import { AUTO, Types } from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import Main from '../scene/Main/Main.model';
import GameCore from '../scene/GameCore/GameCore';

const gameConfig: Types.Core.GameConfig = {
  type: AUTO,
  parent: 'app',
  width: '100vw',
  height: '99vh',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [Main, GameCore],
  autoFocus: true,
  dom: {
    createContainer: true,
  },
  plugins: {
    scene: [
      {
        key: 'rexUI',
        plugin: RexUIPlugin,
        mapping: 'rexUI',
      },
    ],
  },
};

export default gameConfig;
