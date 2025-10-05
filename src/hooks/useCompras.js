import { useContext } from "react";
import { ComprasContext } from "../context/ComprasContext.jsx";

export const useCompras = () => {
  const context = useContext(ComprasContext)

  if (!context) {
    throw new Error("useCompras must be used within an ComprasProvider ")
  }

  return context;
}