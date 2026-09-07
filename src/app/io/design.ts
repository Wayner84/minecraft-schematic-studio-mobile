import type { LayerEditorState } from '../ui/LayerEditor';
import type { BuildFileV0, BuildFileV1 } from './saveLoad';
import { canonicalBlockState, parseBlockStateString } from '../model/blockState';
import { dimensions, editorBlocks, integer, MAX_BLOCKS } from '../model/designValidation';

export function exportBuildV0(state: LayerEditorState, name: string, heightMax: number): BuildFileV0 {
  const blocks = editorBlocks(state, heightMax).map(b => {
    const parsed = parseBlockStateString(b.state);
    return { x: b.x, y: b.y, z: b.z, id: parsed.name, ...(parsed.properties ? { props: parsed.properties } : {}) };
  });
  return { version: 0, name, size: { x: state.sizeX, y: heightMax + 1, z: state.sizeZ }, blocks };
}

export function exportBuildV1(state: LayerEditorState, name: string, heightMax: number): BuildFileV1 {
  const palette: string[] = [];
  const indices = new Map<string, number>();
  const blocks = editorBlocks(state, heightMax).map(b => {
    if (!indices.has(b.state)) { indices.set(b.state, palette.length); palette.push(b.state); }
    return [b.x, b.y, b.z, indices.get(b.state)!] as [number, number, number, number];
  });
  return { version: 1, name, createdAt: new Date().toISOString(), size: { x: state.sizeX, y: heightMax + 1, z: state.sizeZ }, palette, blocks };
}

export function importBuild(file: any): LayerEditorState {
  if (!file || (file.version !== 0 && file.version !== 1)) throw new Error('Unsupported design file version');
  const size = dimensions(file.size?.x, file.size?.y, file.size?.z);
  if (!Array.isArray(file.blocks) || file.blocks.length > MAX_BLOCKS) throw new Error(`Invalid blocks array: limit ${MAX_BLOCKS}`);
  let palette: string[] = [];
  if (file.version === 1) {
    if (!Array.isArray(file.palette) || file.palette.length > MAX_BLOCKS) throw new Error('Invalid palette array');
    palette = file.palette.map((id: string) => canonicalBlockState(id));
  }
  const layers = new Map<number, Map<string, string>>();
  for (const [i, block] of file.blocks.entries()) {
    if (!block || (file.version === 1 && (!Array.isArray(block) || block.length !== 4))) throw new Error(`Invalid block record ${i}`);
    const [x, y, z] = file.version === 1 ? block : [block.x, block.y, block.z];
    integer(x, `block ${i} x coordinate`, 0, size.x - 1);
    integer(y, `block ${i} y height`, 0, size.y - 1);
    integer(z, `block ${i} z coordinate`, 0, size.z - 1);
    const id = file.version === 1
      ? palette[integer(block[3], `block ${i} palette index`, 0, palette.length - 1)]
      : canonicalBlockState(block.id, block.props);
    if (!layers.has(y)) layers.set(y, new Map());
    const layer = layers.get(y)!;
    if (id === 'minecraft:air') layer.delete(`${x},${z}`);
    else layer.set(`${x},${z}`, id);
  }
  return { sizeX: size.x, sizeZ: size.z, layers };
}
