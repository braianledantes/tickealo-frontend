import { createContext, useEffect, useState } from "react";
import * as apiAuth from "../api/auth";

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


  return (
    <AuthContext.Provider value={{ login, logout, registrarProductora,  isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );

}
