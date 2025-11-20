import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { EventosLayout } from "../layouts/EventosLayout";
import Cobros from "../pages/Cobros";
import Creditos from "../pages/Creditos";
import Compras from "../pages/Compras";
import Equipo from "../pages/Equipo";
import Eventos from "../pages/Eventos/Eventos";
import Evento from "../pages/Eventos/Evento";
import Perfil from "../pages/Perfil";
import { PATHS } from "./paths";
import { PerfilLayout } from "../layouts/PerfilLayout";
import { CreditosLayout } from "../layouts/CreditosLayout";
import { EquipoLayout } from "../layouts/EquipoLayout";
import { CobrosLayout } from "../layouts/CobrosLayout";
import { ComprasLayout } from "../layouts/ComprasLayout";
import { ComentariosLayout } from "../layouts/ComentariosLayout";
import {CountryLayout} from "../layouts/CountryLayout"
import CrearEvento from "../pages/Eventos/CrearEvento";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route path={PATHS.DASHBOARD + "/*"} element={ <DashboardLayout /> }>
        <Route index element={<Navigate to={PATHS.EVENTOS} replace />} />

        <Route path="eventos" element={<EventosLayout />}>
          <Route index element={<Eventos />} />
          <Route path=":id" element={<Evento />} />
          <Route path="nuevo" element={<CrearEvento />} />
        </Route>

        <Route element={<CountryLayout/>}>
          <Route path='perfil' element={<PerfilLayout />}>
            <Route index element={<Perfil />} />
          </Route>
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

        <Route path='compras' element={<ComprasLayout />}>
          <Route index element={<Compras />} />
        </Route>

        <Route path="*" element={<Navigate to={PATHS.EVENTOS} replace />} />
      </Route>
      <Route path="*" element={<Navigate to={PATHS.DASHBOARD} replace />} />
    </Routes>
  )
}
