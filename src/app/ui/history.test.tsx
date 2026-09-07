// @vitest-environment jsdom
import { act, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { expect, it, vi } from 'vitest';
vi.mock('./Viewer3D', () => ({ Viewer3D: ({ state }: any) => <output>{JSON.stringify([...state.layers].map(([y, layer]: any) => [y, [...layer]]))}</output> }));
import { AppShell } from './AppShell';
it('undoes/redoes each stroke exactly once under React StrictMode', () => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
  const host = document.createElement('div'); document.body.append(host); const root = createRoot(host);
  const click = (label: string) => act(() => [...host.querySelectorAll('button')].find(b => b.textContent === label || b.getAttribute('aria-label') === label)!.click());
  try {
    act(() => root.render(<StrictMode><AppShell /></StrictMode>)); click('New design');
    for (const x of [4, 24]) {
      act(() => host.querySelector('.canvasGestures')!.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, clientX: x, clientY: 4 })));
      act(() => host.querySelector('.canvasGestures')!.dispatchEvent(new MouseEvent('pointerup', { bubbles: true })));
    }
    const painted = host.querySelector('output')!.textContent;
    click('Undo'); click('Undo'); expect(host.querySelector('output')!.textContent).toBe('[]');
    click('Redo'); click('Redo'); expect(host.querySelector('output')!.textContent).toBe(painted);
    expect((host.querySelector('[aria-label="Redo"]') as HTMLButtonElement).disabled).toBe(true);
  } finally { act(() => root.unmount()); host.remove(); vi.restoreAllMocks(); }
});
