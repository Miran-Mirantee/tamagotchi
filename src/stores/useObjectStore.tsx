import { create } from "zustand";
import * as THREE from "three";

type ObjectState = {
  currentObject: THREE.Mesh | null;
  outlineColor: string;
  setCurrentObject: (currentObject: ObjectState["currentObject"]) => void;
  setOutlineColor: (outlineColor: ObjectState["outlineColor"]) => void;
};

const useObjectStore = create<ObjectState>((set) => ({
  currentObject: null,
  outlineColor: "#00ff06",
  setCurrentObject: (currentObject) =>
    set(() => ({
      currentObject,
    })),
  setOutlineColor: (outlineColor) => set(() => ({ outlineColor })),
}));

export default useObjectStore;
