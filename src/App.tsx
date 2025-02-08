import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import Experience from "./Experience";
import UI from "./components/UI";

/**
 * TODO:
 * 1. add more types of food
 * 3. add model customization feature
 * 4. save data in localStorage
 * 5. improve eat system
 * 7. add activities to do with pet
 * 9. improve outside of tamagotchi scene
 * 10. add tamagotchi model
 * 11. add tamagotchi customization feature
 * 12. improve inside of tamagotchi scene
 * 13. (optional) add house customization feature
 * 15. (optional) add cooking feature
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
        <Perf position="bottom-left" />
        <Experience />
      </Canvas>

      <UI />
    </>
  );
}
