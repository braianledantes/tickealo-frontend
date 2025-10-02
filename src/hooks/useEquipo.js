import { useContext } from "react";
import { EquipoContext } from "../context/EquipoContext.jsx";

export const useEquipo = () => {
  const context = useContext(EquipoContext)

  if (!context) {
    throw new Error("useEquipo must be used within an EquipoProvider ")
  }

  return context;
}