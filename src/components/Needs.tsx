import useTamagotchiStore from "../stores/useTamagotchiStore";

export default function Needs() {
  const hunger = useTamagotchiStore((state) => state.hunger);
  const energy = useTamagotchiStore((state) => state.energy);
  const happiness = useTamagotchiStore((state) => state.happiness);
  const bladder = useTamagotchiStore((state) => state.bladder);
  const hygiene = useTamagotchiStore((state) => state.hygiene);
  const maxHunger = useTamagotchiStore((state) => state.maxHunger);
  const maxEnergy = useTamagotchiStore((state) => state.maxEnergy);
  const maxHappiness = useTamagotchiStore((state) => state.maxHappiness);
  const maxBladder = useTamagotchiStore((state) => state.maxBladder);
  const maxHygiene = useTamagotchiStore((state) => state.maxHygiene);

  const Need = ({
    label,
    value,
    maxValue,
  }: {
    label: string;
    value: number;
    maxValue: number;
  }) => {
    return (
      <div className="need">
        <span>{label} </span>
        <progress value={value} max={maxValue} />
        <span>
          {Math.round(value)} / {maxValue}
        </span>
      </div>
    );
  };

  return (
    <div className="status">
      <Need label={"Hunger:"} value={hunger} maxValue={maxHunger} />
      <Need label={"Energy:"} value={energy} maxValue={maxEnergy} />
      <Need label={"Happiness:"} value={happiness} maxValue={maxHappiness} />
      <Need label={"Bladder:"} value={bladder} maxValue={maxBladder} />
      <Need label={"Hygiene:"} value={hygiene} maxValue={maxHygiene} />
    </div>
  );
}
