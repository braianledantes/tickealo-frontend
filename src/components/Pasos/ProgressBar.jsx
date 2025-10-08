import { Pencil, Tickets , Check} from 'lucide-react';
import IconButton from '../Button/IconButton';

export default function ProgressBar({}) {
const active = false
  return (
    <main className="text-white p-10 flex justify-center">
        <div className="relative max-w-sm w-full h-4 rounded-full bg-blue inset-shadow-sm inset-shadow-indigo-500/50 ">
            <div className="absolute grid grid-cols-3 w-full -top-5 left-0">
                <IconButton icon={<Pencil />} active={active} title="Datos del Evento" className='w-13 h-13' iconClassName='w-10 h-10'/>
                <div className='flex justify-center'> <IconButton icon={<Tickets />} active={active} title="Datos de Entradas" className='w-13 h-13' iconClassName='w-10 h-10'/></div>
                <div className='flex justify-end'> <IconButton icon={<Check />} active={active} title="Datos Extra" className='w-13 h-13' iconClassName='w-10 h-10'/> </div>
            </div>

            <div className="absolute grid grid-cols-3 w-full -top-12 left-0 text-white/60">
                <span>Evento</span>
                <span className='flex justify-center'>Entradas</span>
                <span className='flex justify-end mr-2'>Extra</span>
            </div>
        </div>
    </main>
  );
}
