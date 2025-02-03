import { create } from "zustand";

export type Food = {
  name: string;
  Model: React.ComponentType<JSX.IntrinsicElements["group"]>;
  hunger: number;
  energy: number;
  happiness: number;
};

type TamagotchiState = {
  hunger: number;
  energy: number;
  happiness: number;
  maxHunger: number;
  maxEnergy: number;
  maxHappiness: number;
  isEating: boolean;
  currentFood: Food | null;
  setIsEating: (isEating: boolean) => void;
  setCurrentFood: (food: Food | null) => void;
  feed: () => void;
};

const useTamagotchiStore = create<TamagotchiState>((set) => ({
  hunger: 0,
  energy: 0,
  happiness: 0,
  maxHunger: 100,
  maxEnergy: 100,
  maxHappiness: 100,
  isEating: false,
  currentFood: null,
  setIsEating: (isEating) => set(() => ({ isEating })),
  feed: () =>
    set((state) => {
      if (!state.isEating && state.currentFood) {
        return {
          hunger: Math.min(
            state.hunger + state.currentFood.hunger,
            state.maxHunger
          ),
          energy: Math.min(
            state.energy + state.currentFood.energy,
            state.maxEnergy
          ),
          happiness: Math.min(
            state.happiness + state.currentFood.happiness,
            state.maxHappiness
          ),
          isEating: true,
        };
      }
      return {};
    }),
  setCurrentFood: (currentFood) => set(() => ({ currentFood })),
}));

export default useTamagotchiStore;
