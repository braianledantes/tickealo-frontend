import React from "react";
import { CreditCard, User } from "lucide-react";

export default function BankCard({ cuenta, onChange, edit = false }) {
  if (!cuenta) {
    return (
      <p className="text-red-500 mt-4">
        No tienes una cuenta bancaria configurada. Configúrala antes de crear eventos.
      </p>
    );
  }

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

  return (
    <div className="relative w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-xl text-white bg-gradient-to-r from-blue-700 to-indigo-800 overflow-hidden mt-6">
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-lg font-semibold tracking-wider">Cuenta Bancaria vinculada</h4>
        <CreditCard className="w-6 h-6 text-white/80" />
      </div>

      {/* Titular */}
      <div className="mb-4">
        <p className="text-sm text-white/70 uppercase">Titular</p>
        {edit ? (
          <input
            className={inputStyle + " text-xl"}
            value={cuenta.nombreTitular}
            onChange={(e) => handleFieldChange("nombreTitular", e.target.value)}
            placeholder="Nombre del titular"
          />
        ) : (
          <p className="text-xl font-bold flex items-center gap-2">
            <User className="w-4 h-4" /> {cuenta.nombreTitular}
          </p>
        )}
      </div>

      {/* Alias, CBU y Banco */}
      <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-white/70 uppercase">Alias</p>
          {edit ? (
            <input
              className={inputStyle + " text-lg"}
              value={cuenta.alias}
              onChange={(e) => handleFieldChange("alias", e.target.value)}
              placeholder="Alias"
            />
          ) : (
            <p className="text-lg font-medium">{cuenta.alias}</p>
          )}
        </div>

        <div>
          <p className="text-sm text-white/70 uppercase">CBU</p>
          {edit ? (
            <input
              className={inputStyle + " text-lg"}
              value={cuenta.cbu}
              onChange={(e) => handleFieldChange("cbu", e.target.value)}
              placeholder="CBU"
            />
          ) : (
            <p className="text-lg font-medium">{cuenta.cbu}</p>
          )}
        </div>

        <div className="flex flex-col justify-end">
          <p className="text-sm text-white/70 uppercase">Banco</p>
          {edit ? (
            <select
              className={inputStyle + " text-lg bg-white/10 rounded-lg p-2"}
              value={cuenta.nombreBanco}
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
          ) : (
            <p className="text-lg font-medium flex items-center gap-2">
              
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


