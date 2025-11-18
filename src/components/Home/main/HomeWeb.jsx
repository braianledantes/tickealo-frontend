import { useEffect, useRef, memo, useMemo } from "react";
import SecondaryButton from "../../Button/SecondaryButton";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../routes/paths";

const featuresData = [
  {
    title: "1. Crea eventos globales",
    desc: "Organizá tus eventos en cualquier lugar del mundo.",
    className: "rounded-bl-none",
  },
  {
    title: "2. Gestiona ventas fácilmente",
    desc: "Cotizá, controlá y monitoreá todas las ventas de tus entradas en un solo lugar.",
    className: "rounded-br-none",
  },
  {
    title: "3. Conoce opiniones reales",
    desc: "Visualizá valoraciones y comentarios auténticos de tus clientes.",
    className: "rounded-bl-none",
  },
  {
    title: "4. Arma tu equipo ideal",
    desc: "Gestioná tu equipo de organización de manera sencilla.",
    className: "rounded-br-none",
  },
];

export default function HomeWebComponent() {
  const productRef = useRef(null);
  const navigate = useNavigate();

  const handleRegister = () => navigate(PATHS.REGISTER);

  useEffect(() => {
    const el = productRef.current;
    if (!el) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate-fadeUp");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = useMemo(() => featuresData, []);

  return (
    <div
      ref={productRef}
      className="opacity-0 grid grid-cols-1 md:grid-cols-2 items-center gap-8 pt-5 pb-20 mx-10 md:mx-40 transition-all duration-700 ease-out"
    >
      {/* Tarjetas → en mobile van abajo */}
      <div className="order-2 md:order-1 flex flex-wrap gap-4 justify-center md:justify-start px-6">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`bg-[#0c0f2b] text-white/90 p-5 rounded-4xl shadow-lg min-w-[200px] md:min-w-[220px] animate-fadeUp ${feature.className}`}
          >
            <span className="font-semibold text-xl tracking-wider">{feature.title}</span>
            <p className="text-sm mt-2 tracking-wider">{feature.desc}</p>
          </div>
        ))}
      </div>
      {/* Texto productoras → en mobile va primero */}
      <div className="order-1 md:order-2 text-center md:text-right px-6">
        <h1 className="animate-subtitle text-2xl md:text-3xl font-semibold tracking-wider text-[#999]/70 mb-5 italic">
          PARA PRODUCTORAS
        </h1>
        <h2 className="animate-subtitle text-2xl md:text-3xl font-semibold tracking-wider text-white mb-5 italic">
          TODAS LAS HERRAMIENTAS QUE NECESITÁS
        </h2>
        <p className="animate-subtitle max-w-2xl my-5 text-xs md:text-sm text-white/70 tracking-wider italic">
          Simplificá la organización y gestión de tus eventos. Desde la creación hasta la venta de entradas, todo en un solo lugar, pensado para productoras exigentes.
        </p>
        <div className="flex justify-end">
          <div className="w-full md:w-[250px]">
            <SecondaryButton text="REGISTRAR MI PRODUCTORA" onClick={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const HomeWeb = memo(HomeWebComponent);
