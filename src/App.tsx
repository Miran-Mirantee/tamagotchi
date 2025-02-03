import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
// import {
//   EffectComposer,
//   Pixelation,
//   ToneMapping,
// } from "@react-three/postprocessing";
// import { ToneMappingMode } from "postprocessing";
// import * as THREE from "three";
import Experience from "./Experience";
import UI from "./components/UI";

/**
 * TODO:
 * 1. add more types of food
 * 2. add more pet models to choose
 * 3. add model customization feature
 * 4. save data in localStorage
 * 5. improve eat system
 * 6. add more interactions with pet (petting, fetch a ball)
 * 7. add activities to do with pet
 * 8. add more needs
 * 9. improve outside of tamagotchi scene
 * 10. add tamagotchi model
 * 11. add tamagotchi customization feature
 * 12. improve inside of tamagotchi scene
 * 13. (optional) add house customization feature
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
        {/* <EffectComposer>
          <Pixelation granularity={6} />
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer> */}
      </Canvas>

      <UI />
    </>
  );
}
