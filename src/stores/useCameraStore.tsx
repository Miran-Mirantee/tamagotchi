import { create } from "zustand";

type CameraState = {
  zoomInTransition: () => void;
  setZoomInTransition: (
    zoomInTransition: CameraState["zoomInTransition"]
  ) => void;
};

const useCameraStore = create<CameraState>((set) => ({
  zoomInTransition: () => {},
  setZoomInTransition: (zoomInTransition: CameraState["zoomInTransition"]) =>
    set(() => ({ zoomInTransition })),
}));

export default useCameraStore;
