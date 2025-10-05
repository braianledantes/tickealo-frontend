import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import Cobros from "../pages/Cobros";
import Creditos from "../pages/Creditos";
import Equipo from "../pages/Equipo";
import Eventos from "../pages/Eventos/Eventos";
import NuevoEvento from "../pages/Eventos/Nuevoevento";
import Perfil from "../pages/Perfil";
import UnEvento from "../pages/Eventos/Evento";
import Entradas from "../pages/Entradas";
import { PATHS } from "./paths";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path={PATHS.DASHBOARD + "/*"} element={ <DashboardLayout /> }>
        <Route path='eventos' element={<Eventos />} />
        <Route path='nuevoevento' element={<NuevoEvento />} />
        <Route path='eventos/:id' element={< UnEvento />} />
        <Route path='perfil' element={<Perfil />} />
        <Route path='creditos' element={<Creditos />} />
        <Route path='cobros' element={<Cobros />} />
        <Route path='equipo' element={<Equipo />} />
        <Route path='entradas' element={<Entradas />} />

        <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
    </Routes>
  )
}
