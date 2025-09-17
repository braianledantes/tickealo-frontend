import { createContext, useEffect, useState } from "react";
import { login as loginApi } from "../api/auth";

export const AuthContext = createContext();

export const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) setIsAuthenticated(true);
  }, []);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    setIsAuthenticated(true);
    localStorage.setItem(TOKEN_KEY, data.access_token);
    return data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN_KEY)
  };


  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
