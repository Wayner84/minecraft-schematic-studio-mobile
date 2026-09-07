import { saveBlob, saveJson } from '../io/saveLoad';
import { exportLitematic } from '../io/litematic';
import { exportBuildV1 } from '../io/design';
import { readDesign, runFileAction } from '../io/fileActions';
import { EditorCanvas, type DrawTool } from './EditorCanvas';
import { BlockVariantControls } from './BlockVariantControls';


type CellKey = string; // "x,z"


export type LayerEditorState = {
  sizeX: number;
  sizeZ: number;
  // sparse per layer: map of x,z -> blockId
  layers: Map<number, Map<CellKey, string>>;
};

// Keep the original public imports working for older callers.
export { exportBuildV0, exportBuildV1, importBuild } from '../io/design';

export function LayerEditor({
  state,
  onChange,
  onBeginEdit,
  y,
  setY,
  selected,
  setSelected,
  tool,
  setTool,
  textureVersion,
  cellPx,
  setCellPx,
}: {
  state: LayerEditorState;
  onChange: React.Dispatch<React.SetStateAction<LayerEditorState>>;
  onBeginEdit?: () => void;
  y: number;
  setY: (y: number) => void;
  selected: string;
  setSelected: (id: string) => void;
  tool: DrawTool;
  setTool: (tool: DrawTool) => void;
  textureVersion: number;
  cellPx: number;
  setCellPx: (n: number) => void;
}) {
  async function onImportJsonFile(file: File) {
    await runFileAction(async () => {
      const next = await readDesign(file);
      if (next) { onChange(next); setY(0); }
    });
  }

  async function onImportLitematicFile(file: File) {
    await onImportJsonFile(file);
  }

  return (
    <div className="editorPane">
      <div className="panel desktopControls">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div className="title">Layer</div>
            <div className="muted">Y = {y} (ghost Y-1)</div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="btn" onClick={() => setY(Math.max(0, y - 1))}>-1</button>
            <button className="btn" onClick={() => setY(Math.min(319, y + 1))}>+1</button>
          </div>
        </div>
        <input type="range" min={0} max={319} value={y} onChange={e => setY(Number(e.target.value))} />
      </div>

      <div className="panel row toolPanel" style={{ alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div className="toolGrid" role="toolbar" aria-label="Drawing tools">
          {([
            ['pencil', '✎', 'Pencil'],
            ['line', '╱', 'Line'],
            ['rectangle', '▭', 'Rectangle'],
            ['filled-rectangle', '▰', 'Filled rectangle'],
            ['circle', '○', 'Circle'],
            ['filled-circle', '●', 'Filled circle'],
          ] as Array<[DrawTool, string, string]>).map(([id, icon, label]) => (
            <button key={id} className={tool === id ? 'toolBtn active' : 'toolBtn'} onClick={() => setTool(id)} title={label}>
              <span>{icon}</span><small>{label}</small>
            </button>
          ))}
        </div>
        <button
          className={selected === 'minecraft:air' ? 'btn eraserBtn active' : 'btn eraserBtn'}
          onClick={() => setSelected('minecraft:air')}
        >
          Eraser
        </button>
      </div>

      <div className="panel row desktopControls" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="row" style={{ gap: 10 }}>
          <div className="muted">Zoom</div>
          <button className="btn" onClick={() => setCellPx(Math.max(2, cellPx - 1))}>-</button>
          <button className="btn" onClick={() => setCellPx(Math.min(18, cellPx + 1))}>+</button>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <button
            className="btn primary"
            onClick={() => void runFileAction(() => saveJson(`build-${Date.now()}.json`, exportBuildV1(state, 'Untitled build', 319)))}
          >
            Export JSON
          </button>

          <button
            className="btn"
            onClick={() => void runFileAction(async () => {
                const blob = await exportLitematic(state, 'Untitled build');
                await saveBlob(`build-${Date.now()}.litematic`, blob);
            })}
          >
            Export .litematic
          </button>

          <label className="btn" style={{ cursor: 'pointer' }}>
            Import JSON
            <input
              type="file"
              accept="application/json"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) void onImportJsonFile(f);
              }}
            />
          </label>

          <label className="btn" style={{ cursor: 'pointer' }}>
            Import .litematic
            <input
              type="file"
              accept=".litematic,application/octet-stream"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) void onImportLitematicFile(f);
              }}
            />
          </label>
        </div>
      </div>

      <BlockVariantControls selected={selected} onSelect={setSelected} />
      <EditorCanvas
        state={state}
        y={y}
        cellPx={cellPx}
        selected={selected}
        tool={tool}
        textureVersion={textureVersion}
        onChange={onChange}
        onBeginEdit={onBeginEdit}
      />

      <div className="muted" style={{ marginTop: 8 }}>
        N ↑ (−Z) · E → (+X) · B bottom · T top · D double. Arrows face the high stair step; IL/IR inner, OL/OR outer corners. Zoom in to read cell indicators.
      </div>
    </div>
  );
}
