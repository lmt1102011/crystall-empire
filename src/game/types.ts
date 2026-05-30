export type CrystalRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine' | 'celestial';

export type CrystalShape = 'hexagonal' | 'octahedral' | 'prismatic' | 'stellar' | 'geode' | 'shard' | 'cluster' | 'orb';

export type IngredientRarity = 'common' | 'uncommon' | 'rare' | 'exotic';

export type GameTab = 'nursery' | 'alchemy' | 'map' | 'collection' | 'quests';

export interface CrystalStats {
  power: number;
  magic: number;
  defense: number;
  spirit: number;
}

export interface Crystal {
  id: string;
  name: string;
  seed: number;
  rarity: CrystalRarity;
  shape: CrystalShape;
  hue: number;
  saturation: number;
  growthLevel: number;
  growthRate: number;
  stats: CrystalStats;
  traits: string[];
  effects: string[];
  isMutant: boolean;
  acquiredAt: number;
  lastNurturedAt: number;
}

export interface Ingredient {
  id: string;
  name: string;
  iconPath: string;
  rarity: IngredientRarity;
  region: string;
  quantity: number;
  description: string;
  properties: string[];
  color: string;
}

export interface AlchemyRecipe {
  id: string;
  name: string;
  ingredients: { id: string; amount: number }[];
  temperatureRange: [number, number];
  result: { type: 'crystal_seed' | 'potion' | 'essence'; rarity: CrystalRarity };
  discovered: boolean;
}

export interface Monster {
  id: string;
  name: string;
  level: number;
  element: string;
}

export interface WorldRegion {
  id: string;
  name: string;
  description: string;
  bgGradient: string;
  accentColor: string;
  svgPath: string;
  resources: string[];
  monsters: Monster[];
  unlocked: boolean;
  explorationLevel: number;
}

export interface AlchemyResult {
  ok: boolean;
  message: string;
  crystal?: Crystal;
  essence?: number;
  recipeId?: string;
}
