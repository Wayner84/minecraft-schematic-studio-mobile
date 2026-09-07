import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
// UV lookup is browser-canvas dependent; geometry and ray intersections stay real.
vi.mock('./atlas', () => ({ getTileUV: () => ({ u0: 0, v0: 0, u1: 1, v1: 1 }), tilesForBlock: () => ({ top: 'top', side: 'side', bottom: 'bottom' }) }));
import { getBlockGeometry } from './blockGeometry';

function volume(g: THREE.BufferGeometry) {
  const p = g.getAttribute('position'), index = g.getIndex()!;
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  let sum = 0;
  for (let i = 0; i < index.count; i += 3) {
    a.fromBufferAttribute(p, index.getX(i)); b.fromBufferAttribute(p, index.getX(i + 1)); c.fromBufferAttribute(p, index.getX(i + 2));
    sum += a.dot(b.cross(c)) / 6;
  }
  return Math.abs(sum);
}

describe('partial block geometry', () => {
  it.each([['bottom', -0.5, 0], ['top', 0, 0.5], ['double', -0.5, 0.5]] as const)('renders %s slabs at the correct half', (type, min, max) => {
    const g = getBlockGeometry(`minecraft:oak_slab[type=${type}]`); g.computeBoundingBox();
    expect(g.boundingBox!.min.y).toBe(min); expect(g.boundingBox!.max.y).toBe(max);
    expect(volume(g)).toBeCloseTo(max - min);
  });
  it.each(['north', 'east', 'south', 'west'])('orients straight %s stairs toward the high step', facing => {
    const g = getBlockGeometry(`minecraft:oak_stairs[facing=${facing},half=bottom,shape=straight]`);
    expect(volume(g)).toBeCloseTo(0.75);
    const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    const [x, z] = ({ north: [0, -1], east: [1, 0], south: [0, 1], west: [-1, 0] })[facing]!;
    const ray = new THREE.Raycaster(new THREE.Vector3(-x * 2, 0.25, -z * 2), new THREE.Vector3(x, 0, z));
    expect(ray.intersectObject(mesh)[0].distance).toBeCloseTo(2);
  });
  it.each(['bottom', 'top'])('renders imported inner/outer corners for %s stairs', half => {
    for (const shape of ['inner_left', 'inner_right', 'outer_left', 'outer_right']) {
      const g = getBlockGeometry(`minecraft:stone_stairs[facing=east,half=${half},shape=${shape}]`);
      expect(volume(g)).toBeCloseTo(shape.startsWith('inner') ? 0.875 : 0.625);
    }
  });
});
