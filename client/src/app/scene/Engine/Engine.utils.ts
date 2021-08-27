import Engine from './Engine';

export const getAvailableChunksIds = (engine: Engine, chunkId: number): Array<number> => {
  const engineState = engine.state.getState();

  const chunks = [];

  const isAtTop = chunkId < engineState.nbChunksHorizontal;

  const isAtBottom = chunkId > engineState.lastChunkId - engineState.nbChunksHorizontal;
  const isAtLeft = chunkId % engineState.nbChunksHorizontal == 0;
  const isAtRight = chunkId % engineState.nbChunksHorizontal == engineState.nbChunksHorizontal - 1;

  chunks.push(chunkId);

  if (!isAtTop) chunks.push(chunkId - engineState.nbChunksHorizontal);
  if (!isAtBottom) chunks.push(chunkId + engineState.nbChunksHorizontal);
  if (!isAtLeft) chunks.push(chunkId - 1);
  if (!isAtRight) chunks.push(chunkId + 1);

  if (!isAtTop && !isAtLeft) chunks.push(chunkId - 1 - engineState.nbChunksHorizontal);
  if (!isAtTop && !isAtRight) chunks.push(chunkId + 1 - engineState.nbChunksHorizontal);
  if (!isAtBottom && !isAtLeft) chunks.push(chunkId - 1 + engineState.nbChunksHorizontal);
  if (!isAtBottom && !isAtRight) chunks.push(chunkId + 1 + engineState.nbChunksHorizontal);

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
