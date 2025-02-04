import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import useTamagotchiStore from "../stores/useTamagotchiStore";
import { useControls } from "leva";
import Pet, { ActionName } from "./Pet";

export default function PetInteractions() {
  const baseModelPath = useTamagotchiStore((state) => state.baseModelPath);
  const isEating = useTamagotchiStore((state) => state.isEating);
  const setIsEating = useTamagotchiStore((state) => state.setIsEating);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const toPoint = useTamagotchiStore((state) => state.toPoint);
  const setOrigin = useTamagotchiStore((state) => state.setOrigin);
  const fromPoint = useTamagotchiStore((state) => state.fromPoint);
  const [currentAnimation, setCurrentAnimation] = useState<ActionName>(
    "CharacterArmature|Idle"
  );
  const petRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (petRef.current?.position) {
      const coordinate = new THREE.Vector3();
      coordinate.copy(petRef.current.position);
      setOrigin(coordinate);
    }
  }, []);

  useEffect(() => {
    if (isEating) {
      setCurrentAnimation("CharacterArmature|Bite_Front");
      setTimeout(() => {
        setIsEating(false);
        setCurrentAnimation("CharacterArmature|Idle");
        setCurrentFood(null);
      }, 2000);
    }
  }, [isEating]);

  useEffect(() => {
    if (petRef.current) {
      petRef.current.position.set(toPoint.x, 0, toPoint.z);
      const direction = new THREE.Vector3()
        .subVectors(toPoint, fromPoint)
        .normalize();
      const angle = Math.atan2(direction.x, direction.z);
      petRef.current.rotation.y = angle;
      setOrigin(toPoint);
    }
  }, [toPoint]);

  useControls({
    animations: {
      options: [
        "CharacterArmature|Idle",
        "CharacterArmature|Dance",
        "CharacterArmature|Bite_Front",
        "CharacterArmature|Death",
        "CharacterArmature|HitRecieve",
        "CharacterArmature|Jump",
        "CharacterArmature|No",
        "CharacterArmature|Walk",
        "CharacterArmature|Yes",
      ],
      onChange: (e: ActionName) => {
        setCurrentAnimation(e);
      },
    },
  });

  return (
    <>
      {baseModelPath && (
        <Suspense>
          <Pet
            ref={petRef}
            key={baseModelPath}
            url={baseModelPath}
            scale={0.5}
            animation={currentAnimation}
          />
        </Suspense>
      )}
    </>
  );
}
