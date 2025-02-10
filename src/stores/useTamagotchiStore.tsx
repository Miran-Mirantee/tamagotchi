import { create } from "zustand";
import { Vector3, AnimationAction } from "three";

export type Food = {
  name: string;
  Model: React.ComponentType<JSX.IntrinsicElements["group"]>;
  hunger: number;
  energy: number;
  happiness: number;
};

export enum PetAction {
  Idle = "Idle",
  Walk = "Walk",
  Eat = "Eat",
  Sleep = "Sleep",
  WakeUp = "WakeUp",
  Bath = "Bath",
  Toilet = "Toilet",
}
type TamagotchiState = {
  baseModelPath: string;
  hunger: number;
  energy: number;
  happiness: number;
  bladder: number;
  hygiene: number;
  maxHunger: number;
  maxEnergy: number;
  maxBladder: number;
  maxHygiene: number;
  maxHappiness: number;
  currentFood: Food | null;
  isFreeze: boolean;
  currentAction: PetAction;
  animationActions: { [x: string]: AnimationAction | null };
  moveToLocation: (targetPosition: Vector3, targetRotation: Vector3) => void;
  setBaseModelPath: (baseModelPath: string) => void;
  setCurrentFood: (food: Food | null) => void;
  feed: () => void;
  setMoveToLocation: (
    moveToLocation: TamagotchiState["moveToLocation"]
  ) => void;
  setIsFreeze: (isFreeze: boolean) => void;
  setCurrentAction: (currentAction: PetAction) => void;
  setAnimationActions: (
    animationActions: TamagotchiState["animationActions"]
  ) => void;
  useToilet: () => void;
  bath: () => void;
};

const useTamagotchiStore = create<TamagotchiState>((set) => ({
  baseModelPath: "./models/pet/Cat.glb",
  hunger: 0,
  energy: 0,
  happiness: 0,
  bladder: 0,
  hygiene: 0,
  maxHunger: 100,
  maxEnergy: 100,
  maxHappiness: 100,
  maxBladder: 100,
  maxHygiene: 100,
  currentFood: null,
  isFreeze: false,
  currentAction: PetAction.Idle,
  animationActions: {},
  moveToLocation: () => {},
  setBaseModelPath: (baseModelPath: string) => set(() => ({ baseModelPath })),
  setCurrentFood: (currentFood) => set(() => ({ currentFood })),
  feed: () =>
    set((state) => {
      if (state.currentAction != PetAction.Eat && state.currentFood) {
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
          currentAction: PetAction.Eat,
        };
      }
      return {};
    }),
  setMoveToLocation: (moveToLocation) => set(() => ({ moveToLocation })),
  setIsFreeze: (isFreeze) => set(() => ({ isFreeze })),
  setCurrentAction: (currentAction) => set(() => ({ currentAction })),
  setAnimationActions: (animationActions) => set(() => ({ animationActions })),
  useToilet: () =>
    set((state) => ({
      bladder: Math.min(state.bladder + 50, state.maxBladder),
    })),
  bath: () =>
    set((state) => ({
      hygiene: Math.min(state.hygiene + 50, state.maxHygiene),
    })),
}));

export default useTamagotchiStore;
