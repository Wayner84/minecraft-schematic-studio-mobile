import { useEffect, useMemo, useState } from 'react';
import { LayerEditor, exportBuildV1, importBuild } from './LayerEditor';
import { Viewer3D } from './Viewer3D';
import { HotbarPalette } from './HotbarPalette';
import { createEmptyEditorState } from '../model/editorState';
import { DEFAULT_BLOCK_ID, MINECRAFT_VERSION } from '../data/blockPalette';
import { getAtlasStatus, loadResourcePackZip, resetAtlasToProcedural, type AtlasStatus } from '../view/atlas';
import { downloadBlob, downloadJson, readJsonFile } from '../io/saveLoad';
import { exportLitematic, importLitematic } from '../io/litematic';
import type { LayerEditorState } from './LayerEditor';
import type { DrawTool } from './EditorCanvas';

function cloneEditorState(s: LayerEditorState): LayerEditorState {
  const layers = new Map<number, Map<string, string>>();
  for (const [y, layer] of s.layers.entries()) layers.set(y, new Map(layer));
  return { sizeX: s.sizeX, sizeZ: s.sizeZ, layers };
}

type Screen = 'start' | 'editor' | 'settings';
type Theme = 'dark' | 'light';

export function AppShell() {
  const [screen, setScreen] = useState<Screen>('start');
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('mss.theme') as Theme) || 'dark');
  const [designDirectory, setDesignDirectory] = useState(() => localStorage.getItem('mss.designDirectory') || 'Browser downloads / app storage');
  const [shadows, setShadows] = useState(true);

  const [editorState, setEditorState] = useState(() => createEmptyEditorState(128, 128));
  const [historyPast, setHistoryPast] = useState<LayerEditorState[]>([]);
  const [historyFuture, setHistoryFuture] = useState<LayerEditorState[]>([]);

  const [y, setY] = useState(0);
  const [selected, setSelected] = useState(DEFAULT_BLOCK_ID);
  const [tool, setTool] = useState<DrawTool>('pencil');
  const [cellPx, setCellPx] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 980px)').matches) return 16;
    return 8;
  });

  const [atlasStatus, setAtlasStatus] = useState<AtlasStatus>(() => getAtlasStatus());
  const [toast, setToast] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('mss.theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const textureLabel = useMemo(() => atlasStatus.source === 'resource-pack' ? 'Texture pack loaded' : 'Demo textures', [atlasStatus.source]);

  function showToast(msg: string, ms = 2400) {
    setToast(msg);
    window.setTimeout(() => setToast(null), ms);
  }

  function pushHistory(next: LayerEditorState) {
    setHistoryPast(prev => {
      const copy = prev.slice();
      copy.push(cloneEditorState(editorState));
      while (copy.length > 50) copy.shift();
      return copy;
    });
    setHistoryFuture([]);
    setEditorState(next);
  }

  function newDesign() {
    setEditorState(createEmptyEditorState(128, 128));
    setHistoryPast([]);
    setHistoryFuture([]);
    setY(0);
    setSelected(DEFAULT_BLOCK_ID);
    setTool('pencil');
    setScreen('editor');
    showToast('New 128 × 128 design created');
  }

  async function openJsonFile(file: File) {
    const json = await readJsonFile(file);
    const next = importBuild(json);
    setEditorState(next);
    setHistoryPast([]);
    setHistoryFuture([]);
    setY(0);
    setScreen('editor');
    showToast(`Opened ${file.name}`);
  }

  async function loadPack(file: File) {
    const st = await loadResourcePackZip(file);
    setAtlasStatus(st);
    showToast(`Loaded texture pack: ${file.name}`);
  }

  async function chooseDesignDirectory() {
    const picker = (window as any).showDirectoryPicker;
    if (!picker) {
      const value = 'Your browser does not expose folder picking here; exports will download as files.';
      setDesignDirectory(value);
      localStorage.setItem('mss.designDirectory', value);
      showToast('Folder picker unavailable in this browser');
      return;
    }
    try {
      const handle = await picker({ mode: 'readwrite' });
      const label = handle?.name ? `Chosen folder: ${handle.name}` : 'Folder selected';
      setDesignDirectory(label);
      localStorage.setItem('mss.designDirectory', label);
      showToast(label);
    } catch {
      showToast('Directory selection cancelled');
    }
  }

  function undo() {
    setHistoryPast(prevPast => {
      if (prevPast.length === 0) return prevPast;
      const copy = prevPast.slice();
      const prevState = copy.pop()!;
      setHistoryFuture(f => [cloneEditorState(editorState), ...f].slice(0, 50));
      setEditorState(prevState);
      return copy;
    });
  }

  function redo() {
    setHistoryFuture(prevFuture => {
      if (prevFuture.length === 0) return prevFuture;
      const copy = prevFuture.slice();
      const nextState = copy.shift()!;
      setHistoryPast(p => {
        const np = p.slice(); np.push(cloneEditorState(editorState)); while (np.length > 50) np.shift(); return np;
      });
      setEditorState(nextState);
      return copy;
    });
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (t as any)?.isContentEditable) return;
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const k = e.key.toLowerCase();
      if (k === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (k === 'y') {
        e.preventDefault();
        redo();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // Rebind when the history stacks or current editor state change so undo/redo use current snapshots.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyPast.length, historyFuture.length, editorState]);

  if (screen === 'start') {
    return (
      <div className={`app app-${theme} startScreen`}>
        {toast && <div className="toast">{toast}</div>}
        <section className="startCard">
          <div className="appLogo" aria-hidden="true">▣</div>
          <h1>Minecraft Schematic Studio</h1>
          <p className="muted">Mobile-first Java {MINECRAFT_VERSION} schematic sketching: 3D viewer on top, layer grid underneath.</p>
          <div className="startActions">
            <button className="startBtn primary" onClick={newDesign}>New design</button>
            <label className="startBtn">
              Open design
              <input type="file" accept="application/json" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) void openJsonFile(f); e.currentTarget.value = ''; }} />
            </label>
            <button className="startBtn disabled" disabled>Import Litematica (coming soon)</button>
            <button className="startBtn" onClick={() => setScreen('settings')}>Settings</button>
          </div>
        </section>
      </div>
    );
  }

  if (screen === 'settings') {
    return (
      <div className={`app app-${theme} startScreen`}>
        {toast && <div className="toast">{toast}</div>}
        <section className="startCard settingsCard">
          <button className="btn" onClick={() => setScreen('start')}>← Back</button>
          <h1>Settings</h1>
          <div className="settingsList">
            <div className="settingRow"><div><div className="title">Theme</div><div className="muted">Switch between light and dark mode.</div></div><button className="btn primary" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? 'Dark' : 'Light'}</button></div>
            <div className="settingRow"><div><div className="title">Texture pack</div><div className="muted">Upload a Java resource pack .zip. Block grid and palette previews use pack textures when names match.</div></div><label className="btn primary">Load pack<input type="file" accept=".zip,application/zip" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) void loadPack(f); e.currentTarget.value = ''; }} /></label></div>
            <div className="settingRow"><div><div className="title">Texture source</div><div className="muted">{textureLabel}</div></div><button className="btn" onClick={() => { const st = resetAtlasToProcedural(); setAtlasStatus(st); showToast('Reset to demo textures'); }}>Reset</button></div>
            <div className="settingRow"><div><div className="title">Design save directory</div><div className="muted">{designDirectory}</div></div><button className="btn" onClick={chooseDesignDirectory}>Choose directory</button></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div
      className={`app app-${theme}`}
      onDragOver={e => e.preventDefault()}
      onDrop={async e => {
        e.preventDefault();
        const f = e.dataTransfer?.files?.[0];
        if (!f) return;
        try {
          if (f.name.toLowerCase().endsWith('.zip')) await loadPack(f);
          else if (f.name.toLowerCase().endsWith('.json')) await openJsonFile(f);
          else showToast('Drop a resource pack .zip or design .json');
        } catch { showToast('Could not load dropped file'); }
      }}
    >
      <header className="topbar">
        <div className="brand"><div><div className="brandTitle">Minecraft Schematic Studio</div><div className="brandSub">Java {MINECRAFT_VERSION} • {textureLabel}</div></div></div>
        <nav className="tabs">
          <button className={shadows ? 'tab active' : 'tab'} onClick={() => setShadows(v => !v)}>{shadows ? 'Shadows: on' : 'Shadows: off'}</button>
          <button className="tab" onClick={() => setScreen('start')}>Start</button>
          <button className="tab" onClick={() => setScreen('settings')}>Settings</button>
        </nav>
        <button className="menuBtn" onClick={() => setMenuOpen(true)} aria-label="Open menu">☰</button>
        {toast && <div className="toast">{toast}</div>}
      </header>

      {menuOpen && (
        <div className="modalOverlay" role="dialog" aria-modal="true" onClick={() => setMenuOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="row" style={{ justifyContent: 'space-between' }}><div><div className="title">Menu</div><div className="muted">Save, load and quick settings</div></div><button className="btn" onClick={() => setMenuOpen(false)}>Close</button></div>
            <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
              <button className={shadows ? 'btn primary' : 'btn'} onClick={() => setShadows(v => !v)}>{shadows ? 'Shadows: on' : 'Shadows: off'}</button>
              <button className="btn" onClick={undo} disabled={!historyPast.length}>Undo</button>
              <button className="btn" onClick={redo} disabled={!historyFuture.length}>Redo</button>
              <button className="btn" onClick={() => setScreen('settings')}>Settings</button>
            </div>
            <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
              <button className="btn primary" onClick={() => downloadJson(`build-${Date.now()}.json`, exportBuildV1(editorState, 'Untitled build', 319))}>Save JSON</button>
              <button className="btn" onClick={async () => downloadBlob(`build-${Date.now()}.litematic`, await exportLitematic(editorState, 'Untitled build'))}>Export .litematic</button>
              <label className="btn">Open JSON<input type="file" accept="application/json" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) void openJsonFile(f); e.currentTarget.value = ''; setMenuOpen(false); }} /></label>
              <label className="btn">Import .litematic<input type="file" accept=".litematic,application/octet-stream" style={{ display: 'none' }} onChange={async e => { const f = e.target.files?.[0]; if (!f) return; pushHistory(await importLitematic(f)); setY(0); setMenuOpen(false); e.currentTarget.value = ''; }} /></label>
            </div>
          </div>
        </div>
      )}

      <div className="floatingStack left" aria-label="Layer controls">
        <div className="floatingCard">
          <div className="floatingTitle">Layer</div>
          <input className="layerNumber" value={y} inputMode="numeric" onChange={e => setY(Math.max(0, Math.min(319, Number(e.target.value) || 0)))} />
          <button className="floatingFab" onClick={() => setY(Math.max(0, y - 1))}>−</button>
          <button className="floatingFab" onClick={() => setY(Math.min(319, y + 1))}>+</button>
        </div>
      </div>
      <div className="floatingStack right" aria-label="History controls"><button className="floatingFab" onClick={undo} disabled={!historyPast.length}>↶</button><button className="floatingFab" onClick={redo} disabled={!historyFuture.length}>↷</button></div>

      <main className="main">
        <div className="splitLayout">
          <div className="splitViewer"><div className="panel viewerPanel"><Viewer3D state={editorState} shadows={shadows} /></div></div>
          <div className="splitEditor">
            <LayerEditor
              state={editorState}
              onBeginEdit={() => { setHistoryPast(prev => { const copy = prev.slice(); copy.push(cloneEditorState(editorState)); while (copy.length > 50) copy.shift(); return copy; }); setHistoryFuture([]); }}
              onChange={next => { if (typeof next === 'function') setEditorState(prev => (next as any)(prev)); else pushHistory(next as any); }}
              y={y}
              setY={setY}
              selected={selected}
              setSelected={setSelected}
              tool={tool}
              setTool={setTool}
              textureVersion={atlasStatus.packVersion}
              cellPx={cellPx}
              setCellPx={setCellPx}
            />
          </div>
          <HotbarPalette selected={selected} onSelect={setSelected} />
        </div>
      </main>
    </div>
  );
}
