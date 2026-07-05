import { Int32, NBTData, read, write } from 'nbtify';
import type { LongArrayTag } from 'nbtify';
import type { LayerEditorState } from '../ui/LayerEditor';

// Litematica (.litematic) support for block schematics.
// The editor stores full block-state strings, e.g.
// minecraft:chest[facing=north,type=left,waterlogged=false], so imports/exports
// preserve important chest/redstone/log/stair/etc. properties even though the UI
// still paints one cell at a time.

type PaletteEntry = { name: string; properties?: Record<string, string> };
type RegionBlock = { x: number; y: number; z: number; state: string };

function bitsNeeded(n: number) {
  return Math.max(2, Math.ceil(Math.log2(Math.max(2, n))));
}

function unpackBlockStates(longs: BigInt64Array | BigUint64Array, bitsPerBlock: number, count: number): Uint32Array {
  const out = new Uint32Array(count);
  const mask = (1n << BigInt(bitsPerBlock)) - 1n;
  let bitIndex = 0n;
  for (let i = 0; i < count; i++) {
    const startLong = Number(bitIndex / 64n);
    const startOffset = Number(bitIndex % 64n);
    let value = BigInt(longs[startLong] ?? 0n) >> BigInt(startOffset);
    const endBits = startOffset + bitsPerBlock;
    if (endBits > 64) value |= BigInt(longs[startLong + 1] ?? 0n) << BigInt(64 - startOffset);
    out[i] = Number(value & mask);
    bitIndex += BigInt(bitsPerBlock);
  }
  return out;
}

function packBlockStates(indices: Uint32Array, bitsPerBlock: number): BigInt64Array {
  const mask = (1n << BigInt(bitsPerBlock)) - 1n;
  const totalBits = BigInt(indices.length) * BigInt(bitsPerBlock);
  const longCount = Number((totalBits + 63n) / 64n);
  const longs = new BigInt64Array(longCount);
  let bitIndex = 0n;
  for (let i = 0; i < indices.length; i++) {
    const v = BigInt(indices[i]) & mask;
    const li = Number(bitIndex / 64n);
    const off = Number(bitIndex % 64n);
    longs[li] = BigInt(longs[li]) | (v << BigInt(off));
    if (off + bitsPerBlock > 64) longs[li + 1] = BigInt(longs[li + 1]) | (v >> BigInt(64 - off));
    bitIndex += BigInt(bitsPerBlock);
  }
  return longs;
}

function linearIndex(x: number, y: number, z: number, sizeX: number, sizeZ: number) {
  return (y * sizeZ + z) * sizeX + x;
}

// Litematica allows negative region sizes to mean "extends backward from Position".
// The block-state array is always stored ascending from the region's minimum corner,
// so the world coordinate for local index i is minCorner + i, not Position +/- i.
function minCornerAxis(pos: number, rawSize: number) {
  return rawSize >= 0 ? pos : pos + rawSize + 1;
}

function isAir(state: string) {
  return state === 'minecraft:air' || state === 'minecraft:cave_air' || state === 'minecraft:void_air';
}

function blockStateToString(entry: PaletteEntry) {
  const name = entry.name || 'minecraft:air';
  const props = entry.properties;
  if (!props || !Object.keys(props).length) return name;
  const body = Object.keys(props).sort().map(k => `${k}=${props[k]}`).join(',');
  return `${name}[${body}]`;
}

