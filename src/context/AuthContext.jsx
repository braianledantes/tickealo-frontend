import { createContext, useEffect, useState } from "react";
import * as apiAuth from "../api/auth";
import * as apiEventos from "../api/eventos";
import * as apiCuentaBancaria from "../api/cuentaBancaria";

export const AuthContext = createContext();

export const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) setIsAuthenticated(true);
  }, []);

  const login = async (credentials) => {
    const data = await apiAuth.login(credentials);
    setIsAuthenticated(true);
    localStorage.setItem(TOKEN_KEY, data.access_token);
    return data;
    // Lógica para iniciar sesión OJO
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN_KEY)
  };

  const registrarProductora = async (data) => {
    const res = await apiAuth.registerProductora(data);
    
    return res;
  }

  const crearEvento = async (formData) => {
    try {
      const res = await apiEventos.crearEvento(formData);
      return res;
    } catch (err) {
      console.error("Error creando evento:", err);
      return { error: err.message };
    }
  };

  const subirImagenEvento = async (eventoId, formDataImages) => {
    try {
      const res = await apiEventos.subirImagenEvento(eventoId, formDataImages);
      return res;
    } catch (err) {
      console.error("Error subiendo imágenes:", err);
      return { error: err.message };
    }
  };

  const crearCuentaBancaria = async (data) => {
    try {
      const res = await apiCuentaBancaria.crearCuentaBancaria(data);
      return res;
    } catch (err) {
      console.error("Error creando cuenta bancaria:", err);
      return { error: err.message };
    }
  };

    const getCuentasBancarias = async () => {
    try {
      const res = await apiCuentaBancaria.getCuentasBancarias();
      return res;
    } catch (err) {
      console.error("Error obteniendo cuentas bancarias:", err);
      return [];
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, registrarProductora, crearEvento, subirImagenEvento, crearCuentaBancaria, getCuentasBancarias, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );

}
