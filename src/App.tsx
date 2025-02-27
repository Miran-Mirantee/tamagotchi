import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Experience from "./Experience";
import UI from "./components/UI";
import * as THREE from "three";

/**
 * TODO:
 * - save data in localStorage
 * - improve bath system (add water shader)
 * - add penalty from not satifying the need
 * - improve model changing system
 * - add sound
 * - (optional) add model customization feature (changing color of material)
 * - (optional) add house customization feature
 * - (optional) add cooking feature
 * - (optional) add tamagotchi customization feature
 * - (optional) add responsiveness
 * - (optional) add activities to do with pet
 * - (optional) use shader to imitate bitting effect on food
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
          position: [0, 0, 7],
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
