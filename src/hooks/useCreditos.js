import { useContext } from "react";
import { CreditosContext } from "../context/CreditosContext";

export function useCreditos() {
  const context = useContext(CreditosContext);

  if (!context) {
    throw new Error("useCreditos must be used within a CreditosProvider");
  }

  return context;
}