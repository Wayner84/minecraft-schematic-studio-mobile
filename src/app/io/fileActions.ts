import { isKnownBlock } from '../data/blockPalette';
import { importBuild } from './design';
import { importLitematic } from './litematic';
import { readJsonFile } from './saveLoad';

// Shared by start screen, desktop controls, drop handler and mobile menu.
export async function runFileAction(action: () => Promise<unknown>) {
  try { await action(); }
  catch (error) {
    window.alert(error instanceof Error ? error.message : String(error));
  }
}

export async function readDesign(file: File) {
  const litematic = file.name.toLowerCase().endsWith('.litematic');
  if (litematic && !window.confirm('Import a blocks-only editing copy? The origin is rebased to the lowest occupied corner; empty margins, region names and metadata are not retained. Entities, inventories, ticks and overlapping regions are rejected. Keep your original file. Continue?')) return null;
  const next = litematic ? await importLitematic(file) : importBuild(await readJsonFile(file));
  const unknown = new Set<string>();
  for (const layer of next.layers.values()) for (const id of layer.values()) if (!isKnownBlock(id)) unknown.add(id);
  if (unknown.size && !window.confirm(`${unknown.size} unknown block state(s) will be preserved exactly, but shown with placeholder previews. Examples: ${[...unknown].slice(0, 3).join('; ')}. Continue?`)) return null;
  return next;
}
