export default function ClienteList({ cliente, onSelect }) {
  const imagen = cliente.imagenPerfilUrl || cliente.user?.imagenPerfilUrl;
  const nombre = cliente.nombre || cliente.user?.username || "";
  const apellido = cliente.apellido || "";
  const email = cliente.user?.email || "Sin email";

  const inicial = nombre.charAt(0).toUpperCase() || "U";

  return (
    //datos de los clientes encontrados
    <div
      onClick={onSelect}
      className="flex items-center gap-4 bg-white/5 p-3 rounded-xl cursor-pointer hover:bg-white/10 transition"
    >
      {imagen ? (
        <img
          src={imagen}
          alt={nombre}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        //si el usuario no tiene imagen, inicial por defecto
        <div className="w-12 h-12 rounded-full bg-[#00B4D8] flex items-center justify-center text-white font-bold">
          {inicial}
        </div>
      )}

      <div>
        <p className="text-white text-lg font-semibold">
          {nombre} {apellido}
        </p>
        <p className="text-gray-400 text-sm">{email}</p>
      </div>
    </div>
  );
}
