import { create } from "zustand";

type CameraState = {
  zoomInTransition: () => void;
  setZoomInTransition: (
    zoomInTransition: CameraState["zoomInTransition"]
  ) => void;
  zoomOutTransition: () => void;
  setZoomOutTransition: (
    zoomOutTransition: CameraState["zoomOutTransition"]
  ) => void;
};

const useCameraStore = create<CameraState>((set) => ({
  zoomInTransition: () => {},
  setZoomInTransition: (zoomInTransition: CameraState["zoomInTransition"]) =>
    set(() => ({ zoomInTransition })),
  zoomOutTransition: () => {},
  setZoomOutTransition: (zoomOutTransition: CameraState["zoomOutTransition"]) =>
    set(() => ({ zoomOutTransition })),
}));

export default useCameraStore;
