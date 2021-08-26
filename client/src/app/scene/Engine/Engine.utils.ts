import Engine from './Engine';

export const getAvailableChunksIds = (engine: Engine, chunkId: number): Array<number> => {
  const engineState = engine.state.getState();

  const chunks = [];

  const isAtTop = chunkId < engineState.nbChunksHorizontal;
  const isAtBottom = chunkId > engineState.lastChunkId - engineState.nbChunksHorizontal;
  const isAtLeft = engineState.lastChunkId % engineState.nbChunksHorizontal === 0;
  const isAtRight = engineState.lastChunkId % engineState.nbChunksHorizontal === engineState.nbChunksHorizontal - 1;

  chunks.push(engineState.lastChunkId);

  if (!isAtTop) {
    chunks.push(engineState.lastChunkId - engineState.nbChunksHorizontal);
  }

  if (!isAtBottom) {
    chunks.push(engineState.lastChunkId + engineState.nbChunksHorizontal);
  }

  if (!isAtLeft) {
    chunks.push(engineState.lastChunkId - 1);
  }

  if (!isAtRight) {
    chunks.push(engineState.lastChunkId + 1);
  }

  if (!isAtTop && !isAtLeft) {
    chunks.push(engineState.lastChunkId - 1 - engineState.nbChunksHorizontal);
  }

  if (!isAtTop && !isAtRight) {
    chunks.push(engineState.lastChunkId + 1 - engineState.nbChunksHorizontal);
  }

  if (!isAtBottom && !isAtLeft) {
    chunks.push(engineState.lastChunkId - 1 + engineState.nbChunksHorizontal);
  }

  if (!isAtBottom && !isAtRight) {
    chunks.push(engineState.lastChunkId + 1 + engineState.nbChunksHorizontal);
  }

  return chunks;
};

export const computeChunkId = (x: number, y: number, engine: Engine): number => {
  const engineState = engine.state.getState();

  const tileX = Math.floor(x / 32);
  const tileY = Math.floor(y / 32);
  const chunkX = Math.floor(tileX / engineState.chunkWidth);
  const chunkY = Math.floor(tileY / engineState.chunkHeight);

  return chunkY * engineState.nbChunksHorizontal + chunkX;
};
