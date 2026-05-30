import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ingredients, starterIngredientIds } from '../data/ingredients';
import { recipes } from '../data/recipes';
import { regions } from '../data/regions';
import type { AlchemyResult, Crystal, CrystalRarity, GameTab } from '../types';
import { createCrystal } from '../utils/crystalGen';
import { hashSeed } from '../utils/seededRandom';

export interface GameState {
  activeTab: GameTab;
  player: { name: string; level: number; xp: number };
  resources: { gold: number; essence: number; shards: number };
  crystals: Crystal[];
  inventory: Record<string, number>;
  discoveredRecipes: string[];
  activeRegion: string | null;
  displayedCrystals: Array<string | null>;
  lastIdleAt: number;
  lastResult: AlchemyResult | null;
  actions: {
    setTab: (tab: GameTab) => void;
    hatchCrystal: (rarity?: CrystalRarity) => void;
    nurtureCrystal: (id: string) => void;
    collectResources: (regionId: string) => void;
    brew: (ingredientIds: string[], temp: number) => AlchemyResult;
    equipToDisplay: (crystalId: string, slot: number) => void;
    setActiveRegion: (regionId: string | null) => void;
    tickIdle: () => void;
    clearResult: () => void;
  };
}

export type PersistedGameState = Pick<
  GameState,
  'activeTab' | 'player' | 'resources' | 'crystals' | 'inventory' | 'discoveredRecipes' | 'activeRegion' | 'displayedCrystals' | 'lastIdleAt'
>;

const gameTabs = ['nursery', 'alchemy', 'map', 'collection', 'quests'] as const;

function initialInventory() {
  return starterIngredientIds.reduce<Record<string, number>>((bag, id, index) => {
    bag[id] = index < 4 ? 4 : 2;
    return bag;
  }, {});
}

function starterCrystals() {
  return [createCrystal(hashSeed('starter-aether'), 'common'), createCrystal(hashSeed('starter-azure'), 'rare')];
}

function grantXp(state: GameState, amount: number) {
  const xp = state.player.xp + amount;
  const levelGain = Math.floor(xp / 120);
  return {
    level: state.player.level + levelGain,
    xp: xp % 120,
  };
}

