import Input from "../../components/Input/Input";
import TextArea from "../Input/InputTextArea";
import ImageUploader from "../../components/Images/ImageUploader";
import BankCard from "../../components/BankCard";
import DeleteButton from "../Button/DeleteButton";

export default function EventDetail({ evento }) {
    const getPreviewSrc = (value) =>
    value instanceof File ? URL.createObjectURL(value) : value;
  return (
    <div className="lg:col-span-7">
        {/* Banner */}
        {evento.bannerUrl ? (
            <ImageUploader
            onFileSelect={() => {}}
            aspect="aspect-[11/4]"
            value={getPreviewSrc(evento.bannerUrl)}
            readOnly
            />
        ) : (
            <div className="w-full aspect-[11/4] flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
            Sin banner
            </div>
        )}

        {/* Datos básicos */}
        <div className="border border-white/10 bg-[#05081b]/40 p-6 space-y-8">
            {/* Nombre y fechas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-6 gap-y-4">
            <Input 
                label="Nombre del evento" placeholder={evento?.nombre} 
                value={evento.nombre} readOnly
            />

            <Input
                label="Fecha de inicio"
                placeholder={evento?.inicioAt}
                value={new Date(evento.inicioAt).toLocaleString("es-AR")}
                readOnly
            />

            <Input
                label="Fecha de fin"
                placeholder={evento?.finAt}
                value={new Date(evento.finAt).toLocaleString("es-AR")}
                readOnly
            />
            </div>

            {/* Ubicación y portada */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-10">
                <Input
                label="Direccion del evento"
                placeholder={evento.lugar?.direccion}
                value={evento.lugar?.direccion || ""}
                readOnly
                />
            </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-4 pb-10 border-b border-white/50">
                {evento.portadaUrl ? (
                <ImageUploader
                    onFileSelect={() => {}}
                    aspect="aspect-[20/13]"
                    value={getPreviewSrc(evento.portadaUrl)}
                    readOnly
                />
                ) : (
                <div className="w-full aspect-[20/13] flex items-center justify-center bg-gray-800 text-gray-500 rounded-lg">
                    Sin portada
                </div>
                )}
            <TextArea label="Descripcion del evento" value={evento.descripcion} readOnly />
            </div>

            {/* Entradas */}
            <div className="pb-10 border-b border-white/50">
            <h3 className="text-white text-2xl font-bold mb-4">Entradas</h3>
            {evento.entradas?.map((entrada, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input placeholder="Tipo de entrada" value={entrada.tipo} readOnly />
                <Input placeholder="Precio" value={entrada.precio} readOnly />
                <Input placeholder="Cantidad" value={entrada.cantidad} readOnly />
                </div>
            ))}

            </div>

            {/* Cuenta bancaria */}
            <h3 className="text-white text-2xl font-bold mb-4">Cobros</h3>
            <BankCard label="Cuenta bancaria asociada" cuenta={evento.cuentaBancaria} edit={false} />


           <div className="relative pb-13">
            <div className="absolute right-2 max-w-xl">
                <DeleteButton text="Eliminar" />
            </div>
           </div>
        </div>
    </div>
  );
}


