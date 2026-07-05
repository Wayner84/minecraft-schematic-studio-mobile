import * as THREE from 'three';
import { BLOCKS, baseBlockId, getBlockById } from '../data/blockPalette';
import { findPng, pngToBitmap, readResourcePackZip, type PackPngMap } from './resourcePack';

// Texture atlas.
// Default is procedural, but you can swap in a user-supplied Minecraft resource pack (zip)
// to use real block textures.
//
// Important: the 3D viewer can show every block in the palette. Earlier builds only
// allocated atlas entries for a tiny starter subset and sent all unknown blocks to the
// stone tile, so blocks such as pink terracotta and chests looked wrong in preview.
// The atlas now contains a stable per-block/per-face tile set with procedural fallbacks,
// then overlays matching resource-pack textures when a pack is loaded.

export type BlockFace = 'top' | 'bottom' | 'side';
export type TileId = string;

type Atlas = {
  texture: THREE.Texture;
  tileSize: number;
  cols: number;
  rows: number;
  map: Record<TileId, { col: number; row: number }>;
};

let atlas: Atlas | null = null;
let atlasSource: 'procedural' | 'resource-pack' = 'procedural';

function blockName(blockId: string) {
  return baseBlockId(blockId).replace(/^minecraft:/, '');
}

function tileId(blockId: string, face: BlockFace): TileId {
  return `${blockId}:${face}`;
}

function isLogLike(name: string) {
  return /(^|_)(log|stem|hyphae)$/.test(name) || /_wood$/.test(name);
}

function textureNamesForFace(blockId: string, face: BlockFace): string[] {
  const name = blockName(blockId);
  const names: string[] = [];

  if (name === 'grass_block') {
    if (face === 'top') names.push('grass_block_top');
    else if (face === 'bottom') names.push('dirt');
    else names.push('grass_block_side');
  } else if (name === 'dirt_path') {
    names.push(face === 'top' ? 'dirt_path_top' : 'dirt_path_side');
  } else if (name === 'farmland') {
    names.push(face === 'top' ? 'farmland' : 'dirt');
  } else if (name === 'podzol' || name === 'mycelium') {
    names.push(face === 'top' ? `${name}_top` : `${name}_side`);
  } else if (isLogLike(name)) {
    const topName = name.endsWith('_hyphae') || name.endsWith('_wood') ? name : `${name}_top`;
    names.push(face === 'top' || face === 'bottom' ? topName : name);
  } else {
    const faceOverrides: Record<string, Partial<Record<BlockFace, string[]>>> = {
      chest: {
        top: ['chest_top'],
        bottom: ['chest_top'],
        side: ['chest_front', 'chest_side'],
      },
      trapped_chest: {
        top: ['trapped_chest_top', 'chest_top'],
        bottom: ['trapped_chest_top', 'chest_top'],
        side: ['trapped_chest_front', 'chest_front', 'trapped_chest_side'],
      },
      ender_chest: {
        top: ['ender_chest_top', 'obsidian'],
        bottom: ['ender_chest_top', 'obsidian'],
        side: ['ender_chest_front', 'ender_chest_side', 'obsidian'],
      },
      crafting_table: {
        top: ['crafting_table_top'],
        bottom: ['oak_planks'],
        side: ['crafting_table_front', 'crafting_table_side'],
      },
      furnace: {
        top: ['furnace_top', 'furnace_side'],
        bottom: ['furnace_top', 'furnace_side'],
        side: ['furnace_front', 'furnace_side'],
      },
      blast_furnace: {
        top: ['blast_furnace_top'],
        bottom: ['blast_furnace_top'],
        side: ['blast_furnace_front', 'blast_furnace_side'],
      },
      smoker: {
        top: ['smoker_top'],
        bottom: ['smoker_bottom', 'smoker_top'],
        side: ['smoker_front', 'smoker_side'],
      },
      dispenser: { side: ['dispenser_front', 'dispenser_side'] },
      dropper: { side: ['dropper_front', 'dropper_side'] },
      observer: {
        top: ['observer_top'],
        bottom: ['observer_top'],
        side: ['observer_front', 'observer_side'],
      },
      barrel: {
        top: ['barrel_top'],
        bottom: ['barrel_bottom', 'barrel_top'],
        side: ['barrel_side'],
      },
      bookshelf: { top: ['oak_planks'], bottom: ['oak_planks'], side: ['bookshelf'] },
    };
    names.push(...(faceOverrides[name]?.[face] ?? []));
    names.push(name, name.replace(/_block$/, ''));
  }

  return Array.from(new Set(names.filter(Boolean)));
}

