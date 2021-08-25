import { AUTO, Types } from 'phaser';
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import MainMenu from '../scene/MainMenu/MainMenu';
import Engine from '../scene/Engine/Engine';
import Loader from '../scene/Loader/Loader';
import GameLoader from '../scene/GameLoader/GameLoader';

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
  scene: [Loader, MainMenu, GameLoader, Engine],
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

export const MAP_CONFIG = {
  SPRITE_MAP_KEY: 'mapSprite',
  MASTER_KEY: 'master',
  CHUNK_KEY: 'chunk',
};

export default gameConfig;
