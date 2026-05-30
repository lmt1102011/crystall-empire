import type { Ingredient, IngredientRarity } from '../types';

const regionIds = ['crystal-forest', 'ice-mountains', 'light-desert', 'dark-cave', 'meteor-city', 'ancient-lands'];
const bases = [
  'Mooncap',
  'Frost Vein',
  'Amber Thorn',
  'Void Salt',
  'Star Mica',
  'Opal Fern',
  'Prism Dust',
  'Sun Resin',
  'Night Lichen',
  'Aether Clay',
  'Dragon Glass',
  'Dawn Petal',
];
const forms = ['Powder', 'Shard', 'Root', 'Spore', 'Oil', 'Crystal', 'Ash', 'Petal', 'Resin'];
const properties = ['growth', 'clarity', 'heat', 'pressure', 'mutation', 'stability', 'spirit', 'radiance'];
const rarities: IngredientRarity[] = ['common', 'common', 'uncommon', 'rare', 'exotic'];
const iconPaths = [
  'M12 2 L19 10 L15 22 L7 22 L3 10 Z',
  'M4 12 C4 6 8 3 12 2 C16 3 20 6 20 12 C20 18 16 21 12 22 C8 21 4 18 4 12 Z',
  'M12 2 C15 7 19 9 22 12 C18 14 15 17 12 22 C9 17 6 14 2 12 C5 9 9 7 12 2 Z',
  'M5 20 L9 4 L15 4 L19 20 L12 17 Z',
];

function hueColor(index: number) {
  return `hsl(${(index * 37 + 185) % 360} 78% 64%)`;
}

export const ingredients: Ingredient[] = Array.from({ length: 108 }, (_, index) => {
  const base = bases[index % bases.length];
  const form = forms[Math.floor(index / bases.length) % forms.length];
  const rarity = rarities[(index + Math.floor(index / 9)) % rarities.length];
  const region = regionIds[index % regionIds.length];
  return {
    id: `${base.toLowerCase().replaceAll(' ', '-')}-${form.toLowerCase()}-${index + 1}`,
    name: `${base} ${form}`,
    iconPath: iconPaths[index % iconPaths.length],
    rarity,
    region,
    quantity: 0,
    description: `${base} ${form.toLowerCase()} carries ${properties[index % properties.length]} resonance.`,
    properties: [properties[index % properties.length], properties[(index + 3) % properties.length]],
    color: hueColor(index),
  };
});

export const starterIngredientIds = ingredients.slice(0, 10).map((item) => item.id);