function texturePathCandidatesForFace(blockId: string, face: BlockFace): string[] {
  const blockCandidates = textureNamesForFace(blockId, face).flatMap(n => [
    `assets/minecraft/textures/block/${n}.png`,
    `minecraft/textures/block/${n}.png`,
    `textures/block/${n}.png`,
  ]);

  // Do not fall back to entity texture sheets here. Blocks such as chests, beds,
  // banners and skulls are stored as larger entity layouts in vanilla packs, not as
  // square block-face PNGs. Cropping those sheets into a 16x16 atlas tile produces
  // the broken/transparent chest seen in the Android preview. If a pack provides a
  // square block texture override we use it; otherwise the procedural tile remains.
  return blockCandidates;
}

function canvasColor(input: string) {
  // Canvas accepts both #hex and modern CSS hsl(). If a browser rejects a generated
  // colour, fall back to a safe magenta instead of silently painting black.
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#d978a2';
  ctx.fillStyle = input;
  return ctx.fillStyle;
}

function noiseTile(ctx: CanvasRenderingContext2D, x0: number, y0: number, size: number, base: string, accent = 'rgba(0,0,0,0.22)') {
  ctx.fillStyle = canvasColor(base);
  ctx.fillRect(x0, y0, size, size);
  for (let i = 0; i < 120; i++) {
    const x = x0 + Math.floor(Math.random() * size);
    const y = y0 + Math.floor(Math.random() * size);
    ctx.globalAlpha = 0.14 + Math.random() * 0.18;
    ctx.fillStyle = Math.random() > 0.5 ? accent : 'rgba(255,255,255,0.18)';
    ctx.fillRect(x, y, 1, 1);
  }
  ctx.globalAlpha = 1;
}

