import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LocationEventSelector from "../../components/LocationEventSelector/LocationEventSelector";

export default function NuevoEvento() {
  const navigate = useNavigate();

  const handleLocationSelect = (location) => {
    console.log("Selected location:", location);
    // Aquí puedes manejar la ubicación seleccionada (por ejemplo, guardarla en el estado del formulario)
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#010030] via-[#00033d] to-[#160078]">
      <Sidebar />
      <main className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-white mb-6">Nuevo evento</h2>

        <div className="mb-4 w-full h-96">
          <LocationEventSelector onLocationSelect={handleLocationSelect} />
        </div>
      </main>
    </div>
  );
}