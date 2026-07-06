import { useEffect, useMemo, useRef, useState } from 'react';
import { baseBlockId, getBlockById } from '../data/blockPalette';
import { getBlockPreviewImage } from '../view/blockPreview';
import type { LayerEditorState } from './LayerEditor';

export type DrawTool = 'pencil' | 'line' | 'rectangle' | 'filled-rectangle' | 'circle' | 'filled-circle';

type CellKey = string;
const keyXZ = (x: number, z: number): CellKey => `${x},${z}`;

function getLayerMap(state: LayerEditorState, y: number): Map<CellKey, string> {
  let m = state.layers.get(y);
  if (!m) {
    m = new Map();
    state.layers.set(y, m);
  }
  return m;
}

function lineCells(x0: number, z0: number, x1: number, z1: number) {
  const cells: Array<{ x: number; z: number }> = [];
  const dx = Math.abs(x1 - x0), dz = Math.abs(z1 - z0);
  const sx = x0 < x1 ? 1 : -1;
  const sz = z0 < z1 ? 1 : -1;
  let err = dx - dz;
  let x = x0, z = z0;
  while (true) {
    cells.push({ x, z });
    if (x === x1 && z === z1) break;
    const e2 = err * 2;
    if (e2 > -dz) { err -= dz; x += sx; }
    if (e2 < dx) { err += dx; z += sz; }
  }
  return cells;
}

function rectangleCells(x0: number, z0: number, x1: number, z1: number, filled: boolean) {
  const cells: Array<{ x: number; z: number }> = [];
  const minX = Math.min(x0, x1), maxX = Math.max(x0, x1);
  const minZ = Math.min(z0, z1), maxZ = Math.max(z0, z1);
  for (let z = minZ; z <= maxZ; z++) {
    for (let x = minX; x <= maxX; x++) {
      if (filled || x === minX || x === maxX || z === minZ || z === maxZ) cells.push({ x, z });
    }
  }
  return cells;
}

function circleCells(x0: number, z0: number, x1: number, z1: number, filled: boolean) {
  const cells: Array<{ x: number; z: number }> = [];
  const rx = Math.max(1, Math.abs(x1 - x0));
  const rz = Math.max(1, Math.abs(z1 - z0));
  for (let z = z0 - rz; z <= z0 + rz; z++) {
    for (let x = x0 - rx; x <= x0 + rx; x++) {
      const n = ((x - x0) * (x - x0)) / (rx * rx) + ((z - z0) * (z - z0)) / (rz * rz);
      if (filled ? n <= 1.0 : n <= 1.18 && n >= 0.78) cells.push({ x, z });
    }
  }
  return cells;
}

function cellsForTool(tool: DrawTool, start: { x: number; z: number }, end: { x: number; z: number }) {
  switch (tool) {
    case 'line': return lineCells(start.x, start.z, end.x, end.z);
    case 'rectangle': return rectangleCells(start.x, start.z, end.x, end.z, false);
    case 'filled-rectangle': return rectangleCells(start.x, start.z, end.x, end.z, true);
    case 'circle': return circleCells(start.x, start.z, end.x, end.z, false);
    case 'filled-circle': return circleCells(start.x, start.z, end.x, end.z, true);
    case 'pencil':
    default: return [{ x: end.x, z: end.z }];
  }
}

function withProps(id: string, props: Record<string, string>) {
  const base = baseBlockId(id);
  const body = Object.keys(props).sort().map(k => `${k}=${props[k]}`).join(',');
  return body ? `${base}[${body}]` : base;
}

function isPairableChest(id: string) {
  const base = baseBlockId(id);
  return base === 'minecraft:chest' || base === 'minecraft:trapped_chest';
}

