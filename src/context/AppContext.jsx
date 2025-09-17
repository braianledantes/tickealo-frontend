import React, { createContext, useState, useEffect } from "react";
import { login as loginApi } from "../api/auth";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setIsAuthenticated(true);
  }, []);

  const login = async (credentials) => {
    const data = await loginApi(credentials);
    setIsAuthenticated(true);
    localStorage.setItem("token", data.access_token);
    return data;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token")
  };


  return (
    <AppContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
}