function plankTile(ctx: CanvasRenderingContext2D, x0: number, y0: number, size: number, base: string) {
  noiseTile(ctx, x0, y0, size, base, 'rgba(80,45,20,0.32)');
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = 'rgba(30,20,10,0.8)';
  for (let y = 4; y < size; y += 4) {
    ctx.beginPath();
    ctx.moveTo(x0, y0 + y + 0.5);
    ctx.lineTo(x0 + size, y0 + y + 0.5);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function glassTile(ctx: CanvasRenderingContext2D, x0: number, y0: number, size: number, base: string) {
  ctx.fillStyle = canvasColor(base);
  ctx.fillRect(x0, y0, size, size);
  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = '#e5f8ff';
  ctx.lineWidth = 1;
  ctx.strokeRect(x0 + 1, y0 + 1, size - 2, size - 2);
  ctx.beginPath();
  ctx.moveTo(x0 + 3, y0 + 3);
  ctx.lineTo(x0 + size - 3, y0 + size - 3);
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function chestTile(ctx: CanvasRenderingContext2D, x0: number, y0: number, size: number, face: BlockFace, base: string) {
  plankTile(ctx, x0, y0, size, base);
  ctx.fillStyle = 'rgba(55,28,8,0.65)';
  ctx.fillRect(x0, y0 + Math.floor(size / 2), size, 1);
  ctx.fillRect(x0 + 1, y0 + 1, 1, size - 2);
  ctx.fillRect(x0 + size - 2, y0 + 1, 1, size - 2);
  if (face === 'side') {
    ctx.fillStyle = '#d9c36a';
    ctx.fillRect(x0 + Math.floor(size / 2) - 2, y0 + Math.floor(size / 2) - 1, 4, 3);
    ctx.fillStyle = 'rgba(40,25,10,0.55)';
    ctx.fillRect(x0 + Math.floor(size / 2) - 1, y0 + Math.floor(size / 2), 2, 1);
  }
}

function drawProceduralTile(ctx: CanvasRenderingContext2D, blockId: string, face: BlockFace, x0: number, y0: number, size: number) {
  const block = getBlockById(blockId);
  const name = blockName(blockId);
  const base = block.color;

  if (blockId === 'minecraft:air') {
    ctx.clearRect(x0, y0, size, size);
    return;
  }
  if (name.includes('glass')) return glassTile(ctx, x0, y0, size, base);
  if (name.includes('chest')) return chestTile(ctx, x0, y0, size, face, name === 'ender_chest' ? '#23403f' : '#b38b52');
  if (name.includes('planks') || name.includes('bookshelf') || name.includes('crafting_table')) return plankTile(ctx, x0, y0, size, base);
  if (isLogLike(name)) return plankTile(ctx, x0, y0, size, face === 'side' ? base : '#a67a45');
  if (name === 'grass_block') return noiseTile(ctx, x0, y0, size, face === 'top' ? '#4a7c3a' : face === 'bottom' ? '#6b4f2a' : '#5f7a36');
  return noiseTile(ctx, x0, y0, size, base);
}

function makeTileMap() {
  const map: Atlas['map'] = {};
  let i = 0;
  for (const block of BLOCKS) {
    for (const face of ['top', 'bottom', 'side'] as const) {
      map[tileId(block.id, face)] = { col: i % 64, row: Math.floor(i / 64) };
      i++;
    }
  }
  return { map, tileCount: i };
}

function createAtlas(): Atlas {
  const tileSize = 16;
  const cols = 64;
  const { map, tileCount } = makeTileMap();
  const rows = Math.max(1, Math.ceil(tileCount / cols));
  const canvas = document.createElement('canvas');
  canvas.width = cols * tileSize;
  canvas.height = rows * tileSize;
  const ctx = canvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = false;

  for (const block of BLOCKS) {
    for (const face of ['top', 'bottom', 'side'] as const) {
      const pos = map[tileId(block.id, face)];
      drawProceduralTile(ctx, block.id, face, pos.col * tileSize, pos.row * tileSize, tileSize);
    }
  }

  const tex = new THREE.CanvasTexture(canvas);
  applyTextureDefaults(tex);
  return { texture: tex, tileSize, cols, rows, map };
}

function applyTextureDefaults(tex: THREE.Texture) {
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  // We generate UVs assuming v=0 is the top of the atlas canvas.
  tex.flipY = false;
}

async function drawTileFromPack(
  ctx: CanvasRenderingContext2D,
  map: PackPngMap,
  x0: number,
  y0: number,
  size: number,
  blockId: string,
  face: BlockFace,
) {
  for (const pngPath of texturePathCandidatesForFace(blockId, face)) {
    const bytes = findPng(map, pngPath);
    if (!bytes) continue;
    const bmp = await pngToBitmap(bytes);
    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(bmp, x0, y0, size, size);
    return true;
  }
  return false;
}

/**
 * Load a user-provided resource pack (.zip) and rebuild the atlas.
 */
let currentPack: PackPngMap | null = null;
let packVersion = 0;

export function getResourcePack() {
  return currentPack;
}

export function getPackVersion() {
  return packVersion;
}

export type AtlasStatus = { source: 'procedural' | 'resource-pack'; packVersion: number };

export function getAtlasStatus(): AtlasStatus {
  return { source: atlasSource, packVersion };
}

export async function loadResourcePackZip(file: File): Promise<AtlasStatus> {
  const pack = await readResourcePackZip(file);
  currentPack = pack;
  packVersion++;

  // Start from procedural fallback every time so missing pack textures still have
  // block-specific colours rather than stale/missing/stone tiles.
  atlas = createAtlas();
  const atlasNow = getAtlas();
  const canvas = (atlasNow.texture as THREE.CanvasTexture).image as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const ts = atlasNow.tileSize;

  for (const block of BLOCKS) {
    for (const face of ['top', 'bottom', 'side'] as const) {
      const pos = atlasNow.map[tileId(block.id, face)];
      await drawTileFromPack(ctx, pack, pos.col * ts, pos.row * ts, ts, block.id, face);
    }
  }

  applyTextureDefaults(atlasNow.texture);
  atlasNow.texture.needsUpdate = true;
  atlasSource = 'resource-pack';
  return getAtlasStatus();
}

export function resetAtlasToProcedural(): AtlasStatus {
  currentPack = null;
  packVersion++;
  atlas = createAtlas();
  atlasSource = 'procedural';
  return getAtlasStatus();
}

export function getAtlasSource() {
  return atlasSource;
}

function getAtlas(): Atlas {
  if (!atlas) atlas = createAtlas();
  return atlas;
}

export function getAtlasTexture() {
  return getAtlas().texture;
}

export function getTileUV(tile: TileId) {
  const a = getAtlas();
  const { col, row } = a.map[tile] ?? a.map[tileId('minecraft:stone', 'side')];
  const u0 = (col * a.tileSize) / (a.cols * a.tileSize);
  const v0 = (row * a.tileSize) / (a.rows * a.tileSize);
  const u1 = ((col + 1) * a.tileSize) / (a.cols * a.tileSize);
  const v1 = ((row + 1) * a.tileSize) / (a.rows * a.tileSize);
  return { u0, v0, u1, v1 };
}

export function tilesForBlock(blockId: string): { top: TileId; bottom: TileId; side: TileId } {
  const baseId = baseBlockId(blockId);
  const id = getBlockById(baseId).id === 'minecraft:air' && baseId !== 'minecraft:air' ? 'minecraft:stone' : baseId;
  return { top: tileId(id, 'top'), bottom: tileId(id, 'bottom'), side: tileId(id, 'side') };
}
