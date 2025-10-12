import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export default function Router() {
  const { isAuthenticated } = useAuth();

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
