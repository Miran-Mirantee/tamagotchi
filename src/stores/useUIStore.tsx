import { create } from "zustand";

type UIState = {
  back: () => void;
  isInside: boolean;
  setBackFunction: (back: UIState["back"]) => void;
  setIsInside: (isInside: boolean) => void;
  isBrowsingFood: boolean;
  setIsBrowsingFood: (isBrowsingFood: boolean) => void;
};

const useUIStore = create<UIState>((set) => ({
  back: () => {},
  isInside: false,
  setBackFunction: (back: UIState["back"]) => set(() => ({ back })),
  setIsInside: (isInside) => set(() => ({ isInside })),
  isBrowsingFood: false,
  setIsBrowsingFood: (isBrowsingFood) => set(() => ({ isBrowsingFood })),
}));

export default useUIStore;
