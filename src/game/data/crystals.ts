import type { CrystalRarity, CrystalShape } from '../types';

export const rarityConfig: Record<CrystalRarity, { label: string; color: string; glow: string; baseGrowth: number; weight: number }> = {
  common: { label: 'Common', color: '#9ca3af', glow: 'rgba(156, 163, 175, 0.32)', baseGrowth: 0.5, weight: 46 },
  rare: { label: 'Rare', color: '#38bdf8', glow: 'rgba(56, 189, 248, 0.38)', baseGrowth: 0.42, weight: 28 },
  epic: { label: 'Epic', color: '#a78bfa', glow: 'rgba(167, 139, 250, 0.42)', baseGrowth: 0.34, weight: 14 },
  legendary: { label: 'Legendary', color: '#fb923c', glow: 'rgba(251, 146, 60, 0.46)', baseGrowth: 0.26, weight: 7 },
  mythic: { label: 'Mythic', color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.46)', baseGrowth: 0.2, weight: 3 },
  divine: { label: 'Divine', color: '#facc15', glow: 'rgba(250, 204, 21, 0.5)', baseGrowth: 0.16, weight: 1.4 },
  celestial: { label: 'Celestial', color: '#ffffff', glow: 'rgba(255, 255, 255, 0.58)', baseGrowth: 0.12, weight: 0.6 },
};

export const crystalShapes: CrystalShape[] = ['hexagonal', 'octahedral', 'prismatic', 'stellar', 'geode', 'shard', 'cluster', 'orb'];

export const crystalNameRoots = [
  'Aether',
  'Moon',
  'Solar',
  'Frost',
  'Ember',
  'Void',
  'Aurora',
  'Opal',
  'Storm',
  'Dawn',
  'Onyx',
  'Prism',
];

export const crystalNameSuffixes = ['Quartz', 'Shard', 'Heart', 'Crown', 'Bloom', 'Core', 'Mirror', 'Spire', 'Geode', 'Star'];

export const traitPool = [
  'Ancient',
  'Luminous',
  'Volatile',
  'Harmonic',
  'Glassborn',
  'Runed',
  'Singing',
  'Deepcore',
  'Iridescent',
  'Still',
];

export const effectPool = [
  '+ essence from map regions',
  '+ alchemy stability',
  '+ rare hatch chance',
  '+ nursery growth',
  '+ collection prestige',
  '+ spirit resonance',
];
