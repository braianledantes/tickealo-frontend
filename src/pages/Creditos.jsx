import { useEffect, useState } from "react";
import { ShoppingCart, Info, Plus } from "lucide-react";

// Constantes de diseño
const COLORS = {
  grisFondo: "#0b1028",
};

// API mock - reemplazar con llamadas reales a la API
const apiCreditos = {
  async getSaldo() {
    return 500; // TODO: implementar llamada real
  },

  async getPacks() {
    return [
      { id: 1, cantidad: 100, precioARS: 1500 },
      { id: 2, cantidad: 250, precioARS: 3500 },
      { id: 3, cantidad: 500, precioARS: 6500 },
      { id: 4, cantidad: 1000, precioARS: 12000 },
    ];
  },

  async comprar({ packId, cantidad }) {
    const saldoActual = 500; // En producción, obtener saldo actual
    const pack = await this.getPacks().then((packs) =>
      packs.find((p) => p.id === packId)
    );
    const precioARS = pack?.precioARS || cantidad * 15;

    return {
      saldo: saldoActual + (cantidad || pack?.cantidad || 0),
      movimiento: {
        id: Math.random().toString(36).slice(2),
        fechaISO: new Date().toISOString(),
        antes: saldoActual,
        delta: cantidad || pack?.cantidad || 0,
        despues: saldoActual + (cantidad || pack?.cantidad || 0),
        precioARS,
        tipo: "COMPRA",
      },
    };
  },
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
function ComprarModal({ open, packs, onClose, onConfirm }) {
  const [packSeleccionado, setPackSeleccionado] = useState(null);

  const handleConfirmar = () => {
    const pack = packs.find((p) => p.id === packSeleccionado);

    if (!pack) return;

    const urls = {
      1: "https://www.mercadopago.com.ar/checkout/v1/payment/redirect/exception?error_type=error_preference&router-request-id=29c8cdf5-56af-4628-b643-4437cdf45d3c&error_code=ND-099fb46e-615a-4e7f-9da3-c6d770a2080e&payer_id=&last_step=",
      2: "https://www.mercadopago.com.ar/checkout/v1/payment/redirect/exception?error_type=error_preference&router-request-id=29c8cdf5-56af-4628-b643-4437cdf45d3c&error_code=ND-099fb46e-615a-4e7f-9da3-c6d770a2080e&payer_id=&last_step=",
      3: "https://www.mercadopago.com.ar/checkout/v1/payment/redirect/exception?error_type=error_preference&router-request-id=29c8cdf5-56af-4628-b643-4437cdf45d3c&error_code=ND-099fb46e-615a-4e7f-9da3-c6d770a2080e&payer_id=&last_step=",
      4: "https://www.mercadopago.com.ar/checkout/v1/payment/redirect/exception?error_type=error_preference&router-request-id=29c8cdf5-56af-4628-b643-4437cdf45d3c&error_code=ND-099fb46e-615a-4e7f-9da3-c6d770a2080e&payer_id=&last_step=",
    };

    const url = urls[pack.id];
    if (url) window.location.href = url;
  };

  return (
    <Modal open={open} onClose={onClose} title="Comprar créditos">
      <div className="space-y-3">
        {packs.map((pack) => (
          <button
            key={pack.id}
            onClick={() => setPackSeleccionado(pack.id)}
            className={`w-full text-left p-3 rounded-xl border transition-colors ${
              packSeleccionado === pack.id
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
        <button
          disabled={!packSeleccionado}
          onClick={handleConfirmar}
          className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
        >
          Comprar
        </button>
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
  // Estados
  const [saldo, setSaldo] = useState(0);
  const [packs, setPacks] = useState([]);
  const [historialCompras, setHistorialCompras] = useState([]);
  const [openComprar, setOpenComprar] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [saldoData, packsData] = await Promise.all([
          apiCreditos.getSaldo(),
          apiCreditos.getPacks(),
        ]);
        setSaldo(saldoData);
        setPacks(packsData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, []);

  // Manejar compra de créditos
  const handleConfirmCompra = async ({ packId, cantidad }) => {
    try {
      const resultado = await apiCreditos.comprar({ packId, cantidad });

      setSaldo(resultado.saldo);
      setHistorialCompras((prev) => [resultado.movimiento, ...prev]);
      setOpenComprar(false);
    } catch (error) {
      console.error("Error al comprar créditos:", error);
    }
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
                  fechaISO={compra.fechaISO}
                  antes={compra.antes}
                  delta={compra.delta}
                  despues={compra.despues}
                  precioARS={compra.precioARS}
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
      />
    </div>
  );
}
