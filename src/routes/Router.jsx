import { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export default function Router() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        { isAuthenticated 
            ? <Route path="/*" element={<PrivateRoutes />} />
            : <Route path="/*" element={<PublicRoutes />} />
        }
      </Routes>
    </BrowserRouter>
  );
}
