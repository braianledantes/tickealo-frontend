import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import Cobros from "../pages/Cobros";
import Creditos from "../pages/Creditos";
import Equipo from "../pages/Equipo";
import Eventos from "../pages/Eventos/Eventos";
import NuevoEvento from "../pages/Eventos/NuevoEvento";
import Perfil from "../pages/Perfil";
import { PATHS } from "./paths";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path={PATHS.DASHBOARD + "/*"} element={ <DashboardLayout /> }>
        <Route path='eventos' element={<Eventos />} />
        <Route path='nuevoevento' element={<NuevoEvento />} />
        <Route path='perfil' element={<Perfil />} />
        <Route path='creditos' element={<Creditos />} />
        <Route path='cobros' element={<Cobros />} />
        <Route path='equipo' element={<Equipo />} />

        <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
    </Routes>
  )
}
