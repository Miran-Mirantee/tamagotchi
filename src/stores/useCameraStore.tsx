import { create } from "zustand";
import * as THREE from "three";

type CameraState = {
  zoomInTransition: (frame: THREE.Group) => void;
  zoomOutTransition: (frame: THREE.Group) => void;
  exitFocusMode: () => void;
  setZoomInTransition: (
    zoomInTransition: CameraState["zoomInTransition"]
  ) => void;
  setZoomOutTransition: (
    zoomOutTransition: CameraState["zoomOutTransition"]
  ) => void;
  setExitFocusMode: (exitFocusMode: CameraState["exitFocusMode"]) => void;
};

const useCameraStore = create<CameraState>((set) => ({
  zoomInTransition: () => {
    console.log("zoom in");
  },
  zoomOutTransition: () => {
    console.log("zoom out");
  },
  exitFocusMode: () => {
    console.log("exit focus mode");
  },
  setZoomInTransition: (zoomInTransition) => set(() => ({ zoomInTransition })),
  setZoomOutTransition: (zoomOutTransition) =>
    set(() => ({ zoomOutTransition })),
  setExitFocusMode: (exitFocusMode) => set(() => ({ exitFocusMode })),
}));

export default useCameraStore;
