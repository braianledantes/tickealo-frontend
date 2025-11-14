import { Outlet } from "react-router-dom";
import { CreditosProvider } from "../context/CreditosContext";

export function CreditosLayout() {
  return (
    <CreditosProvider>
      <Outlet />
    </CreditosProvider>
  )
}