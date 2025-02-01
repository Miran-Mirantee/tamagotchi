import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Pixelation,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
// import * as THREE from "three";
import Experience from "./Experience";

export default function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 1, 4],
          fov: 45,
          near: 0.1,
          far: 200,
        }}
        shadows
      >
        <color args={["rgba(62,58,74,1)"]} attach={"background"} />
        <Experience />
        <EffectComposer>
          {/* <Pixelation granularity={6} /> */}
          <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        </EffectComposer>
      </Canvas>
    </>
  );
}
