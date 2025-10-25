import { createContext, useState } from "react";
import * as apiComentarios from "../api/comentarios";

export const ComentariosContext = createContext();

export const ComentariosProvider = ({ children }) => {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getComentariosByEvento = async (eventoId) => {
    if (!eventoId) return [];
    setLoading(true);
    setError(null);
      try {
        const res = await apiComentarios.getComentariosByEvento(eventoId);
        setComentarios(res || []);
        return res || [];
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
        setError("No se pudieron cargar los comentarios.");
        return [];
      } finally {
        setLoading(false);
      }
  };

  const subirComentario = async (eventoId, data) => {
    if (!eventoId) return [];
    setLoading(true);
    setError(null);
      try {
        const res = await apiComentarios.postComentario(eventoId, data);
        return res || [];
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
        setError("No se pudieron cargar los comentarios.");
        return [];
      } finally {
        setLoading(false);
      }
  };
  const editarComentario = async (comentarioId, data) => {
    setLoading(true);
    setError(null);
      try {
        const res = await apiComentarios.patchComentario(comentarioId, data);
        return res;
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
        setError("No se pudieron cargar los comentarios.");
      } finally {
        setLoading(false);
      }
  };

  const fijarComentario = async (comentarioId) => {
    setLoading(true);
    setError(null);
      try {
        const res = await apiComentarios.patchFijar(comentarioId);
        return res;
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
        setError("No se pudieron cargar los comentarios.");
      } finally {
        setLoading(false);
      }
  };

  const desfijarComentario = async (comentarioId) => {
    setLoading(true);
    setError(null);
      try {
        const res = await apiComentarios.patchDesfijar(comentarioId);
        return res;
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
        setError("No se pudieron cargar los comentarios.");
      } finally {
        setLoading(false);
      }
  };

  const eliminarComentario = async (comentarioId) => {
    setLoading(true);
    setError(null);
      try {
        const res = await apiComentarios.deleteComentario(comentarioId);
        return res;
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
        subirComentario,
        fijarComentario,
        desfijarComentario,
        eliminarComentario,
        editarComentario
      }}
    >
      {children}
    </ComentariosContext.Provider>
  );
};
