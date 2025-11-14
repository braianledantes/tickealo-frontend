import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimerPaso from "../../components/Pasos/PrimerPaso";
import ProgressBar from "../../components/Pasos/ProgressBar";
import SegundoPaso from "../../components/Pasos/SegundoPaso";
import TercerPaso from "../../components/Pasos/TercerPaso";
import { useEventosList } from "../../hooks/useEventosList";
import ErrorModal from "../../components/Modal/ErrorModal";

export default function CrearEvento() {
  const { crearEvento, puedeCrearEvento } = useEventosList();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [creating, setCreating] = useState(false); // 🔹 Nuevo estado

  useEffect(() => {
    puedeCrearEvento()
      .then((puede) => {
        if (!puede) {
          // navigate("/dashboard/cobros");
        }
      })
      .catch((err) => {
        console.error("Error verificando si puede crear evento:", err);
        // navigate("/dashboard/cobros");
      });
  }, []);

  // Avanzar de paso
  const handleNext = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  // Retroceder de paso
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // ✅ Submit final con loading y redirección
  const handleSubmit = async (finalStepData) => {
    const finalData = { ...formData, ...finalStepData };

    const evento = {
      nombre: finalData.nombre,
      descripcion: finalData.descripcion,
      inicioAt: new Date(finalData.inicioAt).toISOString(),
      finAt: new Date(finalData.finAt).toISOString(),
      cancelado: finalData.cancelado ?? false,
      lugar: finalData.lugar,
      entradas: finalData.entradas,
    };

    try {
      setCreating(true); // 🔹 mostrar loading (se usa en TercerPaso)
      const created = await crearEvento(
        evento,
        finalData.banner,
        finalData.portada
      );

      if (created.error) {
        console.error("Error creando evento:", created.error);
       <ErrorModal title="Error" error={created.error}/>
        return;
      }

      // 🔹 Esperar un poco para que el usuario vea el spinner (opcional)
      setTimeout(() => navigate("/dashboard/eventos"), 200);
    } catch (error) {
      console.error("Error en handleSubmit:", error);
      alert("Error inesperado al crear el evento.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="flex-1 p-6 h-screen overflow-y-auto scrollbar-none relative">
      <h2 className="text-3xl font-bold text-white mb-6 px-4 pt-5">Nuevo evento</h2>
      <ProgressBar />

      {currentStep === 1 && (
        <PrimerPaso onNext={handleNext} initialData={formData} />
      )}

      {currentStep === 2 && (
        <SegundoPaso
          onNext={handleNext}
          onBack={handleBack}
          initialData={formData}
        />
      )}

      {currentStep === 3 && (
        <TercerPaso
          onBack={handleBack}
          onSubmit={handleSubmit}
          initialData={formData}
          loading={creating}
        />
      )}
    </main>
  );
}
