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
    if (!eventoId) return null;
    setLoading(true);
    setError(null);
    try {
      const res = await apiComentarios.postComentario(eventoId, data);
      if (res) {
        setComentarios(prev => [res, ...prev]);
      }
      return res;
    } catch (err) {
      console.error("Error al subir comentario:", err);
      setError("No se pudo subir el comentario.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editarComentario = async (comentarioId, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiComentarios.patchComentario(comentarioId, data);
      if (res) {
        setComentarios(prev =>
          prev.map(c => (c.id === comentarioId ? { ...c, ...res } : c))
        );
      }
      return res;
    } catch (err) {
      console.error("Error al editar comentario:", err);
      setError("No se pudo editar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  const fijarComentario = async (comentarioId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiComentarios.patchFijar(comentarioId);
      if (res?.success) {
        setComentarios(prev =>
          prev.map(c => (c.id === comentarioId ? { ...c, fijado: true } : c))
        );
      }
      return res;
    } catch (err) {
      console.error("Error al fijar comentario:", err);
      setError("No se pudo fijar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  const desfijarComentario = async (comentarioId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiComentarios.patchDesfijar(comentarioId);
      if (res?.success) {
        setComentarios(prev =>
          prev.map(c => (c.id === comentarioId ? { ...c, fijado: false } : c))
        );
      }
      return res;
    } catch (err) {
      console.error("Error al desfijar comentario:", err);
      setError("No se pudo desfijar el comentario.");
    } finally {
      setLoading(false);
    }
  };

  const eliminarComentario = async (comentarioId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiComentarios.deleteComentario(comentarioId);
      if (res?.success) {
        setComentarios(prev => prev.filter(c => c.id !== comentarioId));
      }
      return res;
    } catch (err) {
      console.error("Error al eliminar comentario:", err);
      setError("No se pudo eliminar el comentario.");
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
        editarComentario,
        fijarComentario,
        desfijarComentario,
        eliminarComentario,
      }}
    >
      {children}
    </ComentariosContext.Provider>
  );
};
