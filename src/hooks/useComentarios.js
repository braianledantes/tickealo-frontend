import { useContext } from "react";
import { ComentariosContext } from "../context/ComentariosContext";

export const useComentarios = () => {
  const context = useContext(ComentariosContext);

  if (!context) {
    throw new Error("useComentarios must be used within a ComentariosProvider");
  }

  return context;
};
