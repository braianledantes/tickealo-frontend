import { createContext, useEffect, useState } from "react";
import * as apiAuth from "../api/auth";

export const AuthContext = createContext();
const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al iniciar la app, chequeamos si hay token
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      apiAuth.me(storedToken)
        .then((data) => setUser(data))
        .catch(() => {
          setUser(null);
          localStorage.removeItem(TOKEN_KEY);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials) => {
    try {
      const data = await apiAuth.login(credentials);
      if (data?.access_token) {
        localStorage.setItem(TOKEN_KEY, data.access_token);
        const profile = await apiAuth.me(data.access_token);
        setUser(profile);
      }
      return data;
    } catch (err) {
      return { error: err.message };
    }
  };

  const logout = () => {
    setUser(null);
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

  const actualizarPerfilProductora = async ( updateFormData ) => {
    try {
      const response = await apiAuth.actualizarPerfilProductora( updateFormData);
      return response;
    } catch (err) {
      console.error("Error actualizando el perfil de la productora", err);
      return {error: err.message};
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        registrarProductora,
        actualizarPerfilProductora,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
