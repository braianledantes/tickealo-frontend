import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#05081b] via-[#010030] via-[#00033d] to-[#010030]">
      <Sidebar />
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
}