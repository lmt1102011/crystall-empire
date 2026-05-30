import { crystalNameRoots, crystalNameSuffixes, crystalShapes, effectPool, rarityConfig, traitPool } from '../data/crystals';
import type { Crystal, CrystalRarity, CrystalShape } from '../types';
import { pickSeeded, seededRandom } from './seededRandom';

export function rollRarity(random: () => number, forced?: CrystalRarity): CrystalRarity {
  if (forced) return forced;
  const entries = Object.entries(rarityConfig) as Array<[CrystalRarity, (typeof rarityConfig)[CrystalRarity]]>;
  const total = entries.reduce((sum, [, config]) => sum + config.weight, 0);
  let roll = random() * total;
  for (const [rarity, config] of entries) {
    roll -= config.weight;
    if (roll <= 0) return rarity;
  }
  return 'common';
}

export function createCrystal(seed: number, rarity?: CrystalRarity): Crystal {
  const random = seededRandom(seed);
  const chosenRarity = rollRarity(random, rarity);
  const shape = pickSeeded(crystalShapes, random);
  const hue = Math.floor(random() * 360);
  const saturation = Math.floor(62 + random() * 28);
  const traitCount = chosenRarity === 'common' ? 1 : chosenRarity === 'rare' ? 2 : 3;
  const traits = Array.from({ length: traitCount }, () => pickSeeded(traitPool, random));
  const effects = Array.from({ length: Math.max(1, traitCount - 1) }, () => pickSeeded(effectPool, random));
  const statBase = 12 + Object.keys(rarityConfig).indexOf(chosenRarity) * 6;

  return {
    id: crypto.randomUUID(),
    name: `${pickSeeded(crystalNameRoots, random)} ${pickSeeded(crystalNameSuffixes, random)}`,
    seed,
    rarity: chosenRarity,
    shape,
    hue,
    saturation,
    growthLevel: Math.round(8 + random() * 16),
    growthRate: rarityConfig[chosenRarity].baseGrowth,
    stats: {
      power: Math.round(statBase + random() * 18),
      magic: Math.round(statBase + random() * 18),
      defense: Math.round(statBase + random() * 18),
      spirit: Math.round(statBase + random() * 18),
    },
    traits: [...new Set(traits)],
    effects: [...new Set(effects)],
    isMutant: random() > 0.88,
    acquiredAt: Date.now(),
    lastNurturedAt: 0,
  };
}

export function crystalPolygon(shape: CrystalShape, seed: number, growthLevel: number) {
  const random = seededRandom(seed);
  const scale = 0.62 + growthLevel / 260;
  const base = {
    hexagonal: [
      [50, 6],
      [78, 25],
      [70, 92],
      [30, 92],
      [22, 25],
    ],
    octahedral: [
      [50, 2],
      [84, 48],
      [50, 98],
      [16, 48],
    ],
    prismatic: [
      [50, 4],
      [76, 20],
      [68, 96],
      [32, 96],
      [24, 20],
    ],
    stellar: [
      [50, 3],
      [64, 34],
      [96, 40],
      [68, 58],
      [74, 94],
      [50, 72],
      [26, 94],
      [32, 58],
      [4, 40],
      [36, 34],
    ],
    geode: [
      [50, 8],
      [82, 22],
      [92, 60],
      [66, 94],
      [28, 88],
      [8, 58],
      [18, 24],
    ],
    shard: [
      [54, 2],
      [78, 32],
      [64, 98],
      [28, 88],
      [22, 26],
    ],
    cluster: [
      [50, 4],
      [68, 28],
      [92, 50],
      [66, 58],
      [60, 96],
      [42, 70],
      [20, 94],
      [30, 56],
      [8, 48],
      [34, 28],
    ],
    orb: [
      [50, 4],
      [75, 14],
      [94, 38],
      [88, 70],
      [62, 94],
      [30, 90],
      [8, 64],
      [12, 30],
    ],
  }[shape];

  return base
    .map(([x, y]) => {
      const nx = 50 + (x - 50) * scale + (random() - 0.5) * 3;
      const ny = 50 + (y - 50) * scale + (random() - 0.5) * 3;
      return `${nx.toFixed(1)},${ny.toFixed(1)}`;
    })
    .join(' ');
}
