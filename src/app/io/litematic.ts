import { Gunzip } from 'fflate';
import { Int32, NBTData, read, write } from 'nbtify';
import { canonicalBlockState, parseBlockStateString } from '../model/blockState';
import { dimensions, editorBlocks, integer, MAX_BLOCKS, MAX_FILE_BYTES, MAX_VOLUME } from '../model/designValidation';
import type { LayerEditorState } from '../ui/LayerEditor';

export { parseBlockStateString } from '../model/blockState';
type RegionBlock = { x: number; y: number; z: number; state: string };
const bitsNeeded = (n: number) => Math.max(2, Math.ceil(Math.log2(Math.max(2, n))));
const linearIndex = (x: number, y: number, z: number, sx: number, sz: number) => (y * sz + z) * sx + x;
const isAir = (s: string) => ['minecraft:air', 'minecraft:cave_air', 'minecraft:void_air'].includes(s);

function unpackBlockStates(longs: BigInt64Array | BigUint64Array, bits: number, count: number) {
  const out = new Uint32Array(count);
  const mask = (1n << BigInt(bits)) - 1n;
  for (let i = 0; i < count; i++) {
    const bit = i * bits, li = Math.floor(bit / 64), off = bit % 64;
    // NBT long[] is signed; bit streams are not. Convert BEFORE shifting.
    let value = BigInt.asUintN(64, longs[li]) >> BigInt(off);
    if (off + bits > 64) value |= BigInt.asUintN(64, longs[li + 1]) << BigInt(64 - off);
    out[i] = Number(value & mask);
  }
  return out;
}

function packBlockStates(indices: Uint32Array, bits: number) {
  const longs = new BigInt64Array(Math.ceil(indices.length * bits / 64));
  for (let i = 0; i < indices.length; i++) {
    const bit = i * bits, li = Math.floor(bit / 64), off = bit % 64;
    const v = BigInt(indices[i]);
    longs[li] |= v << BigInt(off);
    if (off + bits > 64) longs[li + 1] |= v >> BigInt(64 - off);
  }
  return longs;
}

function bounds(blocks: RegionBlock[]) {
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (const b of blocks) {
    minX = Math.min(minX, b.x); minY = Math.min(minY, b.y); minZ = Math.min(minZ, b.z);
    maxX = Math.max(maxX, b.x); maxY = Math.max(maxY, b.y); maxZ = Math.max(maxZ, b.z);
  }
  if (!blocks.length) minX = minY = minZ = maxX = maxY = maxZ = 0;
  return { minX, minY, minZ, sizeX: maxX - minX + 1, sizeY: maxY - minY + 1, sizeZ: maxZ - minZ + 1 };
}

async function readBoundedGzip(file: File) {
  const compressed = new Uint8Array(await file.arrayBuffer());
  const chunks: Uint8Array[] = [];
  let total = 0;
  const gunzip = new Gunzip((chunk) => {
    total += chunk.byteLength;
    if (total > MAX_FILE_BYTES) throw new Error('Litematic decompressed data too large (64 MiB limit)');
    chunks.push(chunk);
  });
  gunzip.push(compressed, true);
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return read(bytes, { compression: null, endian: 'big' });
}

function nbtInteger(value: unknown, label: string) {
  // nbtify wraps NBT int/short/byte in Number subclasses, never coerce strings.
  return integer(value instanceof Number ? value.valueOf() : value, label, -2147483648, 2147483647);
}

