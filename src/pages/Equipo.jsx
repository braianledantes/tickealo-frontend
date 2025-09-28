import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import{ AtSign, Search} from "lucide-react";

export default function Equipo() {
  return (
    <div className="bg-[#05081b]/40 rounded-2xl shadow-2xl p-8 border border-white/20 mb-20 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-4">Equipo <span className="text-sm font-regular ">Miembros del equipo y permisos.</span></h2>

      <div className="border-b border-white/20 mb-6 pb-4 space-y-5">
        <p className="text-white font-light pt-3">Ingresa el mail exacto del usuario a quien quieras que sea Validadora.</p>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Input */}
          <div className="w-full md:w-1/2">
            <Input icon={<AtSign />} placeholder="Correo del usuario..." />
          </div>

          {/* Button */}
          <div className="w-full md:w-1/2">
            <Button text={<Search />} />
          </div>
        </div>

        <p className="flex justify-center text-[#A5A6AD] text-sm font-light ">Recorda: El usuario debe estar registrado en la plataforma!</p>  
      </div>
    </div>
  );
}