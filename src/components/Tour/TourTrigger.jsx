import { HelpCircle } from "lucide-react";
import {useTour} from "@reactour/tour";
import { useTourStore } from "./TourStore";

export default function TourTrigger({ className = "px-4" }) {
  const { setIsOpen, setCurrentStep } = useTour();
  const { hasSeenTour, resetTour } = useTourStore();

  const handleStartTour = () => {
    resetTour();
    setCurrentStep(0);
    setIsOpen(true);
  }

  return (
    <button
      className={` ${className} flex justify-start items-center text-sm italic tracking-wider font-semibold gap-2 hover:text-blue-800 transition text-white cursor-pointer`}
      onClick={handleStartTour}
    >
      <HelpCircle className="w-5 h-5" />
      {hasSeenTour ? 'Reiniciar Tour' : 'TUTORIAL DE USO AQUÍ'}
    </button>
  );
}
