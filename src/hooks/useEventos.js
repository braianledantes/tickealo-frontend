import { useContext } from "react";
import { EventoContext } from "../context/EventoContext.jsx";

export const useEvento = () => {
  const context = useContext(EventoContext)

  if (!context) {
    throw new Error("useEvento must be used within an EventoProvider ")
  }

  return context;
}