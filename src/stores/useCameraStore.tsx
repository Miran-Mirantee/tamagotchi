import { create } from "zustand";

type CameraState = {
  enterFocusMode: () => void;
  exitFocusMode: () => void;
  setEnterFocusMode: (enterFocusMode: CameraState["enterFocusMode"]) => void;
  setExitFocusMode: (exitFocusMode: CameraState["exitFocusMode"]) => void;
};

const useCameraStore = create<CameraState>((set) => ({
  exitFocusMode: () => {
    console.log("exit focus mode");
  },
  enterFocusMode: () => {
    console.log("exit focus mode");
  },
  setEnterFocusMode: (enterFocusMode) => set(() => ({ enterFocusMode })),
  setExitFocusMode: (exitFocusMode) => set(() => ({ exitFocusMode })),
}));

export default useCameraStore;
