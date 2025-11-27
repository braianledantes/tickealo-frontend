import Avatar from "../Avatar";

export default function ClienteList({ cliente, onSelect }) {
  const imagen = cliente.imagenPerfilUrl || cliente.user?.imagenPerfilUrl;
  const nombre = cliente.nombre || cliente.user?.username || "";
  const apellido = cliente.apellido || "";
  const email = cliente.user?.email || "Sin email";

  return (
    //datos de los clientes encontrados
    <div
      onClick={onSelect}
      className="flex items-center gap-4 bg-white/5 p-3 rounded-full cursor-pointer hover:bg-white/10 transition"
    >
      <Avatar src={imagen} name={nombre} size={12} />

      <div>
        <p className="text-white text-xl font-semibold">{nombre}{""}{apellido}</p>
        <p className="hidden lg:block text-gray-400 text-sm">
          {email}
        </p>
      </div>
    </div>
  );
}
