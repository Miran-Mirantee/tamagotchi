import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useTamagotchiStore from "../stores/useTamagotchiStore";
import { useControls } from "leva";
import Pet, { ActionName } from "./Pet";

const WANDER_RANGE = 5; // Define how far the random points can be.
const WANDER_DELAY = 10; // How long to wait before picking a new target in seconds.
const WANDER_SPEED = 2;
const ROTATION_SPEED = 0.1;
const MODEL_WIDTH = 1.5;

export default function PetInteractions() {
  const baseModelPath = useTamagotchiStore((state) => state.baseModelPath);
  const isEating = useTamagotchiStore((state) => state.isEating);
  const setIsEating = useTamagotchiStore((state) => state.setIsEating);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const [currentAnimation, setCurrentAnimation] = useState<ActionName>(
    "CharacterArmature|Idle"
  );
  const petRef = useRef<THREE.Group | null>(null);

  const [target, setTarget] = useState<THREE.Vector3>(new THREE.Vector3());
  const [isMoving, setIsMoving] = useState(false);
  const [scale, setScale] = useState(0.75);

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

  useEffect(() => {
    if (baseModelPath.includes("Alien")) {
      setScale(0.45);
    } else if (baseModelPath.includes("Fish")) {
      setScale(0.6);
    } else if (baseModelPath.includes("Birb")) {
      setScale(0.55);
    } else if (baseModelPath.includes("Mushnub")) {
      setScale(0.6);
    } else {
      setScale(0.75);
    }
  }, [baseModelPath]);

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

  // play walking animation
  useEffect(() => {
    if (isMoving) {
      setCurrentAnimation("CharacterArmature|Walk");
    } else {
      setCurrentAnimation("CharacterArmature|Idle");
    }
  }, [isMoving]);

  // Move the pet towards the target point
  useFrame((state, delta) => {
    if (!petRef.current) return;

    delta = Math.min(delta, 0.1); // Prevent large jumps

    const distance = petRef.current.position.distanceTo(target);

    // Stop if close to the target
    if (distance < 0.2) {
      setIsMoving(false);
      return;
    }

    setIsMoving(true);

    // Compute direction
    const direction = new THREE.Vector3()
      .subVectors(target, petRef.current.position)
      .normalize();
    const nextPosition = petRef.current.position
      .clone()
      .add(direction.clone().multiplyScalar(delta * WANDER_SPEED));

    // Check if next position is inside an obstacle
    if (!isInsideObstacle(nextPosition.x, nextPosition.z)) {
      petRef.current.position.copy(nextPosition);
    } else {
      // If it's about to enter an obstacle, pick a new target
      setTarget(getRandomPoint(petRef.current.position));
    }

    // Make sure the pet faces the target smoothly
    const directionToTarget = new THREE.Vector3().subVectors(
      target,
      petRef.current.position
    );
    const angle = Math.atan2(directionToTarget.x, directionToTarget.z);

    // Ensure smooth turning
    const currentRotation = petRef.current.rotation.y;
    const angleDiff = angle - currentRotation;
    let adjustedAngle = angle;
    if (Math.abs(angleDiff) > Math.PI) {
      adjustedAngle += angleDiff > 0 ? -2 * Math.PI : 2 * Math.PI;
    }

    petRef.current.rotation.y = THREE.MathUtils.lerp(
      currentRotation,
      adjustedAngle,
      ROTATION_SPEED
    );
  });

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

  // Function to check if a point is inside an obstacle
  const isInsideObstacle = (x: number, z: number) => {
    const halfSize = MODEL_WIDTH / 2; // Half of model's width and depth

    // Define obstacles with padding
    const obstacles = [
      {
        minX: 2.9 - halfSize,
        maxX: 5 + halfSize,
        minZ: -5 - halfSize,
        maxZ: -1 + halfSize,
      },
      {
        minX: 2.23 - halfSize,
        maxX: 4.18 + halfSize,
        minZ: 2.23 - halfSize,
        maxZ: 4.18 + halfSize,
      },
      {
        minX: -5 - halfSize,
        maxX: 0 + halfSize,
        minZ: -5 - halfSize,
        maxZ: 0 + halfSize,
      },
    ];

    // Check if (x, z) is within any obstacle
    return obstacles.some(
      ({ minX, maxX, minZ, maxZ }) =>
        x >= minX && x <= maxX && z >= minZ && z <= maxZ
    );
  };

  // Function to get a random valid point within range, avoiding obstacles
  const getRandomPoint = (center: THREE.Vector3) => {
    let x, z;
    const halfSize = MODEL_WIDTH / 2;
    do {
      x = (Math.random() - 0.5) * WANDER_RANGE * 2 + center.x;
      z = (Math.random() - 0.5) * WANDER_RANGE * 2 + center.z;

      // Clamp x and z within the movement bounds
      x = Math.max(-5 + halfSize, Math.min(5 - halfSize, x));
      z = Math.max(-5 + halfSize, Math.min(5 - halfSize, z));
    } while (isInsideObstacle(x, z)); // Keep trying until a valid point is found

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
            scale={scale}
            animation={currentAnimation}
            position={[-2.5, 0, 2.5]}
          />
        </Suspense>
      )}
    </>
  );
}
