import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Eventos from "../pages/Eventos/Eventos";
import Perfil from "../pages/Perfil";
import Creditos from "../pages/Creditos";
import Cobros from "../pages/Cobros";
import Equipo from "../pages/Equipo";
import NuevoEvento from "../pages/Eventos/Nuevoevento";
import { PATHS } from "./paths";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.REGISTER} element={<Register />} />

        {/* Rutas privadas dentro del Dashboard */}
        <Route
          path={PATHS.DASHBOARD + "/*"}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="eventos" element={<Eventos />} />
          <Route path="eventos/nuevoevento" element={<NuevoEvento />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="creditos" element={<Creditos />} />
          <Route path="cobros" element={<Cobros />} />
          <Route path="equipo" element={<Equipo />} />

          {/* Redirección por defecto a eventos */}
          <Route index element={<Navigate to="eventos" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

