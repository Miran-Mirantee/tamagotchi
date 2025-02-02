import { create } from "zustand";
import * as THREE from "three";

type CameraState = {
  zoomInTransition: (frame: THREE.Group) => void;
  zoomOutTransition: (frame: THREE.Group) => void;
  setZoomInTransition: (
    zoomInTransition: CameraState["zoomInTransition"]
  ) => void;
  setZoomOutTransition: (
    zoomOutTransition: CameraState["zoomOutTransition"]
  ) => void;
};

const useCameraStore = create<CameraState>((set) => ({
  zoomInTransition: () => {
    console.log("zoom in");
  },
  zoomOutTransition: () => {
    console.log("zoom out");
  },
  setZoomInTransition: (zoomInTransition) => set(() => ({ zoomInTransition })),
  setZoomOutTransition: (zoomOutTransition) =>
    set(() => ({ zoomOutTransition })),
}));

export default useCameraStore;
