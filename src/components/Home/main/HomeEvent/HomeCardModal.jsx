// import { formatearFechaLarga } from "../../../../utils/formatear";
import { useEffect, useState } from "react";
import IconButton from "../../../Button/IconButton";
import { X } from "lucide-react";
import SecondaryButton from "../../../Button/SecondaryButton";

export default function HomeCardModal({ evento, onClose }) {
    const [closing, setClosing] = useState(false);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const handleClose = () => {
        setClosing(true);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div className="fixed inset-0 bg-black/40 w-full flex justify-center items-center z-[9999] overflow-auto scrollbar-none">

            <div
                className={`${
                    closing ? "animate-slide-out-right" : "animate-slide-in-right"
                } text-white bg-[#05081b] shadow-2xl border border-white/20 w-full max-w-xl space-y-4 z-[9999]`}
            >
                <div className="grid grid-cols-2 px-8 pt-8 pb-4">
                    <h4 className="text-white font-bold text-lg tracking-wider">
                        {evento.nombre}
                    </h4>
                    <div className="flex justify-end">
                        <IconButton icon={<X />} onClick={handleClose} />
                    </div>
                </div>

                <img
                    src={evento.bannerUrl}
                    alt={evento.nombre}
                    className="aspect-[11/4]"
                />

                <div className="px-8 pt-4 text-white">
                    <div className="pb-2">
                        <h1 className="font-medium text-lg text-white/70 tracking-wider">
                            LUGAR
                        </h1>
                        <p className="text-medium text-md text-blue-800">
                            {evento.lugar.direccion}
                        </p>
                    </div>

                    <div className="flex justify-between items-center tracking-wider">
                        <h1 className="text-xl font-bold">ENTRADAS</h1>
                        <h1 className="text-xl font-bold">PRECIO</h1>
                    </div>

                    <div className="space-y-2 mt-4">
                        {evento.entradas?.map((e) => (
                            <div
                                key={e.id}
                                className="flex justify-between items-center tracking-wider"
                            >
                                <p className="font-semibold text-[#caf0f8]">{e.tipo}</p>
                                {e.stock === 0 ? (
                                    <p className="bg-red-600 text-white font-bold tracking-wider py-2 px-16 text-sm">
                                        AGOTADAS
                                    </p>
                                ) : (
                                    <p className="text-white/70">${e.precio}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 p-4 bg-white/5 border border-white/10">
                    <p className="text-white/80 text-sm leading-relaxed text-center">
                        Para comprar entradas, descargá la app oficial desde Play Store o App Store.
                    </p>
                </div>
            </div>
        </div>
    );
}
