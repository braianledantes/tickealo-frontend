import Input from "../Input/Input";
import { usePerfil } from "../../hooks/usePerfil";
import { useState, useEffect } from "react";
import ProfilePictureUploader from "../Images/ProfilePictureUploader";
import SecondaryButton from "../Button/SecondaryButton";

export default function PerfilModified () {
    const { user, actualizarPerfil } = usePerfil();

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
        imagenPerfil: user.imagenUrl || null
        });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const getPreviewSrc = (fileOrUrl) => {
    if (!fileOrUrl) return null;
    return fileOrUrl instanceof File ? URL.createObjectURL(fileOrUrl) : fileOrUrl;
  };
 
  const handleActualizarPerfil = async (updateDataForm) => {
    const payload = new FormData();
    payload.append("nombre", updateDataForm.nombre || "");
    payload.append("cuit", updateDataForm.cuit || "")
    payload.append("telefono", updateDataForm.telefono || "");
    payload.append("direccion", updateDataForm.direccion || "");
    payload.append("username", updateDataForm.username || "");
    payload.append("email", updateDataForm.email || "");
    if (updateDataForm.password) {
      payload.append("password", updateDataForm.password);
    }
    if (updateDataForm.imagenPerfil instanceof File) {
      payload.append("imagenPerfil", updateDataForm.imagenPerfil);
    }

    await actualizarPerfil(payload);

    window.location.reload();
  };

    return(
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 space-y-4 space-x-8">
                <div className="max-h-xl justify-top">
                    <ProfilePictureUploader
                        label="Imagen de Perfil (opcional)"
                        value={getPreviewSrc(formData.imagenPerfil)}
                        onFileSelect={(file) => handleChange("imagenPerfil", file)}
                    />

                    <div className="pt-10 space-y-5">
                        <h2 className="text-white/40 font-sm tracking-wide ml-3">Información Personal.</h2>
                        <Input
                        label="Nombre de Usuario"
                        type="text"
                        value={formData.username}
                        error={!formData.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                        />
                        <Input
                        label="Email"
                        type="email"
                        value={formData.email}
                        error={!formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>
                </div>

        
                <div className="space-y-5">
                    <Input
                    label="Nombre de la Productora"
                    type="text"
                    value={formData.nombre}
                    error={!formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Input
                        label="CUIT"
                        type="text"
                        value={formData.cuit}
                        error={!formData.cuit}
                        onChange={(e) => handleChange("cuit", e.target.value)}
                    />
                    <Input
                        label="Teléfono"
                        type="text"
                        value={formData.telefono}
                        error={!formData.telefono}
                        onChange={(e) => handleChange("telefono", e.target.value)}
                    />
                    </div>

                    <Input
                    label="Direccion"
                    type="text"
                    value={formData.direccion}
                    error={!formData.direccion}
                    onChange={(e) => handleChange("direccion", e.target.value)}
                    />
                </div>
            </div>
            
            <div className="relative pb-13">
                <div className="absolute right-2">
                <SecondaryButton text="Actualizar datos" onClick={() => handleActualizarPerfil(formData)} />
                </div>
            </div>
        </div>
    )
}