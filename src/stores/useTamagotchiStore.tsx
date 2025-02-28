import { create } from "zustand";
import { Vector3, AnimationAction } from "three";

export type Food = {
  name: string;
  hunger: number;
  energy: number;
  happiness: number;
  thumbnail: string;
  model: string;
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
  feed: (hunger: number, energy: number, happiness: number) => void;
  setMoveToLocation: (
    moveToLocation: TamagotchiState["moveToLocation"]
  ) => void;
  setIsFreeze: (isFreeze: boolean) => void;
  setCurrentAction: (currentAction: PetAction) => void;
  setAnimationActions: (
    animationActions: TamagotchiState["animationActions"]
  ) => void;
  useToilet: (increase: number) => void;
  bath: (increase: number) => void;
  sleep: (increase: number) => void;
  reset: () => void;
  hungerCredit: number;
  energyCredit: number;
  bladderCredit: number;
  hygieneCredit: number;
  calculateHappiness: () => void;
  decreaseHunger: (decrease: number) => void;
  decreaseEnergy: (decrease: number) => void;
  decreaseBladder: (decrease: number) => void;
  decreaseHygiene: (decrease: number) => void;
};

const useTamagotchiStore = create<TamagotchiState>((set, get) => ({
  baseModelPath: "./models/pet/Cat.glb",
  hunger: 50,
  energy: 50,
  happiness: 50,
  bladder: 50,
  hygiene: 50,
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
  feed: (hunger, energy, happiness) =>
    set((state) => {
      return {
        hunger: Math.min(state.hunger + hunger, state.maxHunger),
        energy: Math.min(state.energy + energy, state.maxEnergy),
        happiness: Math.min(state.happiness + happiness, state.maxHappiness),
      };
    }),
  setMoveToLocation: (moveToLocation) => set(() => ({ moveToLocation })),
  setIsFreeze: (isFreeze) => set(() => ({ isFreeze })),
  setCurrentAction: (currentAction) => {
    // YOU ARE NOT SUPPOSE TO WALK IF YOU ARE FROZEN, STOP!
    if (get().isFreeze && currentAction == PetAction.Walk) return;
    set(() => ({ currentAction }));
  },
  setAnimationActions: (animationActions) => set(() => ({ animationActions })),
  useToilet: (increase) =>
    set((state) => ({
      bladder: Math.min(state.bladder + increase, state.maxBladder),
    })),
  bath: (increase) =>
    set((state) => ({
      hygiene: Math.min(state.hygiene + increase, state.maxHygiene),
    })),
  sleep: (increase) =>
    set((state) => ({
      energy: Math.min(state.energy + increase, state.maxEnergy),
    })),
  reset: () =>
    set(() => ({
      hunger: 0,
      energy: 0,
      happiness: 0,
      bladder: 0,
      hygiene: 0,
    })),
  hungerCredit: 5,
  energyCredit: 4,
  bladderCredit: 2,
  hygieneCredit: 3,
  calculateHappiness: () =>
    set((state) => {
      const happiness =
        (state.hunger * state.hungerCredit +
          state.energy * state.energyCredit +
          state.bladder * state.bladderCredit +
          state.hygiene * state.hygieneCredit) /
        (state.hungerCredit +
          state.energyCredit +
          state.bladderCredit +
          state.hygieneCredit);
      return { happiness: Math.max(happiness, 0) };
    }),
  decreaseHunger: (decrease) =>
    set((state) => ({
      hunger: Math.max(state.hunger - decrease, 0),
    })),
  decreaseEnergy: (decrease) =>
    set((state) => ({
      energy: Math.max(state.energy - decrease, 0),
    })),
  decreaseBladder: (decrease) =>
    set((state) => ({
      bladder: Math.max(state.bladder - decrease, 0),
    })),
  decreaseHygiene: (decrease) =>
    set((state) => ({
      hygiene: Math.max(state.hygiene - decrease, 0),
    })),
}));

export default useTamagotchiStore;
