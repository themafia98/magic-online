import { Cache, Cameras, GameObjects, Loader, Scene } from 'phaser';
import { PRE_LOAD_GAME_KEY, SCENE_GAME_CORE_KEY } from '../../config/constants';
import { MAP_CONFIG } from '../../config/gameConfig';
import { GAME_CORE_API_ENDPOINTS } from '../../models/Domain/Domain.constant';
import State, { IState } from '../../models/State/State';
import { computeChunkId, getAvailableChunksIds } from './Engine.utils';
import Request from '../../models/Request/Request';
import context from '../../app.context';
import { WS_EVENTS_CLIENT, WS_EVENTS_SERVER } from '../../models/WebSocketClient/WebSocketClient.constant';
import { ISocketClientUser, ISocketClientUsersMap, TCharacterValues } from '../../interfaces/global.interface';
import { setValueToMap } from '../../utils/utils.global';

interface IEngineState {
  chunkHeight: number;
  chunkWidth: number;
  masterW: number;
  masterH: number;
  nbChunksHorizontal: number;
  nbChunksVertical: number;
  lastChunkId: number;
  map: Record<string, any>;
  mapChunksIds: Array<number>;
  isLoaded: boolean;
  isConnected: boolean;
}

const defaultState: IEngineState = {
  chunkHeight: 32,
  chunkWidth: 32,
  masterW: 0,
  masterH: 0,
  nbChunksHorizontal: 0,
  nbChunksVertical: 0,
  lastChunkId: 0,
  map: {},
  mapChunksIds: [],
  isLoaded: false,
  isConnected: false,
};

class Engine extends Scene {
  public readonly state: IState<IEngineState>;
  private uuid = '';

  private camera: Cameras.Scene2D.Camera;
  private characterValuesMap: Map<string, ISocketClientUser> = new Map();
  private player: GameObjects.Image;

  constructor() {
    super({
      key: SCENE_GAME_CORE_KEY,
    });
    this.state = new State(defaultState);
  }

  updateCharacters(charactersMap: ISocketClientUsersMap) {
    this.characterValuesMap = new Map(Object.entries(charactersMap));
  }

  rerenderCharacters() {
    const masterChunksData = this.cache.json.get(MAP_CONFIG.MASTER_KEY);

    if (!masterChunksData) {
      console.warn('masterChunksData not found for update characters');
      return;
    }
    this.cache.obj.remove(MAP_CONFIG.SPRITE_PLAYER_KEY);
    this.characterValuesMap.forEach((value) => {
      const newPlayer = this.add.image(
        masterChunksData.chunkWidth * 10,
        masterChunksData.chunkHeight * 10,
        MAP_CONFIG.SPRITE_PLAYER_KEY
      );

      newPlayer.setPosition(value.x, value.y);
      newPlayer.setDepth(1);
    });
  }

  setCharacterValues(character: ISocketClientUser) {
    setValueToMap(character, character.id, this.characterValuesMap);
  }

  public preload(): void {
    this.listen();
    this.fetch();
  }

  public create(): void {
    this.input.on('pointerup', this.handleClick);

    const socket = context.ws.connect();

    socket.on(WS_EVENTS_CLIENT.CONNECTION, () => {
      this.state.setState({
        ...this.state.getState(),
        isConnected: true,
      });

      context.ws.send(WS_EVENTS_SERVER.REFRESH_CHARACTER, {
        x: this.player.x,
        y: this.player.y,
        id: socket.id,
      });

      this.uuid = socket.id;
    });

    socket.on(WS_EVENTS_CLIENT.GAME_LOOP_PLAYERS, (charactersMap: ISocketClientUsersMap) => {
      this.updateCharacters(charactersMap);
      this.rerenderCharacters();
    });

    socket.on(WS_EVENTS_CLIENT.STEP_TICK_INFO_EVENT, (charactersMap: ISocketClientUsersMap) => {
      this.updateCharacters(charactersMap);
      this.rerenderCharacters();
    });

    context.ws.on(WS_EVENTS_CLIENT.NEW_PLAYER_EVENT, (character: ISocketClientUser) => {
      const newPlayer = this.add.image(
        masterChunksData.chunkWidth * 10,
        masterChunksData.chunkHeight * 10,
        MAP_CONFIG.SPRITE_PLAYER_KEY
      );

      newPlayer.setPosition(character.x, character.y);
      newPlayer.setDepth(1);

      this.setCharacterValues(character);
    });

    const masterChunksData = this.cache.json.get(MAP_CONFIG.MASTER_KEY);

    this.state.setState({
      ...this.state.getState(),
      chunkWidth: masterChunksData.chunkWidth,
      chunkHeight: masterChunksData.chunkHeight,
      nbChunksHorizontal: masterChunksData.nbChunksHorizontal,
      nbChunksVertical: masterChunksData.nbChunksVertical,
      lastChunkId: masterChunksData.nbChunksHorizontal * masterChunksData.nbChunksVertical - 10,
    });

    this.camera = this.cameras.main;

    // sizes of the world in tiles
    const worldW = masterChunksData.nbChunksHorizontal * masterChunksData.chunkWidth;
    const worldH = masterChunksData.nbChunksVertical * masterChunksData.chunkHeight;

    this.camera.setBounds(0, 0, worldW / masterChunksData.chunkWidth, worldH / masterChunksData.chunkHeight);

    const player = this.add.image(
      masterChunksData.chunkWidth * 10,
      masterChunksData.chunkHeight * 10,
      MAP_CONFIG.SPRITE_PLAYER_KEY
    );

    player.setDepth(1);

    this.camera.startFollow(player);
    this.player = player;

    setTimeout(() => this.rerenderMap());
  }

