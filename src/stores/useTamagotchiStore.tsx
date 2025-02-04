import { create } from "zustand";
import { Vector3 } from "three";

export type Food = {
  name: string;
  Model: React.ComponentType<JSX.IntrinsicElements["group"]>;
  hunger: number;
  energy: number;
  happiness: number;
};

type TamagotchiState = {
  baseModelPath: string;
  hunger: number;
  energy: number;
  happiness: number;
  maxHunger: number;
  maxEnergy: number;
  maxHappiness: number;
  isEating: boolean;
  currentFood: Food | null;
  toPoint: Vector3;
  fromPoint: Vector3;
  setBaseModelPath: (baseModelPath: string) => void;
  setIsEating: (isEating: boolean) => void;
  setCurrentFood: (food: Food | null) => void;
  feed: () => void;
  setDestination: (toPoint: Vector3) => void;
  setOrigin: (fromPoint: Vector3) => void;
};

const useTamagotchiStore = create<TamagotchiState>((set) => ({
  baseModelPath: "",
  hunger: 0,
  energy: 0,
  happiness: 0,
  maxHunger: 100,
  maxEnergy: 100,
  maxHappiness: 100,
  isEating: false,
  currentFood: null,
  toPoint: new Vector3(),
  fromPoint: new Vector3(),
  setBaseModelPath: (baseModelPath: string) => set(() => ({ baseModelPath })),
  setIsEating: (isEating) => set(() => ({ isEating })),
  setCurrentFood: (currentFood) => set(() => ({ currentFood })),
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
  setDestination: (toPoint) => set(() => ({ toPoint })),
  setOrigin: (fromPoint) => set(() => ({ fromPoint })),
}));

export default useTamagotchiStore;
