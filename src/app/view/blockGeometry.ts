import * as THREE from 'three';
import { baseBlockId } from '../data/blockPalette';
import { getTileUV, tilesForBlock, type TileId } from './atlas';

// Geometry with per-face UVs into our atlas. Full cubes remain the default, but
// common redstone/non-full utility blocks get thinner placeholder geometry so a
// schematic made from imported block states no longer displays every component
// as a full cube.

const cache = new Map<string, THREE.BufferGeometry>();

function setFaceUV(g: THREE.BoxGeometry, faceIndex: number, tile: TileId, opts: { flipV?: boolean } = {}) {
  const uvAttr = g.getAttribute('uv') as THREE.BufferAttribute;
  const a = uvAttr.array as unknown as number[];
  const { u0, v0, u1, v1 } = getTileUV(tile);
  const vv0 = opts.flipV ? v1 : v0;
  const vv1 = opts.flipV ? v0 : v1;
  const i = faceIndex * 8;
  a[i + 0] = u0; a[i + 1] = vv1;
  a[i + 2] = u1; a[i + 3] = vv1;
  a[i + 4] = u0; a[i + 5] = vv0;
  a[i + 6] = u1; a[i + 7] = vv0;
  uvAttr.needsUpdate = true;
}

function uvBox(w: number, h: number, d: number, blockId: string) {
  const g = new THREE.BoxGeometry(w, h, d);
  const t = tilesForBlock(blockId);
  for (const face of [0, 1, 4, 5]) setFaceUV(g, face, t.side, { flipV: true });
  setFaceUV(g, 2, t.top);
  setFaceUV(g, 3, t.bottom);
  return g;
}

function redstoneWireGeometry(blockId: string) {
  // Low plate with subtle connection arms. A future pass can use north/east/etc.
  // properties for exact arms; this already prevents wire importing as a cube.
  const base = uvBox(0.72, 0.035, 0.72, blockId);
  base.translate(0, -0.4825, 0);
  return base;
}

function repeaterLikeGeometry(blockId: string) {
  const base = uvBox(0.86, 0.12, 0.86, blockId);
  base.translate(0, -0.44, 0);
  return base;
}

function torchGeometry(blockId: string) {
  const post = uvBox(0.16, 0.62, 0.16, blockId);
  post.translate(0, -0.19, 0);
  return post;
}

function leverButtonPlateGeometry(blockId: string) {
  const name = baseBlockId(blockId).replace(/^minecraft:/, '');
  if (name.includes('pressure_plate')) {
    const plate = uvBox(0.86, 0.08, 0.86, blockId);
    plate.translate(0, -0.46, 0);
    return plate;
  }
  if (name.includes('button')) {
    const button = uvBox(0.42, 0.14, 0.28, blockId);
    button.translate(0, -0.43, 0);
    return button;
  }
  const lever = uvBox(0.14, 0.46, 0.14, blockId);
  lever.translate(0, -0.27, 0);
  return lever;
}

function chestGeometry(blockId: string) {
  // Chests are visually smaller than a full Minecraft block and use the full
  // block-state string as cache key, so single/left/right imported states can be
  // independently styled later without invalidating existing saves.
  const chest = uvBox(0.9, 0.86, 0.9, blockId);
  chest.translate(0, -0.07, 0);
  return chest;
}

export function getBlockGeometry(blockId: string) {
  const cached = cache.get(blockId);
  if (cached) return cached;

  const id = baseBlockId(blockId);
  const name = id.replace(/^minecraft:/, '');
  let g: THREE.BufferGeometry;

  if (name === 'redstone_wire' || name === 'tripwire') g = redstoneWireGeometry(id);
  else if (['repeater', 'comparator', 'daylight_detector'].includes(name)) g = repeaterLikeGeometry(id);
  else if (name.includes('torch')) g = torchGeometry(id);
  else if (name === 'lever' || name.includes('button') || name.includes('pressure_plate')) g = leverButtonPlateGeometry(id);
  else if (name.includes('chest')) g = chestGeometry(id);
  else g = uvBox(1, 1, 1, id);

  cache.set(blockId, g);
  return g;
}
