import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { EventosLayout } from "../layouts/EventosLayout";
import Cobros from "../pages/Cobros";
import Creditos from "../pages/Creditos";
import Entradas from "../pages/Entradas";
import Equipo from "../pages/Equipo";
import Eventos from "../pages/Eventos/Eventos";
import Evento from "../pages/Eventos/Evento";
import NuevoEvento from "../pages/Eventos/NuevoEvento";
import Perfil from "../pages/Perfil";
import { PATHS } from "./paths";
import { PerfilLayout } from "../layouts/PerfilLayout";
import { CreditosLayout } from "../layouts/CreditosLayout";
import { EquipoLayout } from "../layouts/EquipoLayout";
import { CobrosLayout } from "../layouts/CobrosLayout";
import { EntradasLayout } from "../layouts/EntradasLayout";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path={PATHS.DASHBOARD + "/*"} element={ <DashboardLayout /> }>
        <Route index element={<Navigate to={PATHS.EVENTOS} replace />} />

        <Route path='eventos' element={<EventosLayout />} >
          <Route index element={<Eventos />} />
          <Route path=':id' element={<Evento />} />
          <Route path='nuevo' element={<NuevoEvento />} />
        </Route>

        <Route path='perfil' element={<PerfilLayout />}>
          <Route index element={<Perfil />} />
        </Route>

        <Route path='creditos' element={<CreditosLayout />}>
          <Route index element={<Creditos />} />
        </Route>

        <Route path='cobros' element={<CobrosLayout />}>
          <Route index element={<Cobros />} />
        </Route>

        <Route path='equipo' element={<EquipoLayout />}>
          <Route index element={<Equipo />} />
        </Route>

        <Route path='entradas' element={<EntradasLayout />}>
          <Route index element={<Entradas />} />
        </Route>

        <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
      </Route>

      <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
    </Routes>
  )
}
