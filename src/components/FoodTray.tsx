import useTamagotchiStore from "../stores/useTamagotchiStore";

export default function FoodTray(props: JSX.IntrinsicElements["group"]) {
  const currentFood = useTamagotchiStore((state) => state.currentFood);

  return (
    <group {...props}>
      {currentFood && <currentFood.Model />}
      <mesh>
        <cylinderGeometry args={[0.4, 0.25, 0.1, 8, 1]} />
        <meshStandardMaterial />
      </mesh>
    </group>
  );
}
