import { createContext, useState } from "react";
import * as apiCuentaBancaria from "../api/cuentaBancaria";

export const CuentaBancariaContext = createContext();

export function CuentaBancariaProvider({ children }) {
  const [cuentaBancaria, setCuentaBancaria] = useState(null); 
  
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

  return (
    <CuentaBancariaContext.Provider
      value={{
        cuentaBancaria,
        crearCuentaBancaria,
        getCuentasBancarias,
        actualizarCuentaBancaria,
        eliminarCuentaBancaria,
      }}
    >
      {children}
    </CuentaBancariaContext.Provider>
  );
}
