import { describe, expect, it } from 'vitest';
import { Int32, NBTData, read, write } from 'nbtify';
import { exportLitematic, importLitematic } from './litematic';
import { gzipSync } from 'fflate';

export async function fixture(options: { size?: number[]; pos?: number[]; palette?: string[]; words?: BigInt64Array } = {}) {
  const vector = (v: number[]) => ({ x: new Int32(v[0]), y: new Int32(v[1]), z: new Int32(v[2]) });
  const bytes = await write(new NBTData({ Regions: { Test: {
    Size: vector(options.size ?? [22, 1, 1]), Position: vector(options.pos ?? [0, 0, 0]),
    BlockStatePalette: (options.palette ?? ['air', 'stone', 'dirt', 'sand', 'glass']).map(n => ({ Name: `minecraft:${n}` })),
    BlockStates: options.words ?? new BigInt64Array([1n << 63n, 0n]),
  } } }), { endian: 'big', compression: 'gzip' });
  return new File([bytes as unknown as BlobPart], 'test.litematic');
}

async function changedFixture(change: (root: any) => void) {
  const nbt = await read(await fixture(), { compression: 'gzip', endian: 'big' });
  change(nbt.data);
  return new File([await write(nbt, { compression: 'gzip', endian: 'big' }) as unknown as BlobPart], 'changed.litematic');
}
describe('Litematica integrity', () => {
  it('caps gzip expansion before passing bytes to the NBT parser', async () => {
    const zipped = gzipSync(new Uint8Array(64 * 1024 * 1024 + 1));
    await expect(importLitematic(new File([zipped as unknown as BlobPart], 'oversize.litematic'))).rejects.toThrow(/decompressed.*64 MiB/i);
  }, 20000);
  it.each(['TileEntities', 'Entities', 'PendingBlockTicks', 'PendingFluidTicks'])('refuses silent loss of %s', async field => {
    const file = await changedFixture(root => { root.Regions.Test[field] = [{ id: 'minecraft:chest' }]; });
    await expect(importLitematic(file)).rejects.toThrow(/unsupported.*keep|loss.*original/i);
  });
  it('rejects overlapping regions rather than silently overwriting blocks', async () => {
    const file = await changedFixture(root => { root.Regions.Other = root.Regions.Test; });
    await expect(importLitematic(file)).rejects.toThrow(/overlap/i);
  });
  it('preserves every slab and stair variant through Litematica', async () => {
    const states = ['bottom', 'top', 'double'].map(type => `minecraft:oak_slab[type=${type},waterlogged=false]`);
    for (const facing of ['north', 'east', 'south', 'west']) for (const half of ['bottom', 'top']) for (const shape of ['straight', 'inner_left', 'inner_right', 'outer_left', 'outer_right']) states.push(`minecraft:oak_stairs[facing=${facing},half=${half},shape=${shape},waterlogged=true]`);
    const layer = new Map(states.map((s, x) => [`${x},0`, s]));
    const blob = await exportLitematic({ sizeX: states.length, sizeZ: 1, layers: new Map([[0, layer]]) }, 'variants');
    expect((await importLitematic(new File([blob], 'variants.litematic'))).layers.get(0)).toEqual(layer);
  });
  it('reads negative region sizes in ascending minimum-corner order', async () => {
    const file = await fixture({ size: [-2, 1, -1], pos: [10, 20, 30], palette: ['air', 'stone', 'dirt'], words: new BigInt64Array([9n]) });
    expect((await importLitematic(file)).layers.get(0)).toEqual(new Map([['0,0', 'minecraft:stone'], ['1,0', 'minecraft:dirt']]));
  });
  it('rejects truncated packed data', async () => {
    await expect(importLitematic(await fixture({ words: new BigInt64Array(1) }))).rejects.toThrow(/truncated/i);
  });
  it('writes the installed Java 1.21.8 DataVersion 4440', async () => {
    const blob = await exportLitematic({ sizeX: 1, sizeZ: 1, layers: new Map() }, 'test');
    const nbt = await read(blob, { compression: 'gzip', endian: 'big' });
    expect(Number((nbt.data as Record<string, unknown>).MinecraftDataVersion)).toBe(4440);
  });
  it('rejects out-of-range palette indices instead of air', async () => {
    await expect(importLitematic(await fixture({ words: new BigInt64Array([7n, 0n]) }))).rejects.toThrow(/palette index.*7/i);
  });
  it('rejects empty palettes', async () => {
    await expect(importLitematic(await fixture({ palette: [] })) ).rejects.toThrow(/palette/i);
  });
  it('rejects zero dimensions', async () => {
    await expect(importLitematic(await fixture({ size: [0, 1, 1] }))).rejects.toThrow(/dimension|size/i);
  });
  it('rejects unsupported vertical span instead of dropping the upper block', async () => {
    const words = new BigInt64Array(11); words[0] = 1n; words[10] = 1n;
    await expect(importLitematic(await fixture({ size: [1, 321, 1], palette: ['air', 'stone'], words }))).rejects.toThrow(/height|dimension/i);
  });
  it('rejects invalid export coordinates', async () => {
    await expect(exportLitematic({ sizeX: 8, sizeZ: 8, layers: new Map([[0, new Map([['NaN,0', 'stone']])]]) }, 'bad')).rejects.toThrow(/coordinate/i);
  });
  it('bounds dense export allocation before allocating', async () => {
    const state = { sizeX: 512, sizeZ: 512, layers: new Map([[0, new Map([['0,0', 'stone']])], [319, new Map([['511,511', 'stone']])]]) };
    await expect(exportLitematic(state, 'huge')).rejects.toThrow(/volume|large/i);
  });
  it('round-trips 160000 blocks without spread argument stack overflow', async () => {
    const layer = new Map<string, string>();
    for (let z = 0; z < 400; z++) for (let x = 0; x < 400; x++) layer.set(`${x},${z}`, 'minecraft:stone');
    const blob = await exportLitematic({ sizeX: 400, sizeZ: 400, layers: new Map([[0, layer]]) }, 'large');
    expect((await importLitematic(new File([blob], 'large.litematic'))).layers.get(0)).toEqual(layer);
  }, 20000);
  it('decodes a signed word crossing bit 63 without sign extension', async () => {
    // Index 21 starts at bit 63: its low bit is 1, high bits in next word are 0.
    const state = await importLitematic(await fixture());
    expect(state.layers.get(0)?.get('0,0')).toBe('minecraft:stone');
  });
});
