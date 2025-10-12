import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimerPaso from "../../components/Pasos/PrimerPaso";
import ProgressBar from "../../components/Pasos/ProgressBar";
import SegundoPaso from "../../components/Pasos/SegundoPaso";
import TercerPaso from "../../components/Pasos/TercerPaso";
import { useEventosList } from "../../hooks/useEventosList";


export default function CrearEvento() {
  const { crearEvento, loading, error, puedeCrearEvento } = useEventosList();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});


  useEffect(() => {
    puedeCrearEvento()
      .then((puede) => {
        if (!puede) {
          //  navigate("/dashboard/cobros"); // redirige si no puede crear evento
        }
      })
      .catch((err) => {
        console.error("Error verificando si puede crear evento:", err);
        // navigate("/dashboard/cobros"); // redirige en caso de error
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

  // Submit final
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

    const created = await crearEvento(evento, finalData.banner, finalData.portada);
    if (created.error) {
      console.error("Error creando evento:", created.error);
      return;
    }

    navigate("/dashboard/eventos");
  };

  // Render normal si tiene cuenta bancaria
  return (
    <main className="flex-1 p-6 h-screen overflow-y-auto scrollbar-none">
      <h2 className="text-3xl font-bold text-white mb-6">Nuevo evento </h2>
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
          loading={loading}
        />
      )}
    </main>
  );
}
