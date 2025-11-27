import Dropdown from "../components/Button/Dropdown";

export default function BankCard({
  cuenta = {},
  onChange,
  edit = true,
  label,
}) {
  const bancos = [
    { name: "Mercado Pago"},
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

  const inputStyleDropdown =
    "bg-[#03055] w-full outline-none text-white font-medium placeholder-[ #00B4D8]";

  const displayValue = (value) => value || "---";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}

      <div
        className="relative w-full max-w-4xl mx-auto p-6 rounded-2xl shadow-xl text-white"
        // style={{
        //   background:
        //     "linear-gradient(135deg, #03055F 0%, #03055F 20%, #00B4D8 100%)",
        // }}
      >
        {/* Titular */}
        <div className="mb-6 flex items-center justify-between">
          <div className="w-full">
            <p className="text-sm text-[#CAF0F8] uppercase mb-1">Titular</p>
            {edit ? (
              <input
                className={inputStyle + " text-xl w-full"}
                value={cuenta?.nombreTitular || ""}
                onChange={(e) =>
                  handleFieldChange("nombreTitular", e.target.value)
                }
                placeholder="Nombre del titular"
              />
            ) : (
              <p className="text-xl text-white">
                {displayValue(cuenta?.nombreTitular)}
              </p>
            )}
          </div>
        </div>

        {/* CBU */}
        <div className="mb-4">
          <p className="text-sm text-[#CAF0F8] uppercase mb-1">CBU</p>
          {edit ? (
            <input
              className={inputStyle + " text-lg w-full"}
              value={cuenta?.cbu || ""}
              onChange={(e) => handleFieldChange("cbu", e.target.value)}
              placeholder="CBU"
              maxLength={22}
            />
          ) : (
            <p className="text-lg text-white">{displayValue(cuenta?.cbu)}</p>
          )}
        </div>

        {/* Alias y Banco */}
        <div className="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-[#CAF0F8]uppercase mb-1">Alias</p>
            {edit ? (
              <input
                className={inputStyle + " text-lg w-full"}
                value={cuenta?.alias || ""}
                onChange={(e) => handleFieldChange("alias", e.target.value)}
                placeholder="---"
              />
            ) : (
              <p className="text-lg text-white">
                {displayValue(cuenta?.alias)}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm text-[#CAF0F8] uppercase mb-1">Banco</p>
            {edit ? (
              <Dropdown
                value={cuenta?.nombreBanco || ""}
                onChange={(value) => handleFieldChange("nombreBanco", value)}
                options={bancos.map((banco) => ({
                  value: banco.name,
                  label: banco.name,
                }))}
                placeholder="Selecciona un banco"
                textSize="text-lg"
                className="rounded-lg"
              />
            ) : (
              <Dropdown
                value={cuenta?.nombreBanco}
                readOnly
                textSize="text-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
