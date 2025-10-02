import { createContext, useEffect, useState } from "react";
import * as apiAuth from "../api/auth";
import * as apiProductora from "../api/productora";

export const AuthContext = createContext();
export const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Al iniciar la app, chequeamos si hay token
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      setIsAuthenticated(true);
      apiAuth.me(storedToken)
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
        const profile = await apiAuth.me(data.access_token);
        console.log("Perfil obtenido:", profile);
        setUser(profile);
      }
      return data;
    } catch (err) {
      return { error: err.message };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCuentaBancaria(null); // Limpiar cuenta al logout
    localStorage.removeItem(TOKEN_KEY);
  };

  const registrarProductora = async (formData) => {
    try {
      const response = await apiAuth.registerProductora(formData);
      if (!response?.error && formData.get("email") && formData.get("password")) {
        await login({ email: formData.get("email"), password: formData.get("password") });
      }
      return response;
    } catch (err) {
      console.error("Error registrando productora:", err);
      return { error: err.message };
    }
  };
  
  const getEventosByProductora = async () => {
    try {
      const eventosProductora = await apiProductora.getEventosByProductora();
      return eventosProductora;
    } catch (err) {
      console.error("Error obteniendo eventos de productora:", err);
      return [];
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        registrarProductora,
        getEventosByProductora,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
