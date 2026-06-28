import type * as React from 'react';
import { getBlockById } from '../data/blockPalette';
import { findPng } from './resourcePack';
import { getPackVersion, getResourcePack } from './atlas';

const objectUrls = new Map<string, string>();
const imageCache = new Map<string, HTMLImageElement>();
let seenPackVersion = -1;

function clearPackCachesIfNeeded() {
  const pv = getPackVersion();
  if (pv === seenPackVersion) return;
  seenPackVersion = pv;
  objectUrls.forEach(url => URL.revokeObjectURL(url));
  objectUrls.clear();
  imageCache.clear();
}

function blockName(id: string) {
  return id.replace(/^minecraft:/, '');
}

function previewTextureNames(id: string): string[] {
  const name = blockName(id);
  const overrides: Record<string, string[]> = {
    grass_block: ['grass_block_top', 'grass_block_side'],
    dirt_path: ['dirt_path_top'],
    podzol: ['podzol_top'],
    mycelium: ['mycelium_top'],
    oak_log: ['oak_log_top', 'oak_log'],
    spruce_log: ['spruce_log_top', 'spruce_log'],
    birch_log: ['birch_log_top', 'birch_log'],
    jungle_log: ['jungle_log_top', 'jungle_log'],
    acacia_log: ['acacia_log_top', 'acacia_log'],
    dark_oak_log: ['dark_oak_log_top', 'dark_oak_log'],
    mangrove_log: ['mangrove_log_top', 'mangrove_log'],
    cherry_log: ['cherry_log_top', 'cherry_log'],
    crimson_stem: ['crimson_stem_top', 'crimson_stem'],
    warped_stem: ['warped_stem_top', 'warped_stem'],
    crafting_table: ['crafting_table_top', 'crafting_table_front'],
    furnace: ['furnace_front', 'furnace_side'],
    chest: ['chest_front'],
  };
  return overrides[name] ?? [name, name.replace(/_block$/, '')];
}

export function texturePathCandidates(id: string): string[] {
  return previewTextureNames(id).flatMap(n => [
    `assets/minecraft/textures/block/${n}.png`,
    `minecraft/textures/block/${n}.png`,
    `textures/block/${n}.png`,
  ]);
}

function packTextureUrl(id: string): string | null {
  clearPackCachesIfNeeded();
  const pack = getResourcePack();
  if (!pack) return null;
  const key = `pack:${getPackVersion()}:${id}`;
  const cached = objectUrls.get(key);
  if (cached) return cached;
  for (const path of texturePathCandidates(id)) {
    const bytes = findPng(pack, path);
    if (!bytes) continue;
    const ab = bytes.slice().buffer as ArrayBuffer;
    const url = URL.createObjectURL(new Blob([ab], { type: 'image/png' }));
    objectUrls.set(key, url);
    return url;
  }
  return null;
}

function svgEscape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function proceduralTextureUrl(id: string): string {
  const block = getBlockById(id);
  const c = block.color;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect width="32" height="32" fill="${svgEscape(c)}"/><path d="M0 8h32M0 16h32M0 24h32M8 0v32M16 0v32M24 0v32" stroke="rgba(255,255,255,.12)" stroke-width="1"/><path d="M3 5h3v3H3zM14 4h2v2h-2zM23 10h4v2h-4zM7 20h5v3H7zM20 23h2v4h-2z" fill="rgba(0,0,0,.18)"/><title>${svgEscape(block.name)}</title></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function getBlockPreviewUrl(id: string): string {
  return packTextureUrl(id) ?? proceduralTextureUrl(id);
}

export function getBlockPreviewStyle(id: string): React.CSSProperties {
  return {
    backgroundColor: getBlockById(id).color,
    backgroundImage: `url("${getBlockPreviewUrl(id)}")`,
    backgroundSize: 'cover',
    imageRendering: 'pixelated',
  } as React.CSSProperties;
}

export function getBlockPreviewImage(id: string): HTMLImageElement | null {
  if (typeof Image === 'undefined') return null;
  const url = getBlockPreviewUrl(id);
  const cached = imageCache.get(url);
  if (cached) return cached.complete ? cached : null;
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => undefined;
  img.src = url;
  imageCache.set(url, img);
  return img.complete ? img : null;
}
