import { Suspense, useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useTamagotchiStore, { PetAction } from "../stores/useTamagotchiStore";
import { useControls } from "leva";
import Pet, { ActionName } from "./Pet";

const WANDER_RANGE = 5; // Define how far the random points can be.
const WANDER_DELAY = 10; // How long to wait before picking a new target in seconds.
const WANDER_SPEED = 2;
const ROTATION_SPEED = 0.1;
const MODEL_WIDTH = 1.5;
const BITE_NUM = 5;
const TOILET_DURATION = 2.5;
const BATH_DURATION = 2.5;

export default function PetInteractions() {
  const baseModelPath = useTamagotchiStore((state) => state.baseModelPath);
  const currentFood = useTamagotchiStore((state) => state.currentFood);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const setMoveToLocation = useTamagotchiStore(
    (state) => state.setMoveToLocation
  );
  const isFreeze = useTamagotchiStore((state) => state.isFreeze);
  const setIsFreeze = useTamagotchiStore((state) => state.setIsFreeze);
  const currentAction = useTamagotchiStore((state) => state.currentAction);
  const setCurrentAction = useTamagotchiStore(
    (state) => state.setCurrentAction
  );
  const actions = useTamagotchiStore((state) => state.animationActions);
  const useToilet = useTamagotchiStore((state) => state.useToilet);
  const bath = useTamagotchiStore((state) => state.bath);
  const sleep = useTamagotchiStore((state) => state.sleep);
  const feed = useTamagotchiStore((state) => state.feed);
  const maxBladder = useTamagotchiStore((state) => state.maxBladder);
  const maxHygiene = useTamagotchiStore((state) => state.maxHygiene);
  const [currentAnimation, setCurrentAnimation] = useState<ActionName>(
    "CharacterArmature|Idle"
  );
  const petRef = useRef<THREE.Group | null>(null);
  const [target, setTarget] = useState<THREE.Vector3>(new THREE.Vector3());
  const [scale, setScale] = useState(0.75);

  useEffect(() => {
    setMoveToLocation(moveToLocation);
  }, []);

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

  useEffect(() => {
    if (!petRef.current) return;
    // console.log(currentAction);
    switch (currentAction) {
      // play idling animation
      case PetAction.Idle:
        setCurrentAnimation("CharacterArmature|Idle");
        break;
      // play walking animation
      case PetAction.Walk:
        setCurrentAnimation("CharacterArmature|Walk");
        break;
      // play eating animation
      case PetAction.Eat:
        if (!currentFood) return;
        actions["CharacterArmature|Bite_Front"]
          ?.setDuration(0.5)
          .setLoop(THREE.LoopRepeat, BITE_NUM);
        setCurrentAnimation("CharacterArmature|Bite_Front");
        const eatingInterval = setInterval(() => {
          const hunger = currentFood.hunger / BITE_NUM;
          const energy = currentFood.energy / BITE_NUM;
          const happiness = currentFood.happiness / BITE_NUM;
          feed(hunger, energy, happiness);
        }, 500);
        setTimeout(() => {
          setCurrentAction(PetAction.Idle);
          setCurrentFood(null);
          clearInterval(eatingInterval);
        }, 500 * BITE_NUM);
        break;
      // play sleeping animation
      case PetAction.Sleep:
        actions["CharacterArmature|Death"]!.clampWhenFinished = true;
        actions["CharacterArmature|Death"]
          ?.setLoop(THREE.LoopOnce, 1)
          .setDuration(0.33);
        setCurrentAnimation("CharacterArmature|Death");
        break;
      //play waking up animation
      case PetAction.WakeUp:
        setCurrentAction(PetAction.Idle);
        setTimeout(() => {
          setIsFreeze(false);
          moveToLocation(
            new THREE.Vector3(1.68, 0, -3.31),
            new THREE.Vector3(0, Math.PI * -0.5, 0)
          );
        }, 700);
        break;
      // play dance animation when using toilet
      case PetAction.Toilet:
        setCurrentAnimation("CharacterArmature|Dance");
        setTimeout(() => {
          moveToLocation(
            new THREE.Vector3(-0.94, 0, 1.12),
            new THREE.Vector3()
          );
          setCurrentAction(PetAction.Idle);
          setIsFreeze(false);
        }, 1000 * TOILET_DURATION);
        break;
      // play dance animation when taking a bath
      case PetAction.Bath:
        setCurrentAnimation("CharacterArmature|Dance");
        setTimeout(() => {
          moveToLocation(
            new THREE.Vector3(-0.94, 0, 1.12),
            new THREE.Vector3()
          );
          setCurrentAction(PetAction.Idle);
          setIsFreeze(false);
        }, 1000 * BATH_DURATION);
        break;
    }
  }, [currentAction]);

  useEffect(() => {
    // console.log("isFreeze", isFreeze);
  }, [isFreeze]);

  // Move the pet towards the target point
  useFrame((_, delta) => {
    if (!petRef.current) return;

    if (currentAction == PetAction.Sleep) {
      sleep(delta * 10);
    }
    if (currentAction == PetAction.Toilet) {
      useToilet(delta * (maxBladder / TOILET_DURATION));
    }
    if (currentAction == PetAction.Bath) {
      bath(delta * (maxHygiene / TOILET_DURATION));
    }

    // if pet is not supposed to be moving then return
    if (isFreeze) return;

    delta = Math.min(delta, 0.1); // Prevent large jumps

    const distance = petRef.current.position.distanceTo(target);

    // Stop if close to the target
    if (distance < 0.2) {
      setCurrentAction(PetAction.Idle);
      return;
    }
    setCurrentAction(PetAction.Walk);

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

  // play animation
  useEffect(() => {
    actions[currentAnimation]?.reset().fadeIn(0.5).play();
    return () => {
      actions[currentAnimation]?.fadeOut(0.5);
    };
  }, [currentAnimation]);

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

  // Define obstacles with padding
  const obstacles = [
    {
      minX: 2.9 - MODEL_WIDTH / 2,
      maxX: 5 + MODEL_WIDTH / 2,
      minZ: -5 - MODEL_WIDTH / 2,
      maxZ: -1 + MODEL_WIDTH / 2,
    },
    {
      minX: 2.23 - MODEL_WIDTH / 2,
      maxX: 4.18 + MODEL_WIDTH / 2,
      minZ: 2.23 - MODEL_WIDTH / 2,
      maxZ: 4.18 + MODEL_WIDTH / 2,
    },
    {
      minX: -5 - MODEL_WIDTH / 2,
      maxX: 0 + MODEL_WIDTH / 2,
      minZ: -5 - MODEL_WIDTH / 2,
      maxZ: 0 + MODEL_WIDTH / 2,
    },
  ];

  // Function to check if a point is inside an obstacle
  const isInsideObstacle = (x: number, z: number) => {
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

  const moveToLocation = (
    targetPosition: THREE.Vector3,
    targetRotation: THREE.Vector3
  ) => {
    if (!petRef.current) return;

    const euler = new THREE.Euler().setFromVector3(targetRotation);

    petRef.current.position.copy(targetPosition);
    petRef.current.rotation.copy(euler);
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
            position={[-2.5, 0, 2.5]}
          />
        </Suspense>
      )}
    </>
  );
}
