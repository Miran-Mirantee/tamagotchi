import { Suspense, useState, useEffect } from "react";
import useTamagotchiStore from "../stores/useTamagotchiStore";
import { useControls } from "leva";
import Pet, { ActionName } from "./Pet";

export default function PetInteractions() {
  const baseModelPath = useTamagotchiStore((state) => state.baseModelPath);
  const isEating = useTamagotchiStore((state) => state.isEating);
  const setIsEating = useTamagotchiStore((state) => state.setIsEating);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const [currentAnimation, setCurrentAnimation] = useState<ActionName>(
    "CharacterArmature|Idle"
  );

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
          <Pet url={baseModelPath} scale={0.25} animation={currentAnimation} />
        </Suspense>
      )}
    </>
  );
}
