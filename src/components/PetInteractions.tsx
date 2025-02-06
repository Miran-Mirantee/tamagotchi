import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useTamagotchiStore from "../stores/useTamagotchiStore";
import { useControls } from "leva";
import Pet, { ActionName } from "./Pet";

const WANDER_RANGE = 4; // Define how far the random points can be.
const WANDER_DELAY = 10; // How long to wait before picking a new target in seconds.

export default function PetInteractions() {
  const baseModelPath = useTamagotchiStore((state) => state.baseModelPath);
  const isEating = useTamagotchiStore((state) => state.isEating);
  const setIsEating = useTamagotchiStore((state) => state.setIsEating);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const setDestination = useTamagotchiStore((state) => state.setDestination);
  const toPoint = useTamagotchiStore((state) => state.toPoint);
  const setOrigin = useTamagotchiStore((state) => state.setOrigin);
  const fromPoint = useTamagotchiStore((state) => state.fromPoint);
  const [currentAnimation, setCurrentAnimation] = useState<ActionName>(
    "CharacterArmature|Idle"
  );
  const petRef = useRef<THREE.Group | null>(null);

  const [target, setTarget] = useState<THREE.Vector3>(new THREE.Vector3());
  const [isMoving, setIsMoving] = useState(false);
  // Function to get a random point within a radius

  // Set a new random target every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (petRef.current) {
        const newTarget = getRandomPoint(new THREE.Vector3());
        setTarget(newTarget);
      }
    }, WANDER_DELAY * 1000); // Run every WANDER_DELAY seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Move the pet towards the target point
  useFrame((state, delta) => {
    if (!petRef.current) return;

    // Prevent large delta values when resuming from inactivity
    delta = Math.min(delta, 0.1); // Limit delta to prevent sudden large jumps

    const distance = petRef.current.position.distanceTo(target);

    // If close enough, stop moving and set new target
    if (distance < 0.2) {
      setIsMoving(false);
    } else {
      setIsMoving(true);

      const direction = new THREE.Vector3()
        .subVectors(target, petRef.current.position)
        .normalize();

      petRef.current.position.add(direction.multiplyScalar(delta * 2)); // Adjust speed here
    }

    // Make sure the pet faces the target
    const directionToTarget = new THREE.Vector3().subVectors(
      target,
      petRef.current.position
    );
    const angle = Math.atan2(directionToTarget.x, directionToTarget.z);

    // Fix for backward facing issue: Ensure the rotation is always facing the right direction
    const currentRotation = petRef.current.rotation.y;
    const angleDiff = angle - currentRotation;
    let adjustedAngle = angle;
    if (Math.abs(angleDiff) > Math.PI) {
      adjustedAngle += angleDiff > 0 ? -2 * Math.PI : 2 * Math.PI; // Adjust angle to prevent backward rotation
    }

    // Smooth rotation with lerp for gradual turning
    petRef.current.rotation.y = THREE.MathUtils.lerp(
      currentRotation,
      adjustedAngle,
      0.1
    );
    console.log(delta);
  });

  // play eating animation
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
    if (isMoving) {
      setCurrentAnimation("CharacterArmature|Walk");
    } else {
      setCurrentAnimation("CharacterArmature|Idle");
    }
  }, [isMoving]);

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

  const getRandomPoint = (center: THREE.Vector3) => {
    const x = (Math.random() - 0.5) * WANDER_RANGE * 2 + center.x;
    const z = (Math.random() - 0.5) * WANDER_RANGE * 2 + center.z;
    return new THREE.Vector3(x, 0, z);
  };

  return (
    <>
      {baseModelPath && (
        <Suspense>
          <Pet
            ref={petRef}
            key={baseModelPath}
            url={baseModelPath}
            scale={0.75}
            animation={currentAnimation}
          />
        </Suspense>
      )}
    </>
  );
}
