import { create } from "zustand";

type CameraState = {
  positionOffset: { x: number; y: number; z: number };
  enterFocusMode: () => void;
  exitFocusMode: () => void;
  setEnterFocusMode: (enterFocusMode: CameraState["enterFocusMode"]) => void;
  setExitFocusMode: (exitFocusMode: CameraState["exitFocusMode"]) => void;
};

const useCameraStore = create<CameraState>((set) => ({
  positionOffset: { x: 0, y: -2, z: -15 },
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
