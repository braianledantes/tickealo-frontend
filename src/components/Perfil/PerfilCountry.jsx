import { usePerfil } from "../../hooks/usePerfil";
import { useState, useEffect } from "react";
import SecondaryButton from "../Button/SecondaryButton";
import { X } from "lucide-react";
import Dropdown from "../Button/Dropdown";
import InputNumber from "../Input/InputNumber";
import { getCountryByIso, getCountries } from "../../api/countries";

export default function PerfilCountry({ open, onClose }) {
  const { user, actualizarPerfil } = usePerfil();

  const [paisSeleccionado, setPaisSeleccionado] = useState(user?.user?.pais || "");

  const [prefix, setPhonePrefix] = useState("");
  const [options, setOptions] = useState([]);
  const [touched, setTouched] = useState(false);

  const [formData, setFormData] = useState({
    pais: "",
    telefono: "",
  });

  const [error, setError] = useState("");

  // Cargar lista de países y setear valor inicial del usuario
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await getCountries();
        const countries = response.countries.map((c) => ({
          label: c.name,
          value: c.code || c.iso || c.name,
        }));
        setOptions(countries);

        // Si hay usuario, buscar el país correspondiente en options
        if (user?.user?.pais) {
          const selected = countries.find(
            (c) => c.label === user.user.pais || c.value === user.user.pais
          );
          if (selected) {
            setPaisSeleccionado(selected.value);
            setFormData({
              pais: selected.label,
              telefono: user.user.telefono || "",
            });
          }
        }
      } catch (err) {
        console.error("Error cargando países:", err);
      }
    };

    fetchCountries();
  }, [user]);

  // Cargar prefijo cuando cambia el país seleccionado
  useEffect(() => {
    if (!paisSeleccionado) return;

    const fetchCountryData = async () => {
      try {
        const data = await getCountryByIso(paisSeleccionado);
        setPhonePrefix(data.sPhoneCode || "");
      } catch (error) {
        console.error("Error cargando datos del país:", error);
      }
    };

    fetchCountryData();
  }, [paisSeleccionado]);

  if (!open) return null;

  const handleCountryChange = (val) => {
    setPaisSeleccionado(val);
    const selected = options.find((c) => c.value === val);
    setFormData((prev) => ({
      ...prev,
      pais: selected?.label || val,
    }));
    setTouched(true);
    setError("");
  };

  const handleActualizarCountry = async () => {
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
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
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
            Al modificar tu país, conectamos tus eventos con el público más cercano a ti para que más gente pueda disfrutarlos.
          </p>

          <Dropdown
            options={options}
            value={paisSeleccionado}
            onChange={handleCountryChange}
            placeholder="Seleccioná un país"
            error={touched && !paisSeleccionado ? "Seleccioná un país" : ""}
            showError={touched}
          />

          <InputNumber
            placeholder="Teléfono"
            value={formData.telefono}
            onChangeValue={(val) => {
              setFormData({ ...formData, telefono: val });
              setError("");
            }}
            prefix={prefix}
          />
        </div>

        <div className="mt-6">
          <SecondaryButton
            text="Actualizar Información"
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
