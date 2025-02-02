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
  isEating: boolean;
  currentFood: Food | null;
  setIsEating: (isEating: boolean) => void;
  setCurrentFood: (food: Food | null) => void;
  feed: () => void;
};

const useTamagotchiStore = create<TamagotchiState>((set) => ({
  hunger: 0,
  energy: 100,
  happiness: 100,
  isEating: false,
  currentFood: null,
  setIsEating: (isEating) => set(() => ({ isEating })),
  feed: () =>
    set((state) => {
      if (!state.isEating && state.currentFood) {
        return {
          hunger: state.hunger + state.currentFood.hunger,
          energy: state.energy + state.currentFood.energy,
          happiness: state.happiness + state.currentFood.happiness,
          isEating: true,
        };
      }
      return {};
    }),
  setCurrentFood: (currentFood) => set(() => ({ currentFood })),
}));

export default useTamagotchiStore;
