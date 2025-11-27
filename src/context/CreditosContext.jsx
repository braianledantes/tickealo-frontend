import { createContext, useEffect, useState } from "react";
import * as mercadopagoapi from "../api/mercadopago";
import * as creditosapi from "../api/creditos";
import * as authApi from "../api/auth";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { useAuth } from "../hooks/useAuth";

const apiCreditos = {
  async getSaldo() {
    const productora = await authApi.me();
    return productora.creditosDisponibles;
  },

  async getPacks() {
    // Simulación de packs de créditos
    return [
      { id: "1", cantidad: 100, precioARS: 1500 },
      { id: "2", cantidad: 250, precioARS: 3500 },
      { id: "3", cantidad: 500, precioARS: 6500 },
      { id: "4", cantidad: 1000, precioARS: 12000 },
    ];
  },

  async getHistorialCompras() {
    const response = await creditosapi.getHistorialCreditos();
    return response.data.historialCreditos;
  },
}

export const CreditosContext = createContext();

export function CreditosProvider({ children }) {
  initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY);

  const [error, setError] = useState(null);
  const [packs, setPacks] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [historialCompras, setHistorialCompras] = useState([]);
  const { user }  = useAuth();

  useEffect(() => {
    if(!user) return;
    const cargarDatos = async () => {
      try {
        setError(null);
        const [saldoData, packsData, historialCompras] = await Promise.all([
          apiCreditos.getSaldo(),
          apiCreditos.getPacks(),
          apiCreditos.getHistorialCompras(),
        ]);
        setSaldo(saldoData);
        setPacks(packsData);
        setHistorialCompras(historialCompras);
      } catch (error) {
        setError(error);
      }
    };

    cargarDatos();
  }, []);

  const createCreditoPreference = async (pack) => {
    const response = await mercadopagoapi.createPreference({
      id: pack.id,
      title: `${pack.cantidad} créditos`,
      quantity: pack.cantidad,
      price: pack.precioARS,
    });

    const data = response.data;
    return data;
  };

  return (
    <CreditosContext.Provider value={{
      error,
      packs,
      saldo,
      historialCompras,
      createCreditoPreference,
    }}>
      {children}
    </CreditosContext.Provider>
  );
}
