export function EstadoCompra({
  estadoCompra,
  className = "",
  punto = "w-2 h-2 mr-2 rounded-full",
}) {
  const estadoColor = {
    INICIADA: "bg-gray-500/30 border-1 border-gray-500 text-white px-2 py-1 rounded-lg",
    PENDIENTE: "bg-gray-500/30 border-1 border-gray-500 text-white px-2 py-1 rounded-lg",
    ACEPTADA: "bg-green-500/30 border-1 border-green-500 text-white px-2 py-1 rounded-lg",
    RECHAZADA: "bg-red-500/30 border-1 border-red-500 text-white px-2 py-1 rounded-lg",
  };

  const puntoColor = {
    INICIADA: "bg-gray-500",
    PENDIENTE: "bg-gray-500",
    ACEPTADA: "bg-green-500",
    RECHAZADA: "bg-red-500",
  };

  return (
    <div className={`${estadoColor[estadoCompra]} ${className}`}>
      <span className={`${punto} ${puntoColor[estadoCompra]}`}></span>
      {estadoCompra}
    </div>
  );
}


// export function EstadoEvento ( estadoEvento ) {
//     return (
//         null
//     )
// }