function updateChestPairing(layer: Map<CellKey, string>, x: number, z: number) {
  const k = keyXZ(x, z);
  const id = layer.get(k);
  if (!id || !isPairableChest(id)) return;
  const base = baseBlockId(id);
  const left = layer.get(keyXZ(x - 1, z));
  const right = layer.get(keyXZ(x + 1, z));
  if (right && baseBlockId(right) === base && !left) {
    layer.set(k, withProps(base, { facing: 'north', type: 'left', waterlogged: 'false' }));
    layer.set(keyXZ(x + 1, z), withProps(base, { facing: 'north', type: 'right', waterlogged: 'false' }));
  } else if (left && baseBlockId(left) === base && !right) {
    layer.set(keyXZ(x - 1, z), withProps(base, { facing: 'north', type: 'left', waterlogged: 'false' }));
    layer.set(k, withProps(base, { facing: 'north', type: 'right', waterlogged: 'false' }));
  } else {
    layer.set(k, withProps(base, { facing: 'north', type: 'single', waterlogged: 'false' }));
  }
}

function refreshChestNeighbours(layer: Map<CellKey, string>, x: number, z: number) {
  for (const [nx, nz] of [[x - 1, z], [x, z], [x + 1, z]] as Array<[number, number]>) updateChestPairing(layer, nx, nz);
}

