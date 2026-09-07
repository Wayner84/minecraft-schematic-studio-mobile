import { useState } from 'react';
import { getBlockById } from '../data/blockPalette';
import { parseBlockStateString, setBlockVariant, variantIndicator, variantKind, VARIANT_OPTIONS, withVariantDefaults } from '../model/blockState';

export function BlockVariantControls({ selected, onSelect }: { selected: string; onSelect: (state: string) => void }) {
  const [open, setOpen] = useState(false);
  const kind = variantKind(selected);
  if (!kind) return null;
  const state = withVariantDefaults(selected);
  const props = parseBlockStateString(state).properties!;
  const fields = kind === 'slab' ? ['type'] : ['facing', 'half', 'shape'];
  return <>
    <button className="btn variantSummary" aria-label="Block variant" onClick={() => setOpen(true)}>
      {getBlockById(selected).name} · {variantIndicator(state)} · Edit variant
    </button>
    {open && <div className="modalOverlay" role="dialog" aria-modal="true" aria-label="Block variants" onClick={() => setOpen(false)}>
      <div className="modal variantSheet" onClick={e => e.stopPropagation()}>
        <div className="sheetHandle" aria-hidden="true" />
        <div className="sheetHeader"><div className="title">{getBlockById(selected).name} · {variantIndicator(state)}</div><button className="btn" onClick={() => setOpen(false)}>Done</button></div>
        {fields.map(field => <fieldset key={field} className="variantField">
          <legend>{field === 'type' ? 'Slab' : field === 'facing' ? 'Facing (toward high step)' : field === 'half' ? 'Half' : 'Shape'}</legend>
          <div className="variantChoices">{VARIANT_OPTIONS[field].map(value => <button key={value}
            className={props[field] === value ? 'btn primary' : 'btn'} aria-pressed={props[field] === value}
            aria-label={`${field === 'type' ? 'Slab' : field[0].toUpperCase() + field.slice(1)} ${value}`}
            onClick={() => onSelect(setBlockVariant(state, field, value))}>
            {value.replaceAll('_', ' ')}
          </button>)}</div>
        </fieldset>)}
        <p className="muted">N ↑ (−Z) · E → (+X) · S ↓ (+Z) · W ← (−X). B bottom · T top · D double. IL/IR inner left/right; OL/OR outer left/right.</p>
        <p className="muted">Applies to new paint only. Imported corners and other properties stay unchanged until explicitly edited; neighbours are never auto-shaped.</p>
        <code className="selectedState">{state}</code>
      </div>
    </div>}
  </>;
}
