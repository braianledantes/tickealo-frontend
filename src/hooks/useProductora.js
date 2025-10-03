import { useContext } from "react";
import { ProductoraContext } from "../context/ProductoraContext.jsx";

export const useProductora = () => {
  const context = useContext(ProductoraContext)

  if (!context) {
    throw new Error("useProductora must be used within an ProductoraProvider ")
  }

  return context;
}