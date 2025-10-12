import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

export function DashboardLayout() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#05081b] via-[#010030] to-[#010030]">
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      <div className="fixed top-0 left-0 w-full md:hidden z-50">
        <Navbar />
      </div>

      <main className="flex-1 overflow-y-auto h-screen scrollbar-none mt-14 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
}
