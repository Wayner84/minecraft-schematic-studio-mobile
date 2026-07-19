import { useEffect, useMemo, useRef, useState } from 'react';
import { BLOCKS, DEFAULT_BLOCK_ID, getBlockById } from '../data/blockPalette';
import { getBlockPreviewStyle } from '../view/blockPreview';

type Props = {
  selected: string;
  onSelect: (id: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const STORAGE_KEY = 'mss.hotbar.v2';
const SLOT_COUNT = 10;

function defaultHotbar() {
  return [
    'minecraft:dirt',
    'minecraft:oak_planks',
    'minecraft:stone',
    'minecraft:cobblestone',
    'minecraft:glass',
    'minecraft:sand',
    'minecraft:grass_block',
    'minecraft:oak_log',
    'minecraft:white_wool',
    'minecraft:air',
  ];
}

function normalizeHotbar(ids: string[]): string[] {
  const valid = new Set(BLOCKS.map(b => b.id));
  const out: string[] = [];
  for (const id of ids) if (valid.has(id)) out.push(id);
  while (out.length < SLOT_COUNT) out.push(DEFAULT_BLOCK_ID);
  return out.slice(0, SLOT_COUNT);
}

export function HotbarPalette({ selected, onSelect, onUndo, onRedo, canUndo, canRedo }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [editSlot, setEditSlot] = useState<number | null>(null);
  const holdTimer = useRef<number | null>(null);
  const [hotbar, setHotbar] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) ?? localStorage.getItem('mss.hotbar.v1');
      if (!raw) return defaultHotbar();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return defaultHotbar();
      return normalizeHotbar(parsed);
    } catch {
      return defaultHotbar();
    }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(hotbar)); } catch { /* ignore */ }
  }, [hotbar]);

  const categories = useMemo(() => ['all', ...Array.from(new Set(BLOCKS.map(b => b.category)))], []);
  const list = useMemo(() => {
    const t = q.trim().toLowerCase();
    return BLOCKS.filter(b => {
      if (category !== 'all' && b.category !== category) return false;
      if (!t) return true;
      return (b.name + ' ' + b.id + ' ' + b.category).toLowerCase().includes(t);
    });
  }, [q, category]);

  function openForSlot(i: number) {
    setEditSlot(i);
    setOpen(true);
  }

  function clearHold() {
    if (holdTimer.current != null) window.clearTimeout(holdTimer.current);
    holdTimer.current = null;
  }

  return (
    <>
      <div className="hotbar" role="toolbar" aria-label="Block hotbar">
        <div className="hotbarHistory">
          <button className="hotbarIconBtn" onClick={onUndo} disabled={!canUndo} aria-label="Undo">↶</button>
          <button className="hotbarIconBtn" onClick={onRedo} disabled={!canRedo} aria-label="Redo">↷</button>
        </div>

        <div className="hotbarRail" role="group" aria-label="10 editable quick slots">
          {hotbar.map((id, i) => {
            const b = getBlockById(id);
            const active = id === selected;
            return (
              <button
                key={i}
                className={active ? 'hotbarSlot active' : 'hotbarSlot'}
                onClick={() => onSelect(id)}
                onPointerDown={() => {
                  clearHold();
                  holdTimer.current = window.setTimeout(() => openForSlot(i), 520);
                }}
                onPointerUp={clearHold}
                onPointerCancel={clearHold}
                onPointerLeave={clearHold}
                onContextMenu={e => { e.preventDefault(); openForSlot(i); }}
                title={`${b.name} (long-press/right-click to change this quick slot)`}
              >
                <span className="hotbarSwatch" style={getBlockPreviewStyle(id)} />
                <span className="hotbarEditBadge" aria-hidden="true">✎</span>
                <span className="hotbarIndex">{i + 1}</span>
              </button>
            );
          })}
        </div>

        <button
          className="hotbarBtn allBlocksBtn"
          onClick={() => { setEditSlot(null); setOpen(true); }}
          title="Open all blocks without changing quick slots"
        >
          All blocks
        </button>
      </div>

      {open && (
        <div className="modalOverlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="modal blockPicker" onClick={e => e.stopPropagation()}>
            <div className="sheetHandle" aria-hidden="true" />
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div className="title">{editSlot === null ? 'All blocks' : `Set quick slot ${editSlot + 1}`}</div>
                <div className="muted">
                  {editSlot === null ? 'Selecting here does not modify the 10 quick slots.' : 'Pick any block to replace this slot while you work.'}
                </div>
              </div>
              <button className="btn" onClick={() => { setOpen(false); setEditSlot(null); }}>Close</button>
            </div>

            <input className="input" placeholder="Search 1.21.8 Java blocks…" value={q} onChange={e => setQ(e.target.value)} />
            <div className="categoryChips">
              {categories.map(c => <button key={c} className={category === c ? 'chip active' : 'chip'} onClick={() => setCategory(c)}>{c}</button>)}
            </div>

            <div className="blockGridPicker">
              {list.map(b => (
                <button
                  key={b.id}
                  className={b.id === selected ? 'blockPick active' : 'blockPick'}
                  onClick={() => {
                    if (editSlot !== null) {
                      setHotbar(prev => {
                        const next = prev.slice();
                        next[editSlot] = b.id;
                        return next;
                      });
                      setEditSlot(null);
                    }
                    onSelect(b.id);
                    setOpen(false);
                  }}
                >
                  <span className="blockPickTex" style={getBlockPreviewStyle(b.id)} />
                  <span className="blockPickName">{b.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
