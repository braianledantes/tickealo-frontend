import { Outlet, useLocation, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/NavBar"; 

export function DashboardLayout() {
  const location = useLocation();

  if (location.pathname === "/dashboard" || location.pathname === "/dashboard/") {
    return <Navigate to="/dashboard/eventos" replace />;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#05081b] via-[#010030] via-[#00033d] to-[#010030]">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="fixed top-0 left-0 w-full md:hidden z-50">
        <Navbar />
      </div>

      <main className="flex-1 p-10 overflow-y-auto h-screen scrollbar-none mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
