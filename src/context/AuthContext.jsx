import { createContext, useEffect, useState } from "react";
import * as apiAuth from "../api/auth";
import * as apiEventos from "../api/eventos";
import * as apiCuentaBancaria from "../api/cuentaBancaria";
import * as apiProductora from "../api/productora";

export const AuthContext = createContext();
export const TOKEN_KEY = "token";

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [cuentaBancaria, setCuentaBancaria] = useState(null); 

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

  const getEventos = async () => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("No hay token disponible");
      return await apiEventos.getEventos(token);
    } catch (err) {
      console.error("Error obteniendo eventos:", err);
      return [];
    }
  };

  // Cuentas bancarias
  const crearCuentaBancaria = async (data) => {
    try {
      const res = await apiCuentaBancaria.crearCuentaBancaria(data);
      setCuentaBancaria(res);
      return res;
    } catch (err) {
      console.error("Error creando cuenta bancaria:", err);
      return { error: err.message };
    }
  };

  const getCuentasBancarias = async () => {
    try {
      const data = await apiCuentaBancaria.getCuentasBancarias();
      setCuentaBancaria(data);
      return data;
    } catch (err) {
      // Si es 404, devolvemos null en vez de tirar error feo
      if (err.response?.status === 404) {
        setCuentaBancaria(null);
        return null;
      }
      console.error("Error obteniendo cuentas bancarias:", err);
      return null;
    }
  };

  const actualizarCuentaBancaria = async (data) => {
    try {
      const res = await apiCuentaBancaria.actualizarCuentaBancaria(data);
      setCuentaBancaria(res);
      return res;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const eliminarCuentaBancaria = async () => {
    try {
      await apiCuentaBancaria.eliminarCuentaBancaria();
      setCuentaBancaria(null);
    } catch (err) {
      console.error(err);
    }
  };

  const getMiembrosEquipo = async () => {
    const token = localStorage.getItem("TOKEN_KEY");
    try {
      const miembros = await apiProductora.getEquipo(token);
      return miembros;
    } catch (error) {
      console.error("Error obteniendo miembros del equipo:", error);
      return [];
    }
  };

  const agregarMiembroEquipo = async (email) => {
    const token = localStorage.getItem(TOKEN_KEY); 
    try {
      const response = await apiProductora.agregarValidador(email, token);
      return response;
    } catch (err) {
      console.error("Error agregando validador:", err.message);
      return { error: err.message };
    }
  };

  const eliminarMiembroEquipo = async (email) => {
    const token = localStorage.getItem(TOKEN_KEY); 
    try {
      const response = await apiProductora.eliminarValidador(email, token);
      return response;
    } catch (err) {
      console.error("Error eliminando validador:", err.message);
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
        crearEvento,
        subirImagenEvento,
        getEventos,
        cuentaBancaria,
        crearCuentaBancaria,
        getCuentasBancarias,
        actualizarCuentaBancaria,
        eliminarCuentaBancaria,
        getMiembrosEquipo,
        agregarMiembroEquipo,
        eliminarMiembroEquipo,
        getEventosByProductora,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
