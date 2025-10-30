import { usePerfil } from "../../hooks/usePerfil";
import { useState } from "react";
import SecondaryButton from "../Button/SecondaryButton";
import { X } from "lucide-react";
import Dropdown from "../Button/Dropdown";
import InputNumber from "../Input/InputNumber";
import { useCountry } from "../../hooks/useCountry"; // importamos el hook de context

export default function PerfilCountry({ open, onClose }) {
  const { actualizarPerfil } = usePerfil();
  const { countries, getCountryDetails } = useCountry(); // obtenemos countries y la función para detalles

  const [pais, setPais] = useState("");
  const [prefix, setPrefix] = useState(""); 
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pais: "",
    telefono: "",
  });
  const [error, setError] = useState("");

  const countryOptions = countries.map(c => ({
    label: c.name,  // lo que se muestra
    value: c.name,  // lo que se envía al backend
    iso: c.isoCode  // solo para cálculo del prefijo
  }));

  if (!open) return null;

  const handleCountryChange = async (selectedName) => {
    setPais(selectedName);
    setFormData(prev => ({ ...prev, pais: selectedName }));
    try {
      const country = countryOptions.find(c => c.label === selectedName);
      if (country?.iso) {
        const details = await getCountryDetails(country.iso);
        setPrefix(details?.sPhoneCode || '');
      } else {
        setPrefix('');
      }
    } catch (err) {
      console.error('Error obteniendo prefijo del país:', err);
      setPrefix('');
    }
  };

  const handleTelefonoChange = (val) => {
    setFormData(prev => ({ ...prev, telefono: val }));
    setError("");
  };

  const handleActualizarCountry = async () => {
    setLoading(true);
    if (!formData.pais || !formData.telefono) {
      setError("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    const payload = new FormData();
    payload.append("pais", formData.pais);
    payload.append("telefono", formData.telefono);

    try {
      await actualizarPerfil(payload);
      window.location.reload();
      setLoading(false);
    } catch (err) {
      console.error("Error al actualizar los datos:", err);
      setError("Hubo un error al actualizar la información.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-[#0b1030] p-6 rounded-2xl w-120">
        <div className="grid grid-cols-2 items-center">
          <h2 className="text-white text-lg font-bold mb-4">
            Cambiar Nacionalidad
          </h2>
          <div className="text-right">
            <button
              className="text-white text-xl font-bold cursor-pointer"
              onClick={onClose}
            >
              <X />
            </button>
          </div>
        </div>

        <div className="mt-2 mx-auto space-y-4">
          <p className="text-[#999] text-center mb-4">
            Al modificar tu país, conectamos tus eventos con el público más cercano a ti.
          </p>

          <Dropdown
            options={countryOptions}
            value={pais}
            onChange={handleCountryChange}
            placeholder="Seleccioná tu nacionalidad"
            error={touched && !pais ? "Seleccioná un país" : ""}
            showError={touched}
          />

          <InputNumber
            placeholder="Teléfono"
            value={formData.telefono}
            onChangeValue={handleTelefonoChange}
            prefix={prefix}
          />
        </div>

        <div className="mt-6">
          <SecondaryButton
            text={loading ? '...Actualizando' : 'Actualizar Nacionalidad'}
            onClick={handleActualizarCountry}
          />
          {error && (
            <p className="text-red-500 text-sm mt-3 text-center font-semibold">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
