import React, { createContext, useState, useEffect } from "react";
import { login as loginApi } from "../api/auth";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token);
    return data;
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token")
  };

  const isAuthenticated = !!token;

  return (
    <AppContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}
