// @vitest-environment jsdom
import { afterEach, expect, it, vi } from 'vitest';
import { readDesign, runFileAction } from './fileActions';
import { readJsonFile } from './saveLoad';
afterEach(() => vi.restoreAllMocks());
it('shows actionable errors instead of swallowing rejected imports/exports', async () => {
  const alert = vi.spyOn(window, 'alert').mockImplementation(() => {});
  await runFileAction(async () => { throw new Error('Invalid palette index 7; keep the original'); });
  expect(alert).toHaveBeenCalledWith(expect.stringContaining('Invalid palette index 7'));
});
it('allows cancellation of lossy Litematica normalization before parsing', async () => {
  const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
  await expect(readDesign(new File(['not NBT'], 'test.litematic'))).resolves.toBeNull();
  expect(confirm).toHaveBeenCalledWith(expect.stringMatching(/origin.*metadata/i));
});
it('bounds JSON file reads before allocating text', async () => {
  const text = vi.fn();
  await expect(readJsonFile({ size: 64 * 1024 * 1024 + 1, text } as unknown as File)).rejects.toThrow(/64 MiB/);
  expect(text).not.toHaveBeenCalled();
});
