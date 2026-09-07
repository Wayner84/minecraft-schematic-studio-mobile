import { describe, expect, it } from 'vitest';
import * as states from './blockState';

describe('editable slab and stair variants', () => {
  it('selects a complete canonical default slab state', () => {
    expect(states).toHaveProperty('withVariantDefaults');
    expect(states.withVariantDefaults('minecraft:oak_slab')).toBe('minecraft:oak_slab[type=bottom,waterlogged=false]');
  });
  it('changes only the requested stair property, retaining imported corners and water', () => {
    expect(states).toHaveProperty('setBlockVariant');
    const imported = 'minecraft:oak_stairs[facing=west,half=top,shape=inner_left,waterlogged=true]';
    expect(states.setBlockVariant(imported, 'facing', 'east')).toBe('minecraft:oak_stairs[facing=east,half=top,shape=inner_left,waterlogged=true]');
  });
  it('does not add stair properties to chests', () => {
    expect(states).toHaveProperty('withVariantDefaults');
    const chest = 'minecraft:chest[facing=south,type=left,waterlogged=true]';
    expect(states.withVariantDefaults(chest)).toBe(chest);
    expect(() => states.setBlockVariant(chest, 'half', 'top')).toThrow(/variant/i);
  });
  it('provides texture-independent facing and half indicators', () => {
    expect(states).toHaveProperty('variantIndicator');
    expect(states.variantIndicator('minecraft:oak_slab[type=double]')).toBe('D');
    expect(states.variantIndicator('minecraft:oak_slab[type=top]')).toBe('T');
    expect(states.variantIndicator('minecraft:oak_stairs[facing=north,half=bottom,shape=outer_right]')).toBe('↑B OR');
  });
});
