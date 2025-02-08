import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useControls } from "leva";
import Table from "./furniture/Table";
import Toilet from "./furniture/Toilet";
import Bathtub from "./furniture/Bathtub";
import Bed from "./furniture/Bed";
import Plate from "./furniture/Plate";
import useTamagotchiStore, { PetAction } from "../stores/useTamagotchiStore";

const Walls = () => {
  const c = useControls({
    r: { value: { x: 0, z: 0 }, min: -5, max: 5, step: 0.01 },
  });

  return (
    <>
      {/* Floor */}
      <mesh rotation={[Math.PI * -0.5, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="rgba(44,37,67,1)" />
      </mesh>
      <mesh position={[0, 2, -5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          //   side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI * -0.5, 0]} position={[5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          //   side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI * 0.5, 0]} position={[-5, 2, 0]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          //   side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[0, 2, 5]}>
        <planeGeometry args={[10, 4]} />
        <meshStandardMaterial
          color="rgba(44,37,67,1)"
          // side={THREE.DoubleSide}
        />
      </mesh>
      {/* Bathroom */}
      <mesh
        rotation={[0, Math.PI * 0.5, 0]}
        position={[0.2, 2, -2.5]}
        castShadow
      >
        <boxGeometry args={[5, 4, 0.1]} />
        <meshStandardMaterial color="rgba(44,37,67,1)" />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[-3.5, 2, -0.05]} castShadow>
        <boxGeometry args={[3, 4, 0.1]} />
        <meshStandardMaterial color="rgba(44,37,67,1)" />
      </mesh>
    </>
  );
};

export default function Room() {
  const c = useControls({
    f: { value: { x: 0, y: 0, z: 0 }, min: -5, max: 5, step: 0.01 },
  });
  const bedRef = useRef<THREE.Group | null>(null);
  const moveToLocation = useTamagotchiStore((state) => state.moveToLocation);
  const currentAction = useTamagotchiStore((state) => state.currentAction);
  const setCurrentAction = useTamagotchiStore(
    (state) => state.setCurrentAction
  );
  const setIsFreeze = useTamagotchiStore((state) => state.setIsFreeze);

  useEffect(() => {
    let size = new THREE.Vector3();
    if (bedRef.current) {
      const box = new THREE.Box3().setFromObject(bedRef.current);

      //   box.expandByObject(bedRef.current);

      box.getSize(size);
      //   console.log(size, box);
    }
  }, [bedRef]);

  return (
    <>
      <Walls />
      <Table ref={bedRef} position={[3.2, 0, 3.2]} scale={[1, 0.4, 1]} />
      <Plate
        position={[3.2, 0.46, 2.83]}
        onPointerDown={(e) => {
          e.stopPropagation();
          moveToLocation(new THREE.Vector3(3.23, 0, 1.26), new THREE.Vector3());
          setIsFreeze(true);
          setCurrentAction(PetAction.Idle);
        }}
      />
      <Toilet
        position={[-1.15, 0, -4.09]}
        onPointerDown={(e) => {
          e.stopPropagation();
          moveToLocation(
            new THREE.Vector3(-1.15, 1, -3.8),
            new THREE.Vector3()
          );
          setIsFreeze(true);
          setCurrentAction(PetAction.Toilet);
        }}
      />
      <Bathtub
        position={[-3.85, 0, -2.86]}
        scale={[1.4, 1.2, 1]}
        onPointerDown={(e) => {
          e.stopPropagation();
          moveToLocation(
            new THREE.Vector3(-3.87, 0.43, -3.13),
            new THREE.Vector3(0, Math.PI * 0.5, 0)
          );
          setIsFreeze(true);
          setCurrentAction(PetAction.Bath);
        }}
      />
      <Bed
        position={[3.9, 0, -3.0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          if (currentAction !== PetAction.Sleep) {
            moveToLocation(
              new THREE.Vector3(3.93, 0.751, -3.31),
              new THREE.Vector3()
            );
            setIsFreeze(true);
            setCurrentAction(PetAction.Sleep);
          } else {
            setCurrentAction(PetAction.Idle);
            setTimeout(() => {
              setIsFreeze(false);
              moveToLocation(
                new THREE.Vector3(1.68, 0, -3.31),
                new THREE.Vector3(0, Math.PI * -0.5, 0)
              );
            }, 700);
          }
        }}
      />
      {/* <mesh position={[c.f.x, 0.625 + c.f.y, c.f.z]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshBasicMaterial color={"red"} />
      </mesh> */}
    </>
  );
}
