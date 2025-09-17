import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { PATHS } from "./paths";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AppContext);

  if (!isAuthenticated) {
    return <Navigate to= {PATHS.LOGIN} replace />;
  }

  return children;
}
