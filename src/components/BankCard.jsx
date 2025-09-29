import { CreditCard, User } from "lucide-react";

export default function BankCard({ cuenta = {}, onChange, edit = true, errores = {} }) {
  const bancos = [
    { name: "Banco Nación" },
    { name: "Santander" },
    { name: "Galicia" },
    { name: "BBVA" },
  ];

  const handleFieldChange = (field, value) => {
    if (!edit) return;
    onChange?.({ ...cuenta, [field]: value });
  };

  const inputStyle =
    "bg-transparent w-full outline-none text-white font-medium placeholder-white/50";

  const errorStyle = "text-red-500 text-sm mt-1";

  return (
    <div
      className="relative w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-xl text-white overflow-hidden mt-6"
      style={{
        background: "linear-gradient(135deg, #03055F 0%, #03055F 20%, #00B4D8 100%)",
      }}
    >
      {/* Titular */}
      <div className="mb-6 flex items-center justify-between">
        <div className="w-full">
          <p className="text-sm text-white/70 uppercase mb-1">Titular</p>
          <input
            className={inputStyle + " text-xl w-full"}
            value={cuenta?.nombreTitular || ""}
            onChange={(e) => handleFieldChange("nombreTitular", e.target.value)}
            placeholder="Nombre del titular"
          />
          {errores.nombreTitular && <p className={errorStyle}>{errores.nombreTitular}</p>}
        </div>
        <CreditCard className="w-6 h-6 text-white/80 ml-4" />
      </div>

      {/* CBU */}
      <div className="mb-4">
        <p className="text-sm text-white/70 uppercase mb-1">CBU</p>
        <input
          className={inputStyle + " text-lg w-full"}
          value={cuenta?.cbu || ""}
          onChange={(e) => handleFieldChange("cbu", e.target.value)}
          placeholder="CBU"
        />
        {errores.cbu && <p className={errorStyle}>{errores.cbu}</p>}
      </div>

      {/* Alias y Banco */}
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-white/70 uppercase mb-1">Alias</p>
          <input
            className={inputStyle + " text-lg w-full"}
            value={cuenta?.alias || ""}
            onChange={(e) => handleFieldChange("alias", e.target.value)}
            placeholder="---"
          />
          {errores.alias && <p className={errorStyle}>{errores.alias}</p>}
        </div>

        <div>
          <p className="text-sm text-white/70 uppercase mb-1">Banco</p>
          <select
            className={inputStyle + " text-lg bg-white/10 rounded-lg p-2 w-full"}
            value={cuenta?.nombreBanco || ""}
            onChange={(e) => handleFieldChange("nombreBanco", e.target.value)}
          >
            <option value="" disabled>
              Selecciona un banco
            </option>
            {bancos.map((banco) => (
              <option key={banco.name} value={banco.name}>
                {banco.name}
              </option>
            ))}
          </select>
          {errores.nombreBanco && <p className={errorStyle}>{errores.nombreBanco}</p>}
        </div>
      </div>
    </div>
  );
}

