import { useContext } from "react";
import { EventosContext } from "../context/EventosContext";

export const useEventosList = () => {
  const context = useContext(EventosContext);

  if (!context) {
    throw new Error("useEventosList must be used within an EventosProvider ");
  }
 
  return context;
}