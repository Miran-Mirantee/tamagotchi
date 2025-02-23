import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Experience from "./Experience";
import UI from "./components/UI";

/**
 * TODO:
 * - save data in localStorage
 * - use shader to imitate bitting effect on food
 * - add activities to do with pet
 * - improve outside of tamagotchi scene
 * - improve bath system (add water shader)
 * - improve shadow
 * - improve lighting
 * - improve camera movement
 * - add penalty from not satifying the need
 * - improve model changing system
 * - (optional) add model customization feature (changing color of material)
 * - (optional) add house customization feature
 * - (optional) add cooking feature
 * - (optional) add tamagotchi customization feature
 * - (optional) add responsiveness
 * - (optional??) support mobile view
 */

/**
 * BUGS:
 */

export default function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 200,
        }}
        shadows
      >
        <Perf position="top-left" />
        <Experience />
      </Canvas>

      <UI />
    </>
  );
}