  update(time: number, delta: number) {
    super.update(time, delta);
  }

  private listen(): void {
    this.cache.tilemap.events.on('add', (cache: Cache.CacheManager, key: string) => {
      this.refreshMapLayer(key);
    });
    this.load.on('complete', (loader: Loader.LoaderPlugin) => {
      this.state.setState({
        ...this.state.getState(),
        isLoaded: true,
      });
      if (loader.totalFailed === 3) {
        this.scene.start(PRE_LOAD_GAME_KEY);
      }
    });
  }

  private handleClick = (pointer) => {
    const x = this.camera.scrollX + pointer.x;
    const y = this.camera.scrollY + pointer.y;
    this.player.setPosition(x, y);

    const character = this.characterValuesMap.get(this.uuid);

    const refreshCharacter = {
      ...character,
      x,
      y,
    };

    context.ws.send(WS_EVENTS_SERVER.REFRESH_CHARACTER, refreshCharacter);
  };

  private fetch(): void {
    // this.load.image(MAP_CONFIG.SPRITE_PLAYER_KEY, GAME_CORE_API_ENDPOINTS.PLAYER_SPRITE);
    this.load.image(
      MAP_CONFIG.SPRITE_MAP_KEY,
      GAME_CORE_API_ENDPOINTS.MAP_SPRITE,
      Request.getCoreLoaderHeaders('blob')
    );
    this.load.json(
      MAP_CONFIG.MASTER_KEY,
      GAME_CORE_API_ENDPOINTS.MASTER_MAP,
      undefined,
      Request.getCoreLoaderHeaders('')
    );
  }

  private destroyChunk(id: number, visibleChunks: Array<number>): void {
    const state = this.state.getState();

    const { [id]: mapChunk = null } = state.map;

    if (mapChunk && mapChunk.destroy) {
      mapChunk.destroy();
    }

    const idx = visibleChunks.indexOf(id);

    if (idx > -1) {
      visibleChunks.splice(idx, 1);
    }
  }

  private rerenderMap(): void {
    const chunkId = computeChunkId(this.player.x, this.player.y, this);

    const chunks = getAvailableChunksIds(this, chunkId);

    const { mapChunksIds } = this.state.getState();

    const visibleChunks = chunks.filter((chunk) => mapChunksIds.indexOf(chunk) < 0);

    visibleChunks
      .filter((prevChunk) => chunks.indexOf(prevChunk) < 0)
      .forEach((chunk) => {
        this.destroyChunk(chunk, visibleChunks);
      });

    this.state.setState({
      ...this.state.getState(),
      mapChunksIds: visibleChunks,
    });

    visibleChunks.forEach((id) => {
      if (id < 0) {
        return;
      }

      this.load.tilemapTiledJSON(
        `chunk${id}`,
        `${GAME_CORE_API_ENDPOINTS.MAP_CHUNK}/${id}`,
        Request.getCoreLoaderHeaders('')
      );
    });

    if (visibleChunks.length) {
      this.load.start();
    }
  }

  private refreshMapLayer(key: string): void {
    const { chunkWidth, chunkHeight, nbChunksHorizontal, mapChunksIds, map: mapValues } = this.state.getState();

    const map = this.make.tilemap({ key });

    // The first parameter is the name of the tileset in Tiled and the second parameter is the key
    // of the tileset image used when loading the file in preload.
    const tiles = map.addTilesetImage('tilesheet', MAP_CONFIG.SPRITE_MAP_KEY);

    // We need to compute the position of the chunk in the world
    const chunkId = parseInt(/\d+/.exec(key)[0], 10); // Extracts the chunk number from file name

    const chunkX = (chunkId % nbChunksHorizontal) * chunkWidth;
    const chunkY = Math.floor(chunkId / nbChunksHorizontal) * chunkHeight;

    map.layers.forEach((_, index) => {
      // You can load a layer from the map using the layer name from Tiled,
      // or by using the layer

      // index
      const layer = map.createLayer(index, tiles, chunkX * chunkWidth, chunkY * chunkHeight);

      // Trick to automatically give different depths to each layer while avoid having
      // a layer at depth 1 (because depth 1 is for our player character)

      if (layer) {
        layer.setDepth(2 * index);
      }
    });

    // eslint-disable-next-line security/detect-object-injection
    const chunk = mapValues?.[chunkId] || {};

    const newMap = {
      ...mapValues,
      [chunkId]: {
        ...chunk,
        ...map,
      },
    };

    const newMapChunksIds = [...mapChunksIds, chunkId];

    this.state.setState({
      ...this.state.getState(),
      map: newMap,
      mapChunksIds: newMapChunksIds,
    });
  }
}

export default Engine;
