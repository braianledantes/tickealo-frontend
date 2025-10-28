import { Outlet } from "react-router-dom";
import { ComprasProvider } from "../context/ComprasContext";

export function ComprasLayout() {
  return (
    <ComprasProvider>
      <Outlet />
    </ComprasProvider>
  )
}