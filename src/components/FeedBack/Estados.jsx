export function EstadoCompra ( {estadoCompra, className = "", punto="w-2 h-2 mr-2 rounded-full"}) {
    const estadoColor = {
        PENDIENTE: "bg-gray-500/30 border-1 border-gray-500 text-white px-2 py-1 rounded-lg",
        ACEPTADA: "bg-green-500/30 border-1 border-green-500 text-white px-2 py-1 rounded-lg",
        RECHAZADA: "bg-red-500/30 border-1 border-red-500 text-white px-2 py-1 rounded-lg",
    };
    return (
        <div className={`${estadoColor[estadoCompra]} ${className}`}>
            <span className={`${punto} ${estadoCompra === 'PENDIENTE' ? 'bg-gray-500' : estadoCompra === 'ACEPTADA' ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {estadoCompra}
        </div>
    )
}

export function EstadoEvento ( estadoEvento ) {
    return (
        null
    )
}