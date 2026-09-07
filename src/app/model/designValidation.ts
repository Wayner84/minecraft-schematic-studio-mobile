import type { LayerEditorState } from '../ui/LayerEditor';
import { canonicalBlockState } from './blockState';

// Explicit mobile editor budgets, checked before dense allocations or sparse copies.
export const MAX_AXIS = 512;
export const MAX_BLOCKS = 1_000_000;
export const MAX_VOLUME = 8_000_000;
export const MAX_FILE_BYTES = 64 * 1024 * 1024;

export function integer(value: unknown, label: string, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) {
    throw new Error(`Invalid ${label}: expected a finite integer in ${min}..${max}, got ${String(value)}`);
  }
  return value;
}

export function dimensions(x: unknown, y: unknown, z: unknown) {
  return { x: integer(x, 'size x dimension', 1, MAX_AXIS), y: integer(y, 'height dimension', 1, 320), z: integer(z, 'size z dimension', 1, MAX_AXIS) };
}

export function editorBlocks(state: LayerEditorState, heightMax = 319) {
  integer(heightMax, 'export height', 0, 319);
  dimensions(state.sizeX, heightMax + 1, state.sizeZ);
  const blocks: Array<{ x: number; y: number; z: number; state: string }> = [];
  for (const [y, layer] of state.layers) {
    integer(y, 'y height', 0, heightMax);
    for (const [key, id] of layer) {
      if (!/^\d+,\d+$/.test(key)) throw new Error(`Invalid block coordinate: ${key}`);
      const [x, z] = key.split(',').map(Number);
      integer(x, 'x coordinate', 0, state.sizeX - 1);
      integer(z, 'z coordinate', 0, state.sizeZ - 1);
      if (blocks.length >= MAX_BLOCKS) throw new Error(`Too many blocks: limit ${MAX_BLOCKS}`);
      blocks.push({ x, y, z, state: canonicalBlockState(id) });
    }
  }
  return blocks;
}
