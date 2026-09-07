import { expect, it } from 'vitest';
import { texturePathCandidates } from './blockPreview';
import * as atlas from './atlas';
import { getBlockById } from '../data/blockPalette';

it.each([
  ['oak_slab[type=top]', 'oak_planks'], ['birch_stairs[facing=east,half=top]', 'birch_planks'],
  ['stone_brick_stairs[facing=west]', 'stone_bricks'], ['brick_slab[type=double]', 'bricks'],
  ['quartz_stairs[half=top]', 'quartz_block_top'], ['petrified_oak_slab', 'oak_planks'],
  ['waxed_weathered_cut_copper_stairs', 'weathered_cut_copper'],
])('maps %s to material textures in both views', (state, texture) => {
  const paths = texturePathCandidates(`minecraft:${state}`);
  expect(paths).toContain(`assets/minecraft/textures/block/${texture}.png`);
  expect(paths.every(p => !p.includes('['))).toBe(true);
  expect(atlas).toHaveProperty('textureNamesForFace');
  expect(atlas.textureNamesForFace(`minecraft:${state}`, 'top')).toContain(texture);
});
it('strips suffixes from non-variant texture lookups', () => {
  expect(texturePathCandidates('minecraft:chest[facing=west,waterlogged=true]')).toContain('assets/minecraft/textures/block/chest_front.png');
});
it('labels unknown states as themselves, not air', () => {
  expect(getBlockById('mod:widget[mode=working]').id).toBe('mod:widget');
});
