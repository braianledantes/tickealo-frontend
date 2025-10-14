import Input from "../Input/Input";
import { usePerfil } from "../../hooks/usePerfil";
import { useState, useEffect } from "react";
import ProfilePictureUploader from "../Images/ProfilePictureUploader";
import PerfilPassword from "../Perfil/PerfilPassword"

export default function PerfilDetail () {
    const { user } = usePerfil();
    const [modalOpen, setModalOpen] = useState(false);


  const [formData, setFormData] = useState({
    nombre: "",
    cuit: "",
    telefono: "",
    direccion: "",
    username: "",
    email: "",
    imagenPerfil: null
  });

  useEffect(() => {
    if (user) {
        setFormData({
        nombre: user.nombre || "",
        cuit: user.cuit || "",
        telefono: user.telefono || "",
        direccion: user.direccion || "",
        username: user.user?.username || "",
        email: user.user?.email || "",
        password: "",
        imagenPerfil: user.imagenUrl || null
        });
    }
  }, [user]);

    return(
        <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 space-x-8">
            <div>
               <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div >
                        <div className="relative w-32 h-32">
                        {/* Fondo degradado */}
                        <div
                            className="absolute top-0 left-0 rounded-full"
                            style={{
                            width: "100%",
                            height: "100%",
                            background: "conic-gradient(#03055F, #00B4D8, #90E0EF, #CAF0F8, #03055F)",
                            zIndex: 0,
                            }}
                        ></div>

                        {/* Avatar */}
                        <img
                            src={formData.imagenPerfil || "https://via.placeholder.com/128"}
                            alt="Avatar"
                            className="absolute top-1/2 left-1/2 w-30 h-30 rounded-full z-10"
                            style={{ transform: "translate(-50%, -50%)" }}
                        />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <span className="text-xl text-white/30 tracking-wider italic font-bold">
                        # {user?.userId || "Usuario"}
                        </span>
                    </div>
                </div>



                {/* Datos de contacto */}
                <section className="mt-6">
                    <h2 className="text-[#cfe3ff] mb-2 ml-4 font-bold tracking-wider">
                        Datos de Contacto
                    </h2>
                    <div className="border border-[#1b1e5e] p-4 rounded-tl-2xl rounded-tr-2xl">
                        <p className="text-[#7a86b6] mb-2">Correo Electronico</p>
                        <p className="text-white">{user?.user.email}</p>
                    </div>
                    <div className="border border-[#1b1e5e] p-4 rounded-bl-2xl rounded-br-2xl">
                        <p className="text-[#7a86b6] mb-2">Telefono</p>
                        <p className="text-white">{user?.telefono}</p>
                    </div>
                </section>
            </div>

            {/* Datos Personales */}
            <section className="mb-10">
                <h2 className="text-[#cfe3ff] mb-2 ml-4 font-bold tracking-wider">
                    Datos de la Productora
                </h2>

                <div className="border border-[#1b1e5e] p-4 rounded-tl-2xl rounded-tr-2xl flex flex-row gap-4">
                    <div className="flex-1">
                    <p className="text-[#7a86b6] mb-2">Nombre</p>
                    <p className="text-white ">{user?.nombre}</p>
                    </div>
                </div>
                <div className="border border-[#1b1e5e] p-4 flex flex-row gap-4">
                    <div className="flex-1">
                    <p className="text-[#7a86b6] mb-2">CUIT</p>
                    <p className="text-white ">{user?.cuit}</p>
                    </div>
                    <div className="flex-1">
                    <p className="text-[#7a86b6] mb-2">Telefono</p>
                    <p className="text-white ">{user?.telefono}</p>
                    </div>
                </div>
                <div className="border border-[#1b1e5e] p-4 flex flex-row gap-4">
                    <div className="flex-1">
                    <p className="text-[#7a86b6] mb-2">Direccion</p>
                    <p className="text-white ">{user?.direccion}</p>
                    </div>
                </div>

                <div className="border border-[#1b1e5e] bg-[#0b1030] p-4 rounded-bl-2xl rounded-br-2xl cursor-pointer"
                    onClick={() => setModalOpen(true)}
                >
                    <div className="flex justify-between items-center">
                    <span className="text-[#4da6ff] font-bold tracking-wide text-md mt-1">
                        Cambiar contraseña
                    </span>
                    <span className="text-[#4da6ff] text-xl">→</span>
                    </div>
                </div>

                { modalOpen && (
                    <PerfilPassword open={modalOpen} onClose={() => setModalOpen(false)} />
                )}
            </section>
        </div>
    )
}