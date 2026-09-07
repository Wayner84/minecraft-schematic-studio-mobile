import { describe, expect, it } from 'vitest';
import { exportBuildV0, exportBuildV1, importBuild } from '../ui/LayerEditor';
import { parseBlockStateString } from './litematic';

const legacy = (blocks: unknown[]) => ({ version: 0, size: { x: 8, y: 320, z: 8 }, blocks });

describe('native state preservation', () => {
  it('preserves V0 id+props including unknown states through both native versions', () => {
    const s = importBuild(legacy([{ x: 1, y: 319, z: 2, id: 'custom:machine', props: { powered: true, level: 3, facing: 'west' } }]));
    const expected = 'custom:machine[facing=west,level=3,powered=true]';
    expect(s.layers.get(319)?.get('1,2')).toBe(expected);
    for (const exporter of [exportBuildV0, exportBuildV1]) {
      expect(importBuild(JSON.parse(JSON.stringify(exporter(s, 'test', 319)))).layers).toEqual(s.layers);
    }
  });
});

describe('native validation', () => {
  it.each([NaN, Infinity, 0.5, -1, 8])('rejects invalid x coordinate %s', x => {
    expect(() => importBuild(legacy([{ x, y: 0, z: 0, id: 'minecraft:stone' }]))).toThrow(/coordinate|x/i);
  });
  it.each([NaN, Infinity, 1.5, -1, 320])('rejects unsupported height %s rather than clamping', y => {
    expect(() => importBuild(legacy([{ x: 0, y, z: 0, id: 'minecraft:stone' }]))).toThrow(/height|y/i);
  });
  it.each([0, -1, 1.5, Infinity, 100000000])('rejects invalid dimensions %s', x => {
    expect(() => importBuild({ ...legacy([]), size: { x, y: 320, z: 8 } })).toThrow(/size|dimension|large/i);
  });
  it.each([-1, 0.5, 1, NaN])('rejects invalid palette index %s', pi => {
    expect(() => importBuild({ ...legacy([]), version: 1, palette: ['minecraft:stone'], blocks: [[0, 0, 0, pi]] })).toThrow(/palette index/i);
  });
  it('rejects malformed sparse records and missing arrays', () => {
    for (const blocks of [null, [null], [[0, 0]]]) expect(() => importBuild({ ...legacy([]), version: 1, palette: [], blocks })).toThrow(/block/i);
  });
  it('rejects invalid editor coordinates on export instead of dropping them', () => {
    const s = { sizeX: 8, sizeZ: 8, layers: new Map([[320, new Map([['0,0', 'minecraft:stone']])]]) };
    for (const exporter of [exportBuildV0, exportBuildV1]) expect(() => exporter(s, 'bad', 319)).toThrow(/height|y/i);
  });
  it('does not truncate occupied layers to the requested export height', () => {
    const s = importBuild(legacy([{ x: 0, y: 5, z: 0, id: 'stone' }]));
    expect(() => exportBuildV1(s, 'bad', 2)).toThrow(/height|y/i);
  });
});

describe('state syntax', () => {
  it.each(['', 'stone[broken]', 'minecraft:stone[a=1,a=2]', 'minecraft:stone[a=]', 'minecraft:stone[a=x]junk'])('rejects malformed state %s', input => {
    expect(() => parseBlockStateString(input)).toThrow(/state|propert/i);
  });
});
