import { ingredients } from './ingredients';
import type { AlchemyRecipe } from '../types';

function recipe(id: string, name: string, ingredientIndexes: number[], temp: [number, number], rarity: AlchemyRecipe['result']['rarity']): AlchemyRecipe {
  return {
    id,
    name,
    ingredients: ingredientIndexes.map((index) => ({ id: ingredients[index].id, amount: index % 3 === 0 ? 2 : 1 })),
    temperatureRange: temp,
    result: { type: 'crystal_seed', rarity },
    discovered: false,
  };
}

export const recipes: AlchemyRecipe[] = [
  recipe('azure-seed', 'Azure Seed Draught', [0, 2, 8], [35, 58], 'rare'),
  recipe('ember-heart', 'Ember Heart Tonic', [3, 7, 13], [70, 92], 'epic'),
  recipe('aurora-bloom', 'Aurora Bloom Formula', [1, 5, 17], [42, 66], 'epic'),
  recipe('void-prism', 'Void Prism Suspension', [9, 15, 21], [55, 78], 'legendary'),
  recipe('sun-crown', 'Sun Crown Reagent', [4, 10, 22], [76, 98], 'legendary'),
  recipe('moon-mirror', 'Moon Mirror Wash', [6, 12, 18], [28, 52], 'rare'),
  recipe('meteor-core', 'Meteor Core Bath', [11, 19, 25], [84, 100], 'mythic'),
  recipe('ancient-lattice', 'Ancient Lattice Brew', [14, 20, 32], [58, 82], 'divine'),
  recipe('celestial-glass', 'Celestial Glass Formula', [16, 28, 40], [64, 88], 'celestial'),
  recipe('soft-geode', 'Soft Geode Culture', [24, 30, 36], [30, 48], 'rare'),
  recipe('deep-crystal', 'Deep Crystal Mother', [27, 33, 39], [46, 68], 'epic'),
  recipe('radiant-spire', 'Radiant Spire Solvent', [42, 48, 54], [74, 96], 'legendary'),
];