export async function importLitematic(file: File): Promise<LayerEditorState> {
  if (file.size > MAX_FILE_BYTES) throw new Error('Litematic file too large (64 MiB limit)');
  const nbt = await readBoundedGzip(file);
  const regions = (nbt.data as any)?.Regions;
  if (!regions || typeof regions !== 'object' || Array.isArray(regions)) throw new Error('Invalid litematic: missing Regions');
  const imported: RegionBlock[] = [];
  const boxes: Array<{ min: number[]; max: number[] }> = [];
  let totalVolume = 0;
  for (const [name, region] of Object.entries(regions)) {
    const r = region as any;
    for (const field of ['TileEntities', 'Entities', 'PendingBlockTicks', 'PendingFluidTicks']) {
      if (r?.[field] != null && (!Array.isArray(r[field]) || r[field].length)) {
        throw new Error(`Unsupported ${name} ${field}: importing would lose data. Keep the original and export a blocks-only copy in Litematica first.`);
      }
    }
    const raw = ['x', 'y', 'z'].map(a => nbtInteger(r?.Size?.[a] ?? r?.Size?.[a.toUpperCase()], `${name} size ${a}`));
    const pos = ['x', 'y', 'z'].map(a => nbtInteger(r?.Position?.[a] ?? r?.Position?.[a.toUpperCase()], `${name} position ${a}`));
    const size = dimensions(Math.abs(raw[0]), Math.abs(raw[1]), Math.abs(raw[2]));
    const total = size.x * size.y * size.z;
    totalVolume += total;
    if (totalVolume > MAX_VOLUME) throw new Error(`Litematic total region volume too large (limit ${MAX_VOLUME} cells)`);
    if (!Array.isArray(r.BlockStatePalette) || !r.BlockStatePalette.length || r.BlockStatePalette.length > MAX_BLOCKS) throw new Error(`Invalid ${name} palette`);
    const palette = r.BlockStatePalette.map((p: any) => canonicalBlockState(p?.Name, p?.Properties));
    const words = r.BlockStates;
    if (!(words instanceof BigInt64Array) && !(words instanceof BigUint64Array)) throw new Error(`Invalid ${name} BlockStates: expected long[]`);
    const bits = bitsNeeded(palette.length);
    if (words.length < Math.ceil(total * bits / 64)) throw new Error(`Invalid ${name} BlockStates: truncated`);
    const indices = unpackBlockStates(words, bits, total);
    // Negative region sizes extend backward; packed indices ascend from the minimum corner.
    const min = pos.map((p, i) => raw[i] < 0 ? p + raw[i] + 1 : p);
    const max = min.map((p, i) => p + [size.x, size.y, size.z][i] - 1);
    if (boxes.some(b => min.every((p, i) => p <= b.max[i] && max[i] >= b.min[i]))) throw new Error('Overlapping regions cannot be merged safely. Export a non-overlapping blocks-only copy in Litematica.');
    boxes.push({ min, max });
    for (let y = 0; y < size.y; y++) for (let z = 0; z < size.z; z++) for (let x = 0; x < size.x; x++) {
      const pi = indices[linearIndex(x, y, z, size.x, size.z)];
      if (pi >= palette.length) throw new Error(`Invalid ${name} palette index ${pi} at (${x},${y},${z}); palette has ${palette.length} entries`);
      const state = palette[pi];
      if (isAir(state)) continue;
      if (imported.length >= MAX_BLOCKS) throw new Error(`Too many imported blocks (limit ${MAX_BLOCKS})`);
      imported.push({ x: min[0] + x, y: min[1] + y, z: min[2] + z, state });
    }
  }
  const { minX, minY, minZ, sizeX, sizeY, sizeZ } = bounds(imported);
  dimensions(sizeX, sizeY, sizeZ); // Reject disjoint regions whose combined bounds exceed the editor.
  const layers = new Map<number, Map<string, string>>();
  for (const b of imported) {
    const y = b.y - minY;
    if (!layers.has(y)) layers.set(y, new Map());
    layers.get(y)!.set(`${b.x - minX},${b.z - minZ}`, b.state);
  }
  return { sizeX, sizeZ, layers };
}

export async function exportLitematic(state: LayerEditorState, name: string) {
  const placed = editorBlocks(state).filter(b => !isAir(b.state));
  const { minX, minY, minZ, sizeX, sizeY, sizeZ } = bounds(placed);
  const volume = sizeX * sizeY * sizeZ;
  if (volume > MAX_VOLUME) throw new Error(`Litematic export volume too large (limit ${MAX_VOLUME} cells)`);
  const palette: Array<{ Name: string; Properties?: Record<string, string> }> = [{ Name: 'minecraft:air' }];
  const palIndex = new Map<string, number>([['minecraft:air', 0]]);
  const dense = new Uint32Array(volume);
  for (const b of placed) {
    if (!palIndex.has(b.state)) {
      palIndex.set(b.state, palette.length);
      const parsed = parseBlockStateString(b.state);
      palette.push(parsed.properties ? { Name: parsed.name, Properties: parsed.properties } : { Name: parsed.name });
    }
    dense[linearIndex(b.x - minX, b.y - minY, b.z - minZ, sizeX, sizeZ)] = palIndex.get(b.state)!;
  }
  const now = BigInt(Date.now());
  const root = {
    Version: new Int32(6), MinecraftDataVersion: new Int32(4440),
    Metadata: {
      Name: String(name || 'Untitled build'), Author: 'Minecraft Schematic Studio',
      Description: 'Exported from Minecraft Schematic Studio', TimeCreated: now, TimeModified: now,
      RegionCount: new Int32(1), TotalBlocks: new Int32(placed.length), TotalVolume: new Int32(volume),
      EnclosingSize: { x: new Int32(sizeX), y: new Int32(sizeY), z: new Int32(sizeZ) },
    },
    Regions: { Region0: {
      Position: { x: new Int32(minX), y: new Int32(minY), z: new Int32(minZ) },
      Size: { x: new Int32(sizeX), y: new Int32(sizeY), z: new Int32(sizeZ) },
      BlockStatePalette: palette, BlockStates: packBlockStates(dense, bitsNeeded(palette.length)),
      TileEntities: [], Entities: [], PendingBlockTicks: [], PendingFluidTicks: [],
    } },
  };
  const bytes = await write(new NBTData(root), { endian: 'big', compression: 'gzip', rootName: '' });
  return new Blob([bytes as unknown as BlobPart], { type: 'application/octet-stream' });
}
