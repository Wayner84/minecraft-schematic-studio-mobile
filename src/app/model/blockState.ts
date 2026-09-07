export type ParsedState = { name: string; properties?: Record<string, string> };

// Validate syntax, not membership in the installed palette: mods/newer blocks
// must remain lossless. Unqualified legacy IDs use Minecraft's default namespace.
export function parseBlockStateString(input: string): ParsedState {
  if (typeof input !== 'string') throw new Error('Invalid block state: expected a string');
  const match = /^((?:[a-z0-9_.-]+:)?[a-z0-9_./-]+)(?:\[([^\]]*)\])?$/.exec(input.trim());
  if (!match) throw new Error(`Invalid block state: ${input}`);
  const name = match[1].includes(':') ? match[1] : `minecraft:${match[1]}`;
  const properties: Record<string, string> = Object.create(null);
  if (match[2]) for (const part of match[2].split(',')) {
    const pair = /^([a-z0-9_]+)=([a-z0-9_.:/+-]+)$/.exec(part.trim());
    if (!pair || Object.hasOwn(properties, pair[1])) throw new Error(`Invalid or duplicate state property: ${part}`);
    properties[pair[1]] = pair[2];
  }
  return Object.keys(properties).length ? { name, properties } : { name };
}

export function canonicalBlockState(input: string, props?: Record<string, string | number | boolean>): string {
  const parsed = parseBlockStateString(input);
  if (props != null && (typeof props !== 'object' || Array.isArray(props))) throw new Error('Invalid state properties');
  const properties = { ...parsed.properties };
  for (const [key, value] of Object.entries(props ?? {})) {
    if (!['string', 'number', 'boolean'].includes(typeof value) || (typeof value === 'number' && !Number.isFinite(value))) throw new Error(`Invalid state property: ${key}`);
    properties[key] = String(value);
  }
  const body = Object.keys(properties).sort().map(k => `${k}=${properties[k]}`).join(',');
  const result = body ? `${parsed.name}[${body}]` : parsed.name;
  parseBlockStateString(result);
  return result;
}

export function variantKind(state: string): 'slab' | 'stairs' | null {
  const { name } = parseBlockStateString(state);
  return name.endsWith('_slab') ? 'slab' : name.endsWith('_stairs') ? 'stairs' : null;
}

export function withVariantDefaults(state: string): string {
  const kind = variantKind(state);
  const defaults = kind === 'slab' ? { type: 'bottom', waterlogged: 'false' }
    : kind === 'stairs' ? { facing: 'north', half: 'bottom', shape: 'straight', waterlogged: 'false' } : {};
  return canonicalBlockState(state, { ...defaults, ...parseBlockStateString(state).properties } as Record<string, string>);
}

export const VARIANT_OPTIONS: Record<string, string[]> = {
  type: ['bottom', 'top', 'double'], facing: ['north', 'east', 'south', 'west'],
  half: ['bottom', 'top'], shape: ['straight', 'inner_left', 'inner_right', 'outer_left', 'outer_right'],
};

export function setBlockVariant(state: string, property: string, value: string): string {
  const kind = variantKind(state);
  const allowed = kind === 'slab' ? ['type'] : kind === 'stairs' ? ['facing', 'half', 'shape'] : [];
  if (!allowed.includes(property) || !VARIANT_OPTIONS[property]?.includes(value)) throw new Error(`Invalid block variant ${property}=${value}`);
  return canonicalBlockState(withVariantDefaults(state), { [property]: value });
}

export function variantIndicator(state: string): string {
  const kind = variantKind(state);
  if (!kind) return '';
  const p = parseBlockStateString(withVariantDefaults(state)).properties!;
  if (kind === 'slab') return ({ bottom: 'B', top: 'T', double: 'D' } as Record<string, string>)[p.type] ?? '?';
  const arrow = ({ north: '↑', east: '→', south: '↓', west: '←' } as Record<string, string>)[p.facing] ?? '?';
  const shape = ({ straight: '', inner_left: ' IL', inner_right: ' IR', outer_left: ' OL', outer_right: ' OR' } as Record<string, string>)[p.shape] ?? ' ?';
  return `${arrow}${p.half === 'top' ? 'T' : 'B'}${shape}`;
}
