import { create } from "zustand";

type UIState = {
  back: () => void;
  setBackFunction: (back: UIState["back"]) => void;
};

const useUIStore = create<UIState>((set) => ({
  back: () => {},
  setBackFunction: (back: UIState["back"]) => set(() => ({ back })),
}));

export default useUIStore;
