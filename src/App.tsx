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
