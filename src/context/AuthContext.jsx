import { createContext, useEffect, useState } from "react";
import * as apiAuth from "../api/auth";
import * as apiEventos from "../api/eventos";
import * as apiCuentaBancaria from "../api/cuentaBancaria";

export const AuthContext = createContext();

export const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setIsAuthenticated(true);
      // 🔹 Pedimos el perfil al backend
      apiAuth.me()
        .then((data) => setUser(data))
        .catch(() => {
          setIsAuthenticated(false);
          setUser(null);
          localStorage.removeItem(TOKEN_KEY);
        });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await apiAuth.login(credentials);
      if (data?.access_token) {
        localStorage.setItem(TOKEN_KEY, data.access_token);
        setIsAuthenticated(true);
        // 🔹 Traemos el perfil apenas loguea
        const profile = await apiAuth.me();
        setUser(profile);
      }
      return data;
    } catch (err) {
      console.error("Error en login:", err);
      return { error: err.message };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  const registrarProductora = async (data) => {
    return await apiAuth.registerProductora(data);
  };

  const crearEvento = async (formData) => {
    try {
      return await apiEventos.crearEvento(formData);
    } catch (err) {
      console.error("Error creando evento:", err);
      return { error: err.message };
    }
  };

  const subirImagenEvento = async (eventoId, formDataImages) => {
    try {
      return await apiEventos.subirImagenEvento(eventoId, formDataImages);
    } catch (err) {
      console.error("Error subiendo imágenes:", err);
      return { error: err.message };
    }
  };

  const crearCuentaBancaria = async (data) => {
    try {
      return await apiCuentaBancaria.crearCuentaBancaria(data);
    } catch (err) {
      console.error("Error creando cuenta bancaria:", err);
      return { error: err.message };
    }
  };

  const getCuentasBancarias = async () => {
    try {
      return await apiCuentaBancaria.getCuentasBancarias();
    } catch (err) {
      console.error("Error obteniendo cuentas bancarias:", err);
      return [];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        registrarProductora,
        crearEvento,
        subirImagenEvento,
        crearCuentaBancaria,
        getCuentasBancarias,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}