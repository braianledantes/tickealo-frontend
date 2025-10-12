import { Outlet } from "react-router-dom";
import { CuentaBancariaProvider } from "../context/CuentaBancariaContext";

export function CobrosLayout() {
  return (
    <CuentaBancariaProvider>
      <Outlet />
    </CuentaBancariaProvider>
  )
}