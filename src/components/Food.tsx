import { useGLTF } from "@react-three/drei";
import food from "../json/food.json";
import { Food as FoodType } from "../stores/useTamagotchiStore";
import { useEffect } from "react";

export default function Food({
  url,
  ...props
}: { url: string } & JSX.IntrinsicElements["group"]) {
  const { scene, nodes } = useGLTF(url);
  useEffect(() => {
    for (const node in nodes) {
      if (nodes[node].type == "Mesh") {
        nodes[node].castShadow = true;
      }
    }
  }, []);

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
food.map((food: FoodType) => useGLTF.preload(food.model));