function normalizePersistedState(persisted: Partial<GameState> | undefined, currentState: GameState): Partial<GameState> {
  const validCrystals = Array.isArray(persisted?.crystals)
    ? persisted.crystals.filter((crystal) => crystal?.id && typeof crystal.seed === 'number' && crystal?.shape && crystal?.rarity)
    : currentState.crystals;

  return {
    ...persisted,
    activeTab: gameTabs.includes(persisted?.activeTab as GameTab) ? (persisted?.activeTab as GameTab) : currentState.activeTab,
    player: persisted?.player?.name ? persisted.player : currentState.player,
    resources: persisted?.resources?.gold !== undefined ? persisted.resources : currentState.resources,
    crystals: validCrystals.length ? validCrystals : currentState.crystals,
    inventory: persisted?.inventory && typeof persisted.inventory === 'object' ? persisted.inventory : currentState.inventory,
    displayedCrystals: Array.isArray(persisted?.displayedCrystals) ? persisted.displayedCrystals.slice(0, 6) : currentState.displayedCrystals,
    lastResult: null,
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      activeTab: 'nursery',
      player: { name: 'Crystal Keeper', level: 1, xp: 0 },
      resources: { gold: 320, essence: 80, shards: 12 },
      crystals: starterCrystals(),
      inventory: initialInventory(),
      discoveredRecipes: [],
      activeRegion: 'crystal-forest',
      displayedCrystals: [null, null, null, null, null, null],
      lastIdleAt: Date.now(),
      lastResult: null,
      actions: {
        setTab: (tab) => set({ activeTab: tab }),
        hatchCrystal: (rarity) =>
          set((state) => {
            const cost = rarity ? 48 : 22;
            if (state.resources.essence < cost) return state;
            const crystal = createCrystal(Date.now() + state.crystals.length * 97, rarity);
            const xpGain = grantXp(state, 18);
            return {
              resources: { ...state.resources, essence: state.resources.essence - cost },
              crystals: [crystal, ...state.crystals],
              player: { ...state.player, ...xpGain },
            };
          }),
        nurtureCrystal: (id) =>
          set((state) => {
            const now = Date.now();
            const crystal = state.crystals.find((item) => item.id === id);
            if (!crystal || now - crystal.lastNurturedAt < 12_000 || state.resources.essence < 4) return state;
            const xpGain = grantXp(state, 6);
            return {
              resources: { ...state.resources, essence: state.resources.essence - 4 },
              player: { ...state.player, ...xpGain },
              crystals: state.crystals.map((item) =>
                item.id === id
                  ? { ...item, growthLevel: Math.min(100, item.growthLevel + 8 + item.growthRate * 2), lastNurturedAt: now }
                  : item,
              ),
            };
          }),
        collectResources: (regionId) =>
          set((state) => {
            const region = regions.find((item) => item.id === regionId);
            if (!region || !region.unlocked) return state;
            const inventory = { ...state.inventory };
            region.resources.slice(0, 5).forEach((id, index) => {
              inventory[id] = (inventory[id] ?? 0) + 1 + (index === 0 ? 1 : 0);
            });
            const xpGain = grantXp(state, 10 + region.explorationLevel * 2);
            return {
              activeRegion: regionId,
              inventory,
              resources: {
                gold: state.resources.gold + 18 + region.explorationLevel * 4,
                essence: state.resources.essence + 4,
                shards: state.resources.shards + 1,
              },
              player: { ...state.player, ...xpGain },
            };
          }),
        brew: (ingredientIds, temp) => {
          const state = get();
          const counts = ingredientIds.reduce<Record<string, number>>((all, id) => {
            all[id] = (all[id] ?? 0) + 1;
            return all;
          }, {});
          const hasInputs = Object.entries(counts).every(([id, count]) => (state.inventory[id] ?? 0) >= count);
          if (!hasInputs || ingredientIds.length < 2) {
            const result = { ok: false, message: 'The bench needs valid ingredients.' };
            set({ lastResult: result });
            return result;
          }

          const matchingRecipe = recipes.find((recipe) => {
            const tempOk = temp >= recipe.temperatureRange[0] && temp <= recipe.temperatureRange[1];
            const ingredientOk = recipe.ingredients.every((item) => counts[item.id] >= item.amount);
            return tempOk && ingredientOk;
          });
          const rarity = matchingRecipe?.result.rarity ?? (temp > 82 ? 'epic' : temp > 58 ? 'rare' : 'common');
          const seed = hashSeed(`${ingredientIds.join('-')}-${temp}-${Date.now()}`);
          const crystal = createCrystal(seed, rarity);
          const inventory = { ...state.inventory };
          Object.entries(counts).forEach(([id, count]) => {
            inventory[id] = Math.max(0, (inventory[id] ?? 0) - count);
          });
          const discoveredRecipes = matchingRecipe && !state.discoveredRecipes.includes(matchingRecipe.id)
            ? [matchingRecipe.id, ...state.discoveredRecipes]
            : state.discoveredRecipes;
          const result = {
            ok: true,
            message: matchingRecipe ? `${matchingRecipe.name} discovered.` : 'A rough crystal seed condensed.',
            crystal,
            recipeId: matchingRecipe?.id,
          };
          const xpGain = grantXp(state, matchingRecipe ? 28 : 14);
          set({
            crystals: [crystal, ...state.crystals],
            discoveredRecipes,
            inventory,
            lastResult: result,
            player: { ...state.player, ...xpGain },
            resources: { ...state.resources, essence: state.resources.essence + (matchingRecipe ? 8 : 3) },
          });
          return result;
        },
        equipToDisplay: (crystalId, slot) =>
          set((state) => {
            const displayedCrystals = [...state.displayedCrystals];
            displayedCrystals[slot] = crystalId;
            return { displayedCrystals };
          }),
        setActiveRegion: (regionId) => set({ activeRegion: regionId }),
        tickIdle: () =>
          set((state) => {
            const now = Date.now();
            const minutes = Math.min(180, Math.max(0, (now - state.lastIdleAt) / 60000));
            if (minutes < 0.1) return { lastIdleAt: now };
            return {
              lastIdleAt: now,
              resources: {
                ...state.resources,
                essence: state.resources.essence + Math.floor(minutes * 1.5),
                gold: state.resources.gold + Math.floor(minutes * 4),
              },
              crystals: state.crystals.map((crystal) => ({
                ...crystal,
                growthLevel: Math.min(100, crystal.growthLevel + minutes * crystal.growthRate),
              })),
            };
          }),
        clearResult: () => set({ lastResult: null }),
      },
    }),
    {
      name: 'crystal-empire-online',
      version: 2,
      migrate: (persistedState) => persistedState as PersistedGameState,
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<GameState> | undefined;
        return {
          ...currentState,
          ...normalizePersistedState(persisted, currentState),
          actions: currentState.actions,
        };
      },
      partialize: (state) => ({
        activeTab: state.activeTab,
        player: state.player,
        resources: state.resources,
        crystals: state.crystals,
        inventory: state.inventory,
        discoveredRecipes: state.discoveredRecipes,
        activeRegion: state.activeRegion,
        displayedCrystals: state.displayedCrystals,
        lastIdleAt: state.lastIdleAt,
      }),
    },
  ),
);

export const ingredientById = new Map(ingredients.map((item) => [item.id, item]));

export function makeGameSnapshot(state: GameState = useGameStore.getState()): PersistedGameState {
  return {
    activeTab: state.activeTab,
    player: state.player,
    resources: state.resources,
    crystals: state.crystals,
    inventory: state.inventory,
    discoveredRecipes: state.discoveredRecipes,
    activeRegion: state.activeRegion,
    displayedCrystals: state.displayedCrystals,
    lastIdleAt: state.lastIdleAt,
  };
}

export function hydrateGameSnapshot(snapshot: Partial<PersistedGameState>) {
  const currentState = useGameStore.getState();
  useGameStore.setState({
    ...normalizePersistedState(snapshot as Partial<GameState>, currentState),
    actions: currentState.actions,
  });
}
