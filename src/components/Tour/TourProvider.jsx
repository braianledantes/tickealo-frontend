import { TOUR_STEPS } from '../../constants/tour';
import { useTourStore } from '../Tour/TourStore';
import { TourProvider as ReactourProvider } from '@reactour/tour';

const HEADING_STYLE = "text-lg font-semibold mb-2 text-white tracking-wider italic";
const TEXT_STYLE = "text-xs mb-4 text-white/70 tracking-wider";

export default function TourProvider({ children }) {
  const { hasSeenTour, completeTour } = useTourStore();

  const steps = [
    {
      selector: `[data-tour="${TOUR_STEPS.SIDEBAR_PRODUCTORA}"]`,
      content: (
        <div>
          <h3 className={HEADING_STYLE}>BIENVENIDO!</h3>
          <p className={TEXT_STYLE}>
            Aqui podras modificar todos tus datos de tu productora.
          </p>
        </div>
      ),
      position: 'right',
    },
    {
      selector: `[data-tour="${TOUR_STEPS.SIDEBAR_CREDITOS}"]`,
      content: (
        <div className="grid grid-cols-[10%_90%] gap-2">
          <p className="text-white/70 font-semibold text-center text-4xl italic">1</p>
          <div>
            <h3 className={HEADING_STYLE}>CRÉDITOS</h3>
            <p className={TEXT_STYLE}>
              En esta sección podrás ver tu saldo, asegúrate de tener siempre créditos suficientes para vender entradas.
            </p>
          </div>
        </div>
      ),
      position: 'right',
    },
    {
      selector: `[data-tour="${TOUR_STEPS.SIDEBAR_COBROS}"]`,
      content: (
        <div className="grid grid-cols-[10%_90%] gap-2">
          <p className="text-white/70 font-semibold text-center text-4xl italic">2</p>
          <div>
            <h3 className={HEADING_STYLE}>COBROS</h3>
            <p className={TEXT_STYLE}>
              Aquí podrás registrar y gestionar tu cuenta bancaria para recibir los pagos de tus eventos.
            </p>
          </div>
        </div>
      ),
      position: 'right',
    },
    {
      selector: `[data-tour="${TOUR_STEPS.SIDEBAR_EQUIPO}"]`,
      content: (
        <div className="grid grid-cols-[10%_90%] gap-2">
          <p className="text-white/70 font-semibold text-center text-4xl italic">3</p>
          <div>
            <h3 className={HEADING_STYLE}>EQUIPO</h3>
            <p className={TEXT_STYLE}>
              En esta seccion, podrás crear tu equipo de trabajo que te ayudaran a validar los QRs de cada ticket de entrada.
            </p>
          </div>
        </div>
      ),
      position: 'right',
    },
    {
      selector: `[data-tour="${TOUR_STEPS.CREATE_EVENT}"]`,
      content: (
        <div className="grid grid-cols-[10%_90%] gap-2">
          <p className="text-white/70 font-semibold text-center text-4xl italic">4</p>
          <div>
            <h3 className={HEADING_STYLE}>CREAR EVENTO</h3>
            <p className={TEXT_STYLE}>
              Cuando hayas completado los pasos anteriores, ya puedes crear tu evento desde este botón.
            </p>
          </div>
        </div>
      ),
      position: 'bottom',
    },
    {
      selector: `[data-tour="${TOUR_STEPS.SIDEBAR_VENTAS}"]`,
      content: (
        <div className="grid grid-cols-[10%_90%] gap-2">
          <p className="text-white/70 font-semibold text-center text-4xl italic">5</p>
          <div>
            <h3 className={HEADING_STYLE}>ENTRADAS VENDIDAS</h3>
            <p className={TEXT_STYLE}>
              Aca se encuentra todo el monitoreo de las ventas de tus eventos, podras ver el detalle de cada compra realizada, procura revisarlo seguido!
            </p>
          </div>
        </div>
      ),
      position: 'right',
    },
  ];

  return (
    <ReactourProvider
      steps={steps}
      isOpen={!hasSeenTour}
      onRequestClose={completeTour}
      styles={{
        overlay: (base) => ({
          ...base,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }),
        popover: (base) => ({
          ...base,
          background: "linear-gradient(135deg, #00033D, #010030)",
          padding: "20px",
          borderRadius: "30px",
        }),
        close: (base) => ({
          ...base,
          color: "white",
        }),
        arrow: (base) => ({
          ...base,
          color: "white",
        }),
      }}
      components={{
        Badge: () => null,
      }}
  padding={2}
  disableInteraction
    >
      {children}
    </ReactourProvider>
  );
}
