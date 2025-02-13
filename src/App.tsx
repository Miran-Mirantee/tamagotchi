import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Experience from "./Experience";
import UI from "./components/UI";

/**
 * TODO:
 * - add model customization feature (changing color of material)
 * - save data in localStorage
 * - use shader to imitate bitting effect on food
 * - add activities to do with pet
 * - improve outside of tamagotchi scene
 * - add tamagotchi model (probably have to model myself, wish me luck)
 * - improve inside of tamagotchi scene
 * - improve bath system (add water shader)
 * - add highlight over clickable objects (post-processing and shader?)
 * - gradually increasing need stats when doing activities (especially sleeping)
 * - improve shadow
 * - improve camera movement
 * - add penalty from not satifying the need
 * - (optional) add house customization feature
 * - (optional) add cooking feature
 * - (optional) add tamagotchi customization feature
 */

/**
 * BUGS:
 */

export default function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 3, 4],
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