export function parseBlockStateString(input: string): PaletteEntry {
  const text = String(input || 'minecraft:air').trim();
  const m = /^([^[]+)(?:\[(.*)\])?$/.exec(text);
  if (!m) return { name: text || 'minecraft:air' };
  const name = m[1] || 'minecraft:air';
  const raw = m[2];
  if (!raw) return { name };
  const properties: Record<string, string> = {};
  for (const part of raw.split(',')) {
    const [k, ...rest] = part.split('=');
    if (!k || !rest.length) continue;
    properties[k.trim()] = rest.join('=').trim();
  }
  return Object.keys(properties).length ? { name, properties } : { name };
}

function readPalette(paletteNbt: any[]): PaletteEntry[] {
  return paletteNbt.map(p => ({
    name: String(p?.Name ?? 'minecraft:air'),
    properties: p?.Properties && typeof p.Properties === 'object'
      ? Object.fromEntries(Object.entries(p.Properties).map(([k, v]) => [String(k), String(v)]))
      : undefined,
  }));
}

export async function importLitematic(file: File): Promise<LayerEditorState> {
  const nbt = await read(file, { compression: 'gzip', endian: 'big' });
  const root: any = (nbt as any).data;
  const regionsObj = root?.Regions;
  if (!regionsObj || typeof regionsObj !== 'object') throw new Error('Invalid litematic: missing Regions');

  const imported: RegionBlock[] = [];

  for (const regionName of Object.keys(regionsObj)) {
    const r: any = regionsObj[regionName];
    const rawSize = {
      x: Number(r?.Size?.x ?? r?.Size?.X ?? 0),
      y: Number(r?.Size?.y ?? r?.Size?.Y ?? 0),
      z: Number(r?.Size?.z ?? r?.Size?.Z ?? 0),
    };
    const pos = {
      x: Number(r?.Position?.x ?? r?.Position?.X ?? 0),
      y: Number(r?.Position?.y ?? r?.Position?.Y ?? 0),
      z: Number(r?.Position?.z ?? r?.Position?.Z ?? 0),
    };
    const size = { x: Math.abs(rawSize.x), y: Math.abs(rawSize.y), z: Math.abs(rawSize.z) };
    if (!size.x || !size.y || !size.z) continue;

    const total = size.x * size.y * size.z;
    if (!Number.isSafeInteger(total) || total > 32_000_000) throw new Error(`Invalid litematic: region ${regionName} is too large`);

    const palette = readPalette(Array.isArray(r?.BlockStatePalette) ? r.BlockStatePalette : []);
    const blockStates = r?.BlockStates as LongArrayTag;
    if (!(blockStates instanceof BigInt64Array) && !(blockStates instanceof BigUint64Array)) {
      throw new Error(`Invalid litematic: region ${regionName} BlockStates is not a long[]`);
    }
    const bpb = bitsNeeded(palette.length);
    const requiredLongs = Math.ceil((total * bpb) / 64);
    if (blockStates.length < requiredLongs) throw new Error(`Invalid litematic: region ${regionName} BlockStates is truncated`);

    const indices = unpackBlockStates(blockStates as any, bpb, total);
    const minCorner = {
      x: minCornerAxis(pos.x, rawSize.x),
      y: minCornerAxis(pos.y, rawSize.y),
      z: minCornerAxis(pos.z, rawSize.z),
    };
    for (let y = 0; y < size.y; y++) {
      for (let z = 0; z < size.z; z++) {
        for (let x = 0; x < size.x; x++) {
          const pi = indices[linearIndex(x, y, z, size.x, size.z)];
          const state = blockStateToString(palette[pi] ?? { name: 'minecraft:air' });
          if (isAir(state)) continue;
          imported.push({
            x: minCorner.x + x,
            y: minCorner.y + y,
            z: minCorner.z + z,
            state,
          });
        }
      }
    }
  }

  if (!imported.length) return { sizeX: 1, sizeZ: 1, layers: new Map() };
  const minX = Math.min(...imported.map(b => b.x));
  const minY = Math.min(...imported.map(b => b.y));
  const minZ = Math.min(...imported.map(b => b.z));
  const maxX = Math.max(...imported.map(b => b.x));
  const maxZ = Math.max(...imported.map(b => b.z));
  const sizeX = Math.max(1, maxX - minX + 1);
  const sizeZ = Math.max(1, maxZ - minZ + 1);
  const layers = new Map<number, Map<string, string>>();

  for (const b of imported) {
    const y = b.y - minY;
    if (y < 0 || y > 319) continue;
    const x = b.x - minX;
    const z = b.z - minZ;
    let layer = layers.get(y);
    if (!layer) {
      layer = new Map();
      layers.set(y, layer);
    }
    layer.set(`${x},${z}`, b.state);
  }

  return { sizeX, sizeZ, layers };
}

export async function exportLitematic(state: LayerEditorState, name: string) {
  const placed: Array<{ x: number; y: number; z: number; state: string }> = [];
  for (const [y, layer] of state.layers.entries()) {
    if (y < 0 || y > 319) continue;
    for (const [k, id] of layer.entries()) {
      if (isAir(id)) continue;
      const [xs, zs] = k.split(',');
      const x = Number(xs);
      const z = Number(zs);
      if (x < 0 || z < 0 || x >= state.sizeX || z >= state.sizeZ) continue;
      placed.push({ x, y, z, state: id });
    }
  }

  const minX = placed.length ? Math.min(...placed.map(b => b.x)) : 0;
  const minY = placed.length ? Math.min(...placed.map(b => b.y)) : 0;
  const minZ = placed.length ? Math.min(...placed.map(b => b.z)) : 0;
  const maxX = placed.length ? Math.max(...placed.map(b => b.x)) : 0;
  const maxY = placed.length ? Math.max(...placed.map(b => b.y)) : 0;
  const maxZ = placed.length ? Math.max(...placed.map(b => b.z)) : 0;
  const sizeX = Math.max(1, maxX - minX + 1);
  const sizeY = Math.max(1, maxY - minY + 1);
  const sizeZ = Math.max(1, maxZ - minZ + 1);

  const palette: Array<{ Name: string; Properties?: Record<string, string> }> = [{ Name: 'minecraft:air' }];
  const palIndex = new Map<string, number>([['minecraft:air', 0]]);
  function idx(stateString: string) {
    let i = palIndex.get(stateString);
    if (i == null) {
      i = palette.length;
      const parsed = parseBlockStateString(stateString);
      palette.push(parsed.properties ? { Name: parsed.name, Properties: parsed.properties } : { Name: parsed.name });
      palIndex.set(stateString, i);
    }
    return i;
  }

  const dense = new Uint32Array(sizeX * sizeY * sizeZ);
  for (const b of placed) dense[linearIndex(b.x - minX, b.y - minY, b.z - minZ, sizeX, sizeZ)] = idx(b.state);

  const longs = packBlockStates(dense, bitsNeeded(palette.length));
  const now = BigInt(Date.now());
  const root: any = {
    Version: new Int32(6),
    MinecraftDataVersion: new Int32(3837),
    Metadata: {
      Name: String(name || 'Untitled build'),
      Author: 'Minecraft Schematic Studio',
      Description: 'Exported from Minecraft Schematic Studio',
      TimeCreated: now,
      TimeModified: now,
      RegionCount: new Int32(1),
      TotalBlocks: new Int32(placed.length),
      TotalVolume: new Int32(sizeX * sizeY * sizeZ),
      EnclosingSize: { x: new Int32(sizeX), y: new Int32(sizeY), z: new Int32(sizeZ) },
    },
    Regions: {
      Region0: {
        Position: { x: new Int32(minX), y: new Int32(minY), z: new Int32(minZ) },
        Size: { x: new Int32(sizeX), y: new Int32(sizeY), z: new Int32(sizeZ) },
        BlockStatePalette: palette,
        BlockStates: longs,
        TileEntities: [],
        Entities: [],
        PendingBlockTicks: [],
        PendingFluidTicks: [],
      },
    },
  };

  const bytes = await write(new NBTData(root), { endian: 'big', compression: 'gzip', rootName: '' });
  return new Blob([bytes as unknown as BlobPart], { type: 'application/octet-stream' });
}
