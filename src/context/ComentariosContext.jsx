import { createContext, useState } from "react";
import api from "../api/axiosConfig";

export const ComentariosContext = createContext();

export const ComentariosProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getComentariosByEvento = async (eventoId) => {
    if (!eventoId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/comentarios/evento/${eventoId}`);
      setComentarios(res.data);
    } catch (err) {
      console.error("Error al obtener comentarios:", err);
      setError("No se pudieron cargar los comentarios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComentariosContext.Provider
      value={{
        comentarios,
        loading,
        error,
        getComentariosByEvento,
      }}
    >
      {children}
    </ComentariosContext.Provider>
  );
};
