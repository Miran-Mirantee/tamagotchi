import { useEffect, useRef } from "react";
import useUIStore from "../stores/useUIStore";
import useCameraStore from "../stores/useCameraStore";
import useTamagotchiStore, {
  Food,
  PetAction,
} from "../stores/useTamagotchiStore";
import food from "../json/food.json";
import Needs from "./Needs";

const petModels = [
  "Cat",
  "Pigeon",
  "Slime",
  "Chicken",
  "Orc",
  "Alien",
  "Fish",
  "Birb",
  "Mushnub",
];

export default function UI() {
  const back = useUIStore((state) => state.back);
  const isInside = useUIStore((state) => state.isInside);
  const isBrowsingFood = useUIStore((state) => state.isBrowsingFood);
  const setIsBrowsingFood = useUIStore((state) => state.setIsBrowsingFood);
  const setCurrentFood = useTamagotchiStore((state) => state.setCurrentFood);
  const currentAction = useTamagotchiStore((state) => state.currentAction);
  const setCurrentAction = useTamagotchiStore(
    (state) => state.setCurrentAction
  );
  const setIsFreeze = useTamagotchiStore((state) => state.setIsFreeze);
  const isFreeze = useTamagotchiStore((state) => state.isFreeze);
  const setBaseModelPath = useTamagotchiStore(
    (state) => state.setBaseModelPath
  );
  const reset = useTamagotchiStore((state) => state.reset);
  const exitFocusMode = useCameraStore((state) => state.exitFocusMode);
  const uiContainerRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLButtonElement>(null);
  const modelMenuBtnRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  // const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInside) {
      uiContainerRef.current!.style.opacity = "1";
      backBtnRef.current!.style.pointerEvents = "all";
      modelMenuBtnRef.current!.style.pointerEvents = "all";
      // statusRef.current!.style.pointerEvents = "all";
    } else {
      uiContainerRef.current!.style.opacity = "0";
      backBtnRef.current!.style.pointerEvents = "none";
      modelMenuBtnRef.current!.style.pointerEvents = "none";
      // statusRef.current!.style.pointerEvents = "none";
    }
  }, [isInside]);

  const onStopFeedingClick = () => {
    setIsBrowsingFood(false);
    exitFocusMode();
    setIsFreeze(false);
  };

  const onWakeUpClick = () => {
    if (currentAction != PetAction.Sleep) return;
    setCurrentAction(PetAction.WakeUp);
  };

  const openModalClick = () => {
    overlayRef.current!.style.opacity = "100";
    overlayRef.current!.style.pointerEvents = "all";
    modalRef.current!.style.opacity = "100";
    modalRef.current!.style.pointerEvents = "all";
  };

  const closeModalClick = () => {
    overlayRef.current!.style.opacity = "0";
    overlayRef.current!.style.pointerEvents = "none";
    modalRef.current!.style.opacity = "0";
    modalRef.current!.style.pointerEvents = "none";
  };

  const FoodItem = ({ food }: { food: Food }) => {
    return (
      <button
        className="food-item"
        title={food.name}
        onClick={() => {
          if (currentAction != PetAction.Eat) {
            setCurrentFood(food);
            setCurrentAction(PetAction.Eat);
          }
        }}
      >
        <img src={food.thumbnail} alt={food.name} />
      </button>
    );
  };

  const ModelChangeItem = ({ model }: { model: string }) => {
    return (
      <button
        title={model}
        className="model-change-item"
        onClick={() => {
          setBaseModelPath(`./models/pet/${model}.glb`);
          closeModalClick();
        }}
      >
        <img src={`./images/pet/${model}.webp`} alt={model} />
      </button>
    );
  };

  return (
    <div className="ui-container" ref={uiContainerRef}>
      {!isBrowsingFood && (
        <button className="back-btn" ref={backBtnRef} onClick={back}>
          Go back
        </button>
      )}
      <Needs />
      <div className="debug">
        <button
          onClick={() => {
            setIsFreeze(false);
          }}
        >
          Unfreeze
        </button>
        <button onClick={() => reset()}>Reset needs</button>
      </div>

      {isBrowsingFood && (
        <>
          <div className="food-container">
            {food.map((food: Food, index) => (
              <FoodItem key={index} food={food} />
            ))}
          </div>
          <button
            className="food-back-btn"
            onClick={onStopFeedingClick}
            disabled={currentAction == PetAction.Eat}
          >
            Stop feeding
          </button>
        </>
      )}

      {currentAction == PetAction.Sleep && (
        <button className="wake-up-btn" onClick={onWakeUpClick}>
          Wake up
        </button>
      )}

      <button
        ref={modelMenuBtnRef}
        className="model-menu-btn"
        onClick={openModalClick}
        disabled={isFreeze}
      >
        change
      </button>

      <div ref={overlayRef} className="overlay" onClick={closeModalClick} />

      <div ref={modalRef} className="model-modal">
        {petModels.map((model) => (
          <ModelChangeItem key={model} model={model} />
        ))}
      </div>
    </div>
  );
}
