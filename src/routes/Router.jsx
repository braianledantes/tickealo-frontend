import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Eventos from "../pages/Eventos/Eventos";
import Perfil from "../pages/Perfil";
import Creditos from "../pages/Creditos";
import Equipo from "../pages/Equipo";
import Nuevoevento from "../pages/Eventos/Nuevoevento";
import Metodopago from "../pages/Eventos/MetodoPago";
import Data from "../pages/Eventos/Data";
import { PATHS } from "./paths";
import PrivateRoute from "./PrivateRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<Home />} />
        <Route path={PATHS.LOGIN} element={<Login />} />
        <Route path={PATHS.REGISTER} element={<Register />} />

        <Route
          path={PATHS.DASHBOARD}
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path={PATHS.EVENTOS}
          element={
            <PrivateRoute>
              <Eventos />
            </PrivateRoute>
          }
        />

        <Route
          path={PATHS.PROFILE}
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path={PATHS.CREDITOS}
          element={
            <PrivateRoute>
              <Creditos />
            </PrivateRoute>
          }
        />

        <Route
          path={PATHS.NUEVOEVENTO}
          element={
            <PrivateRoute>
              <Nuevoevento />
            </PrivateRoute>
          }
        />

        <Route
          path={PATHS.METODOPAGO}
          element={
            <PrivateRoute>
              <Metodopago />
            </PrivateRoute>
          }
        />

        <Route
          path={PATHS.DATA}
          element={
            <PrivateRoute>
              <Data />
            </PrivateRoute>
          }
        />

        <Route
          path={PATHS.EQUIPO}
          element={
            <PrivateRoute>
              <Equipo />
            </PrivateRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}
