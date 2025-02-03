import { create } from "zustand";

type UIState = {
  back: () => void;
  isInside: boolean;
  setBackFunction: (back: UIState["back"]) => void;
  setIsInside: (isInside: boolean) => void;
};

const useUIStore = create<UIState>((set) => ({
  back: () => {},
  isInside: false,
  setBackFunction: (back: UIState["back"]) => set(() => ({ back })),
  setIsInside: (isInside) => set(() => ({ isInside })),
}));

export default useUIStore;
