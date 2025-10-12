import { useContext } from "react";
import { PerfilContext } from "../context/PerfilContext";

export const usePerfil = () => {
  const context = useContext(PerfilContext)

  if (!context) {
    throw new Error("usePerfil must be used within an PerfilProvider ")
  }

  return context;
}