export function EditorCanvas({
  state,
  y,
  cellPx,
  selected,
  tool,
  textureVersion,
  onChange,
  onBeginEdit,
}: {
  state: LayerEditorState;
  y: number;
  cellPx: number;
  selected: string;
  tool: DrawTool;
  textureVersion: number;
  onChange: React.Dispatch<React.SetStateAction<LayerEditorState>>;
  onBeginEdit?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imageTick, setImageTick] = useState(0);

  const [viewScale, setViewScale] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(max-width: 980px)').matches) return 1.2;
    return 1.15;
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<null | { startDist: number; startScale: number; startMid: { x: number; y: number }; startOffset: { x: number; y: number } }>(null);
  const panTimerRef = useRef<number | null>(null);

  const isPaintingRef = useRef(false);
  const lastPaint = useRef<{ x: number; z: number } | null>(null);
  const shapeStart = useRef<{ x: number; z: number } | null>(null);
  const shapeEnd = useRef<{ x: number; z: number } | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;

    const w = state.sizeX * cellPx;
    const h = state.sizeZ * cellPx;
    c.width = w;
    c.height = h;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#0b0f14';
    ctx.fillRect(0, 0, w, h);

    function drawBlock(x: number, z: number, id: string, alpha = 1) {
      const drawCtx = ctx!;
      const b = getBlockById(id);
      const px = x * cellPx, pz = z * cellPx;
      drawCtx.globalAlpha = alpha;
      const img = getBlockPreviewImage(id);
      if (img?.complete) {
        drawCtx.imageSmoothingEnabled = false;
        drawCtx.drawImage(img, px, pz, cellPx, cellPx);
      } else {
        drawCtx.fillStyle = b.color;
        drawCtx.fillRect(px, pz, cellPx, cellPx);
        if (img) img.onload = () => setImageTick(t => t + 1);
      }
      drawCtx.globalAlpha = 1;
    }

    const ghost = state.layers.get(y - 1);
    if (ghost) {
      for (const [k, id] of ghost.entries()) {
        const [xs, zs] = k.split(',');
        drawBlock(Number(xs), Number(zs), id, 0.25);
      }
    }

    const layer = state.layers.get(y);
    if (layer) {
      for (const [k, id] of layer.entries()) {
        const [xs, zs] = k.split(',');
        drawBlock(Number(xs), Number(zs), id, 1);
      }
    }

    if (shapeStart.current && shapeEnd.current && tool !== 'pencil') {
      const cells = cellsForTool(tool, shapeStart.current, shapeEnd.current);
      for (const p of cells) {
        if (p.x < 0 || p.z < 0 || p.x >= state.sizeX || p.z >= state.sizeZ) continue;
        drawBlock(p.x, p.z, selected, 0.72);
      }
    }

    ctx.globalAlpha = 0.14;
    ctx.strokeStyle = '#9fb3c8';
    ctx.lineWidth = 1;
    for (let x = 0; x <= state.sizeX; x++) {
      ctx.beginPath(); ctx.moveTo(x * cellPx + 0.5, 0); ctx.lineTo(x * cellPx + 0.5, h); ctx.stroke();
    }
    for (let z = 0; z <= state.sizeZ; z++) {
      ctx.beginPath(); ctx.moveTo(0, z * cellPx + 0.5); ctx.lineTo(w, z * cellPx + 0.5); ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }, [state, y, cellPx, selected, tool, textureVersion, imageTick]);

  function wrapToCell(clientX: number, clientY: number) {
    const wrap = wrapRef.current!;
    const rect = wrap.getBoundingClientRect();
    const localX = clientX - rect.left + wrap.scrollLeft;
    const localY = clientY - rect.top + wrap.scrollTop;
    const cx = (localX - offset.x) / viewScale;
    const cz = (localY - offset.y) / viewScale;
    return { x: Math.floor(cx / cellPx), z: Math.floor(cz / cellPx) };
  }

  function applyCells(cells: Array<{ x: number; z: number }>) {
    const valid = cells.filter(p => p.x >= 0 && p.z >= 0 && p.x < state.sizeX && p.z < state.sizeZ);
    if (!valid.length) return;
    onChange(prev => {
      const next: LayerEditorState = { sizeX: prev.sizeX, sizeZ: prev.sizeZ, layers: new Map(prev.layers) };
      const m = new Map(getLayerMap(prev, y));
      next.layers.set(y, m);
      for (const p of valid) {
        const k = keyXZ(p.x, p.z);
        if (selected === 'minecraft:air') {
          m.delete(k);
          refreshChestNeighbours(m, p.x, p.z);
        } else {
          m.set(k, isPairableChest(selected) ? withProps(selected, { facing: 'north', type: 'single', waterlogged: 'false' }) : selected);
          if (isPairableChest(selected)) refreshChestNeighbours(m, p.x, p.z);
        }
      }
      return next;
    });
  }

  const canvasStyle = useMemo(() => ({ transform: `translate(${offset.x}px, ${offset.y}px) scale(${viewScale})`, transformOrigin: '0 0' }), [offset, viewScale]);

  useEffect(() => () => {
    if (panTimerRef.current !== null) window.clearInterval(panTimerRef.current);
  }, []);

  function stopControlEvent(e: React.PointerEvent | React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  function zoomBy(delta: number) {
    setViewScale(scale => Math.min(6, Math.max(0.6, Number((scale + delta).toFixed(2)))));
  }

  function panBy(dx: number, dy: number) {
    setOffset(current => ({ x: current.x + dx, y: current.y + dy }));
  }

  function stopPanning() {
    if (panTimerRef.current !== null) {
      window.clearInterval(panTimerRef.current);
      panTimerRef.current = null;
    }
  }

  function startPanning(dx: number, dy: number) {
    stopPanning();
    panBy(dx, dy);
    panTimerRef.current = window.setInterval(() => panBy(dx, dy), 80);
  }

  return (
    <div className="canvasViewport">
      <div
        className="gridNavControls"
        aria-label="Grid navigation controls"
        onPointerDown={stopControlEvent}
        onPointerMove={stopControlEvent}
        onPointerUp={stopControlEvent}
        onPointerCancel={stopControlEvent}
        onClick={stopControlEvent}
      >
        <div className="gridZoomControls" aria-label="Grid zoom controls">
          <button type="button" className="gridControlBtn" aria-label="Zoom in grid" title="Zoom in" onPointerDown={e => { stopControlEvent(e); zoomBy(0.2); }} onClick={stopControlEvent}>+</button>
          <button type="button" className="gridControlBtn" aria-label="Zoom out grid" title="Zoom out" onPointerDown={e => { stopControlEvent(e); zoomBy(-0.2); }} onClick={stopControlEvent}>−</button>
        </div>
        <div className="gridJoystick" aria-label="Move grid controls">
          <button type="button" className="gridControlBtn gridJoyUp" aria-label="Move grid up" title="Move grid up" onPointerDown={e => { stopControlEvent(e); startPanning(0, -28); }} onPointerUp={e => { stopControlEvent(e); stopPanning(); }} onPointerCancel={e => { stopControlEvent(e); stopPanning(); }} onPointerLeave={e => { stopControlEvent(e); stopPanning(); }}>▲</button>
          <button type="button" className="gridControlBtn gridJoyLeft" aria-label="Move grid left" title="Move grid left" onPointerDown={e => { stopControlEvent(e); startPanning(-28, 0); }} onPointerUp={e => { stopControlEvent(e); stopPanning(); }} onPointerCancel={e => { stopControlEvent(e); stopPanning(); }} onPointerLeave={e => { stopControlEvent(e); stopPanning(); }}>◀</button>
          <div className="gridJoyKnob" aria-hidden="true">✣</div>
          <button type="button" className="gridControlBtn gridJoyRight" aria-label="Move grid right" title="Move grid right" onPointerDown={e => { stopControlEvent(e); startPanning(28, 0); }} onPointerUp={e => { stopControlEvent(e); stopPanning(); }} onPointerCancel={e => { stopControlEvent(e); stopPanning(); }} onPointerLeave={e => { stopControlEvent(e); stopPanning(); }}>▶</button>
          <button type="button" className="gridControlBtn gridJoyDown" aria-label="Move grid down" title="Move grid down" onPointerDown={e => { stopControlEvent(e); startPanning(0, 28); }} onPointerUp={e => { stopControlEvent(e); stopPanning(); }} onPointerCancel={e => { stopControlEvent(e); stopPanning(); }} onPointerLeave={e => { stopControlEvent(e); stopPanning(); }}>▼</button>
        </div>
      </div>
      <div
      ref={wrapRef}
      className="canvasWrap canvasGestures"
      onPointerDown={e => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.current.size >= 2) {
          isPaintingRef.current = false;
          lastPaint.current = null;
          shapeStart.current = null;
          shapeEnd.current = null;
          const pts = Array.from(pointers.current.values());
          const dx = pts[0].x - pts[1].x;
          const dy = pts[0].y - pts[1].y;
          const dist = Math.hypot(dx, dy);
          const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
          gesture.current = { startDist: dist, startScale: viewScale, startMid: mid, startOffset: offset };
          return;
        }
        onBeginEdit?.();
        isPaintingRef.current = true;
        const cell = wrapToCell(e.clientX, e.clientY);
        if (tool === 'pencil') {
          applyCells([cell]);
          lastPaint.current = cell;
        } else {
          shapeStart.current = cell;
          shapeEnd.current = cell;
          setImageTick(t => t + 1);
        }
      }}
      onPointerMove={e => {
        if (!pointers.current.has(e.pointerId)) return;
        pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
        if (pointers.current.size >= 2 && gesture.current) {
          const pts = Array.from(pointers.current.values());
          const dx = pts[0].x - pts[1].x;
          const dy = pts[0].y - pts[1].y;
          const dist = Math.max(1, Math.hypot(dx, dy));
          const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
          const scale = Math.min(6, Math.max(0.6, gesture.current.startScale * (dist / gesture.current.startDist)));
          setViewScale(scale);
          setOffset({ x: gesture.current.startOffset.x + (mid.x - gesture.current.startMid.x), y: gesture.current.startOffset.y + (mid.y - gesture.current.startMid.y) });
          return;
        }
        if (!isPaintingRef.current) return;
        const cell = wrapToCell(e.clientX, e.clientY);
        if (tool === 'pencil') {
          const prev = lastPaint.current;
          if (!prev || prev.x !== cell.x || prev.z !== cell.z) {
            applyCells([cell]);
            lastPaint.current = cell;
          }
        } else {
          shapeEnd.current = cell;
          setImageTick(t => t + 1);
        }
      }}
      onPointerUp={e => {
        pointers.current.delete(e.pointerId);
        if (tool !== 'pencil' && shapeStart.current && shapeEnd.current) {
          applyCells(cellsForTool(tool, shapeStart.current, shapeEnd.current));
        }
        if (pointers.current.size < 2) gesture.current = null;
        isPaintingRef.current = false;
        lastPaint.current = null;
        shapeStart.current = null;
        shapeEnd.current = null;
      }}
      onPointerCancel={e => {
        pointers.current.delete(e.pointerId);
        gesture.current = null;
        isPaintingRef.current = false;
        lastPaint.current = null;
        shapeStart.current = null;
        shapeEnd.current = null;
      }}
    >
      <canvas ref={canvasRef} className="canvas" style={canvasStyle as any} />
      </div>
    </div>
  );
}
