import { Check } from "lucide-react";
import { usePerfil } from "../../hooks/usePerfil";
import TourTrigger from "../Tour/TourTrigger";

export default function EventGuide() {
  const { user, cantValidadores } = usePerfil();

  const steps = [
    {
      title: "OBTÉN CRÉDITOS",
      description: (
        <span className="text-white/70 italic">
          ¡Te damos la bienvenida con 50 créditos de regalo!
        </span>
      ),
      done: Boolean(user?.creditosDisponibles > 0),
    },
    {
      title: "REGISTRA TU CUENTA BANCARIA",
      description: (
        <span className="text-white/70 italic">
          Aquí recibirás las transferencias de tus clientes.
        </span>
      ),
      done: Boolean(user?.cuentaBancaria),
    },
    {
      title: "CREA TU EQUIPO DE TRABAJO",
      description: (
        <span className="text-white/70 italic">
          Opcional: Añade validadores para ayudarte en el evento.
        </span>
      ),
      done: Boolean(cantValidadores > 0),
      isOptional: true,
    },
  ];

  const allRequiredDone = steps
    .filter((s) => !s.isOptional)
    .every((s) => s.done);

  return (
    <>
      <h2 className="pb-4 font-semibold text-4xl italic tracking-wider text-[#CAF0F8]">
        Guía Express
      </h2>
      <TourTrigger className="px-0" />

      <p className="text-sm text-white/70 tracking-wide py-4">
        * Esta información desaparecerá cuando hayas creado un evento.
      </p>

      {allRequiredDone && (
        <p className="italic font-semibold tracking-wider text-2xl text-white py-4">
          ¡Todo listo! Ya puedes crear tus eventos.
        </p>
      )}

      {/* Cards */}
      <div className="flex flex-col gap-6 mt-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="p-2 rounded-full shadow-lg bg-[#0b1030] border border-white/5 hover:border-[#CAF0F8]/30 transition-all duration-300
                       grid grid-cols-[10%_75%_15%] gap-4 items-center"
          >
            {/* Número */}
            <div className="flex justify-center items-center text-4xl sm:text-5xl font-bold text-white/20">
              {index + 1}
            </div>

            {/* Contenido */}
            <div className="flex flex-col flex-1 col-span-1 overflow-hidden">
              <h3 className="text-md sm:text-md font-semibold text-[#CAF0F8] mb-1 tracking-wider italic">
                {step.title}
                {step.isOptional && (
                  <span className="ml-2 text-[10px] sm:text-xs text-yellow-300 italic tracking-wide">
                    RECOMENDACIÓN
                  </span>
                )}
              </h3>

              <p className="text-white/80 text-xs sm:text-sm">{step.description}</p>
            </div>

            {/* Estado — a la derecha */}

        <div
            className={`
                flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-light tracking-wide
                transition-all duration-300
                ${step.done
                ? "text-green-300"
                : "text-white/50"
                }
            `}
            >
            <span className="uppercase tracking-widest">
                {step.done ? "Hecho" : "Pendiente"}
            </span>

            {step.done && (
                <Check
                className="text-green-300 transform transition-all duration-300 opacity-100 scale-100"
                size={16}
                />
            )}
            </div>

        </div>
        ))}
      </div>
    </>
  );
}
