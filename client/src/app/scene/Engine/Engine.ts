import { Scene, Cache, Cameras } from 'phaser';
import { SCENE_GAME_CORE_KEY } from '../../config/constants';
import { MAP_CONFIG } from '../../config/gameConfig';
import { GAME_CORE_API_ENDPOINTS } from '../../models/Domain/Domain.constant';
import State, { IState } from '../../models/State/State';

interface IEngineState {
  masterW: number;
  masterH: number;
  nbChunksHorizontal: number;
  nbChunksVertical: number;
  lastChunkId: number;
  map: Record<string, any>;
  mapChunksIds: Array<number>;
}

const defaultState: IEngineState = {
  masterW: 0,
  masterH: 0,
  nbChunksHorizontal: 0,
  nbChunksVertical: 0,
  lastChunkId: 0,
  map: {},
  mapChunksIds: [],
};

class Engine extends Scene {
  private camera: Cameras.Scene2D.Camera;
  private readonly state: IState;

  constructor() {
    super({
      key: SCENE_GAME_CORE_KEY,
    });
    this.state = new State(defaultState);
  }

  public preload(): void {
    this.listen();
    this.fetch();
  }

  public create(): void {
    this.scene.scene.add.text(0, 0, 'dasd');
  }

  private listen(): void {
    this.cache.tilemap.events.on('add', (cache: Cache.CacheManager, key: string) => {
      this.rerenderMap(key);
    });
  }

  private fetch(): void {
    this.load.image(MAP_CONFIG.SPRITE_MAP_KEY, GAME_CORE_API_ENDPOINTS.MAP_SPRITE);
    this.load.json(MAP_CONFIG.MASTER_KEY, GAME_CORE_API_ENDPOINTS.MASTER_MAP);
  }

  private clearMap(): void {
    this.state.setState(defaultState);
  }

  private rerenderMap(chunkKey: string): void {
    this.clearMap();

    const masterChunksData = this.cache.json.get(MAP_CONFIG.MASTER_KEY);

    this.state.setState({
      ...this.state.getState(),
      chunkWidth: masterChunksData.chunkWidth,
      chunkHeight: masterChunksData.chunkHeight,
      nbChunksHorizontal: masterChunksData.nbChunksHorizontal,
      nbChunksVertical: masterChunksData.nbChunksVertical,
      lastChunkID: masterChunksData.nbChunksHorizontal * masterChunksData.nbChunksVertical - 1,
    });

    this.camera = this.cameras.main;
  }
}

export default Engine;
