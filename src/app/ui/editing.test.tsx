// @vitest-environment jsdom
import { act, useEffect, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { LayerEditor, type LayerEditorState, exportBuildV1, importBuild } from './LayerEditor';
import { HotbarPalette } from './HotbarPalette';

let root: Root, host: HTMLDivElement;
let current: LayerEditorState, selected: string;
const fillText = vi.fn();
beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  localStorage.clear();
  host = document.createElement('div'); document.body.append(host); root = createRoot(host);
  const context = new Proxy({ fillText }, { get: (obj, key) => key in obj ? obj[key as keyof typeof obj] : () => undefined, set: () => true });
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context as any);
});
afterEach(() => { act(() => root.unmount()); host.remove(); vi.restoreAllMocks(); fillText.mockClear(); });
function mount(initial = 'minecraft:stone', layer = new Map<string, string>(), size = 8) {
  function Harness() {
    const [s, setS] = useState<LayerEditorState>({ sizeX: size, sizeZ: size, layers: new Map([[0, layer]]) });
    const [id, setId] = useState(initial);
    useEffect(() => { current = s; selected = id; }, [s, id]);
    return <><LayerEditor state={s} onChange={setS} y={0} setY={() => {}} selected={id} setSelected={setId} tool="pencil" setTool={() => {}} textureVersion={0} cellPx={16} setCellPx={() => {}} />
      <HotbarPalette selected={id} onSelect={setId} onUndo={() => {}} onRedo={() => {}} canUndo={false} canRedo={false} /></>;
  }
  act(() => root.render(<Harness />));
}
function click(text: string) {
  const button = [...host.querySelectorAll('button')].find(b => b.textContent?.trim() === text || b.getAttribute('aria-label') === text);
  expect(button, `button ${text}`).toBeTruthy();
  act(() => button!.click());
}
function pointer(type: string, id: number, x = 4, y = 4, target = host.querySelector('.canvasGestures')!, button = 0) {
  const event = new MouseEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, button });
  Object.defineProperties(event, { pointerId: { value: id }, pointerType: { value: 'touch' } });
  act(() => target.dispatchEvent(event));
}
it('cancels an entire pending stroke when a second finger starts a pinch', () => {
  mount(); pointer('pointerdown', 1); pointer('pointermove', 1, 24);
  pointer('pointerdown', 2, 80); pointer('pointermove', 2, 100);
  pointer('pointerup', 2, 100); pointer('pointerup', 1, 24);
  expect(current.layers.get(0)?.size).toBe(0);
});
it('cancels pending paint on pointer cancellation', () => {
  mount(); pointer('pointerdown', 1); pointer('pointercancel', 1);
  expect(current.layers.get(0)?.size).toBe(0);
});
it('bounds the backing canvas for large imported grids', () => {
  mount('minecraft:stone', new Map(), 512);
  const canvas = host.querySelector('canvas')!;
  expect(canvas.width).toBeLessThanOrEqual(2048);
  expect(canvas.height).toBeLessThanOrEqual(2048);
  expect(canvas.style.width).toBe('8192px');
});
it('cancels a pending stroke when another finger selects an editing control', () => {
  mount(); pointer('pointerdown', 1);
  const button = [...host.querySelectorAll('button')].find(b => b.textContent?.trim() === 'All blocks')!;
  pointer('pointerdown', 2, 4, 4, button); click('All blocks'); pointer('pointerup', 1);
  expect(current.layers.get(0)?.size).toBe(0);
});
it('does not paint the border when a tap starts outside the transformed grid', () => {
  mount(); pointer('pointerdown', 1, -100, -100); pointer('pointerup', 1, -100, -100);
  expect(current.layers.get(0)?.size).toBe(0);
});
it('cancels paint when a navigation control is pressed with another finger', () => {
  mount(); pointer('pointerdown', 1);
  const control = host.querySelector('[aria-label="Move grid up"]')!;
  pointer('pointerdown', 2, 4, 4, control); pointer('pointerup', 2, 4, 4, control); pointer('pointerup', 1);
  expect(current.layers.get(0)?.size).toBe(0);
});
it('pan mode and navigation controls never place blocks', () => {
  mount(); click('Pan'); pointer('pointerdown', 1); pointer('pointermove', 1, 70); pointer('pointerup', 1, 70);
  click('Fit grid'); click('Zoom in grid');
  expect(current.layers.get(0)?.size).toBe(0);
});
it('ignores right-button painting', () => {
  mount(); pointer('pointerdown', 1, 4, 4, host.querySelector('.canvasGestures')!, 2); pointer('pointerup', 1);
  expect(current.layers.get(0)?.size).toBe(0);
});
it('lists each block only once', () => {
  mount(); click('All blocks');
  const names = [...host.querySelectorAll('.blockPick')].map(b => b.getAttribute('aria-label'));
  expect(new Set(names).size).toBe(names.length);
});
function paint(x: number) {
  const target = host.querySelector('.canvasGestures')!;
  act(() => target.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: x * 16 * 1.15 + 4, clientY: 4 })));
  act(() => target.dispatchEvent(new MouseEvent('pointerup', { bubbles: true })));
}
it('selects and paints a top slab through touch-sized variant controls', () => {
  mount(); click('All blocks'); click('Oak Slab');
  expect(selected).toBe('minecraft:oak_slab[type=bottom,waterlogged=false]');
  click('Block variant'); click('Slab top'); click('Done'); paint(0);
  expect(current.layers.get(0)?.get('0,0')).toBe('minecraft:oak_slab[type=top,waterlogged=false]');
  expect(importBuild(exportBuildV1(current, 'test', 319)).layers).toEqual(current.layers);
  expect(fillText.mock.calls.some(args => args[0] === 'T')).toBe(true);
});
it('edits stair facing and half without replacing an imported corner or waterlogged property', () => {
  mount('minecraft:oak_stairs[facing=west,half=bottom,shape=inner_left,waterlogged=true]');
  click('Block variant'); click('Facing east'); click('Half top'); click('Done'); paint(0);
  expect(selected).toBe('minecraft:oak_stairs[facing=east,half=top,shape=inner_left,waterlogged=true]');
  expect(current.layers.get(0)?.get('0,0')).toBe(selected);
  expect(fillText.mock.calls.some(args => args[0] === '→T IL')).toBe(true);
});
it('erases beside an imported chest without resetting its state or mutating history', () => {
  const chest = 'minecraft:chest[facing=south,type=left,waterlogged=true]';
  const original = new Map([['0,0', chest], ['1,0', 'minecraft:stone']]);
  mount('minecraft:air', original); paint(1);
  expect(current.layers.get(0)?.get('0,0')).toBe(chest);
  expect(current.layers.get(0)?.has('1,0')).toBe(false);
  expect(original.get('1,0')).toBe('minecraft:stone');
});
