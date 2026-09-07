import { readFileSync } from 'node:fs';
import { expect, it } from 'vitest';
const css = readFileSync(new URL('../../App.css', import.meta.url), 'utf8');
it('does not size portrait rows as a full viewport plus the toolbar', () => {
  expect(css).not.toContain('minmax(310px, 58svh)');
});
it('keeps gesture panning independent of native scrolling', () => {
  expect(css).toMatch(/\.canvasGestures\s*\{[^}]*overflow:\s*hidden/);
});
it('keeps the start card inside the padded mobile viewport', () => {
  expect(css).toMatch(/\.startCard\s*\{[^}]*width:\s*min\(520px,\s*100%\)/);
});
it('provides wrapped, scrollable variant controls and 44px targets', () => {
  expect(css).toMatch(/\.variantSheet\s*\{[^}]*overflow-y:\s*auto/);
  expect(css).toMatch(/button[^}]*min-width:\s*var\(--tap\)/);
});
