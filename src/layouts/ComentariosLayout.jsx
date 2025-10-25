import { Outlet } from "react-router-dom";
import { ComentariosProvider } from "../context/ComentariosContext";

export function ComentariosLayout() {
  return (
    <ComentariosProvider>
      <Outlet />
    </ComentariosProvider>
  )
}