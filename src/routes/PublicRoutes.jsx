import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { CountryLayout } from "../layouts/CountryLayout";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route element={<CountryLayout/>}>
        <Route path={PATHS.REGISTER} element={<Register />} />
      </Route>
     
      <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
    </Routes>
  )
}
