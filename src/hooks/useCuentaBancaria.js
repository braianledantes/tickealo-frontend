import { useContext } from "react";
import { CuentaBancariaContext } from "../context/CuentaBancariaContext.jsx";

export const useCuentaBancaria = () => {
  const context = useContext(CuentaBancariaContext)

  if (!context) {
    throw new Error("useCuentaBancaria must be used within an CuentaBancariaProvider ")
  }

  return context;
}