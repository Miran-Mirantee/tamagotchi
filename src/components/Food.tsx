import { useGLTF } from "@react-three/drei";
import food from "../json/food.json";
import { Food as FoodType } from "../stores/useTamagotchiStore";

export default function Food({
  url,
  ...props
}: { url: string } & JSX.IntrinsicElements["group"]) {
  const { scene } = useGLTF(url);
  return (
    <group {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
food.map((food: FoodType) => useGLTF.preload(food.model));
