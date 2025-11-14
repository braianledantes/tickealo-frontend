import { useEffect, useState } from "react";
import { ShoppingCart, Info, Plus } from "lucide-react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import * as mercadopagoapi from "../api/mercadopago";
import { useCreditos } from "../hooks/useCreditos";

// Constantes de diseño
const COLORS = {
  grisFondo: "#0b1028",
};

// Funciones de formateo
const formatCurrency = (amount) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(amount);

const formatNumber = (number) => new Intl.NumberFormat("es-AR").format(number);

const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString("es-AR");

// Modal base
function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/15 shadow-2xl p-6 bg-[#060a1f]/95">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="text-gray-200">{children}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}

// Modal para comprar créditos
function ComprarModal({ open, packs, onClose, createCreditoPreference, onConfirm }) {
  const [packSeleccionado, setPackSeleccionado] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    const pack = packs.find((p) => p.id === packSeleccionado);

    if (pack) {
      createCreditoPreference(pack)
        .then((data) => {
          setPreferenceId(data.id);
        });
    }
  }, [packSeleccionado]);

  return (
    <Modal open={open} onClose={onClose} title="Comprar créditos">
      <div className="space-y-3">
        {packs.map((pack) => (
          <button
            key={pack.id}
            onClick={() => setPackSeleccionado(pack.id)}
            className={`w-full text-left p-3 rounded-xl border transition-colors ${packSeleccionado === pack.id
              ? "bg-white/10 border-white/40"
              : "bg-transparent border-white/10 hover:bg-white/5"
              }`}
          >
            <div className="flex items-center justify-between text-white">
              <span className="flex items-center gap-2">
                <Plus size={18} />
                {formatNumber(pack.cantidad)} créditos
              </span>
              <span className="opacity-80">
                {formatCurrency(pack.precioARS)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-xl bg-white/10 text-gray-200 hover:bg-white/15 transition-colors"
        >
          Cancelar
        </button>
        {preferenceId && (
          <Wallet
            customization={{ theme: "dark", showValueProp: false }}
            initialization={{ preferenceId: preferenceId }}
          />
        )}
      </div>
    </Modal>
  );
}

// Fila de historial de compras de crédito
function HistorialCompraRow({ fechaISO, antes, delta, despues, precioARS }) {
  return (
    <div className="grid grid-cols-12 items-center px-4 py-3 border-b border-white/10 hover:bg-white/5 transition">
      <div className="col-span-3 text-gray-300">{formatDate(fechaISO)}</div>
      <div className="col-span-2 text-gray-400 line-through">
        {formatNumber(antes)}
      </div>
      <div className="col-span-2 text-emerald-400 flex items-center gap-1">
        + {formatNumber(delta)}
      </div>
      <div className="col-span-1 text-gray-400 text-center">→</div>
      <div className="col-span-2 text-white font-semibold">
        {formatNumber(despues)}
      </div>
      <div className="col-span-2 flex items-center justify-end gap-3">
        <span className="text-gray-200">{formatCurrency(precioARS)}</span>
      </div>
    </div>
  );
}

export default function CreditosPage() {
  const { packs, saldo, historialCompras, createCreditoPreference } = useCreditos();
  const [openComprar, setOpenComprar] = useState(false);

  // Manejar compra de créditos
  const handleConfirmCompra = async ({ packId, cantidad }) => {

  };

  return (
    <div
      className="p-6 sm:p-10 min-h-screen"
      style={{ backgroundColor: COLORS.grisFondo }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Saldo y acciones principales */}
        <div className="rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Saldo actual */}
            <div>
              <div className="text-5xl font-black tracking-tight text-white drop-shadow">
                {formatNumber(saldo)}
              </div>
              <div className="text-sm text-gray-200 mt-1">
                Créditos disponibles
              </div>
            </div>

            {/* Botón de compra */}
            <button
              onClick={() => setOpenComprar(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition-colors font-medium"
            >
              <ShoppingCart size={18} />
              Comprar créditos
            </button>
          </div>

          {/* Información adicional */}
          <button className="mt-6 text-sm text-violet-200/90 hover:text-violet-100 inline-flex items-center gap-2 transition-colors">
            <Info size={16} />
            Ver más información sobre créditos
          </button>
        </div>

        {/* Historial de compras de crédito */}
        <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#05081b]/60">
          <div className="px-4 py-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white">
              Historial de Compras
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Registro de todas tus compras de crédito
            </p>
          </div>

          {historialCompras.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <div className="text-gray-400 mb-2">
                <ShoppingCart size={48} className="mx-auto opacity-30" />
              </div>
              <p className="text-gray-400">No tienes compras de crédito aún</p>
              <p className="text-sm text-gray-500 mt-1">
                Cuando realices una compra, aparecerá aquí el historial
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-12 px-4 py-3 text-xs uppercase tracking-widest text-gray-400 border-b border-white/10">
                <div className="col-span-3">Fecha</div>
                <div className="col-span-2">Antes</div>
                <div className="col-span-2">Cambio</div>
                <div className="col-span-1 text-center"> </div>
                <div className="col-span-2">Después</div>
                <div className="col-span-2 text-right">Precio</div>
              </div>

              {historialCompras.map((compra) => (
                <HistorialCompraRow
                  key={compra.id}
                  fechaISO={compra.createdAt}
                  antes={compra.creditosPrevios}
                  delta={compra.creditos}
                  despues={compra.creditosPosterior}
                  precioARS={compra.precio}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Modal de compra */}
      <ComprarModal
        open={openComprar}
        onClose={() => setOpenComprar(false)}
        packs={packs}
        onConfirm={handleConfirmCompra}
        createCreditoPreference={createCreditoPreference}
      />
    </div>
  );
}
