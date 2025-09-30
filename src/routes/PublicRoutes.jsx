import { Navigate, Route, Routes } from "react-router-dom";
import { PATHS } from "./paths";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.LOGIN} element={<Login />} />
      <Route path={PATHS.REGISTER} element={<Register />} />
     
      <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
    </Routes>
  )
}
